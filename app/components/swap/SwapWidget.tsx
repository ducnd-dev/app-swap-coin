'use client';

import { useState } from 'react';
import TokenSelector from '@/app/components/tokens/TokenSelector';
import { Token } from '@/app/lib/api/oracle-price-api';
import { useOraclePrices } from '@/app/hooks/useOraclePrices';

export default function SwapWidget() {
  const [fromToken, setFromToken] = useState<Token | undefined>();
  const [toToken, setToToken] = useState<Token | undefined>();
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  
  // Get token prices using the oracle price hook
  const { getPrice } = useOraclePrices();
  
  const handleFromTokenSelect = (token: Token) => {
    setFromToken(token);
    
    // If both tokens are selected and there's a from amount, calculate the to amount
    if (token && toToken && fromAmount) {
      calculateToAmount(fromAmount, token, toToken);
    }
  };
  
  const handleToTokenSelect = (token: Token) => {
    setToToken(token);
    
    // If both tokens are selected and there's a from amount, calculate the to amount
    if (fromToken && token && fromAmount) {
      calculateToAmount(fromAmount, fromToken, token);
    }
  };
  
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setFromAmount(amount);
    
    // If both tokens are selected, calculate the to amount
    if (fromToken && toToken && amount) {
      calculateToAmount(amount, fromToken, toToken);
    } else {
      setToAmount('');
    }
  };
  
  const calculateToAmount = (amount: string, from: Token, to: Token) => {
    const fromPrice = getPrice(from.symbol)?.price || 0;
    const toPrice = getPrice(to.symbol)?.price || 0;
    
    if (fromPrice && toPrice) {
      const conversion = (parseFloat(amount) * fromPrice) / toPrice;
      setToAmount(conversion.toFixed(6));
    }
  };
  
  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    // Recalculate amounts
    if (fromToken && toToken && fromAmount) {
      const fromPrice = getPrice(toToken.symbol)?.price || 0;
      const toPrice = getPrice(fromToken.symbol)?.price || 0;
      
      if (fromPrice && toPrice) {
        const conversion = (parseFloat(fromAmount) * fromPrice) / toPrice;
        setToAmount(fromAmount);
        setFromAmount(conversion.toFixed(6));
      }
    }
  };
  
  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6">Swap Tokens</h2>
      
      {/* From token section */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">From</span>
          {fromToken && (
            <span className="text-sm text-gray-500">
              Balance: 0.00 {fromToken.symbol}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <input
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={handleFromAmountChange}
            className="text-lg w-full bg-transparent focus:outline-none"
          />
          
          <TokenSelector
            selectedToken={fromToken}
            onTokenSelect={handleFromTokenSelect}
            excludeTokens={toToken ? [toToken.symbol] : []}
          />
        </div>
      </div>
      
      {/* Swap button */}
      <div className="flex justify-center my-2">
        <button
          type="button"
          onClick={swapTokens}
          disabled={!fromToken || !toToken}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>
      
      {/* To token section */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">To</span>
          {toToken && (
            <span className="text-sm text-gray-500">
              Balance: 0.00 {toToken.symbol}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <input
            type="number"
            placeholder="0.0"
            value={toAmount}
            readOnly
            className="text-lg w-full bg-transparent focus:outline-none"
          />
          
          <TokenSelector
            selectedToken={toToken}
            onTokenSelect={handleToTokenSelect}
            excludeTokens={fromToken ? [fromToken.symbol] : []}
          />
        </div>
      </div>
      
      {/* Price information */}
      {fromToken && toToken && fromAmount && toAmount && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500">Exchange Rate</span>
            <span className="text-sm">
              1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Inverse Rate</span>
            <span className="text-sm">
              1 {toToken.symbol} = {(parseFloat(fromAmount) / parseFloat(toAmount)).toFixed(6)} {fromToken.symbol}
            </span>
          </div>
        </div>
      )}
      
      {/* Swap button */}
      <button
        type="button"
        disabled={!fromToken || !toToken || !fromAmount || !toAmount}
        className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:opacity-50 transition-colors"
      >
        {!fromToken || !toToken 
          ? 'Select Tokens'
          : !fromAmount 
            ? 'Enter Amount' 
            : 'Swap'}
      </button>
    </div>
  );
}
