// Test script for swap rate calculation
const { simulateSwap } = require('./app/lib/blockchain/ethereum');
const { prisma } = require('./app/lib/utils/prisma');

// Mock the prisma token functions since we're running outside the normal app context
jest.mock('./app/lib/utils/prisma', () => ({
  prisma: {
    token: {
      findUnique: jest.fn((args) => {
        // Mock token data based on the queried symbol
        const tokens = {
          ETH: { symbol: 'ETH', name: 'Ethereum', network: 'ETH', decimals: 18 },
          USDC: { symbol: 'USDC', name: 'USD Coin', network: 'ETH', decimals: 6 },
          BTC: { symbol: 'BTC', name: 'Bitcoin', network: 'BTC', decimals: 8 }
        };
        
        const symbol = args.where.symbol;
        return Promise.resolve(tokens[symbol] || null);
      })
    }
  }
}));

// Mock the getTokenPrice function to return consistent values for testing
jest.mock('./app/lib/api/prices', () => ({
  getTokenPrice: (symbol) => {
    const prices = {
      ETH: 3000,
      USDC: 1,
      BTC: 50000
    };
    return Promise.resolve(prices[symbol] || 100);
  }
}));

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
