// Test script for Oracle Price API endpoint
import { getTokenPriceFromChainlink } from '../services/blockchain/price-oracle-service';
import { getOraclePrices, getTokenOraclePrice } from '../lib/api/oracle-price-api';

async function testOraclePriceAPI() {
  console.log('🚀 Test API Oracle Price');
  try {
    console.log('1. Checking connection to Chainlink Oracle (backend service)...');
    const ethPrice = await getTokenPriceFromChainlink('ETH');
    console.log(`✅ ETH Price: $${ethPrice.price}`);
    console.log(`   Source: ${ethPrice.source}`);
    console.log(`   Last Updated: ${new Date(ethPrice.lastUpdated).toLocaleString()}`);
    console.log(`   24h Change: ${ethPrice.change24h}%`);    
    
    console.log('\n2. Testing the API client...');
    const tokenResponse = await getTokenOraclePrice('BTC');
    console.log(`✅ BTC Price via API client: $${tokenResponse.price}`);
    
    const multiResponse = await getOraclePrices(['ETH', 'USDT']);
    console.log(`✅ API client returned ${multiResponse.prices.length} prices`);
    console.log(`   USDT Price: $${multiResponse.prices.find(p => p.symbol === 'USDT')?.price}`);
    console.log(`   Performance: ${multiResponse.performance.status}`);
    
    console.log('\n3. Test successful!');
    console.log('Conclusion: Oracle Price API is working well and can be used in the UI.');
      } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run test
testOraclePriceAPI()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
