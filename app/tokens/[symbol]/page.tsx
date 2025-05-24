'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTokens } from '@/app/contexts/TokenContext';
import TokenPriceChart from '@/app/components/tokens/TokenPriceChart';
import LoadingState from '@/app/components/ui/loading-state';
import { CoinMarketAPI } from '@/app/lib/api/coin-market.fixed';
import BackButton from '@/app/components/ui/back-button';

interface ExtendedTokenData {
  marketCap?: number;
  volume24h?: number;
  allTimeHigh?: number;
  allTimeHighDate?: string;
  circulatingSupply?: number;
  totalSupply?: number;
  maxSupply?: number;
  priceChange: {
    '1h'?: number;
    '24h'?: number;
    '7d'?: number;
    '30d'?: number;
    '1y'?: number;
  };
  description?: string;
  websites?: string[];
  explorer?: string;
  isLoading: boolean;
  error?: string;
  rank?: number;
}

export default function TokenDetailPage() {
  const params = useParams();
  const symbol = params?.symbol as string;
  const { tokens, tokenPrices } = useTokens();
  const [days, setDays] = useState<number>(7);
  const [tokenData, setTokenData] = useState<ExtendedTokenData>({
    priceChange: {},
    isLoading: true
  });
  const [relatedTokens, setRelatedTokens] = useState<string[]>([]);

  // Find the token from context
  const token = tokens.find(t => t.symbol.toLowerCase() === symbol?.toLowerCase());
  const tokenPrice = token ? tokenPrices[token.id] : null;

  useEffect(() => {
    if (!token) return;

    const fetchExtendedTokenData = async () => {
      try {
        setTokenData(prev => ({ ...prev, isLoading: true }));
        
        // Create a new API instance
        const api = new CoinMarketAPI();
        
        // Fetch extended token data
        const marketData = await api.getTokenMarketData(token.symbol);
        if ('error' in marketData) {
          throw new Error(marketData.message);
        }
        
        // Fetch price changes for different periods
        const hourlyChange = await api.getTokenPriceChange(token.symbol, 1 / 24);
        const weeklyChange = await api.getTokenPriceChange(token.symbol, 7);
        const monthlyChange = await api.getTokenPriceChange(token.symbol, 30);
        const yearlyChange = await api.getTokenPriceChange(token.symbol, 365);
        
        // Get related tokens (tokens in the same category)
        const relatedTokensData = await api.getRelatedTokens(token.symbol);
        
        setRelatedTokens(Array.isArray(relatedTokensData) ? relatedTokensData.slice(0, 5) : []);
        
        setTokenData({
          marketCap: marketData.marketCap,
          volume24h: marketData.volume24h,
          allTimeHigh: marketData.allTimeHigh,
          allTimeHighDate: marketData.allTimeHighDate,
          circulatingSupply: marketData.circulatingSupply,
          totalSupply: marketData.totalSupply,
          maxSupply: marketData.maxSupply,
          description: marketData.description,
          websites: marketData.websites,
          explorer: marketData.explorer,
          rank: 10, // Giả định rank hoặc có thể lấy từ API nếu có
          priceChange: {
            '1h': hourlyChange !== null ? hourlyChange : undefined,
            '24h': tokenPrice?.change24h,
            '7d': weeklyChange !== null ? weeklyChange : undefined,
            '30d': monthlyChange !== null ? monthlyChange : undefined,
            '1y': yearlyChange !== null ? yearlyChange : undefined
          },
          isLoading: false
        });
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        setTokenData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch token data'
        }));
      }
    };

    fetchExtendedTokenData();
  }, [token, tokenPrice?.change24h]);  if (!token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Token Not Found</h1>
        <p>The token with symbol {symbol} was not found in our database.</p>
        <BackButton href="/tokens" label="Back to Token List" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton href="/tokens" label="Back to Token List" variant="primary" />
      
      {/* Token Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          {token.icon && (
            <Image src={token.icon} alt={token.symbol} width={48} height={48} className="mr-3" />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{token.name} ({token.symbol})</h1>
            <p className="text-gray-500">#{tokenData.rank || 'N/A'} Rank</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">${tokenPrice?.price.toLocaleString() || '-.--'}</div>
          {tokenPrice?.change24h && (
            <div className={`text-lg ${tokenPrice.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {tokenPrice.change24h >= 0 ? '↑' : '↓'} {tokenPrice.change24h.toFixed(2)}%
            </div>
          )}
        </div>
      </div>
      
      {/* Price Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">Price Chart</h2>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setDays(1)}
              className={`px-3 py-1 rounded-md ${days === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              1D
            </button>
            <button 
              onClick={() => setDays(7)}
              className={`px-3 py-1 rounded-md ${days === 7 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              1W
            </button>
            <button 
              onClick={() => setDays(30)}
              className={`px-3 py-1 rounded-md ${days === 30 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              1M
            </button>
            <button 
              onClick={() => setDays(90)}
              className={`px-3 py-1 rounded-md ${days === 90 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              3M
            </button>
            <button 
              onClick={() => setDays(365)}
              className={`px-3 py-1 rounded-md ${days === 365 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              1Y
            </button>
          </div>
        </div>
        {/* Bỏ thuộc tính height để tránh lỗi TypeScript */}
        <TokenPriceChart symbol={token.symbol} days={days} />
      </div>
      
      {/* Market Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Price Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Price Statistics</h2>
          
          <LoadingState status={tokenData.isLoading ? 'loading' : tokenData.error ? 'error' : 'success'} errorText={tokenData.error}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Current Price</span>
                <span className="font-medium">${tokenPrice?.price.toLocaleString() || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">All Time High</span>
                <span className="font-medium">${tokenData.allTimeHigh?.toLocaleString() || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">ATH Date</span>
                <span className="font-medium">
                  {tokenData.allTimeHighDate 
                    ? new Date(tokenData.allTimeHighDate).toLocaleDateString() 
                    : 'N/A'}
                </span>
              </div>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              <h3 className="font-medium mb-3">Price Change</h3>
              
              <div className="flex justify-between">
                <span className="text-gray-500">1 Hour</span>
                <span className={tokenData.priceChange['1h'] !== undefined ? 
                  (tokenData.priceChange['1h']! >= 0 ? 'text-green-600' : 'text-red-600') : ''}>
                  {tokenData.priceChange['1h'] !== undefined 
                    ? `${tokenData.priceChange['1h']! >= 0 ? '+' : ''}${tokenData.priceChange['1h']!.toFixed(2)}%` 
                    : 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">24 Hours</span>
                <span className={tokenData.priceChange['24h'] !== undefined ? 
                  (tokenData.priceChange['24h']! >= 0 ? 'text-green-600' : 'text-red-600') : ''}>
                  {tokenData.priceChange['24h'] !== undefined 
                    ? `${tokenData.priceChange['24h']! >= 0 ? '+' : ''}${tokenData.priceChange['24h']!.toFixed(2)}%` 
                    : 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">7 Days</span>
                <span className={tokenData.priceChange['7d'] !== undefined ? 
                  (tokenData.priceChange['7d']! >= 0 ? 'text-green-600' : 'text-red-600') : ''}>
                  {tokenData.priceChange['7d'] !== undefined 
                    ? `${tokenData.priceChange['7d']! >= 0 ? '+' : ''}${tokenData.priceChange['7d']!.toFixed(2)}%` 
                    : 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">30 Days</span>
                <span className={tokenData.priceChange['30d'] !== undefined ? 
                  (tokenData.priceChange['30d']! >= 0 ? 'text-green-600' : 'text-red-600') : ''}>
                  {tokenData.priceChange['30d'] !== undefined 
                    ? `${tokenData.priceChange['30d']! >= 0 ? '+' : ''}${tokenData.priceChange['30d']!.toFixed(2)}%` 
                    : 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">1 Year</span>
                <span className={tokenData.priceChange['1y'] !== undefined ? 
                  (tokenData.priceChange['1y']! >= 0 ? 'text-green-600' : 'text-red-600') : ''}>
                  {tokenData.priceChange['1y'] !== undefined 
                    ? `${tokenData.priceChange['1y']! >= 0 ? '+' : ''}${tokenData.priceChange['1y']!.toFixed(2)}%` 
                    : 'N/A'}
                </span>
              </div>
            </div>
          </LoadingState>
        </div>
        
        {/* Market Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Market Stats</h2>
          
          <LoadingState status={tokenData.isLoading ? 'loading' : tokenData.error ? 'error' : 'success'} errorText={tokenData.error}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Market Cap</span>
                <span className="font-medium">
                  ${tokenData.marketCap?.toLocaleString() || 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">24h Volume</span>
                <span className="font-medium">
                  ${tokenData.volume24h?.toLocaleString() || 'N/A'}
                </span>
              </div>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Circulating Supply</span>
                <span className="font-medium">
                  {tokenData.circulatingSupply?.toLocaleString() || 'N/A'} {token.symbol}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Total Supply</span>
                <span className="font-medium">
                  {tokenData.totalSupply?.toLocaleString() || 'N/A'} {token.symbol}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Max Supply</span>
                <span className="font-medium">
                  {tokenData.maxSupply?.toLocaleString() || 'Unlimited'} {token.symbol}
                </span>
              </div>
              
              {tokenData.circulatingSupply && tokenData.totalSupply && (
                <div className="mt-3">
                  <label className="text-gray-500 text-sm mb-1 block">Circulating / Total Supply</label>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, (tokenData.circulatingSupply / tokenData.totalSupply) * 100)}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>
          </LoadingState>
        </div>
        
        {/* Info & Links */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Info & Links</h2>
          
          <LoadingState status={tokenData.isLoading ? 'loading' : tokenData.error ? 'error' : 'success'} errorText={tokenData.error}>
            <div className="space-y-4">
              {tokenData.description && (
                <div>
                  <h3 className="font-medium mb-2">About {token.name}</h3>
                  <p className="text-gray-700 text-sm line-clamp-4">{tokenData.description}</p>
                  <button className="text-blue-600 text-sm mt-1">Read More</button>
                </div>
              )}
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              <div>
                <h3 className="font-medium mb-2">Links</h3>
                <div className="space-y-2">
                  {tokenData.websites?.map((website, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                      </svg>
                      <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {website.replace(/^https?:\/\//, '').split('/')[0]}
                      </a>
                    </div>
                  ))}
                  
                  {tokenData.explorer && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
                      </svg>
                      <a href={tokenData.explorer} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Blockchain Explorer
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </LoadingState>
        </div>
      </div>
      
      {/* Related Tokens */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Related Tokens</h2>
        
        <LoadingState status={tokenData.isLoading ? 'loading' : tokenData.error ? 'error' : 'success'} errorText={tokenData.error}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {relatedTokens.length > 0 ? relatedTokens.map(symbol => {
              const relatedToken = tokens.find(t => t.symbol === symbol);
              const relatedPrice = relatedToken ? tokenPrices[relatedToken.id] : null;
              
              return (
                <Link href={`/tokens/${symbol}`} key={symbol}>
                  <div className="p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center mb-2">
                      {relatedToken?.icon && (
                        <Image src={relatedToken.icon} alt={symbol} width={24} height={24} className="mr-2" />
                      )}
                      <h3 className="font-medium">{relatedToken?.name || symbol}</h3>
                    </div>
                    <div className="text-lg font-semibold">
                      ${relatedPrice?.price.toLocaleString() || '-.--'}
                    </div>
                    {relatedPrice?.change24h && (
                      <div className={`text-sm ${relatedPrice.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {relatedPrice.change24h >= 0 ? '+' : ''}{relatedPrice.change24h.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </Link>
              );
            }) : (
              <p className="col-span-full text-gray-500">No related tokens found</p>
            )}
          </div>
        </LoadingState>
      </div>
    </div>
  );
}
