'use client';

import SwapWidget from '@/app/components/swap/SwapWidget';

export default function SwapPage() {
  return (
    <main className="container mx-auto p-4 md:p-8 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Swap Tokens</h1>
          <p className="text-gray-600">
            Exchange tokens at the best rates with our decentralized swap platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {/* Swap widget */}
          <div className="md:col-span-3">
            <SwapWidget />
          </div>
          
          {/* Info sidebar */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-semibold mb-4">About Swapping</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">How it works</h3>
                  <p className="text-gray-600 text-sm">
                    Token swaps are executed through smart contracts that find the best prices 
                    across multiple liquidity sources.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Price Information</h3>
                  <p className="text-gray-600 text-sm">
                    All prices are provided by Chainlink oracles and updated in real-time.
                    The swap rates include a 0.3% fee that is distributed to liquidity providers.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Trading Pairs</h3>
                  <p className="text-gray-600 text-sm">
                    We support swapping between any two tokens by routing through our liquidity pools.
                    Popular pairs like ETH/USDT have higher liquidity and lower slippage.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800 flex gap-2 items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <p>
                    Always verify token symbols and prices before confirming a swap.
                    The exchange rate may fluctuate due to market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
