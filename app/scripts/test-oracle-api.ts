// Test script for Oracle Price API endpoint
import { getTokenPriceFromChainlink } from '../lib/blockchain/price-oracle';

async function testOraclePriceAPI() {
  console.log('🚀 Test API Oracle Price');
  try {
    console.log('1. Checking connection to Chainlink Oracle...');
    const ethPrice = await getTokenPriceFromChainlink('ETH') as { price: number; source: string; lastUpdated: string; change24h: number };
    console.log(`✅ ETH Price: $${ethPrice.price}`);
    console.log(`   Source: ${ethPrice.source}`);
    console.log(`   Last Updated: ${new Date(ethPrice.lastUpdated).toLocaleString()}`);
    console.log(`   24h Change: ${ethPrice.change24h}%`);    console.log('\n2. Checking other tokens...');
    const btcPrice = await getTokenPriceFromChainlink('BTC') as { price: number; source: string; lastUpdated: string; change24h: number };
    console.log(`✅ BTC Price: $${btcPrice.price}`);
    
    const usdtPrice = await getTokenPriceFromChainlink('USDT') as { price: number; source: string; lastUpdated: string; change24h: number };
    console.log(`✅ USDT Price: $${usdtPrice.price}`);
    
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
