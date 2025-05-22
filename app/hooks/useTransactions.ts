'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export interface Transaction {
  id: string;
  fromToken: {
    id: string;
    symbol: string;
    name: string;
    icon?: string;
  };
  toToken: {
    id: string;
    symbol: string;
    name: string;
    icon?: string;
  };
  fromAmount: string;
  toAmount: string;
  rate: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  txHash?: string;
  walletAddress: string;
  isSimulated: boolean;
  createdAt: string;
}

interface UseTransactionsOptions {
  refreshInterval?: number | null;
  filter?: 'all' | 'real' | 'simulated';
}

interface TransactionsResponse {
  transactions: Transaction[];
  totalCount: number;
}

export const useTransactions = (options: UseTransactionsOptions = {}) => {
  const { refreshInterval = null, filter = 'all' } = options;
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchTransactions = useCallback(async (pageToFetch = page, refresh = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get<TransactionsResponse>('/api/transactions', {
        params: {
          page: pageToFetch,
          limit,
          filter: filter !== 'all' ? filter : undefined
        }
      });
      
      const newTransactions = response.data.transactions;
      setTotalCount(response.data.totalCount || newTransactions.length);
      
      if (refresh || pageToFetch === 1) {
        setTransactions(newTransactions);
      } else {
        setTransactions(prev => [...prev, ...newTransactions]);
      }
      
      // Check if there are more transactions to load
      setHasMore(newTransactions.length === limit);
      
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transaction history');
      toast.error('Failed to load transaction history');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, filter]);

  // Initial fetch
  useEffect(() => {
    fetchTransactions(1, true);
  }, [filter]);

  // Set up refresh interval if provided
  useEffect(() => {
    if (!refreshInterval) return;
    
    const interval = setInterval(() => {
      fetchTransactions(1, true);
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval, fetchTransactions]);

  // Function to load more transactions
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTransactions(nextPage);
    }
  }, [isLoading, hasMore, page, fetchTransactions]);

  // Function to refresh transactions
  const refresh = useCallback(() => {
    setPage(1);
    return fetchTransactions(1, true);
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refresh,
    filter,
  };
};
