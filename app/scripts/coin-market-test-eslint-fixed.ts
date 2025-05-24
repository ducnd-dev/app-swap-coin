// filepath: app/scripts/coin-market-test-eslint-fixed.ts
import dotenv from 'dotenv';
import { coinMarketAPI, Transaction, TokenInfo, ApiErrorResponse, PriceData } from '../lib/api/coin-market';

// Load environment variables
dotenv.config();

// Test data
const TEST_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Uniswap V2 Router
const TEST_TX_HASH = '0xc391613cd68e4dbff80e5fecdc0e8c36926c1193f5e2c8038f72a291ac61deea'; // A random transaction
const TEST_TOKEN_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // WETH token
const TEST_TOKENS = ['BTC', 'ETH', 'USDT'];

// Formatting helpers
function logHeader(title: string) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(` ${title}`);
  console.log(`${'='.repeat(50)}`);
}

function logSubheader(title: string) {
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

// Type guard for ApiErrorResponse
function isApiError(obj: unknown): obj is ApiErrorResponse {
  return obj !== null && typeof obj === 'object' && 'error' in obj && (obj as ApiErrorResponse).error === true;
}

async function testPriceData() {
  logHeader('Testing CoinMarketAPI - Price Data');
  
  logSubheader('Current Token Prices');
  for (const token of TEST_TOKENS) {
    try {
      const result = await coinMarketAPI.getTokenPrice(token);
      
      if (isApiError(result)) {
        logError(`Failed to get price for ${token}: ${result.message}`);
      } else {
        const priceData = result as PriceData;
        logSuccess(`${token} price: $${priceData.price.toFixed(2)} (Source: ${priceData.source})`);
      }
    } catch (error) {
      logError(`Error getting price for ${token}`, error);
    }
  }
    
  logSubheader('Historical Price Data');
  try {
    const result = await coinMarketAPI.getHistoricalPrices('BTC', 5);
    
    if (isApiError(result)) {
      logError(`Failed to get historical prices: ${result.message}`);
    } else if (Array.isArray(result)) {
      logSuccess(`Retrieved ${result.length} historical data points for BTC`);
      if (result.length > 0) {
        console.log('Sample data point:');
        console.log(result[0]);
      }
    } else {
      logWarning('Unexpected historical price data format');
      console.log(result);
    }
  } catch (error) {
    logError('Error getting historical data', error);
  }
}

async function testBlockchainData() {
  logHeader('Testing CoinMarketAPI - Blockchain Data');
  
  logSubheader('Transaction Details');
  try {
    const result = await coinMarketAPI.getTransactionDetails(TEST_TX_HASH);
    
    if (isApiError(result)) {
      logWarning(`Could not get transaction: ${result.message}`);
    } else {
      // Now we can safely cast it to Transaction since we've excluded the error case
      const tx = result as Transaction;
      logSuccess('Transaction details fetched successfully:');
      console.log(`  Hash: ${tx.hash || 'N/A'}`);
      console.log(`  From: ${tx.from || 'N/A'}`);
      console.log(`  To: ${tx.to || 'N/A'}`);
      console.log(`  Value: ${tx.value || '0'}`);
    }
  } catch (error) {
    logError('Error getting transaction details', error);
  }
  
  logSubheader('Contract Verification');
  try {
    const isVerified = await coinMarketAPI.isContractVerified(TEST_ADDRESS);
    logSuccess(`Contract ${TEST_ADDRESS} is ${isVerified ? 'verified' : 'not verified'}`);
  } catch (error) {
    logError('Error checking contract verification', error);
  }
  
  logSubheader('Token Information');
  try {
    const result = await coinMarketAPI.getTokenInfo(TEST_TOKEN_ADDRESS);
    
    if (isApiError(result)) {
      logWarning(`Could not get token info: ${result.message}`);
    } else {
      // Now we can safely cast it to TokenInfo since we've excluded the error case
      const tokenInfo = result as TokenInfo;
      logSuccess('Token information fetched successfully:');
      console.log(`  Name: ${tokenInfo.name || 'N/A'}`);
      console.log(`  Symbol: ${tokenInfo.symbol || 'N/A'}`);
      console.log(`  Decimals: ${tokenInfo.decimals || 'N/A'}`);
    }
  } catch (error) {
    logError('Error getting token information', error);
  }
  
  logSubheader('Gas Price');
  try {
    const result = await coinMarketAPI.getGasPrice();
    
    if (isApiError(result)) {
      logWarning(`Could not get gas price: ${result.message}`);
    } else if (typeof result === 'string') {
      // Convert from hex to decimal and from wei to gwei
      const gasPriceHex = result.startsWith('0x') ? result : `0x${result}`;
      const gasPriceWei = parseInt(gasPriceHex, 16);
      const gasPriceGwei = gasPriceWei / 1e9;
      
      logSuccess(`Current gas price: ${gasPriceGwei.toFixed(2)} Gwei`);
    } else {
      logWarning('Gas price returned in unexpected format');
      console.log(result);
    }
  } catch (error) {
    logError('Error getting gas price', error);
  }
  
  logSubheader('Token Transactions');
  try {
    const transactions = await coinMarketAPI.getTokenTransactions(TEST_ADDRESS);
    
    if (transactions.length > 0) {
      logSuccess(`Retrieved ${transactions.length} transactions`);
      console.log('Latest transaction:');
      console.log(`  Hash: ${transactions[0].hash}`);
      console.log(`  From: ${transactions[0].from}`);
      console.log(`  To: ${transactions[0].to}`);
    } else {
      logWarning('No transactions found');
    }
  } catch (error) {
    logError('Error getting transactions', error);
  }
}

async function runTests() {
  console.log('\n🚀 CoinMarketAPI Test Suite');
  console.log('===========================');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const apiKeyInfo = [
    `CoinAPI Key: ${process.env.COINAPI_KEY ? '✅ Present' : '❌ Missing'}`,
    `Etherscan API Key: ${process.env.ETHERSCAN_API_KEY ? '✅ Present' : '❌ Missing'}`
  ];
  
  console.log('\nAPI Keys:');
  console.log(`- ${apiKeyInfo[0]}`);
  console.log(`- ${apiKeyInfo[1]}`);
  
  await testPriceData();
  await testBlockchainData();
  
  console.log('\n✨ All tests completed! ✨');
}

runTests().catch(error => {
  console.error('Fatal error in test script:', error);
  process.exit(1);
});
