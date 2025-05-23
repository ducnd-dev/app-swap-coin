'use client';

import { useState } from 'react';
import { getTokenTransactions, getTransactionDetails, isContractVerified } from '@/app/lib/blockchain/etherscan';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Etherscan API Demo</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Network</label>
          <select
            className="block w-full py-2 px-3 border border-gray-300 rounded-md"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
          >
            <option value="ETH">Ethereum</option>
            <option value="BSC">Binance Smart Chain</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-3">Token Transactions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Wallet Address</label>
                <input
                  type="text"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md"
                  placeholder="0x..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Token Address (Optional)</label>
                <input
                  type="text"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md"
                  placeholder="0x..."
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                />
              </div>
              <button
                onClick={handleGetTokenTransactions}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                disabled={!address || isLoading}
              >
                Get Token Transactions
              </button>
            </div>
          </div>
          
          <div className="border p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-3">Transaction Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Transaction Hash</label>
                <input
                  type="text"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md"
                  placeholder="0x..."
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                />
              </div>
              <button
                onClick={handleGetTransactionDetails}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                disabled={!txHash || isLoading}
              >
                Get Transaction Details
              </button>
            </div>
          </div>
          
          <div className="border p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-3">Contract Verification</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contract Address</label>
                <input
                  type="text"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md"
                  placeholder="0x..."
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                />
              </div>
              <button
                onClick={handleCheckContractVerification}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                disabled={!tokenAddress || isLoading}
              >
                Check Verification
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading && (
        <div className="flex justify-center my-6">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">
            Results{operation === 'token-transactions' 
              ? ' - Token Transactions' 
              : operation === 'transaction-details' 
                ? ' - Transaction Details' 
                : ' - Contract Verification'}
          </h2>
          <div className="overflow-auto max-h-96 border p-4 rounded-md bg-gray-50">
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
