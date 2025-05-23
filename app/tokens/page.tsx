'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTokens } from '@/app/contexts/TokenContext';
import TokenPriceChart from '@/app/components/tokens/TokenPriceChart';

export default function TokenDetailPage() {
  const { tokens, tokenPrices } = useTokens();
  const [selectedToken, setSelectedToken] = useState<string>('BTC');
  const [days, setDays] = useState<number>(7);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Token Prices</h1>
      
      <div className="mb-6">
        <label htmlFor="token-select" className="block text-sm font-medium mb-2">
          Select Token
        </label>
        <div className="flex gap-4">
          <select
            id="token-select"
            className="block w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            {tokens.map((token) => (
              <option key={token.id} value={token.symbol}>
                {token.name} ({token.symbol})
              </option>
            ))}
          </select>
          
          <select
            id="period-select"
            className="block w-32 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={1}>1 Day</option>
            <option value={7}>7 Days</option>
            <option value={30}>30 Days</option>
            <option value={90}>90 Days</option>
          </select>
          
          <Link
            href={`/tokens/${selectedToken}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            View {selectedToken} Details
          </Link>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <TokenPriceChart symbol={selectedToken} days={days} />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Popular Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens
            .filter((token) => ['BTC', 'ETH', 'USDT', 'BNB', 'USDC'].includes(token.symbol))
            .map((token) => {
              const tokenPrice = tokenPrices[token.id];
              return (
                <Link 
                  href={`/tokens/${token.symbol}`}
                  key={token.id} 
                  className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center mb-2">
                    {token.icon && (
                      <Image src={token.icon} alt={token.symbol} width={32} height={32} className="mr-2" />
                    )}
                    <h3 className="font-medium">{token.name} ({token.symbol})</h3>
                  </div>
                  <div className="text-lg font-semibold">
                    ${tokenPrice?.price.toLocaleString() || '-.--'}
                  </div>
                  {tokenPrice?.change24h && (
                    <div className={`text-sm ${tokenPrice.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tokenPrice.change24h >= 0 ? '+' : ''}{tokenPrice.change24h.toFixed(2)}%
                    </div>
                  )}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
