'use client';

import React, { createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useWeb3Wallet, Web3WalletState } from '@/app/hooks/useWeb3Wallet';
import { NETWORK_CONFIG } from '@/app/lib/blockchain/web3';
import { useLanguage } from './LanguageContext';
import { toast } from 'react-hot-toast';

interface Web3ContextType extends Web3WalletState {
  // Methods
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (networkKey: keyof typeof NETWORK_CONFIG) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
  isWeb3Available: boolean;
  
  // Additional state
  isPending: boolean;
  setIsPending: (value: boolean) => void;
  pendingMessage: string;
  setPendingMessage: (message: string) => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const walletHook = useWeb3Wallet();
  const { t } = useLanguage();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [pendingMessage, setPendingMessage] = React.useState<string>('');

  // Auto-connect if the wallet was previously connected
  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window !== 'undefined') {
        const wasConnected = localStorage.getItem('web3WalletConnected') === 'true';
        if (wasConnected && walletHook.isWeb3Available) {
          try {
            await walletHook.connect();
          } catch (error) {
            console.error('Auto-connect failed:', error);
            // Clear the flag since the connection failed
            localStorage.removeItem('web3WalletConnected');
          }
        }
      }
    };
    
    autoConnect();
  }, [walletHook.isWeb3Available, walletHook]);

  // Store connection state in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (walletHook.isConnected) {
        localStorage.setItem('web3WalletConnected', 'true');
      } else {
        localStorage.removeItem('web3WalletConnected');
      }
    }
  }, [walletHook.isConnected]);

  // Extended connect method
  const connect = useCallback(async () => {
    try {
      await walletHook.connect();
    } catch (error) {
      console.error('Connect error:', error);
      toast.error(t('web3.connect_error'));
    }
  }, [walletHook, t]);

  // Extended disconnect method
  const disconnect = useCallback(() => {
    walletHook.disconnect();
    localStorage.removeItem('web3WalletConnected');
  }, [walletHook]);

  return (
    <Web3Context.Provider
      value={{
        ...walletHook,
        connect,
        disconnect,
        isPending,
        setIsPending,
        pendingMessage,
        setPendingMessage
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
