'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export interface Wallet {
  id: string;
  address: string;
  name?: string;
  type: string;
  isDefault: boolean;
}

interface WalletContextType {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  fetchWallets: () => Promise<void>;
  selectWallet: (wallet: Wallet) => void;
  addWallet: (wallet: Omit<Wallet, 'id' | 'isDefault'>) => Promise<boolean>;
  removeWallet: (walletId: string) => Promise<boolean>;
  setDefaultWallet: (walletId: string) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch wallets on initial load
  useEffect(() => {
    fetchWallets();
  }, []);

  // Function to fetch wallets from API
  const fetchWallets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get('/api/wallets');
      const fetchedWallets = response.data.wallets;
      
      setWallets(fetchedWallets);
      
      // Select default wallet or first wallet
      if (fetchedWallets.length > 0) {
        const defaultWallet = fetchedWallets.find((w: Wallet) => w.isDefault) || fetchedWallets[0];
        setSelectedWallet(defaultWallet);
      } else {
        setSelectedWallet(null);
      }
      
    } catch (error) {
      console.error('Error fetching wallets:', error);
      setError('Failed to load wallets');
      toast.error('Failed to load wallets');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to select a wallet
  const selectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };

  // Function to add a new wallet
  const addWallet = async (wallet: Omit<Wallet, 'id' | 'isDefault'>) => {
    try {
      setError(null);
      const response = await axios.post('/api/wallets', wallet);
      
      if (response.status === 201) {
        toast.success('Wallet added successfully');
        await fetchWallets();
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error adding wallet:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add wallet';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  // Function to remove a wallet
  const removeWallet = async (walletId: string) => {
    try {
      setError(null);
      const response = await axios.delete(`/api/wallets/${walletId}`);
      
      if (response.status === 200) {
        toast.success('Wallet removed successfully');
        await fetchWallets();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing wallet:', error);
      setError('Failed to remove wallet');
      toast.error('Failed to remove wallet');
      return false;
    }
  };

  // Function to set a wallet as default
  const setDefaultWallet = async (walletId: string) => {
    try {
      setError(null);
      const response = await axios.put(`/api/wallets/${walletId}/default`);
      
      if (response.status === 200) {
        toast.success('Default wallet updated');
        await fetchWallets();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error setting default wallet:', error);
      setError('Failed to update default wallet');
      toast.error('Failed to update default wallet');
      return false;
    }
  };

  const value = {
    wallets,
    selectedWallet,
    isLoading,
    error,
    fetchWallets,
    selectWallet,
    addWallet,
    removeWallet,
    setDefaultWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallets = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallets must be used within a WalletProvider');
  }
  return context;
};
