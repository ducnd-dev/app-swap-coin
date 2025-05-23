'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, ReferenceLine, BarChart, Bar } from 'recharts';
import axiosClient from '@/app/lib/api/axios';
import LoadingState from '@/app/components/ui/loading-state';
import '@/app/styles/mobile-chart.css';

interface PriceData {
  time_period_start: string;
  price_close: number;
  price_open: number;
  price_high: number;
  price_low: number;
  volume_traded?: number;
  trades_count?: number;
  [key: string]: string | number | undefined;
}

interface MarketData {
  marketCap?: number;
  volume24h?: number;
  change24h?: number;
  change7d?: number;
  high24h?: number;
  low24h?: number;
  allTimeHigh?: number;
  allTimeHighDate?: string;
  rank?: number;
  supply?: {
    total?: number;
    circulating?: number;
    max?: number;
  }
}

interface TokenPriceChartProps {
  symbol: string;
  days?: number;
}

export default function TokenPriceChart({ symbol, days = 7 }: TokenPriceChartProps) {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [activeChart, setActiveChart] = useState<'price' | 'volume' | 'candlestick'>('price');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get(`/api/tokens/price`, {
          params: { symbol, days, includeMarketData: true }
        });
        
        if (response.data && response.data.history) {
          setPriceData(response.data.history);
        } else {
          setPriceData([]);
          setError('No historical price data available');
        }
        
        // Set market data if available
        if (response.data && response.data.marketData) {
          setMarketData(response.data.marketData);
        }
      } catch (err) {
        console.error('Error fetching token price history:', err);
        setError('Failed to load price data');
      } finally {
        setIsLoading(false);
      }
    };

    if (symbol) {
      fetchPriceData();
    }
  }, [symbol, days]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const formatValue = (value: number, isCurrency = true, precision = 2) => {
    if (value >= 1000000000) {
      return `${isCurrency ? '$' : ''}${(value / 1000000000).toFixed(precision)}B`;
    } else if (value >= 1000000) {
      return `${isCurrency ? '$' : ''}${(value / 1000000).toFixed(precision)}M`;
    } else if (value >= 1000) {
      return `${isCurrency ? '$' : ''}${(value / 1000).toFixed(precision)}K`;
    }
    return `${isCurrency ? '$' : ''}${value.toFixed(precision)}`;
  };

  // Render loading state
  if (isLoading) {
    return <LoadingState status="loading" loadingText="Loading price data..." size="md" />;
  }
  
  if (error) {
    return <LoadingState 
      status="error" 
      errorText={error || "Failed to load price data"} 
      retry={() => {
        setIsLoading(true);
        axiosClient.get(`/api/tokens/price`, {
          params: { symbol, days, includeMarketData: true }
        })
        .then(response => {
          if (response.data && response.data.history) {
            setPriceData(response.data.history);
            if (response.data.marketData) {
              setMarketData(response.data.marketData);
            }
            setError(null);
          }
        })
        .catch(err => {
          console.error('Error retrying price data fetch:', err);
          setError('Failed to load price data');
        })
        .finally(() => setIsLoading(false));
      }}
      size="md"
    />;
  }
  
  if (!priceData.length) {
    return <LoadingState status="empty" emptyText="No price data available for this token" size="md" />;
  }

  const data = priceData.map(item => ({
    date: formatDate(item.time_period_start),
    price: item.price_close,
    open: item.price_open,
    high: item.price_high,
    low: item.price_low,
    volume: item.volume_traded || 0,
  }));
  return (
    <div className="w-full mt-4">
      {/* Market data summary */}
      {marketData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mt-2 market-data-grid">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Market Cap</div>
            <div className="text-xl font-bold">{marketData.marketCap ? formatValue(marketData.marketCap) : 'N/A'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">24h Volume</div>
            <div className="text-xl font-bold">{marketData.volume24h ? formatValue(marketData.volume24h) : 'N/A'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">24h Change</div>
            <div className={`text-xl font-bold ${marketData.change24h && marketData.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {marketData.change24h ? `${marketData.change24h > 0 ? '+' : ''}${marketData.change24h.toFixed(2)}%` : 'N/A'}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">All Time High</div>
            <div className="text-xl font-bold">{marketData.allTimeHigh ? formatValue(marketData.allTimeHigh) : 'N/A'}</div>
            {marketData.allTimeHighDate && <div className="text-xs text-gray-500">{new Date(marketData.allTimeHighDate).toLocaleDateString()}</div>}
          </div>
        </div>
      )}
      
      {/* Chart type selector and time period selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 chart-actions">
        <h3 className="text-lg font-medium">{symbol} Chart ({days} days)</h3>
        <div className="flex flex-wrap gap-2">
          {/* Time period selector */}
          <div className="flex border rounded-md overflow-hidden text-xs time-periods">
            {[1, 7, 30, 90, 365].map((period) => (
              <button
                key={period}
                onClick={() => days !== period && (window.location.search = `?days=${period}&symbol=${symbol}`)}
                className={`px-2 py-1 ${days === period ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              >
                {period === 1 ? '1d' : period === 7 ? '1w' : period === 30 ? '1m' : period === 90 ? '3m' : '1y'}
              </button>
            ))}
          </div>
          
          {/* Chart type selector */}
          <div className="flex border rounded-md overflow-hidden text-xs sm:text-sm">
            <button 
              onClick={() => setActiveChart('price')}
              className={`px-2 sm:px-3 py-1 ${activeChart === 'price' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              Price
            </button>
            <button 
              onClick={() => setActiveChart('volume')}
              className={`px-2 sm:px-3 py-1 ${activeChart === 'volume' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              Volume
            </button>
            <button 
              onClick={() => setActiveChart('candlestick')}
              className={`px-2 sm:px-3 py-1 ${activeChart === 'candlestick' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              OHLC
            </button>
          </div>
        </div>
      </div>
      
      {/* Render different chart types based on selection */}
      <div className="chart-wrapper" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%" className="touch-pan-y">
          {activeChart === 'price' ? (
            <AreaChart
              data={data}
              margin={{ 
                top: 5, 
                right: 5,
                left: 0, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <ReferenceLine
                y={data.reduce((sum, item) => sum + item.price, 0) / data.length}
                stroke="#888"
                strokeDasharray="3 3"
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#4f46e5" 
                fill="#4f46e566" 
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          ) : activeChart === 'volume' ? (
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => formatValue(value, true, 0)} />
              <Tooltip 
                formatter={(value: number) => [formatValue(value, true), 'Volume']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar dataKey="volume" fill="#8884d8" name="Trading Volume" />
            </BarChart>
          ) : (
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="high" 
                stroke="#22c55e" 
                name="High"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#4f46e5" 
                name="Close"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="open" 
                stroke="#eab308" 
                name="Open"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="low" 
                stroke="#ef4444" 
                name="Low"
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      
      {/* Additional market stats */}
      {marketData?.supply && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h4 className="font-medium mb-2">Supply Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500">Circulating Supply</div>
              <div>{marketData?.supply?.circulating ? formatValue(marketData?.supply?.circulating || 0, false) : 'N/A'} {symbol}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Supply</div>
              <div>{marketData?.supply?.total ? formatValue(marketData?.supply?.total || 0, false) : 'N/A'} {symbol}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Max Supply</div>
              <div>{marketData?.supply?.max ? formatValue(marketData?.supply?.max || 0, false) : 'Unlimited'}</div>
            </div>
          </div>
          
          {marketData?.supply?.total && marketData?.supply?.circulating && (
            <div className="mt-3">
              <div className="text-sm text-gray-500 mb-1">Supply Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(100, ((marketData?.supply?.circulating || 0) / (marketData?.supply?.max || marketData?.supply?.total || 1)) * 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {(((marketData?.supply?.circulating || 0) / (marketData?.supply?.max || marketData?.supply?.total || 1)) * 100).toFixed(1)}% of {marketData?.supply?.max ? 'Max' : 'Total'} Supply
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
