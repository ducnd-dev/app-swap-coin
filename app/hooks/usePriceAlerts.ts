'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export interface PriceAlert {
  id: string;
  token: {
    id: string;
    symbol: string;
    name: string;
    icon?: string;
  };
  targetPrice: number;
  condition: 'ABOVE' | 'BELOW';
  isTriggered: boolean;
  isActive: boolean;
  createdAt: string;
}

interface UsePriceAlertsOptions {
  refreshInterval?: number | null;
  statusFilter?: 'all' | 'active' | 'triggered' | 'paused';
}

export const usePriceAlerts = (options: UsePriceAlertsOptions = {}) => {
  const { refreshInterval = null, statusFilter = 'all' } = options;
  
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = {};
      if (statusFilter !== 'all') {
        Object.assign(params, { status: statusFilter });
      }
      
      const response = await axios.get('/api/price-alerts', { params });
      setAlerts(response.data.alerts);
      
    } catch (error) {
      console.error('Error fetching price alerts:', error);
      setError('Failed to load price alerts');
      toast.error('Failed to load price alerts');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  // Initial fetch
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Set up refresh interval if provided
  useEffect(() => {
    if (!refreshInterval) return;
    
    const interval = setInterval(() => {
      fetchAlerts();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval, fetchAlerts]);

  // Add a new price alert
  const addAlert = async (tokenId: string, targetPrice: number, condition: 'ABOVE' | 'BELOW'): Promise<boolean> => {
    try {
      setError(null);
      
      await axios.post('/api/price-alerts', {
        tokenId,
        targetPrice,
        condition
      });
      
      toast.success('Price alert added successfully');
      fetchAlerts();
      return true;    } catch (error: unknown) {
      console.error('Error adding price alert:', error);
      let errorMessage = 'Failed to add price alert';
      
      if (error && typeof error === 'object' && 'response' in error && 
          error.response && typeof error.response === 'object' && 
          'data' in error.response && error.response.data && 
          typeof error.response.data === 'object' && 'error' in error.response.data) {
        errorMessage = error.response.data.error as string;
      }
        
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  };

  // Delete a price alert
  const deleteAlert = async (alertId: string): Promise<boolean> => {
    try {
      setError(null);
      
      await axios.delete(`/api/price-alerts/${alertId}`);
      
      toast.success('Price alert deleted successfully');
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      return true;
    } catch (error) {
      console.error('Error deleting price alert:', error);
      setError('Failed to delete price alert');
      toast.error('Failed to delete price alert');
      return false;
    }
  };

  // Toggle alert active status
  const toggleAlertStatus = async (alertId: string, isActive: boolean): Promise<boolean> => {
    try {
      setError(null);
      
      await axios.patch(`/api/price-alerts/${alertId}`, {
        isActive: !isActive
      });
      
      toast.success(`Alert ${isActive ? 'paused' : 'activated'} successfully`);
      
      // Update the local state
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId 
            ? { ...alert, isActive: !isActive } 
            : alert
        )
      );
      
      return true;
    } catch (error) {
      console.error('Error updating price alert:', error);
      setError('Failed to update price alert');
      toast.error('Failed to update price alert');
      return false;
    }
  };

  return {
    alerts,
    isLoading,
    error,
    refresh: fetchAlerts,
    addAlert,
    deleteAlert,
    toggleAlertStatus
  };
};
