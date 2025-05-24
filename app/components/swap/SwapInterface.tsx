'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowDown, RefreshCw, Settings, AlertCircle, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axiosClient from '@/app/lib/api/axios';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { useTokens, Token } from '@/app/contexts/TokenContext';
import { useTokenOperations } from '@/app/hooks/useTokenOperations';

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

export default function SwapInterface({ wallet, onSwapComplete }: SwapInterfaceProps) {
  // Context and hooks
  const { tokens, popularTokens, tokenPrices } = useTokens();
  const { searchTokens, getSwapQuote, getTokenPrice } = useTokenOperations();

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
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false);
  const [fromSearchQuery, setFromSearchQuery] = useState<string>('');
  const [toSearchQuery, setToSearchQuery] = useState<string>('');
  const [filteredFromTokens, setFilteredFromTokens] = useState<Token[]>([]);
  const [filteredToTokens, setFilteredToTokens] = useState<Token[]>([]);
  const [isFromSearchLoading, setIsFromSearchLoading] = useState<boolean>(false);
  const [isToSearchLoading, setIsToSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [swapButtonState, setSwapButtonState] = useState<'disabled' | 'ready' | 'confirm' | 'loading'>('disabled');

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
  }, [tokens]);  // Handle from token filtering with debounce - handle local filtering only when not using API
  useEffect(() => {
    // Skip if search is handled by handleFromSearch (for queries >= 3 chars)
    if (fromSearchQuery.length >= 3) {
      return; // handleFromSearch will handle this
    }
    
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
  // Handle to token filtering with debounce - handle local filtering only when not using API
  useEffect(() => {
    // Skip if search is handled by handleToSearch (for queries >= 3 chars)
    if (toSearchQuery.length >= 3) {
      return; // handleToSearch will handle this
    }
    
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
    if (fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0 && toAmount && wallet) {
      setSwapButtonState('ready');
    } else {
      setSwapButtonState('disabled');
    }
  }, [fromToken, toToken, fromAmount, toAmount, wallet]);

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
        
        const quote = await getSwapQuote(fromToken.id, toToken.id, fromAmount, slippage);
        
        if (quote.error) {
          setError(quote.error);
          setToAmount('');
        } else {
          setToAmount(quote.toAmount);
          setError(null);
        }
      } finally {
        setIsQuoteLoading(false);
      }
    };

    // Debounce the quote request
    const handler = setTimeout(() => {
      getQuote();
    }, 500);

    return () => clearTimeout(handler);
  }, [fromToken, toToken, fromAmount, slippage, getSwapQuote]);

  // Swap tokens function
  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    // Quote will be recalculated by the useEffect
  };

  // Execute swap function
  const executeSwap = async () => {
    if (!fromToken || !toToken || !fromAmount || !toAmount || !wallet) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setIsLoading(true);
      setSwapButtonState('loading');
      setError(null);
      
      await axiosClient.post('/api/swap/execute', {
        fromToken: fromToken.symbol,  // API expects symbol, not ID
        toToken: toToken.symbol,      // API expects symbol, not ID
        fromAmount,
        toAmount,
        walletAddress: wallet.address,
        slippage
      });

      toast.success('Swap executed successfully!');
      onSwapComplete();
      
      // Reset form
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Error executing swap:', error);
      const errorMessage = 'Failed to execute swap';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setSwapButtonState('ready');
    }
  };  // Use a ref to cache search results
  const searchCache = useCallback(() => {
    const cache = new Map<string, Token[]>();
    
    return {
      get: (key: string): Token[] | undefined => cache.get(key.toLowerCase()),
      set: (key: string, results: Token[]) => {
        // Only cache if we have results and key is significant
        if (results.length > 0 && key.length >= 3) {
          cache.set(key.toLowerCase(), results);
        }
        return results;
      },
      has: (key: string): boolean => cache.has(key.toLowerCase())
    };
  }, [])();
    // Search for tokens - combining local filtering with API search for better results
  const handleFromSearch = useCallback(async (query: string) => {
    setFromSearchQuery(query);
    
    // If query is empty, just show all tokens
    if (!query || query.trim() === '') {
      setFilteredFromTokens(tokens);
      return;
    }
    
    // For longer queries, use the API to get more accurate results
    if (query.length >= 3) {
      setIsFromSearchLoading(true);
      try {
        // Check cache first
        if (searchCache.has(query)) {
          setFilteredFromTokens(searchCache.get(query) || []);
          setIsFromSearchLoading(false);
          return;
        }
        
        const results = await searchTokens(query);
        
        // Combine API results with local filtered results for better matching
        const localResults = tokens.filter((token) => 
          token.name.toLowerCase().includes(query.toLowerCase()) || 
          token.symbol.toLowerCase().includes(query.toLowerCase())
        );
        
        // Create a Map of IDs to avoid duplicates
        const uniqueResults = new Map();
        
        // Add API results first
        if (results && results.length > 0) {
          results.forEach(token => uniqueResults.set(token.id, token));
        }
        
        // Add local results that aren't already included
        localResults.forEach(token => {
          if (!uniqueResults.has(token.id)) {
            uniqueResults.set(token.id, token);
          }
        });
        
        const finalResults = Array.from(uniqueResults.values());
        
        // Cache the results if we have any
        if (finalResults.length > 0) {
          searchCache.set(query, finalResults);
        }
        
        setFilteredFromTokens(finalResults);
      } catch (error) {
        console.error("Error searching tokens:", error);
        // Fallback to local filtering in case of API error
        const q = query.toLowerCase();
        const localResults = tokens.filter((token) => 
          token.name.toLowerCase().includes(q) || 
          token.symbol.toLowerCase().includes(q)
        );
        setFilteredFromTokens(localResults);
      } finally {
        setIsFromSearchLoading(false);
      }
    } else {
      // For short queries, do local filtering immediately
      const q = query.toLowerCase();
      const localResults = tokens.filter((token) => 
        token.name.toLowerCase().includes(q) || 
        token.symbol.toLowerCase().includes(q)
      );
      setFilteredFromTokens(localResults);
    }
  }, [searchTokens, tokens, searchCache]);  const handleToSearch = useCallback(async (query: string) => {
    setToSearchQuery(query);
    
    // If query is empty, just show all tokens
    if (!query || query.trim() === '') {
      setFilteredToTokens(tokens);
      return;
    }
    
    // For longer queries, use the API to get more accurate results
    if (query.length >= 3) {
      setIsToSearchLoading(true);
      try {
        // Check cache first
        if (searchCache.has(query)) {
          setFilteredToTokens(searchCache.get(query) || []);
          setIsToSearchLoading(false);
          return;
        }
        
        const results = await searchTokens(query);
        
        // Combine API results with local filtered results for better matching
        const localResults = tokens.filter((token) => 
          token.name.toLowerCase().includes(query.toLowerCase()) || 
          token.symbol.toLowerCase().includes(query.toLowerCase())
        );
        
        // Create a Map of IDs to avoid duplicates
        const uniqueResults = new Map();
        
        // Add API results first
        if (results && results.length > 0) {
          results.forEach(token => uniqueResults.set(token.id, token));
        }
        
        // Add local results that aren't already included
        localResults.forEach(token => {
          if (!uniqueResults.has(token.id)) {
            uniqueResults.set(token.id, token);
          }
        });
        
        const finalResults = Array.from(uniqueResults.values());
        // Cache the results
        searchCache.set(query, finalResults);
        setFilteredToTokens(finalResults);
      } catch (error) {
        console.error("Error searching tokens:", error);
        // Fallback to local filtering in case of API error
        const q = query.toLowerCase();
        const localResults = tokens.filter((token) => 
          token.name.toLowerCase().includes(q) || 
          token.symbol.toLowerCase().includes(q)
        );
        setFilteredToTokens(localResults);
      } finally {
        setIsToSearchLoading(false);
      }
    } else {
      // For short queries, do local filtering immediately
      const q = query.toLowerCase();
      const localResults = tokens.filter((token) => 
        token.name.toLowerCase().includes(q) || 
        token.symbol.toLowerCase().includes(q)
      );
      setFilteredToTokens(localResults);
    }
  }, [searchTokens, tokens, searchCache]);

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

  // Extract tokens safely
  const safeFromTokenSymbol = fromToken?.symbol || 'Select';
  const safeToTokenSymbol = toToken?.symbol || 'Select';
  
  // Function to safely display token exchange rate
  const getExchangeRateDisplay = () => {
    if (fromToken && toToken && fromAmount && toAmount && parseFloat(fromAmount) > 0) {
      try {
        const rate = (parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6);
        return `1 ${safeFromTokenSymbol} ≈ ${rate} ${safeToTokenSymbol}`;
      } catch (error) {
        console.error('Error calculating exchange rate:', error);
        return `1 ${safeFromTokenSymbol} ≈ ? ${safeToTokenSymbol}`;
      }
    }
    return '';
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-blue-500/30">
      <h1 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 pb-2">
        Swap Tokens
      </h1>

      {/* Wallet warning if no wallet selected */}
      {!wallet && (
        <div className="mb-4 p-3 bg-gray-900/80 border border-yellow-500/50 rounded-md flex items-start">
          <AlertCircle size={18} className="text-yellow-500 mr-2 mt-0.5" />
          <p className="text-sm text-yellow-400">
            Please select or add a wallet to perform swaps.
          </p>
        </div>
      )}

      {/* From Token Section */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <div className="text-blue-300 font-medium">From</div>
          <div>
            {wallet && fromToken && (
              <span className="text-gray-300">Balance: {wallet.address.substring(0, 6)}...</span>
            )}
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-800 border border-blue-500/30 rounded-lg shadow-lg">
          <button
            className="flex items-center min-w-[120px] hover:bg-gray-700/50 p-2 rounded-md transition-all duration-200"
            onClick={() => setIsFromTokenSelectOpen(true)}
          >            {fromToken ? (
              <div className="flex items-center">
                {fromToken.icon ? (
                  <Image 
                    src={fromToken.icon}
                    alt={safeFromTokenSymbol} 
                    className="w-6 h-6 rounded-full mr-2" 
                    width={24}
                    height={24}
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-700 text-blue-300 rounded-full flex items-center justify-center mr-2">
                    {safeFromTokenSymbol.substring(0, 1)}
                  </div>
                )}
                <span className="font-medium text-white">{safeFromTokenSymbol}</span>
                <ChevronDown size={16} className="ml-1 text-blue-300" />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-700 rounded-full mr-2"></div>
                <span className="font-medium text-gray-300">Select</span>
                <ChevronDown size={16} className="ml-1 text-blue-300" />
              </div>
            )}
          </button>
          
          <div className="flex-1 ml-4 text-right">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              disabled={!fromToken || !wallet}
              className="text-right text-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-md w-full max-w-full overflow-hidden truncate"
            />
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-3 z-10 relative">
        <button
          onClick={swapTokens}
          className="bg-gray-700 text-blue-400 rounded-full p-2.5 border border-blue-500/40 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 hover:bg-gray-600 transition-all duration-200"
        >
          <ArrowDown size={18} />
        </button>
      </div>

      {/* To Token Section */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <div className="text-purple-300 font-medium">To</div>
          <div>
            {wallet && toToken && (
              <span className="text-gray-300">Balance: 0</span>
            )}
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-800 border border-purple-500/30 rounded-lg shadow-lg">
          <button
            className="flex items-center min-w-[120px] hover:bg-gray-700/50 p-2 rounded-md transition-all duration-200"
            onClick={() => setIsToTokenSelectOpen(true)}
          >
            {toToken ? (
              <div className="flex items-center">
                {toToken.icon ? (
                  <Image 
                    src={toToken.icon} 
                    alt={safeToTokenSymbol} 
                    className="w-6 h-6 rounded-full mr-2" 
                    width={24}
                    height={24}
                  />
                ) : (                  
                  <div className="w-6 h-6 bg-gray-700 text-purple-300 rounded-full flex items-center justify-center mr-2">
                    {safeToTokenSymbol.substring(0, 1)}
                  </div>
                )}
                <span className="font-medium text-white">{safeToTokenSymbol}</span>
                <ChevronDown size={16} className="ml-1 text-purple-300" />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-700 rounded-full mr-2"></div>
                <span className="font-medium text-gray-300">Select</span>
                <ChevronDown size={16} className="ml-1 text-purple-300" />
              </div>
            )}
          </button>
          
          <div className="flex-1 ml-4 text-right">
            {isQuoteLoading ? (
              <div className="flex justify-end items-center">
                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-gray-400">Loading...</span>
              </div>
            ) : (
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="text-right text-lg bg-transparent text-white focus:outline-none w-full max-w-full overflow-hidden truncate"
              />
            )}
          </div>
        </div>
      </div>

      {/* Settings and info */}
      <div className="flex justify-between items-center mb-4 p-3 bg-gray-800/70 rounded-lg border border-gray-700">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center px-3 py-1.5 text-sm text-blue-300 hover:bg-gray-700 rounded-md transition-all duration-200"
        >
          <Settings size={15} className="mr-2" />
          <span>Slippage: {slippage}%</span>
        </button>
        
        {fromToken && toToken && fromAmount && toAmount && parseFloat(fromAmount) > 0 && (
          <span className="text-sm text-gray-300 bg-gray-700/70 py-1.5 px-3 rounded-md">
            {getExchangeRateDisplay()}
          </span>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-gray-800 border border-red-500/50 rounded-md flex items-start">
          <AlertCircle size={18} className="text-red-400 mr-2 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Swap Button */}
      <button
        onClick={executeSwap}
        disabled={swapButtonState === 'disabled' || isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium shadow-lg ${
          swapButtonState === 'disabled' || isLoading
            ? 'bg-gray-700/70 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <RefreshCw size={18} className="animate-spin mr-2" /> Processing...
          </span>
        ) : swapButtonState === 'disabled' ? (
          'Enter an amount'
        ) : (
          'Swap Tokens'
        )}
      </button>      {/* Token Selection Dialog for "From" */}
      <Dialog open={isFromTokenSelectOpen} onOpenChange={setIsFromTokenSelectOpen}>
        <DialogContent className="border-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-2 text-center">
              Select a token
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-2">
            <input
              type="text"
              placeholder="Search tokens..."
              value={fromSearchQuery}
              onChange={(e) => handleFromSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent mb-3"
            />
            
            {isFromSearchLoading && (
              <div className="flex justify-center items-center my-4">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-gray-300">Searching tokens...</span>
              </div>
            )}
            
            <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 pr-1">
              {filteredFromTokens.length === 0 && !isFromSearchLoading ? (
                <div className="text-center text-gray-400 py-4">
                  No tokens found. Try a different search.
                </div>
              ) : (
                filteredFromTokens.map((token) => (
                  <button
                    key={token.id}
                    className="w-full text-left p-3 hover:bg-gray-700/70 rounded-md transition-all duration-200 flex items-center my-1 border border-transparent hover:border-blue-500/20"
                    onClick={() => {
                      setFromToken(token);
                      setIsFromTokenSelectOpen(false);
                      setFromSearchQuery('');
                    }}
                  >
                    {token.icon ? (
                      <Image 
                        src={token.icon} 
                        alt={token.symbol || ''} 
                        className="w-8 h-8 rounded-full mr-3" 
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-700 text-white rounded-full flex items-center justify-center mr-3">
                        {token.symbol ? token.symbol.substring(0, 1) : '?'}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-white">{token.symbol || 'Unknown'}</div>
                      <div className="text-xs text-gray-400">{token.name || 'Unknown Token'}</div>
                    </div>
                    {tokenPrices[token.id] && (
                      <div className="ml-auto text-right">
                        <div className="text-white">${Number(tokenPrices[token.id].price).toFixed(2)}</div>
                        <div className={`text-xs ${Number(tokenPrices[token.id].change24h) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {Number(tokenPrices[token.id].change24h) >= 0 ? '+' : ''}{Number(tokenPrices[token.id].change24h).toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Token Selection Dialog for "To" */}
      <Dialog open={isToTokenSelectOpen} onOpenChange={setIsToTokenSelectOpen}>
        <DialogContent className="border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-2 text-center">
              Select a token
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-2">
            <input
              type="text"
              placeholder="Search tokens..."
              value={toSearchQuery}
              onChange={(e) => handleToSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent mb-3"
            />
            
            {isToSearchLoading && (
              <div className="flex justify-center items-center my-4">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-gray-300">Searching tokens...</span>
              </div>
            )}
            
            <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 pr-1">
              {filteredToTokens.length === 0 && !isToSearchLoading ? (
                <div className="text-center text-gray-400 py-4">
                  No tokens found. Try a different search.
                </div>
              ) : (
                filteredToTokens.map((token) => (
                  <button
                    key={token.id}
                    className="w-full text-left p-3 hover:bg-gray-700/70 rounded-md transition-all duration-200 flex items-center my-1 border border-transparent hover:border-purple-500/20"
                    onClick={() => {
                      setToToken(token);
                      setIsToTokenSelectOpen(false);
                      setToSearchQuery('');
                    }}
                  >
                    {token.icon ? (
                      <Image 
                        src={token.icon} 
                        alt={token.symbol || ''} 
                        className="w-8 h-8 rounded-full mr-3" 
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-700 text-white rounded-full flex items-center justify-center mr-3">
                        {token.symbol ? token.symbol.substring(0, 1) : '?'}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-white">{token.symbol || 'Unknown'}</div>
                      <div className="text-xs text-gray-400">{token.name || 'Unknown Token'}</div>
                    </div>
                    {tokenPrices[token.id] && (
                      <div className="ml-auto text-right">
                        <div className="text-white">${Number(tokenPrices[token.id].price).toFixed(2)}</div>
                        <div className={`text-xs ${Number(tokenPrices[token.id].change24h) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {Number(tokenPrices[token.id].change24h) >= 0 ? '+' : ''}{Number(tokenPrices[token.id].change24h).toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="border-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-2 text-center">
              Transaction Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <label className="block text-sm font-medium mb-2 text-blue-300">
              Slippage Tolerance
            </label>
            <div className="flex space-x-2 mb-4">
              <button
                className={`py-2 px-4 rounded-md transition-all duration-200 ${
                  slippage === 0.1 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSlippage(0.1)}
              >
                0.1%
              </button>
              <button
                className={`py-2 px-4 rounded-md transition-all duration-200 ${
                  slippage === 0.5 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSlippage(0.5)}
              >
                0.5%
              </button>
              <button
                className={`py-2 px-4 rounded-md transition-all duration-200 ${
                  slippage === 1 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSlippage(1)}
              >
                1%
              </button>
              <button
                className={`py-2 px-4 rounded-md transition-all duration-200 ${
                  slippage === 2 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSlippage(2)}
              >
                2%
              </button>
            </div>
            
            <label className="block text-sm font-medium mb-2 text-blue-300">
              Custom Slippage
            </label>
            <div className="relative">
              <input
                type="number"
                value={slippage}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= 0 && value <= 10) {
                    setSlippage(value);
                  }
                }}
                className="w-full pl-3 pr-8 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
              <span className="absolute right-3 top-2 text-gray-300">%</span>
            </div>
            
            <div className="flex items-start mt-4 text-sm text-blue-200 p-3 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-blue-300" />
              <p>
                Higher slippage increases your chances of a successful transaction but may result in less favorable rates.
              </p>
            </div>
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md transition-all duration-200 font-medium shadow-lg shadow-blue-500/20"
            >
              Save Settings
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
