// filepath: app/scripts/api-test.ts
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Import original implementations (comment if you want to use improved versions)
import { getTokenTransactions, getTransactionDetails, isContractVerified, getGasPrice, getTokenInfo } from '../lib/blockchain/etherscan';
// Import original prices as fallback
import * as originalPrices from '../lib/api/prices';

// Determine if improved versions are available
const etherscanImprovedExists = fs.existsSync(path.join(__dirname, '../lib/blockchain/etherscan.improved.ts'));
const pricesImprovedExists = fs.existsSync(path.join(__dirname, '../lib/api/prices.improved.ts'));

// Load environment variables
dotenv.config();

// Test data
const TEST_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Uniswap V2 Router
const TEST_TX_HASH = '0xc391613cd68e4dbff80e5fecdc0e8c36926c1193f5e2c8038f72a291ac61deea'; // A random transaction
const TEST_TOKEN_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // WETH token
const TEST_TOKENS = ['BTC', 'ETH', 'USDT'];

// Utility functions
function logSectionHeader(title: string) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(` ${title}`);
  console.log(`${'='.repeat(50)}`);
}

function logSubsection(title: string) {
  console.log(`\n${'-'.repeat(40)}`);
  console.log(`📋 ${title}`);
  console.log(`${'-'.repeat(40)}`);
}

function logSuccess(message: string) {
  console.log(`✅ ${message}`);
}

function logWarning(message: string) {
  console.log(`⚠️ ${message}`);
}

function logError(message: string, error?: unknown) {
  console.log(`❌ ${message}`);
  if (error) {
    if (error instanceof Error) {
      console.log(`   Error details: ${error.message}`);
    } else {
      console.log(`   Error details: ${String(error)}`);
    }
  }
}

// Function to generate mock price data for testing
function getMockPriceData(symbol: string) {
  const basePrice = symbol === 'BTC' ? 50000 : symbol === 'ETH' ? 3000 : 10;
  return basePrice + (Math.random() * 1000 - 500);
}

// Function to generate mock historical price data
function getMockHistoricalPrices(symbol: string, days: number = 7) {
  const data = [];
  const endDate = new Date();
  let basePrice = symbol === 'BTC' ? 50000 : symbol === 'ETH' ? 3000 : 10;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - (days - i));
    const volatility = basePrice * 0.02;
    const change = (Math.random() - 0.5) * volatility;
    basePrice = Math.max(0.01, basePrice + change);
    
    data.push({
      time_period_start: date.toISOString(),
      time_period_end: new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      price_open: basePrice - (Math.random() * 0.01 * basePrice),
      price_high: basePrice + (Math.random() * 0.02 * basePrice),
      price_low: basePrice - (Math.random() * 0.02 * basePrice),
      price_close: basePrice,
    });
  }
  
  return data;
}

// Test CoinAPI functionality without database dependency
async function testCoinAPI() {
  logSectionHeader('CoinAPI Integration Tests');
    // Test if improved version exists
  if (pricesImprovedExists) {
    logSuccess('Improved CoinAPI implementation detected!');
    
    try {
      // Use a more reliable approach for dynamic imports with proper type checking
      let pricesModule;      try {
        // Dynamic import using ES6 syntax
        pricesModule = await import('../lib/api/prices.improved');
      } catch (importError) {
        logWarning('Could not directly import improved prices module');
        logError('Module import failed', importError);
        // Use the original prices module as fallback
        pricesModule = originalPrices;
      }
      
      // Check if we have the expected functions
      const { getTokenPrice, getHistoricalPrices } = pricesModule;
      
      if (typeof getTokenPrice !== 'function' || typeof getHistoricalPrices !== 'function') {
        throw new Error('Missing required functions in prices.improved.ts module');
      }
            
      logSubsection('Testing Current Prices');
      
      // Test for each token in our test list
      for (const token of TEST_TOKENS) {
        try {
          const priceData = await getTokenPrice(token);
          if (priceData && typeof priceData === 'object' && 'error' in priceData && priceData.error) {
            logError(`Failed to get price for ${token}: ${priceData.message}`);
          } else if (priceData && typeof priceData === 'object' && 'price' in priceData) {
            logSuccess(`${token} price: $${priceData.price} (Source: ${priceData.source || 'unknown'})`);
          } else {
            logWarning(`Unexpected response format for ${token} price`);
            console.log(priceData);
          }
        } catch (error) {
          logError(`Error getting price for ${token}`, error);
        }
      }
      
      logSubsection('Testing Historical Prices');
      
      try {
        const historicalData = await getHistoricalPrices('BTC', 5);
        
        if (historicalData && typeof historicalData === 'object' && 'error' in historicalData && historicalData.error) {
          logError(`Failed to get historical prices: ${historicalData.message}`);
        } else if (Array.isArray(historicalData) && historicalData.length > 0) {
          logSuccess(`Retrieved ${historicalData.length} historical data points for BTC`);
          console.log('First data point:');
          console.log(historicalData[0]);
        } else {
          logWarning('Unexpected response format for historical prices');
          console.log(historicalData);
        }
      } catch (error) {
        logError('Error getting historical prices', error);
      }
      
    } catch (error) {
      logError('Failed to import improved CoinAPI implementation', error);
    }
  } else {
    // Use direct testing without database dependency
    logWarning('Using standard API testing without the improved implementation');
    
    const COINAPI_KEY = process.env.COINAPI_KEY;
    
    if (COINAPI_KEY) {
      logSubsection('Testing with Live CoinAPI');
      
      for (const token of TEST_TOKENS) {
        try {
          const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${token}/USD`, {
            headers: { 'X-CoinAPI-Key': COINAPI_KEY }
          });
          
          if (response.ok) {
            const data = await response.json();
            logSuccess(`${token} price: $${data.rate}`);
          } else {
            const error = await response.text();
            logError(`Failed to get ${token} price from API: ${error}`);
          }
        } catch (error) {
          logError(`Error fetching ${token} price`, error);
        }
      }
      
      // Test historical data
      try {
        const response = await fetch(
          `https://rest.coinapi.io/v1/ohlcv/BTC/USD/history?period_id=1DAY&limit=5`, {
            headers: { 'X-CoinAPI-Key': COINAPI_KEY }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          logSuccess(`Historical data points retrieved: ${data.length}`);
          console.log('Sample data point:');
          console.log(data[0]);
        } else {
          const error = await response.text();
          logError(`Failed to get historical data: ${error}`);
        }
      } catch (error) {
        logError('Error getting historical data', error);
      }
    } else {
      logWarning('COINAPI_KEY not found in environment. Using mock data only.');
    }
    
    logSubsection('Testing with Mock Data');
    
    for (const token of TEST_TOKENS) {
      const mockPrice = getMockPriceData(token);
      logSuccess(`${token} mock price: $${mockPrice.toFixed(2)}`);
    }
    
    const mockHistoricalData = getMockHistoricalPrices('ETH', 5);
    logSuccess(`Generated ${mockHistoricalData.length} mock historical data points`);
    console.log('Sample mock data point:');
    console.log(mockHistoricalData[0]);
  }
}

// Test Etherscan API
async function testEtherscanAPI() {
  logSectionHeader('Etherscan API Integration Tests');
  
  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
  if (!ETHERSCAN_API_KEY) {
    logWarning('ETHERSCAN_API_KEY not found in environment. Some tests may fail.');
  } else {
    logSuccess(`ETHERSCAN_API_KEY found. Length: ${ETHERSCAN_API_KEY.length} characters`);
  }
  
  if (etherscanImprovedExists) {
    logSuccess('Improved Etherscan implementation detected!');
  }
  
  // Test contract verification status
  logSubsection('Contract Verification Status Check');
  try {
    const isVerified = await isContractVerified(TEST_ADDRESS);
    logSuccess(`Contract ${TEST_ADDRESS} is ${isVerified ? 'verified' : 'not verified'}`);
  } catch (error) {
    logError('Contract verification check failed', error);
  }
  
  // Test transaction details
  logSubsection('Transaction Details');
  try {
    const txDetails = await getTransactionDetails(TEST_TX_HASH);
    
    if ('error' in txDetails) {
      logError(`Transaction details fetch error: ${txDetails.message}`);
    } else if (txDetails && txDetails.hash) {
      logSuccess('Transaction details fetched successfully:');
      console.log(`  Hash: ${txDetails.hash}`);
      console.log(`  From: ${txDetails.from}`);
      console.log(`  To: ${txDetails.to}`);
      console.log(`  Value: ${txDetails.value}`);
    } else {
      logWarning('Transaction details incomplete or not found');
      console.log(txDetails);
    }
  } catch (error) {
    logError('Transaction details fetch failed', error);
  }
  
  // Test token transactions
  logSubsection('Token Transactions');
  try {
    const transactions = await getTokenTransactions(TEST_ADDRESS, undefined, 'ETH');
    
    if (transactions.length > 0) {
      logSuccess(`${transactions.length} token transactions fetched`);
      console.log('Latest transaction:');
      console.log(`  Hash: ${transactions[0].hash}`);
      console.log(`  From: ${transactions[0].from}`);
      console.log(`  To: ${transactions[0].to}`);
      console.log(`  Value: ${transactions[0].value}`);
    } else {
      logWarning('No transactions found or API rate limit reached');
    }
  } catch (error) {
    logError('Token transactions fetch failed', error);
  }
  
  // Test gas price
  logSubsection('Gas Price');
  try {
    const gasPrice = await getGasPrice();
    
    // We know gasPrice will be a string because getGasPrice() returns a string on success
    // or throws an error on failure (doesn't return error object)
    
    // Convert from hex to decimal and from wei to gwei
    const gasPriceHex = gasPrice.startsWith('0x') ? gasPrice : `0x${gasPrice}`;
    const gasPriceWei = parseInt(gasPriceHex, 16);
    const gasPriceGwei = gasPriceWei / 1e9;
    
    logSuccess(`Current gas price: ${gasPriceGwei.toFixed(2)} Gwei`);
  } catch (error) {
    logError('Gas price fetch failed', error);
  }
  
  // Test token info
  logSubsection('Token Information');
  try {
    const tokenInfo = await getTokenInfo(TEST_TOKEN_ADDRESS);
    
    if ('error' in tokenInfo) {
      logError(`Token info fetch error: ${tokenInfo.message}`);
    } else if (tokenInfo) {
      logSuccess('Token info fetched successfully:');
      console.log(`  Name: ${tokenInfo.name}`);
      console.log(`  Symbol: ${tokenInfo.symbol}`);
      console.log(`  Decimals: ${tokenInfo.divisor || tokenInfo.decimals}`);
    } else {
      logWarning('Token info not found or in unexpected format');
      console.log(tokenInfo);
    }
  } catch (error) {
    logError('Token info fetch failed', error);
  }
}

async function runTests() {
  console.log('\n🚀 API Integration Test Suite');
  console.log('===========================');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Node Environment: ${process.env.NODE_ENV || 'not set'}`);
  console.log('\nTesting API integrations...');
  
  // Test CoinAPI
  await testCoinAPI();
  
  // Test Etherscan API
  await testEtherscanAPI();
  
  console.log('\n✨ Tests completed! ✨');
}

// Run the tests
runTests().catch(error => {
  console.error('\n❌ Fatal error in test suite:', error);
  process.exit(1);
});
