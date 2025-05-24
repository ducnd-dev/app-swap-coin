'use client';

import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import axiosClient from '@/app/lib/api/axios';
import { toast } from 'react-hot-toast';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  icon?: string;
  contractAddress?: string;
  decimals: number;
  network: string;
  isActive: boolean;
}

interface TokenPrice {
  tokenId: string;
  price: number;
  change24h: number;
  lastUpdated: string;
}

interface TokenContextType {
  tokens: Token[];
  popularTokens: Token[];
  tokenPrices: Record<string, TokenPrice>;
  isLoading: boolean;
  error: string | null;
  fetchTokens: () => Promise<void>;
  fetchTokenPrice: (tokenId: string) => Promise<number | null>;
  searchTokens: (query: string) => Promise<Token[]>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [popularTokens, setPopularTokens] = useState<Token[]>([]);
  const [tokenPrices, setTokenPrices] = useState<Record<string, TokenPrice>>({});  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Function to fetch price for a specific token - wrapped in useCallback
  const fetchTokenPrice = useCallback(async (tokenId: string): Promise<number | null> => {
    try {
      // Find the token symbol if available in our state
      const token = tokens.find((t: Token) => t.id === tokenId);
      
      const response = await axiosClient.get('/api/tokens/price', {
        params: token?.symbol ? { symbol: token.symbol } : { tokenId }
      });
      
      const priceData = response.data;
      
      // Update the token prices state
      setTokenPrices(prev => ({
        ...prev,
        [tokenId]: {
          tokenId,
          price: priceData.price,
          change24h: priceData.change24h || 0,
          lastUpdated: new Date().toISOString()
        }
      }));
      
      return priceData.price;
    } catch (error) {
      console.error(`Error fetching price for token ID ${tokenId}:`, error);
      return null;
    }
  }, [tokens]); // Adding tokens as a dependency since we use it in the function
  // Function to fetch supported tokens (wrapped in useCallback)
  const fetchTokens = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axiosClient.get('/api/tokens/search');
      const fetchedTokens = response.data.tokens;
      setTokens(fetchedTokens);
      
      // Set popular tokens (typically top market cap or most traded)
      const popular = fetchedTokens.filter((t: Token) => 
        ['BTC', 'ETH', 'USDT', 'BNB', 'USDC'].includes(t.symbol)
      );
      setPopularTokens(popular);
      
      // Fetch prices for popular tokens
      for (const token of popular) {
        fetchTokenPrice(token.id);
      }

    } catch (error) {
      console.error('Error fetching tokens:', error);
      setError('Failed to load supported tokens');
      toast.error('Failed to load supported tokens');
    } finally {
      setIsLoading(false);
    }
  }, [fetchTokenPrice]);  // Added fetchTokenPrice as a dependency since it's used in this callback

  // Fetch tokens on initial load
  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  // Function to search tokens by name or symbol
  const searchTokens = async (query: string): Promise<Token[]> => {
    if (!query || query.trim() === '') {
      return tokens;
    }

    try {
      const response = await axiosClient.get('/api/tokens/search', {
        params: { query }
      });
      return response.data.tokens;
    } catch (error) {
      console.error('Error searching tokens:', error);
      return [];
    }
  };

  const value = {
    tokens,
    popularTokens,
    tokenPrices,
    isLoading,
    error,
    fetchTokens,
    fetchTokenPrice,
    searchTokens,
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};
