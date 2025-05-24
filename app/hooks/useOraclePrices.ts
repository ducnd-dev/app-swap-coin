// Hook to use the Oracle pricing system
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
      
      const symbolsParam = symbols.join(',');      const response = await axios.get(`/api/tokens/oracle-price?symbols=${symbolsParam}`, {
        timeout: 8000, // 8 seconds timeout
      });
      
      if (response.data && response.data.prices) {
        const newPrices: Record<string, TokenPrice> = {};
        response.data.prices.forEach((price: TokenPrice) => {
          newPrices[price.symbol] = price;
        });
          // Calculate the number of data sources
        const chainlinkCount = response.data.prices.filter(
          (price: TokenPrice) => price.source === 'chainlink'
        ).length;
        
        // If there is no data from Chainlink, warn the user
        if (chainlinkCount === 0 && response.data.prices.length > 0) {
          console.warn('Using mock data instead of Chainlink Oracle');
          setError('Warning: Using mock data');
        } else {
          setError(null);
        }
        
        setPrices(newPrices);
        setLastUpdated(new Date().toISOString());
      }    } catch (err) {
      console.error('Error retrieving prices from Oracle:', err);
      
      // Retry up to 2 times if price retrieval fails
      if (retryCount < 2) {
        console.log(`Retrying attempt ${retryCount + 1}...`);
        setTimeout(() => fetchPrices(retryCount + 1), 1000 * (retryCount + 1));
        return;
      }
      
      setError('Unable to retrieve price data');
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
