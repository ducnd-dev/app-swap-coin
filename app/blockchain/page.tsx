'use client';

import { useState } from 'react';
import { getTokenTransactions, getTransactionDetails, isContractVerified } from '@/app/lib/blockchain/etherscan';
import BackButton from '@/app/components/ui/back-button';

export default function EtherscanDemoPage() {
  const [address, setAddress] = useState<string>('');
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const [network, setNetwork] = useState<string>('ETH');
  const [result, setResult] = useState<Record<string, unknown> | unknown[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [operation, setOperation] = useState<string>('');

  const handleGetTokenTransactions = async () => {
    if (!address) return;
    
    setResult(null);
    setIsLoading(true);
    setOperation('token-transactions');
    
    try {
      const transactions = await getTokenTransactions(address, tokenAddress || undefined, network);
      setResult(transactions);
    } catch (error) {
      setResult({ error: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetTransactionDetails = async () => {
    if (!txHash) return;
    
    setResult(null);
    setIsLoading(true);
    setOperation('transaction-details');
    
    try {
      const details = await getTransactionDetails(txHash, network);
      setResult(details);
    } catch (error) {
      setResult({ error: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckContractVerification = async () => {
    if (!tokenAddress) return;
    
    setResult(null);
    setIsLoading(true);
    setOperation('contract-verification');
    
    try {
      const isVerified = await isContractVerified(tokenAddress, network);
      setResult({ isVerified });
    } catch (error) {
      setResult({ error: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white py-8">
      <div className="container mx-auto px-4">        <div className="flex items-center justify-between mb-6">
          <BackButton href="/dashboard" label="Back to Dashboard" variant="primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 pb-2">
          Blockchain Explorer
        </h1>
        
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-8 rounded-xl shadow-xl mb-8 border border-gray-700">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-blue-300">Select Network</label>
            <select
              className="block w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              <option value="ETH">Ethereum</option>
              <option value="BSC">Binance Smart Chain</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-5 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-blue-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
                Token Transactions
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Wallet Address</label>
                  <input
                    type="text"
                    className="block w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0x..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Token Address (Optional)</label>
                  <input
                    type="text"
                    className="block w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0x..."
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleGetTokenTransactions}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium shadow-lg"
                  disabled={!address || isLoading}
                >
                  {isLoading && operation === 'token-transactions' ? 
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span> : 'Get Token Transactions'
                  }
                </button>
              </div>
            </div>
            
            <div className="bg-gray-800 p-5 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-purple-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Transaction Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Transaction Hash</label>
                  <input
                    type="text"
                    className="block w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="0x..."
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleGetTransactionDetails}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium shadow-lg"
                  disabled={!txHash || isLoading}
                >
                  {isLoading && operation === 'transaction-details' ? 
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span> : 'Get Transaction Details'
                  }
                </button>
              </div>
            </div>
            
            <div className="bg-gray-800 p-5 rounded-xl border border-green-500/30 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-green-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Contract Verification
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Contract Address</label>
                  <input
                    type="text"
                    className="block w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="0x..."
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleCheckContractVerification}
                  className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium shadow-lg"
                  disabled={!tokenAddress || isLoading}
                >
                  {isLoading && operation === 'contract-verification' ? 
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span> : 'Check Verification'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading && operation === '' && (
          <div className="flex justify-center my-10">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {result && (
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-700 transition-all duration-500">
            <h2 className="text-xl font-semibold mb-4 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                Results {operation === 'token-transactions' 
                  ? '- Token Transactions' 
                  : operation === 'transaction-details' 
                    ? '- Transaction Details' 
                    : '- Contract Verification'}
              </span>
            </h2>
            <div className="overflow-auto max-h-96 border border-gray-700 p-5 rounded-lg bg-gray-900 shadow-inner">
              <pre className="text-sm text-gray-300 font-mono">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
      
      <footer className="mt-16 text-center text-gray-400 text-sm pb-8">
        <p>Blockchain Explorer Demo - Powered by Etherscan API</p>
      </footer>
    </div>
  );
}
