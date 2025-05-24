// File: app/test-swap-rate.js
// Simple test to verify the token swap rate calculation

// Fix the import paths for Next.js
import { simulateSwap } from '@/app/lib/blockchain/ethereum';

async function testSwapRate() {
  console.log("🧪 Testing swap rate calculation...");
  
  try {
    // Test ETH to USDC swap (expect rate around 3000)
    const result1 = await simulateSwap('ETH', 'USDC', '1');
    console.log(`\n📊 ETH to USDC swap result:`);
    console.log(`- From amount: ${result1.fromAmount} ETH`);
    console.log(`- To amount: ${result1.toAmount} USDC`);
    console.log(`- Rate: 1 ETH = ${result1.rate} USDC`);
    console.log(`- Is rate correct? ${result1.rate >= 2000 ? '✅ Yes' : '❌ No, should be around 3000'}`);
    
    // Test USDC to ETH swap (expect rate around 0.00033)
    const result2 = await simulateSwap('USDC', 'ETH', '3000');
    console.log(`\n📊 USDC to ETH swap result:`);
    console.log(`- From amount: ${result2.fromAmount} USDC`);
    console.log(`- To amount: ${result2.toAmount} ETH`);
    console.log(`- Rate: 1 USDC = ${result2.rate} ETH`);
    console.log(`- Is rate correct? ${result2.rate <= 0.001 ? '✅ Yes' : '❌ No, should be around 0.00033'}`);
    
    // Test BTC to ETH swap
    const result3 = await simulateSwap('BTC', 'ETH', '1');
    console.log(`\n📊 BTC to ETH swap result:`);
    console.log(`- From amount: ${result3.fromAmount} BTC`);
    console.log(`- To amount: ${result3.toAmount} ETH`);
    console.log(`- Rate: 1 BTC = ${result3.rate} ETH`);
    
    console.log("\n🎯 Test completed!");
  } catch (error) {
    console.error("❌ Test failed with error:", error);
  }
}

testSwapRate();
