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
    <main className="flex min-h-screen flex-col p-4 max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      {/* User info and wallet selector */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 pb-1">Welcome, {user?.firstName || 'User'}</h1>
        <p className="text-sm text-gray-300 mb-4">Points: {user?.activityPoints || 0}</p>
        
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-gray-700">
          <WalletSelector 
            selectedWallet={selectedWallet}
            onWalletChange={handleWalletChange}
          />
        </div>
      </div>      {/* Main content tabs */}      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-gray-800 bg-opacity-70 backdrop-blur-lg border border-gray-700 rounded-xl p-1">
          <TabsTrigger value="swap" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">Swap</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">History</TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">Alerts</TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">Rank</TabsTrigger>
        </TabsList>
        <div className="flex justify-between mt-2 mb-4 text-xs bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700/50">
          <button 
            onClick={() => router.push('/tokens')}
            className="text-blue-300 hover:text-blue-200 transition-colors"
          >
            Token Prices
          </button>
          <button 
            onClick={() => router.push('/blockchain')}
            className="text-purple-300 hover:text-purple-200 transition-colors"
          >
            Blockchain Explorer
          </button>
          <button 
            onClick={logout}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>

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
        </TabsContent>        <TabsContent value="profile">
          <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-blue-500/30">
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">Your Profile</h3>
            <div className="space-y-3 bg-gray-800/80 rounded-lg p-4 border border-gray-700/70">
              <p><span className="font-medium text-blue-300">Username:</span> <span className="text-white">{user?.username || 'Not set'}</span></p>
              <p><span className="font-medium text-blue-300">Points:</span> <span className="text-white">{user?.activityPoints}</span></p>
              <p><span className="font-medium text-blue-300">Member since:</span> <span className="text-white">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span></p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
