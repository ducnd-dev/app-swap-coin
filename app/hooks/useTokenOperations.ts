'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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
  const getTokenPrice = useCallback(async (tokenId: string): Promise<number | null> => {
    try {
      setIsLoadingPrices(true);
      setPriceError(null);
      
      // Check if we have a recent price (less than 1 minute old)
      const cachedPrice = tokenPrices[tokenId];
      const now = new Date();
      if (cachedPrice && new Date(cachedPrice.lastUpdated).getTime() > now.getTime() - 60000) {
        return cachedPrice.price;
      }
      
      const response = await axios.get('/api/tokens/price', {
        params: { tokenId }
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
    }

    try {
      const response = await axios.get('/api/tokens/search', {
        params: { query }
      });
      return response.data.tokens;
    } catch (error) {
      console.error('Error searching tokens:', error);
      return [];
    }
  }, []);

  // Get swap quote
  const getSwapQuote = useCallback(async (
    fromTokenId: string, 
    toTokenId: string, 
    amount: string, 
    slippage: number = 0.5
  ) => {
    try {
      const response = await axios.get('/api/swap/quote', {
        params: {
          fromTokenId,
          toTokenId,
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
      };
    } catch (error: any) {
      console.error('Error getting swap quote:', error);
      return {
        fromAmount: '',
        toAmount: '',
        rate: 0,
        priceImpact: 0,
        gasFee: '0',
        error: error.response?.data?.error || 'Failed to get swap quote'
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
