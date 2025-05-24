// Component hiển thị giá token từ Oracle nội bộ
'use client';

import { RefreshCw } from 'lucide-react';
import { useOraclePrices } from '@/app/hooks/useOraclePrices';

interface OraclePriceDisplayProps {
  symbols?: string[]; 
  refreshInterval?: number; 
  showTitle?: boolean; 
  showSource?: boolean;
  className?: string;
}

export default function OraclePriceDisplay({
  symbols = ['ETH', 'BTC', 'USDT'],
  refreshInterval = 60000,
  showTitle = true,
  showSource = true,
  className = '',
}: OraclePriceDisplayProps) {
  const { priceList, isLoading, error, lastUpdated, fetchPrices } = useOraclePrices({
    symbols,
    refreshInterval,
  });
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 100 ? 4 : 2,
    }).format(price);
  };
  
  const formatUpdated = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString();
  };
  
  const getPriceChangeColor = (change: number): string => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-400';
  };
  
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg p-4 ${className}`}>
      {showTitle && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Giá Token Từ Oracle</h2>
          <button
            onClick={() => fetchPrices()}
            disabled={isLoading}
            className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RefreshCw size={14} className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </button>
        </div>
      )}
      
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3 text-red-300">
          {error}
        </div>
      )}
      <div className="space-y-4">
          {priceList.map((token) => (
            <div key={token.symbol} className="bg-gray-700/70 rounded-md p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mr-2 text-white">
                  {token.symbol.substring(0, 1)}
                </div>
                <div>
                  <div className="font-semibold text-white">{token.symbol}</div>
                  {showSource && (
                    <div className="text-xs text-gray-400">
                      Nguồn: {token.source === 'chainlink' ? 'Chainlink Oracle' : 'Dữ liệu giả'}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-white">{formatPrice(token.price)}</div>
                <div className={`text-sm ${getPriceChangeColor(token.change24h)}`}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
          
          {lastUpdated && (
            <div className="text-right text-xs text-gray-400 mt-2">
              Cập nhật lúc: {formatUpdated(lastUpdated)}
            </div>
          )}
          
          {isLoading && priceList.length === 0 && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
      </div>
    </div>
  );
}
