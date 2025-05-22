'use client';

import { useState } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useTransactions, Transaction } from '@/app/hooks/useTransactions';

export default function TransactionHistory() {
  const [filter, setFilter] = useState<'all' | 'real' | 'simulated'>('all');
  const { 
    transactions, 
    isLoading, 
    hasMore,
    loadMore: loadMoreTx,
    refresh: refreshTx 
  } = useTransactions({ 
    filter, 
    refreshInterval: null // Set to a number in ms to auto-refresh
  });
  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Format amount for display (with token symbol)
  const formatAmount = (amount: string, symbol: string) => {
    const num = parseFloat(amount);
    if (num > 1000000) {
      return (num / 1000000).toFixed(2) + 'M ' + symbol;
    } else if (num > 1000) {
      return (num / 1000).toFixed(2) + 'K ' + symbol;
    } else {
      return parseFloat(amount).toFixed(6) + ' ' + symbol;
    }
  };

  // Get status class for styling
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Transaction History</h3>
        
        <div className="flex items-center space-x-2">
          <div className="border rounded-md overflow-hidden flex text-sm">
            <button 
              className={`px-3 py-1 ${filter === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 ${filter === 'real' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setFilter('real')}
            >
              Real
            </button>
            <button 
              className={`px-3 py-1 ${filter === 'simulated' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setFilter('simulated')}
            >
              Simulated
            </button>
          </div>
          
          <button 
            onClick={() => refreshTx()}
            className="p-1.5 rounded-full hover:bg-gray-100"
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isLoading 
              ? 'Loading transactions...' 
              : 'No transactions found. Start swapping to see your history.'}
          </div>
        ) : (
          <>
            {transactions.map((tx) => (
              <div key={tx.id} className="border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getStatusClass(tx.status)}`}>
                        {tx.status}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">
                        {formatAmount(tx.fromAmount, tx.fromToken.symbol)} to {formatAmount(tx.toAmount, tx.toToken.symbol)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Rate: 1 {tx.fromToken.symbol} = {tx.rate.toFixed(6)} {tx.toToken.symbol}
                      </div>
                    </div>
                  </div>
                  {tx.isSimulated && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                      Simulated
                    </span>
                  )}
                </div>
                
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <div>Wallet: {formatAddress(tx.walletAddress)}</div>
                  <div>{formatDate(tx.createdAt)}</div>
                </div>
                
                {tx.txHash && (
                  <div className="mt-2">
                    <a 
                      href={`https://etherscan.io/tx/${tx.txHash}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 text-xs flex items-center"
                    >
                      View on Explorer <ExternalLink size={12} className="ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))}
            
            {/* Load more button */}
            {hasMore && (
              <div className="text-center pt-4">
                <button
                  onClick={() => loadMoreTx()}
                  disabled={isLoading}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
