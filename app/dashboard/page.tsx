'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

// Components
import WalletSelector from '@/app/components/wallets/WalletSelector';
import SwapInterface from '@/app/components/swap/SwapInterface';
import TransactionHistory from '@/app/components/transactions/TransactionHistory';
import PriceAlerts from '@/app/components/alerts/PriceAlerts';
import LeaderboardTab from '@/app/components/leaderboard/LeaderboardTab';

// Contexts
import { useAuth } from '@/app/contexts/AuthContext';
import { useWallets } from '@/app/contexts/WalletContext';

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, refreshUserData } = useAuth();
  const { selectedWallet, selectWallet } = useWallets();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);
  // Handle wallet change
  const handleWalletChange = (wallet: { id: string; address: string; name?: string; type: string; isDefault: boolean; }) => {
    selectWallet(wallet);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-4 max-w-lg mx-auto">
      {/* User info and wallet selector */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.firstName || 'User'}</h1>
        <p className="text-sm text-gray-500 mb-4">Points: {user?.activityPoints || 0}</p>
        
        <WalletSelector 
          selectedWallet={selectedWallet}
          onWalletChange={handleWalletChange}
        />
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="swap">Swap</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="leaderboard">Rank</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="swap" className="w-full">
          <SwapInterface
            wallet={selectedWallet}
            onSwapComplete={refreshUserData}
          />
        </TabsContent>

        <TabsContent value="history">
          <TransactionHistory />
        </TabsContent>

        <TabsContent value="alerts">
          <PriceAlerts />
        </TabsContent>

        <TabsContent value="leaderboard">
          <LeaderboardTab />
        </TabsContent>

        <TabsContent value="profile">
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-4">Your Profile</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Username:</span> {user?.username || 'Not set'}</p>
              <p><span className="font-medium">Points:</span> {user?.activityPoints}</p>
              <p><span className="font-medium">Member since:</span> {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
              <button 
                onClick={logout}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
