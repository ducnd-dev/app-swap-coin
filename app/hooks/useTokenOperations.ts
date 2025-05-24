'use client';

import { useState, useCallback } from 'react';
import axiosClient from '@/app/lib/api/axios';
import { Token } from '@/app/contexts/TokenContext';

interface TokenPrice {
  tokenId: string;
  price: number;
  change24h: number;
  lastUpdated: string;
}

export const useTokenOperations = () => {
  const [tokenPrices, setTokenPrices] = useState<Record<string, TokenPrice>>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<string | null>(null);
  // Get price for a specific token
  const getTokenPrice = useCallback(async (tokenId: string, tokenSymbol?: string): Promise<number | null> => {
    try {
      setIsLoadingPrices(true);
      setPriceError(null);
      
      // Check if we have a recent price (less than 1 minute old)
      const cachedPrice = tokenPrices[tokenId];
      const now = new Date();
      if (cachedPrice && new Date(cachedPrice.lastUpdated).getTime() > now.getTime() - 60000) {
        return cachedPrice.price;
      }
      
      // Use the token symbol if provided, otherwise use tokenId
      const response = await axiosClient.get('/api/tokens/price', {
        params: tokenSymbol ? { symbol: tokenSymbol } : { tokenId }
      });
      
      const priceData = response.data;
      
      // Update the token prices state
      setTokenPrices(prev => ({
        ...prev,
        [tokenId]: {
          tokenId,
          price: priceData.price,
          change24h: priceData.change24h || 0,
          lastUpdated: now.toISOString()
        }
      }));
      
      return priceData.price;
    } catch (error) {
      console.error(`Error fetching price for token ID ${tokenId}:`, error);
      setPriceError(`Failed to fetch price for token`);
      return null;
    } finally {
      setIsLoadingPrices(false);
    }
  }, [tokenPrices]);

  // Search for tokens
  const searchTokens = useCallback(async (query: string): Promise<Token[]> => {
    if (!query || query.trim() === '') {
      return [];
    }    try {
      const response = await axiosClient.get('/api/tokens/search', {
        params: { q: query }
      });
      return response.data.tokens;
    } catch (error) {
      console.error('Error searching tokens:', error);
      return [];
    }
  }, []);  // Get swap quote
  const getSwapQuote = useCallback(async (
    fromTokenId: string, 
    toTokenId: string, 
    amount: string, 
    slippage: number = 0.5
  ) => {
    try {
      // We need to pass token IDs - the API needs to be updated to handle IDs
      // This is a workaround until the API is fixed
      const response = await axiosClient.get('/api/swap/quote', {
        params: {
          fromToken: fromTokenId,
          toToken: toTokenId,
          amount,
          slippage
        }
      });
      
      return {
        fromAmount: response.data.fromAmount,
        toAmount: response.data.toAmount,
        rate: response.data.rate,
        priceImpact: response.data.priceImpact,
        gasFee: response.data.gasFee,
        error: null
      };    } catch (error: unknown) {
      console.error('Error getting swap quote:', error);
      let errorMessage = 'Failed to get swap quote';
      
      if (error && typeof error === 'object' && 'response' in error && 
          error.response && typeof error.response === 'object' && 
          'data' in error.response && error.response.data && 
          typeof error.response.data === 'object' && 'error' in error.response.data) {
        errorMessage = error.response.data.error as string;
      }
      
      return {
        fromAmount: '',
        toAmount: '',
        rate: 0,
        priceImpact: 0,
        gasFee: '0',
        error: errorMessage
      };
    }
  }, []);

  return {
    tokenPrices,
    isLoadingPrices,
    priceError,
    getTokenPrice,
    searchTokens,
    getSwapQuote
  };
};
