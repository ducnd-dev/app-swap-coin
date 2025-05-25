'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import axiosClient from '@/app/lib/api/axios';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { useTokens, Token } from '@/app/contexts/TokenContext';
import { useTokenOperations } from '@/app/hooks/useTokenOperations';
import { useWeb3 } from '@/app/contexts/Web3Context';
import { useWeb3Swap } from '@/app/hooks/useWeb3Swap';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Web3TransactionStatus from '@/app/components/web3/Web3TransactionStatus';
import Web3TransactionConfirmation from '@/app/components/web3/Web3TransactionConfirmation';
import { ethers } from 'ethers';

// ERC20 ABI for token balance checks
const ERC20_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)'
];

interface Wallet {
  id: string;
  address: string;
  name?: string;
  type: string;
  isDefault: boolean;
}

interface SwapInterfaceProps {
  wallet: Wallet | null;
  onSwapComplete: () => void;
}

// Define Web3 quote interface
interface Web3QuoteResult {
  toAmount: string;
  priceImpact: string;
  error?: string;
}

export default function SwapInterface({ wallet, onSwapComplete }: SwapInterfaceProps) {  // Context and hooks
  const { t } = useLanguage();
  const { tokens, popularTokens, tokenPrices } = useTokens();
  const { getSwapQuote, getTokenPrice } = useTokenOperations();
  const { isConnected, address, networkName } = useWeb3();
  const { getSwapQuote: getWeb3SwapQuote, executeSwap, isLoading: isSwapLoading, txHash } = useWeb3Swap();

  // State variables
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isFromTokenSelectOpen, setIsFromTokenSelectOpen] = useState<boolean>(false);
  const [isToTokenSelectOpen, setIsToTokenSelectOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // We're actually using setIsQuoteLoading, but ESLint doesn't recognize it
  // Keeping isQuoteLoading for potential future use
  const [, setIsQuoteLoading] = useState<boolean>(false);
  const [fromSearchQuery, setFromSearchQuery] = useState<string>('');
  const [toSearchQuery, setToSearchQuery] = useState<string>('');  const [filteredFromTokens, setFilteredFromTokens] = useState<Token[]>([]);
  const [filteredToTokens, setFilteredToTokens] = useState<Token[]>([]);
  
  // Using constants instead of state since the setters aren't used in active code
  // This eliminates the ESLint warnings while preserving the UI behavior
  const isFromSearchLoading = false;
  const isToSearchLoading = false;
  // We're using setError function but not reading error directly
  // It might be displayed elsewhere in the component
  const [, setError] = useState<string | null>(null);
  const [swapButtonState, setSwapButtonState] = useState<'disabled' | 'ready' | 'confirm' | 'loading'>('disabled');
  const [useWeb3Wallet, setUseWeb3Wallet] = useState<boolean>(false);
  const [web3Quote, setWeb3Quote] = useState<Web3QuoteResult | null>(null);
  const [web3TokenBalances, setWeb3TokenBalances] = useState<{[key: string]: string}>({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  // isBalanceFetching is set but never read - we'll keep the setter
  const [, setIsBalanceFetching] = useState<boolean>(false);
  const [estimatedGasFee, setEstimatedGasFee] = useState<string | null>(null);

  // Set default tokens on component mount
  useEffect(() => {
    if (popularTokens.length >= 2) {
      // Usually ETH and USDT would be good defaults
      const ethToken = popularTokens.find((t: Token) => t.symbol === 'ETH');
      const usdtToken = popularTokens.find((t: Token) => t.symbol === 'USDT');
      
      if (ethToken && !fromToken) setFromToken(ethToken);
      if (usdtToken && !toToken) setToToken(usdtToken);
    }
  }, [popularTokens, fromToken, toToken]);

  // Initialize filtered tokens
  useEffect(() => {
    setFilteredFromTokens(tokens);
    setFilteredToTokens(tokens);
  }, [tokens]);

  // Handle from token filtering with debounce
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (fromSearchQuery.trim() === '') {
        setFilteredFromTokens(tokens);
      } else {
        const query = fromSearchQuery.toLowerCase();
        const localResults = tokens.filter((token) => 
          token.name.toLowerCase().includes(query) || 
          token.symbol.toLowerCase().includes(query)
        );
        
        setFilteredFromTokens(localResults);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delaySearch);
  }, [fromSearchQuery, tokens]);

  // Handle to token filtering with debounce
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (toSearchQuery.trim() === '') {
        setFilteredToTokens(tokens);
      } else {
        const query = toSearchQuery.toLowerCase();
        const localResults = tokens.filter((token) => 
          token.name.toLowerCase().includes(query) || 
          token.symbol.toLowerCase().includes(query)
        );
        
        setFilteredToTokens(localResults);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delaySearch);
  }, [toSearchQuery, tokens]);
  // Effect for checking if swap can be performed
  useEffect(() => {
    if (fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0 && toAmount) {
      if ((wallet) || (useWeb3Wallet && isConnected && address)) {
        setSwapButtonState('ready');
      } else {
        setSwapButtonState('disabled');
      }
    } else {
      setSwapButtonState('disabled');
    }
  }, [fromToken, toToken, fromAmount, toAmount, wallet, isConnected, address, useWeb3Wallet]);

  // Get swap quote when inputs change
  useEffect(() => {
    const getQuote = async () => {
      if (!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) <= 0) {
        setToAmount('');
        return;
      }

      try {
        setIsQuoteLoading(true);
        setError(null);

        // Use web3 quote if user has a connected Web3 wallet
        if (isConnected && address && useWeb3Wallet) {
          const web3Quote = await getWeb3SwapQuote(fromToken, toToken, fromAmount, slippage);
          
          if (web3Quote.error) {
            setError(web3Quote.error);
            setToAmount('');
          } else {
            setToAmount(web3Quote.toAmount);
            setWeb3Quote(web3Quote);
            setError(null);
          }
        } else {
          // Use API quote
          const quote = await getSwapQuote(fromToken.id, toToken.id, fromAmount, slippage);
          
          if (quote.error) {
            setError(quote.error);
            setToAmount('');
          } else {
            setToAmount(quote.toAmount);
            setError(null);
          }
        }      } catch (error) {
        console.error('Error getting quote:', error);
        setError(error instanceof Error ? error.message : 'Failed to get quote');
        setToAmount('');
      } finally {
        setIsQuoteLoading(false);
      }
    };

    // Debounce the quote request
    const handler = setTimeout(() => {
      getQuote();
    }, 500);

    return () => clearTimeout(handler);
  }, [fromToken, toToken, fromAmount, slippage, getSwapQuote, isConnected, address, useWeb3Wallet, getWeb3SwapQuote]);

  // Swap tokens function
  // const swapTokens = () => {
  //   const temp = fromToken;
  //   setFromToken(toToken);
  //   setToToken(temp);
  //   setFromAmount(toAmount);
  //   // Quote will be recalculated by the useEffect
  // };
  // Execute swap function
  const executeSwapTransaction = async () => {
    if ((!fromToken || !toToken || !fromAmount || !toAmount) || 
        (!wallet && !(isConnected && address))) {
      toast.error(t('swap.fill_all_fields'));
      return;
    }

    try {
      setIsLoading(true);
      setSwapButtonState('loading');
      setError(null);
      setIsConfirmationOpen(false); // Close confirmation dialog

      // Use Web3 swap if connected to a wallet
      if (isConnected && address && useWeb3Wallet) {
        // Check balance first if connected to Web3 wallet
        if (fromToken && web3TokenBalances[fromToken.symbol]) {
          const userBalance = parseFloat(web3TokenBalances[fromToken.symbol]);
          const amountToSwap = parseFloat(fromAmount);
          
          if (userBalance < amountToSwap) {
            toast.error(t('web3.insufficient_balance'));
            setIsLoading(false);
            setSwapButtonState('ready');
            return;
          }
        }

        const result = await executeSwap({
          fromToken,
          toToken,
          amount: fromAmount,
          slippage
        });

        if (result) {
          toast.success(
            <div className="flex flex-col">
              <span>{t('web3.transaction_success')}</span>
              <span className="text-xs text-blue-300">{`${fromAmount} ${fromToken.symbol} → ${toAmount} ${toToken.symbol}`}</span>
            </div>,
            { duration: 5000 }
          );
          
          // Re-fetch balances to display updated values
          await fetchWeb3TokenBalance(fromToken.contractAddress || '', fromToken.symbol);
          await fetchWeb3TokenBalance(toToken.contractAddress || '', toToken.symbol);
          
          onSwapComplete();
        } else {
          // Transaction failed or was rejected
          toast.error(t('web3.transaction_failed'));
        }
      } else {
        // Use API swap for non-Web3 wallets
        await axiosClient.post('/api/swap/execute', {
          fromToken: fromToken.symbol,
          toToken: toToken.symbol,
          fromAmount,
          toAmount,
          walletAddress: wallet?.address,
          slippage
        });

        toast.success(t('swap.success'));
        onSwapComplete();
      }
      
      // Reset form
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Error executing swap:', error);
      const errorMessage = error instanceof Error ? error.message : t('swap.error');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setSwapButtonState('ready');
    }
  };

  // Use a ref to cache search results
  // const searchCache = useCallback(() => {
  //   const cache = new Map<string, Token[]>();
    
  //   return {
  //     get: (key: string): Token[] | undefined => cache.get(key.toLowerCase()),
  //     set: (key: string, results: Token[]) => {
  //       // Only cache if we have results and key is significant
  //       if (results.length > 0 && key.length >= 3) {
  //         cache.set(key.toLowerCase(), results);
  //       }
  //       return results;
  //     },
  //     has: (key: string): boolean => cache.has(key.toLowerCase())
  //   };
  // }, [])();
  
  // Search for tokens - combining local filtering with API search for better results
  // const handleFromSearch = useCallback(async (query: string) => {
  //   setFromSearchQuery(query);
    
  //   // For longer queries, use the API to get more accurate results
  //   if (query.length >= 3) {
  //     setIsFromSearchLoading(true);
  //     try {
  //       // Check cache first
  //       if (searchCache.has(query)) {
  //         setFilteredFromTokens(searchCache.get(query) || []);
  //         setIsFromSearchLoading(false);
  //         return;
  //       }
        
  //       const results = await searchTokens(query);
  //       if (results && results.length > 0) {
  //         // Combine API results with local filtered results for better matching
  //         const localResults = tokens.filter((token) => 
  //           token.name.toLowerCase().includes(query.toLowerCase()) || 
  //           token.symbol.toLowerCase().includes(query.toLowerCase())
  //         );
          
  //         // Create a Map of IDs to avoid duplicates
  //         const uniqueResults = new Map();
          
  //         // Prioritize API results
  //         results.forEach(token => uniqueResults.set(token.id, token));
          
  //         // Add local results that aren't already included
  //         localResults.forEach(token => {
  //           if (!uniqueResults.has(token.id)) {
  //             uniqueResults.set(token.id, token);
  //           }
  //         });
          
  //         const finalResults = Array.from(uniqueResults.values());
  //         // Cache the results
  //         searchCache.set(query, finalResults);
  //         setFilteredFromTokens(finalResults);
  //       }
  //     } catch (error) {
  //       console.error("Error searching tokens:", error);
  //       // Fallback to local filtering in case of API error
  //       const q = query.toLowerCase();
  //       const localResults = tokens.filter((token) => 
  //         token.name.toLowerCase().includes(q) || 
  //         token.symbol.toLowerCase().includes(q)
  //       );
  //       setFilteredFromTokens(localResults);
  //     } finally {
  //       setIsFromSearchLoading(false);
  //     }
  //   }
  //   // For short queries, the useEffect will handle local filtering
  // }, [searchTokens, tokens, searchCache]);
  
  // const handleToSearch = useCallback(async (query: string) => {
  //   setToSearchQuery(query);
    
  //   // For longer queries, use the API to get more accurate results
  //   if (query.length >= 3) {
  //     setIsToSearchLoading(true);
  //     try {
  //       // Check cache first
  //       if (searchCache.has(query)) {
  //         setFilteredToTokens(searchCache.get(query) || []);
  //         setIsToSearchLoading(false);
  //         return;
  //       }
        
  //       const results = await searchTokens(query);
  //       if (results && results.length > 0) {
  //         // Combine API results with local filtered results for better matching
  //         const localResults = tokens.filter((token) => 
  //           token.name.toLowerCase().includes(query.toLowerCase()) || 
  //           token.symbol.toLowerCase().includes(query.toLowerCase())
  //         );
          
  //         // Create a Map of IDs to avoid duplicates
  //         const uniqueResults = new Map();
          
  //         // Prioritize API results
  //         results.forEach(token => uniqueResults.set(token.id, token));
          
  //         // Add local results that aren't already included
  //         localResults.forEach(token => {
  //           if (!uniqueResults.has(token.id)) {
  //             uniqueResults.set(token.id, token);
  //           }
  //         });
          
  //         const finalResults = Array.from(uniqueResults.values());
  //         // Cache the results
  //         searchCache.set(query, finalResults);
  //         setFilteredToTokens(finalResults);
  //       }
  //     } catch (error) {
  //       console.error("Error searching tokens:", error);
  //       // Fallback to local filtering in case of API error
  //       const q = query.toLowerCase();
  //       const localResults = tokens.filter((token) => 
  //         token.name.toLowerCase().includes(q) || 
  //         token.symbol.toLowerCase().includes(q)
  //       );
  //       setFilteredToTokens(localResults);
  //     } finally {
  //       setIsToSearchLoading(false);
  //     }
  //   }
  //   // For short queries, the useEffect will handle local filtering
  // }, [searchTokens, tokens, searchCache]);

  // Effect for loading token prices for selected tokens
  useEffect(() => {
    const fetchSelectedTokenPrices = async () => {
      if (fromToken && !tokenPrices[fromToken.id]) {
        try {
          await getTokenPrice(fromToken.id, fromToken.symbol);
        } catch (error) {
          console.error(`Failed to fetch price for ${fromToken.symbol}:`, error);
        }
      }
      
      if (toToken && !tokenPrices[toToken.id]) {
        try {
          await getTokenPrice(toToken.id, toToken.symbol);
        } catch (error) {
          console.error(`Failed to fetch price for ${toToken.symbol}:`, error);
        }
      }
    };
    
    fetchSelectedTokenPrices();
  }, [fromToken, toToken, tokenPrices, getTokenPrice]);

  // Function to fetch token balance for a specific address and token
  const fetchWeb3TokenBalance = useCallback(async (tokenAddress: string, tokenSymbol: string) => {
    if (!isConnected || !address) return "0";
    
    setIsBalanceFetching(true);
    try {      // Handle native token (ETH, BNB, etc.)
      if (!tokenAddress || tokenAddress === "0x0000000000000000000000000000000000000000") {
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
        const balance = await provider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);
        
        setWeb3TokenBalances(prev => ({
          ...prev,
          [tokenSymbol]: formattedBalance
        }));
        
        setIsBalanceFetching(false);
        return formattedBalance;
      }
      
      // Handle ERC20 tokens
      const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      
      // Fetch balance, decimals, and symbol
      const [balance, decimals] = await Promise.all([
        contract.balanceOf(address),
        contract.decimals()
      ]);
      
      // Convert balance to human-readable format
      const formattedBalance = ethers.utils.formatUnits(balance, decimals);
      
      setWeb3TokenBalances(prev => ({
        ...prev,
        [tokenSymbol]: formattedBalance
      }));
      
      setIsBalanceFetching(false);
      return formattedBalance;
    } catch (error) {
      console.error(`Failed to fetch balance for ${tokenSymbol}:`, error);
      setIsBalanceFetching(false);
      return "0";
    }
  }, [isConnected, address]);

  // Update balances when tokens or Web3 connection state changes
  useEffect(() => {
    if (isConnected && address && useWeb3Wallet) {
      if (fromToken) {
        fetchWeb3TokenBalance(fromToken.contractAddress || '', fromToken.symbol);
      }
      if (toToken) {
        fetchWeb3TokenBalance(toToken.contractAddress || '', toToken.symbol);
      }
    }
  }, [fromToken, toToken, isConnected, address, useWeb3Wallet, fetchWeb3TokenBalance]);
  // Format token balance for display
  const formatBalance = useCallback((balance: string | undefined) => {
    if (!balance) return "0.00";
    
    const floatBalance = parseFloat(balance);
    if (floatBalance < 0.000001) {
      return "<0.000001";
    }
    
    if (floatBalance < 0.001) {
      return floatBalance.toFixed(6);
    }
    
    return floatBalance.toFixed(4);
  }, []);

  // Estimate gas for the swap
  const estimateGas = useCallback(async () => {
    if (!isConnected || !address || !fromToken || !toToken || !fromAmount || !networkName) return;
    
    try {
      // This is a placeholder for real gas estimation
      // In a real app, you would call the contract's estimateGas method
      const gasPrice = "0.000025"; // Example gas price in ETH/GWEI
      const gasLimit = Math.floor(Math.random() * 50000) + 150000; // Random between 150k-200k
      
      const tokenSymbol = networkName === 'bsc' ? 'BNB' : 
                         networkName === 'polygon' ? 'MATIC' : 'ETH';
      
      const estimatedFee = parseFloat(gasPrice) * gasLimit / 1e9;
      setEstimatedGasFee(`~${estimatedFee.toFixed(6)} ${tokenSymbol}`);
    } catch (error) {
      console.error("Error estimating gas:", error);
      setEstimatedGasFee(null);
    }
  }, [fromToken, toToken, fromAmount, isConnected, address, networkName]);

  // Update gas estimation when relevant inputs change
  useEffect(() => {
    if (useWeb3Wallet && fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0) {
      estimateGas();
    } else {
      setEstimatedGasFee(null);
    }
  }, [fromToken, toToken, fromAmount, useWeb3Wallet, estimateGas]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md">      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{t('swap.swap_tokens')}</h2>
        
        {isConnected && address && (
          <div className="flex items-center space-x-3">
            {networkName && (
              <div className={`px-3 py-1 rounded-full text-xs font-medium 
                ${networkName === 'ethereum' ? 'bg-blue-100 text-blue-800' : 
                  networkName === 'bsc' ? 'bg-yellow-100 text-yellow-800' : 
                  networkName === 'polygon' ? 'bg-purple-100 text-purple-800' : 
                  'bg-gray-100 text-gray-800'}`}
              >
                {networkName.charAt(0).toUpperCase() + networkName.slice(1)}
              </div>
            )}
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer mr-2">
                <input 
                  type="checkbox" 
                  checked={useWeb3Wallet} 
                  className="sr-only peer"
                  onChange={() => setUseWeb3Wallet(prev => !prev)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm font-medium text-gray-700">{t('web3.use_wallet')}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4">{/* From Token Section */}
        <div>
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700 mb-1">{t('swap.from_token')}</label>
            {isConnected && address && useWeb3Wallet && fromToken && web3TokenBalances[fromToken.symbol] && (
              <div className="text-sm text-gray-600 mb-1">
                {t('swap.balance')}: {formatBalance(web3TokenBalances[fromToken.symbol])}
              </div>
            )}
          </div>
          <div className="flex items-center border rounded-md shadow-sm">
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 p-2 text-lg border-transparent rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isConnected && address && useWeb3Wallet && fromToken && web3TokenBalances[fromToken.symbol] && (
              <button
                onClick={() => setFromAmount(web3TokenBalances[fromToken.symbol])}
                className="px-2 mx-1 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                MAX
              </button>
            )}
            <button
              onClick={() => setIsFromTokenSelectOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              {fromToken ? fromToken.symbol : t('swap.select_token')}
            </button>          </div>
        </div>
        
        {/* Swap direction button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
              setFromAmount(toAmount);
            }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label={t('swap.swap_direction')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10l5 5 5-5"/>
              <path d="M7 14l5-5 5 5"/>
            </svg>
          </button>
        </div>

        {/* To Token Section */}
        <div>
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700 mb-1">{t('swap.to_token')}</label>
            {isConnected && address && useWeb3Wallet && toToken && web3TokenBalances[toToken.symbol] && (
              <div className="text-sm text-gray-600 mb-1">
                {t('swap.balance')}: {formatBalance(web3TokenBalances[toToken.symbol])}
              </div>
            )}
          </div>
          <div className="flex items-center border rounded-md shadow-sm">
            <input
              type="text"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 p-2 text-lg border-transparent rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
            <button
              onClick={() => setIsToTokenSelectOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              {toToken ? toToken.symbol : t('swap.select_token')}
            </button>
          </div>
        </div>

        {/* Swap Info Section */}
        <div className="p-4 bg-gray-50 rounded-md border">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{t('swap.price_impact')}:</span>
            <span className="font-medium text-gray-700">{web3Quote && web3Quote.priceImpact ? `${web3Quote.priceImpact}%` : '-'}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{t('swap.slippage')}:</span>
            <span className="font-medium text-gray-700">{slippage}%</span>
          </div>          <div className="flex justify-between text-sm text-gray-500">
            <span>{t('swap.estimated_gas_fee')}:</span>
            <span className="font-medium text-gray-700">
              {estimatedGasFee !== null ? estimatedGasFee : '-'}
            </span>
          </div>
        </div>        {/* Swap Button */}
        <div>
          <button
            onClick={() => {
              if (isConnected && useWeb3Wallet) {
                setIsConfirmationOpen(true); // Show confirmation for Web3 swaps
              } else {
                executeSwapTransaction(); // Execute directly for non-Web3 swaps
              }
            }}
            disabled={swapButtonState !== 'ready'}
            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none transition-all flex items-center justify-center ${
              swapButtonState === 'ready'
                ? 'bg-blue-500 hover:bg-blue-600'
                : swapButtonState === 'loading'
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {swapButtonState === 'loading' ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                  />
                </svg>
                {t('swap.swapping')}
              </>
            ) : (
              isConnected && useWeb3Wallet ? t('swap.review_swap') : t('swap.swap')
            )}
          </button>
        </div>
      </div>

      {/* Token Selection Dialogs */}
      <Dialog open={isFromTokenSelectOpen} onOpenChange={setIsFromTokenSelectOpen}>
        <DialogContent className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle>{t('swap.select_from_token')}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <input
              type="text"
              value={fromSearchQuery}
              onChange={(e) => setFromSearchQuery(e.target.value)}
              placeholder={t('swap.search_token')}
              className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mt-4 max-h-60 overflow-y-auto">
            {isFromSearchLoading ? (
              <div className="flex items-center justify-center py-4">
                <svg
                  className="animate-spin h-5 w-5 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                  />
                </svg>
              </div>
            ) : (
              filteredFromTokens.length > 0 ? (                filteredFromTokens.map((token) => (
                  <div
                    key={token.id}
                    onClick={() => {
                      setFromToken(token);
                      setIsFromTokenSelectOpen(false);
                    }}
                    className="flex items-center justify-between p-2 my-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <Image
                        src={token.logoURI || token.icon || `/icons/placeholder-token.svg`}
                        alt={token.symbol}
                        width={24}
                        height={24}
                        className="rounded-full"                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          (e.target as HTMLImageElement).src = '/icons/placeholder-token.svg';
                        }}
                      />
                      <span className="ml-2 font-medium">{token.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{token.symbol}</span>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">
                  {t('swap.no_tokens_found')}
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isToTokenSelectOpen} onOpenChange={setIsToTokenSelectOpen}>
        <DialogContent className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle>{t('swap.select_to_token')}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <input
              type="text"
              value={toSearchQuery}
              onChange={(e) => setToSearchQuery(e.target.value)}
              placeholder={t('swap.search_token')}
              className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mt-4 max-h-60 overflow-y-auto">
            {isToSearchLoading ? (
              <div className="flex items-center justify-center py-4">
                <svg
                  className="animate-spin h-5 w-5 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                  />
                </svg>
              </div>
            ) : (
              filteredToTokens.length > 0 ? (                filteredToTokens.map((token) => (
                  <div
                    key={token.id}
                    onClick={() => {
                      setToToken(token);
                      setIsToTokenSelectOpen(false);
                    }}
                    className="flex items-center justify-between p-2 my-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <Image
                        src={token.logoURI || token.icon || `/icons/placeholder-token.svg`}
                        alt={token.symbol}
                        width={24}
                        height={24}
                        className="rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/icons/placeholder-token.svg';
                        }}
                      />
                      <span className="ml-2 font-medium">{token.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{token.symbol}</span>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">
                  {t('swap.no_tokens_found')}
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle>{t('swap.settings')}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('swap.slippage')}</label>
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(Math.max(0, Math.min(50, parseFloat(e.target.value))))}
              className="w-full p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="50"
              step="0.1"
            />
            <p className="mt-1 text-sm text-gray-500">{t('swap.slippage_info')}</p>
          </div>
        </DialogContent>
      </Dialog>      {/* Transaction Status Toast */}
      <div>
        <Web3TransactionStatus 
          txHash={txHash} 
          isPending={isSwapLoading} 
          message={isSwapLoading 
            ? t('web3.transaction_pending')
            : txHash 
              ? t('web3.transaction_complete') 
              : ''
          }
        />
      </div>

      {/* Web3 Transaction Confirmation Dialog */}
      <Web3TransactionConfirmation 
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={executeSwapTransaction}
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={fromAmount}
        toAmount={toAmount}
        priceImpact={web3Quote?.priceImpact || '0'}
        slippage={slippage}
        networkName={networkName}
        isLoading={isLoading || isSwapLoading}
        gasFee={estimatedGasFee || undefined}
      />
    </div>
  );
}
