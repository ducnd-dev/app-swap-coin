'use client';

import { useEffect, useState } from 'react';
import { useWeb3 } from '@/app/contexts/Web3Context';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { ExternalLink, CheckCircle, Loader2 } from 'lucide-react';

interface Web3TransactionToastProps {
  txHash: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  slippage: number;
  onTxSuccess?: () => void;
}

export default function Web3TransactionToast({
  txHash,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  onTxSuccess
}: Web3TransactionToastProps) {
  const { t } = useLanguage();
  const { networkName } = useWeb3();
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  // Helper to get the block explorer URL based on the network
  const getExplorerUrl = (txHash: string): string => {
    switch (networkName) {
      case 'ethereum':
        return `https://etherscan.io/tx/${txHash}`;
      case 'goerli':
        return `https://goerli.etherscan.io/tx/${txHash}`;
      case 'sepolia':
        return `https://sepolia.etherscan.io/tx/${txHash}`;
      case 'bsc':
        return `https://bscscan.com/tx/${txHash}`;
      case 'bsc-testnet':
        return `https://testnet.bscscan.com/tx/${txHash}`;
      case 'polygon':
        return `https://polygonscan.com/tx/${txHash}`;
      case 'polygon-mumbai':
        return `https://mumbai.polygonscan.com/tx/${txHash}`;
      case 'arbitrum':
        return `https://arbiscan.io/tx/${txHash}`;
      case 'optimism':
        return `https://optimistic.etherscan.io/tx/${txHash}`;
      default:
        return `https://etherscan.io/tx/${txHash}`;
    }
  };

  // Check transaction status (in a real app, you would poll the blockchain)
  useEffect(() => {
    if (!txHash) return;
    
    const checkTxStatus = async () => {
      try {
        // Simulate checking transaction status
        // In a real app, you would use something like:
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const receipt = await provider.getTransactionReceipt(txHash);
        
        // For this example, we'll just simulate a successful transaction after 2 seconds
        setTimeout(() => {
          setStatus('success');
          if (onTxSuccess) onTxSuccess();
        }, 2000);
        
      } catch (error) {
        console.error('Error checking transaction status:', error);
        setStatus('failed');
      }
    };
    
    checkTxStatus();
  }, [txHash, onTxSuccess]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {status === 'pending' && (
          <Loader2 size={16} className="text-blue-400 animate-spin mr-2" />
        )}
        {status === 'success' && (
          <CheckCircle size={16} className="text-green-400 mr-2" />
        )}
        <span className="font-medium">
          {status === 'pending' && t('web3.swap_pending')}
          {status === 'success' && t('web3.swap_successful')}
          {status === 'failed' && t('web3.swap_failed')}
        </span>
      </div>
      
      <div className="text-xs text-blue-300 mt-1">
        {`${fromAmount} ${fromToken} → ${toAmount} ${toToken}`}
      </div>
      
      <a
        href={getExplorerUrl(txHash)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-xs text-blue-400 hover:text-blue-300 mt-2"
      >
        {t('web3.view_transaction')}
        <ExternalLink size={12} className="ml-1" />
      </a>
    </div>
  );
}
