'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowDown, RefreshCw, Settings, AlertCircle, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
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

export default function SwapInterface({ wallet, onSwapComplete }: SwapInterfaceProps) {  // Context and hooks
  const { tokens, popularTokens, tokenPrices } = useTokens();
  const { searchTokens, getSwapQuote } = useTokenOperations();

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
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

  // Update filtered tokens when search query or tokens change
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTokens(tokens);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredTokens(
        tokens.filter((token) => 
          token.name.toLowerCase().includes(query) || 
          token.symbol.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, tokens]);

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
      setError(null);      await axios.post('/api/swap/execute', {
        fromTokenId: fromToken.id,
        toTokenId: toToken.id,
        fromAmount,
        toAmount,
        walletId: wallet.id,
        slippage
      });

      toast.success('Swap executed successfully!');
      onSwapComplete();
      
      // Reset form
      setFromAmount('');
      setToAmount('');    } catch (error) {
      console.error('Error executing swap:', error);
      const errorMessage = 'Failed to execute swap';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setSwapButtonState('ready');
    }
  };

  // Search for tokens
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = await searchTokens(query);
      setFilteredTokens(results);
    } else {
      setFilteredTokens(tokens);
    }
  }, [searchTokens, tokens]);

  return (
    <div className="rounded-lg border p-4">
      {/* Wallet warning if no wallet selected */}
      {!wallet && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
          <AlertCircle size={18} className="text-yellow-500 mr-2 mt-0.5" />
          <p className="text-sm text-yellow-700">
            Please select or add a wallet to perform swaps.
          </p>
        </div>
      )}

      {/* From Token Section */}
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-2">
          <div>From</div>
          <div>
            {wallet && fromToken && (
              <span>Balance: {wallet.address.substring(0, 6)}...</span>
            )}
          </div>
        </div>
        <div className="flex items-center p-4 border rounded-lg">
          <button
            className="flex items-center min-w-[120px]"
            onClick={() => setIsFromTokenSelectOpen(true)}
          >
            {fromToken ? (
              <div className="flex items-center">
                {fromToken.icon ? (
                  <Image 
                    src={fromToken.icon} 
                    alt={fromToken.symbol} 
                    className="w-6 h-6 rounded-full mr-2" 
                    width={24}
                    height={24}
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                    {fromToken.symbol.substring(0, 1)}
                  </div>
                )}
                <span className="font-medium">{fromToken.symbol}</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-100 rounded-full mr-2"></div>
                <span className="font-medium">Select</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
            )}
          </button>
          
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            disabled={!fromToken || !wallet}
            className="flex-1 ml-4 text-right text-lg focus:outline-none"
          />
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-3 z-10 relative">
        <button
          onClick={swapTokens}
          className="bg-white rounded-full p-2 border shadow-sm hover:shadow"
        >
          <ArrowDown size={16} />
        </button>
      </div>

      {/* To Token Section */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <div>To</div>
          <div>
            {wallet && toToken && (
              <span>Balance: 0</span>
            )}
          </div>
        </div>
        <div className="flex items-center p-4 border rounded-lg">
          <button
            className="flex items-center min-w-[120px]"
            onClick={() => setIsToTokenSelectOpen(true)}
          >
            {toToken ? (
              <div className="flex items-center">
                {toToken.icon ? (
                  <Image 
                    src={toToken.icon} 
                    alt={toToken.symbol} 
                    className="w-6 h-6 rounded-full mr-2" 
                    width={24}
                    height={24}
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                    {toToken.symbol.substring(0, 1)}
                  </div>
                )}
                <span className="font-medium">{toToken.symbol}</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-100 rounded-full mr-2"></div>
                <span className="font-medium">Select</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
            )}
          </button>
          
          <div className="flex-1 ml-4 text-right">
            {isQuoteLoading ? (
              <div className="flex justify-end items-center">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-gray-400">Loading...</span>
              </div>
            ) : (
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="text-right text-lg focus:outline-none w-full"
              />
            )}
          </div>
        </div>
      </div>

      {/* Settings and info */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          <Settings size={15} className="mr-1" />
          <span>Slippage: {slippage}%</span>
        </button>
        
        {fromToken && toToken && fromAmount && toAmount && (
          <span className="text-sm text-gray-600">
            1 {fromToken.symbol} ≈ {parseFloat(toAmount) / parseFloat(fromAmount)} {toToken.symbol}
          </span>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle size={18} className="text-red-500 mr-2 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Swap Button */}
      <button
        onClick={executeSwap}
        disabled={swapButtonState === 'disabled' || isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium ${
          swapButtonState === 'disabled' || isLoading
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <RefreshCw size={18} className="animate-spin mr-2" /> Processing...
          </span>
        ) : swapButtonState === 'disabled' ? (
          'Enter an amount'
        ) : (
          'Swap'
        )}
      </button>

      {/* Token Selection Dialog for "From" */}
      <Dialog open={isFromTokenSelectOpen} onOpenChange={setIsFromTokenSelectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a token</DialogTitle>
          </DialogHeader>
          
          <div className="py-2">
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
            />
            
            <div className="max-h-[300px] overflow-y-auto">
              {filteredTokens.map((token) => (
                <button
                  key={token.id}
                  className="w-full text-left p-3 hover:bg-gray-50 flex items-center"
                  onClick={() => {
                    setFromToken(token);
                    setIsFromTokenSelectOpen(false);
                    setSearchQuery('');
                  }}
                >
                  {token.icon ? (
                    <Image 
                      src={token.icon} 
                      alt={token.symbol} 
                      className="w-8 h-8 rounded-full mr-3" 
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      {token.symbol.substring(0, 1)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-xs text-gray-500">{token.name}</div>
                  </div>
                  {tokenPrices[token.id] && (
                    <div className="ml-auto text-right">
                      <div>${tokenPrices[token.id].price.toFixed(2)}</div>
                      <div className={`text-xs ${tokenPrices[token.id].change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tokenPrices[token.id].change24h >= 0 ? '+' : ''}{tokenPrices[token.id].change24h.toFixed(2)}%
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Token Selection Dialog for "To" */}
      <Dialog open={isToTokenSelectOpen} onOpenChange={setIsToTokenSelectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a token</DialogTitle>
          </DialogHeader>
          
          <div className="py-2">
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
            />
            
            <div className="max-h-[300px] overflow-y-auto">
              {filteredTokens.map((token) => (
                <button
                  key={token.id}
                  className="w-full text-left p-3 hover:bg-gray-50 flex items-center"
                  onClick={() => {
                    setToToken(token);
                    setIsToTokenSelectOpen(false);
                    setSearchQuery('');
                  }}
                >
                  {token.icon ? (
                    <Image 
                      src={token.icon} 
                      alt={token.symbol} 
                      className="w-8 h-8 rounded-full mr-3" 
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      {token.symbol.substring(0, 1)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-xs text-gray-500">{token.name}</div>
                  </div>
                  {tokenPrices[token.id] && (
                    <div className="ml-auto text-right">
                      <div>${tokenPrices[token.id].price.toFixed(2)}</div>
                      <div className={`text-xs ${tokenPrices[token.id].change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tokenPrices[token.id].change24h >= 0 ? '+' : ''}{tokenPrices[token.id].change24h.toFixed(2)}%
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Settings</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <label className="block text-sm font-medium mb-2">
              Slippage Tolerance
            </label>
            <div className="flex space-x-2 mb-4">
              <button
                className={`py-2 px-4 rounded-md ${slippage === 0.1 ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setSlippage(0.1)}
              >
                0.1%
              </button>
              <button
                className={`py-2 px-4 rounded-md ${slippage === 0.5 ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setSlippage(0.5)}
              >
                0.5%
              </button>
              <button
                className={`py-2 px-4 rounded-md ${slippage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setSlippage(1)}
              >
                1%
              </button>
              <button
                className={`py-2 px-4 rounded-md ${slippage === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setSlippage(2)}
              >
                2%
              </button>
            </div>
            
            <label className="block text-sm font-medium mb-2">
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
                className="w-full pl-3 pr-8 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2">%</span>
            </div>
            
            <div className="flex items-start mt-4 text-sm text-gray-500">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>
                Higher slippage increases your chances of a successful transaction but may result in less favorable rates.
              </p>
            </div>
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Settings
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
