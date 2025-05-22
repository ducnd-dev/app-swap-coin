'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, AlertTriangle, Bell } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { usePriceAlerts } from '@/app/hooks/usePriceAlerts';
import { useTokenOperations } from '@/app/hooks/useTokenOperations';
import { Token } from '@/app/contexts/TokenContext';

export default function PriceAlerts() {
  const { alerts, isLoading, addAlert, deleteAlert, toggleAlertStatus } = usePriceAlerts();
  const { searchTokens } = useTokenOperations();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [newAlert, setNewAlert] = useState({
    tokenId: '',
    targetPrice: '',
    condition: 'ABOVE' as 'ABOVE' | 'BELOW'
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  // Define fetchTokens function with useCallback to avoid dependency issues
  const fetchTokens = useCallback(async () => {
    try {
      const result = await searchTokens('');
      setTokens(result);
      setFilteredTokens(result);
    } catch (error) {
      console.error('Error fetching tokens:', error);
      toast.error('Failed to load tokens');
    }
  }, [searchTokens]);

  // Fetch tokens on component mount
  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  // Filter tokens based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTokens(tokens);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredTokens(
        tokens.filter((token) => 
          token.name.toLowerCase().includes(query) || 
          token.symbol.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, tokens]);

  const handleAddAlert = async () => {
    if (!newAlert.tokenId || !newAlert.targetPrice) {
      toast.error('Please select a token and enter a target price');
      return;
    }

    try {
      const success = await addAlert(
        newAlert.tokenId,
        parseFloat(newAlert.targetPrice),
        newAlert.condition
      );

      if (success) {
        setIsAddDialogOpen(false);
        setNewAlert({
          tokenId: '',
          targetPrice: '',
          condition: 'ABOVE'
        });
      }
    } catch (error) {
      console.error('Error adding alert:', error);
      toast.error('Failed to add price alert');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Price Alerts</h3>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md px-3 py-1.5 flex items-center"
        >
          <Plus size={16} className="mr-1" /> New Alert
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <Bell size={32} className="mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">No price alerts set.</p>
            <p className="text-gray-500 text-sm">
              Create alerts to get notified when tokens hit your target price.
            </p>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md px-4 py-1.5"
            >
              Create First Alert
            </button>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border rounded-lg p-3 ${
                alert.isTriggered ? 'bg-green-50 border-green-200' : 
                !alert.isActive ? 'bg-gray-50 border-gray-200' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">                  {alert.token.icon ? (
                    <Image 
                      src={alert.token.icon} 
                      alt={alert.token.symbol} 
                      className="w-8 h-8 rounded-full mr-3" 
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      {alert.token.symbol.substring(0, 1)}
                    </div>
                  )}
                  
                  <div>
                    <div className="font-medium">{alert.token.symbol}</div>
                    <div className="text-sm text-gray-500">
                      {alert.condition === 'ABOVE' ? 'Above' : 'Below'} ${alert.targetPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {alert.isTriggered ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2">
                      Triggered
                    </span>
                  ) : !alert.isActive ? (
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded mr-2">
                      Paused
                    </span>
                  ) : (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                      Active
                    </span>
                  )}
                  
                  <button 
                    onClick={() => toggleAlertStatus(alert.id, alert.isActive)}
                    className="text-gray-500 hover:text-blue-500 p-1 mr-1"
                  >
                    {alert.isActive ? 'Pause' : 'Activate'}
                  </button>
                  
                  <button 
                    onClick={() => deleteAlert(alert.id)}
                    className="text-gray-500 hover:text-red-500 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              {alert.isTriggered && (
                <div className="mt-2 text-sm text-green-600">
                  ✓ Target price was reached on {formatDate(alert.createdAt)}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Alert Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Price Alert</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {/* Token selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Token
              </label>
              <input
                type="text"
                placeholder="Search tokens..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="max-h-[200px] overflow-y-auto border rounded-md">
                {filteredTokens.map((token) => (
                  <button
                    key={token.id}
                    className={`w-full text-left p-3 hover:bg-gray-50 flex items-center ${
                      newAlert.tokenId === token.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setNewAlert({...newAlert, tokenId: token.id});
                      setSearchQuery('');
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3">                      {token.icon ? (
                        <Image src={token.icon} alt={token.symbol} className="w-5 h-5" width={20} height={20} />
                      ) : (
                        token.symbol.substring(0, 1)
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-xs text-gray-500">{token.name}</div>
                    </div>
                  </button>
                ))}
                
                {filteredTokens.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No tokens found
                  </div>
                )}
              </div>
            </div>
            
            {/* Price and condition */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Alert Condition
              </label>
              <div className="flex space-x-2 mb-4">
                <button
                  className={`flex-1 py-2 rounded-md ${
                    newAlert.condition === 'ABOVE' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setNewAlert({...newAlert, condition: 'ABOVE'})}
                >
                  Above
                </button>
                <button
                  className={`flex-1 py-2 rounded-md ${
                    newAlert.condition === 'BELOW' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setNewAlert({...newAlert, condition: 'BELOW'})}
                >
                  Below
                </button>
              </div>
              
              <label className="block text-sm font-medium mb-2">
                Target Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                  className="w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-start text-sm text-gray-500">
              <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>
                You will be notified via the Telegram Bot when the price reaches your target.
                Make sure you have started the bot.
              </p>
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
              onClick={handleAddAlert}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create Alert
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
