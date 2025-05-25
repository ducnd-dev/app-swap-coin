'use client';

import { useState } from 'react';
import { useWeb3 } from '@/app/contexts/Web3Context';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

// Constants
const GAS_LIMIT_FACTOR = 1.2; // Add 20% to estimated gas

interface Web3TransactionProps {
  contractAddress?: string;
  functionName: string;
  args?: unknown[];
  value?: string; // in wei
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
  buttonText: string;
  buttonClassName?: string;
  disabled?: boolean;
}

export default function Web3Transaction({
  contractAddress,
  functionName,
  args = [],
  value = '0',
  onSuccess,
  onError,
  buttonText,
  buttonClassName = "w-full py-3 px-4 rounded-lg font-medium shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200",
  disabled = false,
}: Web3TransactionProps) {
  const { t } = useLanguage();
  const { 
    isConnected, 
    address, 
    isPending,
    setIsPending,
    setPendingMessage 
  } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  const executeTransaction = async () => {
    if (!isConnected || !address || !window.ethereum) {
      toast.error(t('web3.connect_prompt'));
      if (onError) onError(new Error('Wallet not connected'));
      return;
    }

    setIsLoading(true);
    setPendingMessage(t('web3.transaction_pending'));
    setIsPending(true);

    try {
      let txHash;

      if (contractAddress) {
        // Contract transaction
        // This is a simplified example - in a real app, you would use ethers.js or web3.js
        // to create contract instances and interact with them
        
        // For now, we'll just simulate a contract transaction with a basic eth_sendTransaction
        txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: address,
            to: contractAddress,
            value,
            data: encodeFunctionCall(functionName, args), // This is a placeholder for proper ABI encoding
            gas: '0x' + Math.floor(21000 * GAS_LIMIT_FACTOR).toString(16), // Very basic gas estimate
          }],
        });
      } else {
        // Simple ETH transfer
        txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: address,
            to: args[0], // Assuming first argument is the recipient address
            value,
            gas: '0x' + Math.floor(21000 * GAS_LIMIT_FACTOR).toString(16),
          }],
        });
      }

      toast.success(t('web3.transaction_success'));
      if (onSuccess && txHash) onSuccess(String(txHash));
    } catch (error) {
      console.error('Transaction error:', error);
      
      let errorMessage = t('web3.transaction_error');
      if (error instanceof Error) {
        // Check for user rejection
        if (error.message.includes('User denied') || error.message.includes('user rejected')) {
          errorMessage = t('web3.signature_rejected');
        }
      }
      
      toast.error(errorMessage);
      if (onError) onError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setIsLoading(false);
      setIsPending(false);
    }
  };

  // Placeholder function for ABI encoding - in a real app, use proper ABI encoding
  const encodeFunctionCall = (functionName: string, args: unknown[]): string => {
    // This is a simplified placeholder - not actual ABI encoding!
    // In a real app, use ethers.js Interface or web3.js ABI encoding
    const functionSignature = `${functionName}(${args.map(() => 'uint256').join(',')})`;
    const functionHash = '0x' + functionSignature.substring(0, 8); // Not real hashing!
    
    // Just a placeholder to return something that looks like encoded data
    return functionHash + args.map(arg => String(arg).padStart(64, '0')).join('');
  };

  return (
    <button
      onClick={executeTransaction}
      disabled={disabled || isLoading || isPending || !isConnected}
      className={`${buttonClassName} ${
        disabled || isLoading || isPending || !isConnected
          ? 'opacity-70 cursor-not-allowed'
          : ''
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader2 size={18} className="animate-spin mr-2" /> {t('web3.transaction_pending')}
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
}
