/**
 * Test script for token price API endpoint
 * Run with: node app/scripts/test-token-price-api-simple.js
 */
import { request } from 'http';

// Function to make a GET request
function httpGet(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (data) {
            const parsedData = JSON.parse(data);
            resolve({ statusCode: res.statusCode, data: parsedData });
          } else {
            reject(new Error('No data received'));
          }
        } catch (e) {
          reject(new Error(`Error parsing response: ${e.message}, raw data: ${data}`));
        }
      });
    });
    
    req.on('error', (e) => {
      reject(new Error(`Request error: ${e.message}`));
    });
    
    req.end();
  });
}

// Test the token price endpoint with symbol
async function testSymbolPrice() {
  console.log('\n========== Testing Token Price API with symbol ==========');
  try {
    const result = await httpGet('/api/tokens/price?symbol=BTC');
    
    console.log(`Status code: ${result.statusCode}`);
    console.log('Response:');
    console.log(JSON.stringify(result.data, null, 2));
    
    if (result.statusCode === 200 && result.data.price) {
      console.log('✅ Success: Got BTC price');
      return true;
    } else {
      console.log('❌ Failed: Response did not contain price data');
      return false;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

// Test the token price endpoint with tokenId
async function testTokenIdPrice() {
  console.log('\n========== Testing Token Price API with tokenId ==========');
  try {
    const result = await httpGet('/api/tokens/price?tokenId=btc-123');
    
    console.log(`Status code: ${result.statusCode}`);
    console.log('Response:');
    console.log(JSON.stringify(result.data, null, 2));
    
    if (result.statusCode === 200 && result.data.price) {
      console.log('✅ Success: Got price for tokenId btc-123');
      return true;
    } else {
      console.log('❌ Failed: Response did not contain price data');
      return false;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('🔍 Running Token Price API Tests');
  console.log(`Server: http://localhost:3000`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const symbolResult = await testSymbolPrice();
  const tokenIdResult = await testTokenIdPrice();
  
  console.log('\n========== Test Results ==========');
  console.log(`Symbol Price Test: ${symbolResult ? '✅ Passed' : '❌ Failed'}`);
  console.log(`TokenId Price Test: ${tokenIdResult ? '✅ Passed' : '❌ Failed'}`);
  
  if (symbolResult && tokenIdResult) {
    console.log('\n✨ All tests passed! The API is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. The API needs attention.');
  }
}

// Execute tests
runTests().catch(error => {
  console.error('Unhandled error:', error);
});
