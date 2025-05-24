// Hook để sử dụng Oracle giá
'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';

interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  lastUpdated: string;
  source: string;
}

interface UseOraclePricesOptions {
  symbols?: string[];
  refreshInterval?: number;
  initialFetch?: boolean;
}

export const useOraclePrices = (options?: UseOraclePricesOptions) => {
  const symbols = useMemo(() => options?.symbols || ['ETH', 'BTC', 'USDT'], [options?.symbols]);
  const refreshInterval = options?.refreshInterval || 60000;
  const initialFetch = options?.initialFetch !== undefined ? options.initialFetch : true;
  
  const [prices, setPrices] = useState<Record<string, TokenPrice>>({});
  const [isLoading, setIsLoading] = useState<boolean>(initialFetch);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const fetchPrices = useCallback(async (retryCount = 0) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const symbolsParam = symbols.join(',');
      const response = await axios.get(`/api/tokens/oracle-price?symbols=${symbolsParam}`, {
        timeout: 8000, // 8 giây timeout
      });
      
      if (response.data && response.data.prices) {
        const newPrices: Record<string, TokenPrice> = {};
        response.data.prices.forEach((price: TokenPrice) => {
          newPrices[price.symbol] = price;
        });
        
        // Tính số lượng nguồn dữ liệu
        const chainlinkCount = response.data.prices.filter(
          (price: TokenPrice) => price.source === 'chainlink'
        ).length;
        
        // Nếu không có dữ liệu từ Chainlink, cảnh báo người dùng
        if (chainlinkCount === 0 && response.data.prices.length > 0) {
          console.warn('Đang sử dụng dữ liệu giả thay vì Chainlink Oracle');
          setError('Cảnh báo: Đang sử dụng dữ liệu giả');
        } else {
          setError(null);
        }
        
        setPrices(newPrices);
        setLastUpdated(new Date().toISOString());
      }
    } catch (err) {
      console.error('Lỗi khi lấy giá từ Oracle:', err);
      
      // Thử lại tối đa 2 lần nếu lấy giá thất bại
      if (retryCount < 2) {
        console.log(`Thử lại lần ${retryCount + 1}...`);
        setTimeout(() => fetchPrices(retryCount + 1), 1000 * (retryCount + 1));
        return;
      }
      
      setError('Không thể lấy dữ liệu giá');
    } finally {
      setIsLoading(false);
    }
  }, [symbols]);
  
  useEffect(() => {
    if (initialFetch) {
      fetchPrices();
    }
    
    if (refreshInterval > 0) {
      const intervalId = setInterval(fetchPrices, refreshInterval);
      
      return () => clearInterval(intervalId);
    }
  }, [fetchPrices, initialFetch, refreshInterval]);
  
  const getPrice = useCallback((symbol: string): TokenPrice | null => {
    const normalizedSymbol = symbol.toUpperCase();
    return prices[normalizedSymbol] || null;
  }, [prices]);
  
  return {
    prices,     
    priceList: Object.values(prices),
    isLoading,  
    error,      
    lastUpdated, 
    fetchPrices,
    getPrice,
  };
};
