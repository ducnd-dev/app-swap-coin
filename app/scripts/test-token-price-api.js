// API test script to verify token price endpoint
import { get } from 'axios';

// Get the base URL from environment or use default localhost
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Test the token price endpoint
async function testTokenPriceAPI() {
  console.log('\n========== Testing Token Price API ==========');
  
  // Test successful case with symbol parameter
  try {
    console.log('Testing with symbol parameter (BTC)...');
    const response = await get(`${BASE_URL}/api/tokens/price`, {
      params: { symbol: 'BTC' }
    });
    
    if (response.data && response.data.price) {
      console.log('✅ API returned price successfully');
      console.log(`  BTC price: $${response.data.price.toFixed(2)}`);
      console.log(`  Token data: ${JSON.stringify(response.data.token)}`);
      return true;
    } else {
      console.log('❌ API response missing price data');
      console.log(response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Failed to get price with symbol parameter');
    if (error.response) {
      console.log(`  Status: ${error.response.status}`);
      console.log(`  Response: ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`  Error: ${error.message}`);
    }
    return false;
  }
}

// Test the token price endpoint with days parameter for historical data
async function testHistoricalPriceAPI() {
  console.log('\n========== Testing Historical Price API ==========');
  
  try {
    console.log('Testing with symbol and days parameters (ETH, 7 days)...');
    const response = await get(`${BASE_URL}/api/tokens/price`, {
      params: { 
        symbol: 'ETH',
        days: 7
      }
    });
    
    if (response.data && response.data.history && response.data.history.length > 0) {
      console.log('✅ API returned historical data successfully');
      console.log(`  Data points: ${response.data.history.length}`);
      console.log(`  First data point: ${JSON.stringify(response.data.history[0])}`);
      return true;
    } else {
      console.log('❌ API response missing historical data');
      console.log(response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Failed to get historical price data');
    if (error.response) {
      console.log(`  Status: ${error.response.status}`);
      console.log(`  Response: ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`  Error: ${error.message}`);
    }
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('🔍 Token Price API Test');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const priceTestResult = await testTokenPriceAPI();
  const historicalTestResult = await testHistoricalPriceAPI();
  
  console.log('\n========== Test Results ==========');
  console.log(`Token Price API: ${priceTestResult ? '✅ Working' : '❌ Failed'}`);
  console.log(`Historical Price API: ${historicalTestResult ? '✅ Working' : '❌ Failed'}`);
  
  if (priceTestResult && historicalTestResult) {
    console.log('\n✨ All API tests passed! ✨');
  } else {
    console.log('\n⚠️ Some API tests failed. Check the logs above for details.');
  }
}

// Execute
runTests().catch(error => {
  console.error('Unhandled error in test script:', error);
  process.exit(1);
});
