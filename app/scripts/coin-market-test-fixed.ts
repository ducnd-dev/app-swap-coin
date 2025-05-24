// filepath: app/scripts/coin-market-test-fixed.ts
import dotenv from 'dotenv';
import { coinMarketAPI } from '../lib/api/coin-market.fixed';
import type { ApiErrorResponse } from '../lib/api/coin-market.fixed';

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
  return obj !== null && typeof obj === 'object' && 'error' in obj && (obj).error === true;
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
        logSuccess(`${token} price: $${result.price.toFixed(2)} (Source: ${result.source})`);
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
      if (result.details && typeof result.details === 'object' && 'missingApiKey' in result.details) {
        console.log('  API key issue detected. Using environment variable:');
        console.log(`  ETHERSCAN_API_KEY=${process.env.ETHERSCAN_API_KEY ? 'Present (but may be invalid)' : 'Missing'}`);
      }
    } else {
      logSuccess('Transaction details fetched successfully:');
      console.log(`  Hash: ${result.hash}`);
      console.log(`  From: ${result.from}`);
      console.log(`  To: ${result.to}`);
      console.log(`  Value: ${result.value}`);
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
      if (result.details && typeof result.details === 'object' && 'missingApiKey' in result.details) {
        console.log('  API key issue detected. Check your environment variables.');
      }
    } else {
      logSuccess('Token information fetched successfully:');
      console.log(`  Name: ${result.name}`);
      console.log(`  Symbol: ${result.symbol}`);
      console.log(`  Decimals: ${result.decimals}`);
    }
  } catch (error) {
    logError('Error getting token information', error);
  }
  
  logSubheader('Gas Price');
  try {
    const result = await coinMarketAPI.getGasPrice();
    
    if (isApiError(result)) {
      logWarning(`Could not get gas price: ${result.message}`);
      if (result.details && typeof result.details === 'object' && 'missingApiKey' in result.details) {
        console.log('  API key issue detected. Check your environment variables.');
      }
    } else {
      // We know result is a string now
      // Convert from hex to decimal and from wei to gwei
      const gasPriceHex = result.startsWith('0x') ? result : `0x${result}`;
      const gasPriceWei = parseInt(gasPriceHex, 16);
      const gasPriceGwei = gasPriceWei / 1e9;
      
      logSuccess(`Current gas price: ${gasPriceGwei.toFixed(2)} Gwei`);
    }
  } catch (error) {
    logError('Error getting gas price', error);
  }
  
  logSubheader('Token Transactions');
  try {
    const transactions = await coinMarketAPI.getTokenTransactions(TEST_ADDRESS);
    
    if (isApiError(transactions)) {
      logWarning(`Could not get transactions: ${transactions.message}`);
    } else if (Array.isArray(transactions) && transactions.length > 0) {
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
  console.log('\n🚀 CoinMarketAPI Fixed Test Suite');
  console.log('===========================');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Environment check
  console.log('\nEnvironment Variables:');
  console.log(`- COINAPI_KEY: ${process.env.COINAPI_KEY ? '✅ Present' : '❌ Missing'}`);
  console.log(`- ETHERSCAN_API_KEY: ${process.env.ETHERSCAN_API_KEY ? '✅ Present' : '❌ Missing'}`);
  
  // Explicitly log the API key length
  if (process.env.ETHERSCAN_API_KEY) {
    console.log(`  Etherscan API Key Length: ${process.env.ETHERSCAN_API_KEY.length} characters`);
    if (process.env.ETHERSCAN_API_KEY.trim() === '') {
      console.log('  ⚠️ Warning: The Etherscan API key appears to be empty.');
    }
  }
  
  await testPriceData();
  await testBlockchainData();
  
  console.log('\n✨ All tests completed! ✨');
}

runTests().catch(error => {
  console.error('Fatal error in test script:', error);
  process.exit(1);
});
