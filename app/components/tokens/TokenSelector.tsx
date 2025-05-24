'use client';

import { useState } from 'react';
import useTokenList from '@/app/hooks/useTokenList';
import { Token } from '@/app/lib/api/oracle-price-api';

interface TokenSelectorProps {
  onTokenSelect: (token: Token) => void;
  selectedToken?: Token;
  excludeTokens?: string[];
}

export default function TokenSelector({ 
  onTokenSelect, 
  selectedToken,
  excludeTokens = []
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    tokens, 
    popularTokens,
    stablecoins,
    isLoading, 
    error 
  } = useTokenList();
  
  const filteredTokens = tokens.filter(token => {
    // Don't show tokens that are in the exclude list
    if (excludeTokens.includes(token.symbol)) {
      return false;
    }
    
    // Filter by search if there is a search query
    if (searchQuery) {
      return (
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return true;
  });
  
  const handleOpenSelector = () => {
    setIsOpen(true);
  };
  
  const handleCloseSelector = () => {
    setIsOpen(false);
  };
  
  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    handleCloseSelector();
  };
  
  return (
    <div className="relative">
      {/* Token selector button */}
      <button 
        type="button"
        onClick={handleOpenSelector}
        className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
      >
        {selectedToken ? (
          <>
            {selectedToken.logoUrl && (
              <img 
                src={selectedToken.logoUrl} 
                alt={selectedToken.symbol}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="font-medium">{selectedToken.symbol}</span>
          </>
        ) : (
          <span className="text-gray-500">Select Token</span>
        )}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="ml-2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {/* Token selector dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-72 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-3 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-lg">Select a Token</h3>
              <button 
                type="button" 
                onClick={handleCloseSelector}
                className="text-gray-500 hover:text-gray-700"
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or symbol"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-8 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto p-1">
            {isLoading ? (
              <div className="flex justify-center items-center p-4">
                <span className="animate-spin mr-2">
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
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                </span>
                Loading tokens...
              </div>
            ) : error ? (
              <div className="text-center p-4 text-red-500">
                {error}
              </div>
            ) : searchQuery ? (
              // Search results
              filteredTokens.length > 0 ? (
                filteredTokens.map((token) => (
                  <TokenOption 
                    key={token.symbol} 
                    token={token} 
                    onSelect={handleTokenSelect} 
                  />
                ))
              ) : (
                <div className="text-center p-4 text-gray-500">
                  No tokens found for &quot;{searchQuery}&quot;
                </div>
              )
            ) : (
              <>
                {/* Popular tokens section */}
                {popularTokens.length > 0 && (
                  <>
                    <div className="p-2 text-sm text-gray-500 font-medium">
                      Popular Tokens
                    </div>
                    {popularTokens
                      .filter(token => !excludeTokens.includes(token.symbol))
                      .map((token) => (
                        <TokenOption 
                          key={token.symbol} 
                          token={token} 
                          onSelect={handleTokenSelect} 
                        />
                      ))
                    }
                  </>
                )}
                
                {/* Stablecoins section */}
                {stablecoins.length > 0 && (
                  <>
                    <div className="p-2 text-sm text-gray-500 font-medium">
                      Stablecoins
                    </div>
                    {stablecoins
                      .filter(token => !excludeTokens.includes(token.symbol))
                      .map((token) => (
                        <TokenOption 
                          key={token.symbol} 
                          token={token} 
                          onSelect={handleTokenSelect} 
                        />
                      ))
                    }
                  </>
                )}
                
                {/* All tokens section */}
                <div className="p-2 text-sm text-gray-500 font-medium">
                  All Tokens
                </div>
                {filteredTokens.map((token) => (
                  <TokenOption 
                    key={token.symbol} 
                    token={token} 
                    onSelect={handleTokenSelect} 
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Token option component
function TokenOption({ token, onSelect }: { token: Token, onSelect: (token: Token) => void }) {
  return (
    <button
      type="button"
      className="w-full text-left p-2 hover:bg-gray-100 rounded-md flex items-center gap-3 transition-colors"
      onClick={() => onSelect(token)}
    >
      {token.logoUrl ? (
        <img 
          src={token.logoUrl} 
          alt={token.symbol}
          className="w-7 h-7 rounded-full"
        />
      ) : (
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs">
          {token.symbol.substring(0, 2).toUpperCase()}
        </div>
      )}
      <div>
        <div className="font-medium">{token.symbol}</div>
        <div className="text-sm text-gray-500">{token.name}</div>
      </div>
    </button>
  );
}
