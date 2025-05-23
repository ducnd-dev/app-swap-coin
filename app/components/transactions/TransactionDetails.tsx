'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink, AlertCircle, CheckCircle, Clock, RefreshCw, FileCog, DollarSign, Tag } from 'lucide-react';
import axiosClient from '@/app/lib/api/axios';
import LoadingState from '@/app/components/ui/loading-state';

interface TransactionDetailsProps {
  txHash: string;
  onClose: () => void;
}

interface TransactionDetailData {
  hash: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  gasLimit: string;
  nonce: number;
  confirmations: number;
  blockNumber: string;
  input: string;
  tokenTransfers?: {
    token: string;
    symbol: string;
    value: string;
    from: string;
    to: string;
    decimals?: number;
    tokenAddress?: string;
    iconUrl?: string;
  }[];
  error?: string;
  contractInteraction?: {
    contractName: string;
    methodName: string;
    arguments: {
      name: string;
      type: string;
      value: string;
    }[];
  };
  networkFee?: {
    eth: string;
    usd: string;
  };
  totalValue?: {
    eth: string;
    usd: string;
  };
}

export default function TransactionDetails({ txHash, onClose }: TransactionDetailsProps) {
  const [txData, setTxData] = useState<TransactionDetailData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'logs'>('overview');
  
  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (!txHash) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axiosClient.get(`/api/transactions/${txHash}`);
        if (response.data) {
          setTxData(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch transaction details:', err);
        setError('Unable to load transaction details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactionDetails();
  }, [txHash]);
  
  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Format date for display
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  // Get status indicator based on transaction status
  const renderStatusIndicator = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };
  
  // Get status label based on transaction status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'success':
        return 'Successful';
      case 'failed':
        return 'Failed';
      case 'pending':
      default:
        return 'Pending';
    }
  };
  
  // Get status CSS class based on transaction status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  // Calculate gas cost in ETH
  const calculateGasCost = () => {
    if (!txData?.gasUsed || !txData?.gasPrice) return 'n/a';
    
    const gasUsed = BigInt(txData.gasUsed);
    const gasPrice = BigInt(txData.gasPrice);
    const cost = gasUsed * gasPrice / BigInt(1e18); // Convert from wei to ETH
    
    return cost.toString() + ' ETH';
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Transaction Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <LoadingState 
          status="loading"
          loadingText="Loading transaction details..." 
          size="lg"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Transaction Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <LoadingState 
          status="error"
          errorText={error} 
          retry={() => window.location.reload()}
          size="lg"
        />
      </div>
    );
  }

  if (!txData) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Transaction Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Transaction Not Found</h3>
          <p className="text-gray-600">
            We couldn&apos;t find any transaction with the hash {txHash}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Transaction Details</h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
      
      {/* Transaction Status Banner */}
      <div className={`p-4 rounded-lg mb-6 flex items-center justify-between ${getStatusClass(txData.status)}`}>
        <div className="flex items-center">
          {renderStatusIndicator(txData.status)}
          <span className="ml-2 font-medium">{getStatusLabel(txData.status)} Transaction</span>
        </div>
        {txData.status === 'pending' && (
          <button className="flex items-center text-sm font-medium hover:underline">
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh Status
          </button>
        )}
      </div>
      
      {/* Transaction Navigation */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'logs' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('logs')}
        >
          Logs & Input
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <>
          {/* Transaction Summary */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-center mb-6">
              <div className="mr-4 mb-4 md:mb-0">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  {txData.tokenTransfers?.length ? (
                    <Tag className="w-6 h-6 text-blue-600" />
                  ) : (
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {txData.tokenTransfers?.length 
                    ? `Token Transfer${txData.tokenTransfers.length > 1 ? 's' : ''}`
                    : 'ETH Transfer'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {formatDate(txData.timestamp)}
                  {txData.confirmations && (
                    <span className="ml-2">• {txData.confirmations} Confirmations</span>
                  )}
                </p>
              </div>
            </div>
            
            {/* Value Transfer Visualization */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg mb-4 shadow-sm">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sm font-medium">
                    {formatAddress(txData.from)[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">From</p>
                  <p className="text-gray-600 text-sm break-all">{txData.from}</p>
                </div>
              </div>
              
              <div className="my-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sm font-medium">
                    {formatAddress(txData.to)[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">To</p>
                  <p className="text-gray-600 text-sm break-all">{txData.to}</p>
                </div>
              </div>
            </div>
            
            {/* Transaction Value and Fee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Transaction Value</p>
                <div className="font-medium text-lg">
                  {txData.tokenTransfers?.length ? (
                    <div>
                      {txData.tokenTransfers.map((transfer, index) => (
                        <div key={index} className="flex items-center mb-1">
                          {transfer.iconUrl && (
                            <Image 
                              src={transfer.iconUrl}
                              alt={transfer.symbol}
                              width={20}
                              height={20}
                              className="mr-1"
                            />
                          )}
                          <span>{transfer.value} {transfer.symbol}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>{txData.value} ETH</div>
                  )}
                  {txData.totalValue?.usd && (
                    <div className="text-sm text-gray-600 mt-1">(≈ ${txData.totalValue.usd})</div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Network Fee</p>
                <div className="font-medium text-lg">
                  {txData.networkFee?.eth || calculateGasCost()}
                  {txData.networkFee?.usd && (
                    <div className="text-sm text-gray-600 mt-1">(≈ ${txData.networkFee.usd})</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Token Transfers */}
          {txData.tokenTransfers && txData.tokenTransfers.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Token Transfers</h3>
              <div className="bg-white border rounded-lg">
                {txData.tokenTransfers.map((transfer, index) => (
                  <div key={index} className={`p-4 ${index !== txData.tokenTransfers!.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex items-center mb-2">
                      {transfer.iconUrl && (
                        <Image 
                          src={transfer.iconUrl}
                          alt={transfer.symbol}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                      )}
                      <span className="font-medium">{transfer.value} {transfer.symbol}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mb-2">
                      <div className="mb-1 sm:mb-0">From: {formatAddress(transfer.from)}</div>
                      <ArrowRight className="hidden sm:block w-4 h-4 mx-2" />
                      <div>To: {formatAddress(transfer.to)}</div>
                    </div>
                    {transfer.tokenAddress && (
                      <div className="text-xs text-gray-500">
                        Token Contract: {formatAddress(transfer.tokenAddress)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Contract Interaction */}
          {txData.contractInteraction && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Contract Interaction</h3>
              <div className="bg-white border rounded-lg p-4">
                <div className="mb-3">
                  <p className="text-sm text-gray-600">Contract</p>
                  <p className="font-medium">{txData.contractInteraction.contractName || 'Unknown Contract'}</p>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-600">Method</p>
                  <p className="font-medium">{txData.contractInteraction.methodName || 'Unknown Method'}</p>
                </div>
                {txData.contractInteraction.arguments && txData.contractInteraction.arguments.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Arguments</p>
                    <div className="bg-gray-50 rounded-md p-3 text-sm font-mono">
                      {txData.contractInteraction.arguments.map((arg, index) => (
                        <div key={index} className="mb-1">
                          <span className="text-blue-600">{arg.name}</span>: <span className="text-green-600">{arg.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'details' && (
        <div className="bg-white border rounded-lg">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top w-1/3">Transaction Hash</td>
                <td className="px-4 py-3 break-all font-mono">{txData.hash}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">Status</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getStatusClass(txData.status)}`}>
                    {renderStatusIndicator(txData.status)}
                    <span className="ml-1">{getStatusLabel(txData.status)}</span>
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">Block</td>
                <td className="px-4 py-3 font-mono">{txData.blockNumber}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">Timestamp</td>
                <td className="px-4 py-3">{formatDate(txData.timestamp)}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">From</td>
                <td className="px-4 py-3 break-all font-mono">{txData.from}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">To</td>
                <td className="px-4 py-3 break-all font-mono">{txData.to}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">Value</td>
                <td className="px-4 py-3">{txData.value} ETH</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">Transaction Fee</td>
                <td className="px-4 py-3">{txData.networkFee?.eth || calculateGasCost()}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">Gas Price</td>
                <td className="px-4 py-3">{txData.gasPrice} Wei</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">Gas Limit</td>
                <td className="px-4 py-3">{txData.gasLimit}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600 align-top">Gas Used</td>
                <td className="px-4 py-3">{txData.gasUsed}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600 align-top">Nonce</td>
                <td className="px-4 py-3">{txData.nonce}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Input Data</h3>
            {txData.input && txData.input !== '0x' ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-mono text-xs overflow-x-auto whitespace-pre-wrap break-all">
                  {txData.input}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-600">
                No input data for this transaction
              </div>
            )}
          </div>

          {/* Event Logs would go here */}
          <div>
            <h3 className="text-lg font-medium mb-3">Event Logs</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-600">
              <FileCog className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              No event logs available for this transaction
            </div>
          </div>
        </div>
      )}
      
      {/* External Links */}
      <div className="mt-6 pt-4 border-t">
        <a 
          href={`https://etherscan.io/tx/${txData.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:underline mr-4"
        >
          <ExternalLink className="w-4 h-4 mr-1" /> View on Etherscan
        </a>
      </div>
    </div>
  );
}
