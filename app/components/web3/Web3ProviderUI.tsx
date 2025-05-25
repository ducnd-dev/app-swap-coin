'use client';

import { useEffect } from 'react';
import { useWeb3 } from '@/app/contexts/Web3Context';
import Web3TransactionStatus from './Web3TransactionStatus';

interface Web3ProviderUIProps {
  children: React.ReactNode;
}

/**
 * A UI wrapper for Web3 functionality that handles displaying transaction
 * status and other Web3-related UI elements globally.
 */
export default function Web3ProviderUI({ children }: Web3ProviderUIProps) {
  const { 
    isPending, 
    pendingMessage,
    isConnected,
    connect 
  } = useWeb3();

  // Auto-reconnect on page load if previously connected
  useEffect(() => {
    const autoReconnect = async () => {
      if (typeof window !== 'undefined') {
        const wasConnected = localStorage.getItem('web3WalletConnected') === 'true';
        if (wasConnected && !isConnected) {
          try {
            await connect();
          } catch (error) {
            console.error('Auto-reconnect failed:', error);
          }
        }
      }
    };
    
    autoReconnect();
  }, [isConnected, connect]);

  return (
    <>
      {/* Main content */}
      {children}
      
      {/* Transaction status overlay */}
      <Web3TransactionStatus 
        isPending={isPending} 
        message={pendingMessage} 
      />
    </>
  );
}
