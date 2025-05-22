'use client';

import { useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { useWallets, Wallet as WalletType } from '@/app/contexts/WalletContext';

interface WalletSelectorProps {
  selectedWallet: WalletType | null;
  onWalletChange: (wallet: WalletType) => void;
}

export default function WalletSelector({ selectedWallet, onWalletChange }: WalletSelectorProps) {
  const { 
    wallets, 
    isLoading, 
    addWallet: contextAddWallet, 
    removeWallet: contextRemoveWallet, 
    setDefaultWallet: contextSetDefaultWallet 
  } = useWallets();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newWallet, setNewWallet] = useState({
    address: '',
    name: '',
    type: 'ETH'
  });

  // Function to set a wallet as default
  const setWalletAsDefault = async (wallet: WalletType) => {
    const success = await contextSetDefaultWallet(wallet.id);
    if (success) {
      toast.success(`${wallet.name || wallet.address.substring(0, 8)} set as default wallet`);
    }
  };

  // Function to add a new wallet
  const addWallet = async () => {
    if (!newWallet.address) {
      toast.error('Wallet address is required');
      return;
    }

    const success = await contextAddWallet(newWallet);
    if (success) {
      toast.success('Wallet added successfully');
      setIsAddDialogOpen(false);
      setNewWallet({
        address: '',
        name: '',
        type: 'ETH'
      });
    }
  };

  // Function to delete a wallet
  const deleteWallet = async (wallet: WalletType) => {
    if (confirm(`Are you sure you want to remove ${wallet.name || wallet.address.substring(0, 8)}?`)) {
      const success = await contextRemoveWallet(wallet.id);
      if (success) {
        toast.success('Wallet removed successfully');
      }
    }
  };

  // Function to format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isLoading) {
    return (
      <div className="border rounded-lg p-4 mb-4 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Your Wallets</h3>
        <button 
          onClick={() => setIsAddDialogOpen(true)} 
          className="text-blue-500 hover:text-blue-600 flex items-center text-sm"
        >
          <Plus size={16} className="mr-1" /> Add Wallet
        </button>
      </div>

      {/* Wallet List */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {wallets.length === 0 ? (
          <div className="border border-dashed rounded-lg p-4 text-center">
            <Wallet className="mx-auto mb-2" size={24} />
            <p className="text-sm text-gray-500">No wallets added yet</p>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add your first wallet
            </button>
          </div>
        ) : (
          wallets.map((wallet) => (
            <div 
              key={wallet.id} 
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selectedWallet?.id === wallet.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => onWalletChange(wallet)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {wallet.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mr-2">
                      Default
                    </span>
                  )}
                  <span className="font-medium">{wallet.name || 'My Wallet'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {!wallet.isDefault && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setWalletAsDefault(wallet);
                      }}
                      className="text-xs text-gray-500 hover:text-blue-500"
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteWallet(wallet);
                    }}
                    className="text-xs text-gray-500 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="mt-1 flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  wallet.type === 'ETH' ? 'bg-blue-500' : 
                  wallet.type === 'BSC' ? 'bg-yellow-500' : 
                  wallet.type === 'TON' ? 'bg-sky-500' : 'bg-gray-500'
                }`}></div>
                <span className="text-xs text-gray-500">{formatAddress(wallet.address)}</span>
                <span className="text-xs ml-1 text-gray-400">({wallet.type})</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Wallet Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="wallet-address" className="text-sm font-medium">
                Wallet Address
              </label>
              <input
                id="wallet-address"
                type="text"
                value={newWallet.address}
                onChange={(e) => setNewWallet({...newWallet, address: e.target.value})}
                placeholder="0x..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="wallet-name" className="text-sm font-medium">
                Wallet Name (Optional)
              </label>
              <input
                id="wallet-name"
                type="text"
                value={newWallet.name}
                onChange={(e) => setNewWallet({...newWallet, name: e.target.value})}
                placeholder="My Trading Wallet"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="wallet-type" className="text-sm font-medium">
                Chain Type
              </label>
              <select
                id="wallet-type"
                value={newWallet.type}
                onChange={(e) => setNewWallet({...newWallet, type: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ETH">Ethereum</option>
                <option value="BSC">Binance Smart Chain</option>
                <option value="TON">TON</option>
                <option value="POLYGON">Polygon</option>
                <option value="ARBITRUM">Arbitrum</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(false)}
              className="px-4 py-2 border rounded-md mr-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addWallet}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Wallet
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
