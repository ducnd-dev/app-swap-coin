'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAvailableTokens, Token } from '@/app/lib/api/oracle-price-api';

interface UseTokenListOptions {
  includePopular?: boolean;
  includeStablecoins?: boolean;
  autoFetch?: boolean;
}

export default function useTokenList(options: UseTokenListOptions = {}) {
  const {
    includePopular = true, 
    includeStablecoins = true,
    autoFetch = true
  } = options;
  
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchTokens = useCallback(async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getAvailableTokens({
        includePopular,
        includeStablecoins,
        timeout: 5000
      });
      
      if (response && response.tokens) {
        setTokens(response.tokens);
        setLastUpdated(response.timestamp);
      }
    } catch (err) {
      console.error('Error fetching token list:', err);
      
      // Retry up to 2 times on failure
      if (retryCount < 2) {
        console.log(`Retrying token list fetch, attempt ${retryCount + 1}...`);
        setTimeout(() => fetchTokens(retryCount + 1), 1000 * (retryCount + 1));
        return;
      }
      
      setError('Failed to fetch token list');
    } finally {
      setIsLoading(false);
    }
  }, [includePopular, includeStablecoins]);
  
  useEffect(() => {
    if (autoFetch) {
      fetchTokens();
    }
  }, [fetchTokens, autoFetch]);
  
  const popularTokens = tokens.filter(token => token.isPopular);
  const stablecoins = tokens.filter(token => token.isStablecoin);
  
  const getTokenBySymbol = useCallback((symbol: string): Token | undefined => {
    return tokens.find(token => token.symbol.toUpperCase() === symbol.toUpperCase());
  }, [tokens]);
  
  return {
    tokens,
    popularTokens,
    stablecoins,
    isLoading,
    error,
    lastUpdated,
    fetchTokens,
    getTokenBySymbol
  };
}
