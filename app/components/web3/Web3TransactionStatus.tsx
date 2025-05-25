'use client';

import { useEffect, useState } from 'react';
import { useWeb3 } from '@/app/contexts/Web3Context';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Loader2, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

interface TransactionStatusProps {
  txHash?: string | null;
  isPending?: boolean;
  message?: string;
  onClose?: () => void;
}

export default function Web3TransactionStatus({
  txHash,
  isPending,
  message,
  onClose
}: TransactionStatusProps) {
  const { t } = useLanguage();
  const { networkName } = useWeb3();
  const [isVisible, setIsVisible] = useState(false);

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

  // Show the component when there's a pending transaction or tx hash
  useEffect(() => {
    if (isPending || txHash) {
      setIsVisible(true);
    } else {
      // Hide after a delay when transaction completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isPending, txHash, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800 border border-blue-500/30 rounded-lg shadow-lg p-4 max-w-sm w-full">
        <div className="flex items-start">
          {isPending ? (
            <Loader2 size={24} className="text-blue-400 animate-spin flex-shrink-0 mr-3" />
          ) : txHash ? (
            <CheckCircle2 size={24} className="text-green-400 flex-shrink-0 mr-3" />
          ) : (
            <AlertCircle size={24} className="text-red-400 flex-shrink-0 mr-3" />
          )}
          
          <div className="flex-1">
            <p className="font-medium text-white">{message}</p>
            
            {txHash && (
              <a 
                href={getExplorerUrl(txHash)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 text-sm mt-2"
              >
                {t('web3.transaction_details')}
                <ExternalLink size={14} className="ml-1" />
              </a>
            )}
          </div>
          
          {!isPending && (
            <button 
              onClick={() => {
                setIsVisible(false);
                if (onClose) onClose();
              }}
              className="text-gray-400 hover:text-white flex-shrink-0 ml-3"
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
