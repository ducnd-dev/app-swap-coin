'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { 
  isWeb3Available, 
  connectWallet, 
  getChainId, 
  switchNetwork, 
  getBalance,
  registerWalletEvents,
  NETWORK_CONFIG
} from '@/app/lib/blockchain/web3';
import { useLanguage } from '@/app/contexts/LanguageContext';

export interface Web3WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  chainId: string | null;
  balance: string | null;
  networkName: string | null;
  error: string | null;
}

export function useWeb3Wallet() {
  const { t } = useLanguage();
  const [walletState, setWalletState] = useState<Web3WalletState>({
    isConnected: false,
    isConnecting: false,
    address: null,
    chainId: null,
    balance: null,
    networkName: null,
    error: null,
  });
  // Get network name from chainId
  const getNetworkName = useCallback((chainId: string | null): string => {
    if (!chainId) return 'Unknown';
    
    // Convert chainId to network key
    const networkEntries = Object.entries(NETWORK_CONFIG);
    // Using an underscore prefix to indicate intentionally unused variable
    const network = networkEntries.find(([, config]) => config.chainId === chainId);
    
    if (network) {
      return network[0]; // Return network key (e.g., 'ethereum', 'bsc')
    }
    
    return 'Unknown';
  }, []);

  // Connect to wallet
  const connect = useCallback(async () => {
    if (!isWeb3Available()) {
      const errorMessage = t('web3.provider_error');
      toast.error(errorMessage);
      setWalletState(prev => ({ ...prev, error: errorMessage }));
      return;
    }
    
    setWalletState(prev => ({ 
      ...prev, 
      isConnecting: true, 
      error: null 
    }));
    
    try {
      const { address, chainId } = await connectWallet();
      const balanceValue = await getBalance(address);
      const networkName = getNetworkName(chainId);
      
      setWalletState({
        isConnected: true,
        isConnecting: false,
        address,
        chainId,
        balance: balanceValue,
        networkName,
        error: null,
      });
      
      toast.success(t('wallet.connected'));
      
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : t('web3.connect_error');
        
      toast.error(errorMessage);
      setWalletState(prev => ({ 
        ...prev, 
        isConnecting: false, 
        error: errorMessage 
      }));
    }
  }, [t, getNetworkName]);

  // Disconnect from wallet
  const disconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      isConnecting: false,
      address: null,
      chainId: null,
      balance: null,
      networkName: null,
      error: null,
    });
    
    toast.success(t('wallet.disconnect'));
  }, [t]);

  // Switch network
  const switchToNetwork = useCallback(async (networkKey: keyof typeof NETWORK_CONFIG) => {
    if (!isWeb3Available() || !walletState.isConnected) {
      toast.error(t('web3.connect_prompt'));
      return false;
    }
    
    try {
      const success = await switchNetwork(networkKey);
      if (success) {
        toast.success(t('wallet.switch_network'));
        
        // After switching, update chainId
        const chainId = await getChainId();
        setWalletState(prev => ({ 
          ...prev, 
          chainId, 
          networkName: getNetworkName(chainId) 
        }));
      }
      return success;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : t('web3.network_error');
        
      toast.error(errorMessage);
      return false;
    }
  }, [walletState.isConnected, t, getNetworkName]);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    if (!walletState.isConnected || !walletState.address) return;
    
    try {
      const balance = await getBalance(walletState.address);
      setWalletState(prev => ({ ...prev, balance }));
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  }, [walletState.isConnected, walletState.address]);

  // Register wallet events on mount
  useEffect(() => {
    // Only setup events if Web3 is available
    if (!isWeb3Available()) return;
    
    const cleanup = registerWalletEvents({
      onAccountsChanged: (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect();
        } else {
          // User switched accounts
          setWalletState(prev => ({ ...prev, address: accounts[0] }));
          refreshBalance();
        }
      },
      onChainChanged: async (chainId: string) => {
        const networkName = getNetworkName(chainId);
        setWalletState(prev => ({ ...prev, chainId, networkName }));
        refreshBalance();
      },
      onDisconnect: () => {
        disconnect();
      }
    });
    
    // Cleanup event listeners on unmount
    return cleanup;
  }, [disconnect, getNetworkName, refreshBalance]);

  // Auto-refresh balance periodically when connected
  useEffect(() => {
    if (!walletState.isConnected) return;
    
    const intervalId = setInterval(refreshBalance, 15000); // Refresh every 15 seconds
    
    return () => clearInterval(intervalId);
  }, [walletState.isConnected, refreshBalance]);

  return {
    ...walletState,
    connect,
    disconnect,
    switchNetwork: switchToNetwork,
    refreshBalance,
    isWeb3Available: isWeb3Available()
  };
}
