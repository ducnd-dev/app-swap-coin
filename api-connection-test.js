// Simple API test script 
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Test Etherscan API
async function testEtherscanAPI() {
  console.log('\n========== Testing Etherscan API ==========');
  
  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
  if (!ETHERSCAN_API_KEY) {
    console.log('❌ ETHERSCAN_API_KEY not found in environment variables');
    return false;
  }
  
  console.log(`✅ ETHERSCAN_API_KEY found (length: ${ETHERSCAN_API_KEY.length})`);
  
  try {
    const response = await axios.get('https://api.etherscan.io/api', {
        headers: {
          'Content-Type': 'application/json',
        'Content-Encoding': 'br, gzip',

        },
      params: {
        module: 'proxy',
        action: 'eth_gasPrice',
        apikey: ETHERSCAN_API_KEY
      },
      timeout: 10000
    });
    
    if (response.data.result) {
      const gasPrice = parseInt(response.data.result, 16);
      const gasPriceGwei = gasPrice / 1e9;
      console.log(`✅ Successfully connected to Etherscan API`);
      console.log(`  Current gas price: ${gasPriceGwei.toFixed(2)} Gwei`);
      return true;
    } else if (response.data.error) {
      console.log(`❌ Etherscan API error: ${response.data.error.message}`);
      return false;
    } else {
      console.log('❌ Unexpected response format from Etherscan API');
      console.log(response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Failed to connect to Etherscan API');
    console.log(`  Error: ${error.message}`);
    return false;
  }
}

// Test CoinAPI
async function testCoinAPI() {
  console.log('\n========== Testing CoinAPI ==========');
  
  const COINAPI_KEY = process.env.COINAPI_KEY;
  if (!COINAPI_KEY) {
    console.log('❌ COINAPI_KEY not found in environment variables');
    return false;
  }
  
  console.log(`✅ COINAPI_KEY found (length: ${COINAPI_KEY.length})`);
  
  try {
    const response = await axios.get('https://rest.coinapi.io/v1/exchangerate/BTC/USD', {
      headers: {
        'X-CoinAPI-Key': COINAPI_KEY
      },
      timeout: 10000
    });
    
    if (response.data && response.data.rate) {
      console.log(`✅ Successfully connected to CoinAPI`);
      console.log(`  BTC/USD rate: $${response.data.rate.toFixed(2)}`);
      return true;
    } else {
      console.log('❌ Unexpected response format from CoinAPI');
      console.log(response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Failed to connect to CoinAPI');
    console.log(`  Error: ${error.message}`);
    if (error.response) {
      console.log(`  Status: ${error.response.status}`);
      console.log(`  Response: ${JSON.stringify(error.response.data)}`);
    }
    return false;
  }
}

// Run the tests
async function runTests() {
  console.log('🔍 API Connection Test');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const etherscanResult = await testEtherscanAPI();
  const coinAPIResult = await testCoinAPI();
  
  console.log('\n========== Test Results ==========');
  console.log(`Etherscan API: ${etherscanResult ? '✅ Connected' : '❌ Failed'}`);
  console.log(`CoinAPI: ${coinAPIResult ? '✅ Connected' : '❌ Failed'}`);
  
  if (etherscanResult && coinAPIResult) {
    console.log('\n✨ All APIs connected successfully! ✨');
  } else {
    console.log('\n⚠️ Some API connections failed. Check the logs above for details.');
  }
}

// Execute
runTests().catch(error => {
  console.error('Unhandled error in test script:', error);
  process.exit(1);
});
