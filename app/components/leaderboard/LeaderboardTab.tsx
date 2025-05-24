'use client';

import { Trophy, Medal, ChevronRight, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { useLeaderboard, LeaderboardUser } from '@/app/hooks/useLeaderboard';

export default function LeaderboardTab() {
  const { 
    weeklyLeaderboard,
    monthlyLeaderboard,
    userRanking,
    isLoadingWeekly,
    isLoadingMonthly,
    isLoadingUserRanking,
    refreshLeaderboards 
  } = useLeaderboard();  // Format username for display
  const formatUsername = (user: LeaderboardUser) => {
    if (!user) return 'Unknown User';
    return user.username || user.firstName || `User${user.telegramId ? user.telegramId.toString() : 'Unknown'}`;
  };
  // Get medal for top 3 ranks
  const getRankMedal = (rank: number) => {
    if (rank === undefined || rank === null) {
      return <span className="w-5 text-center">-</span>;
    }
    
    switch (rank) {
      case 1:
        return <Trophy size={18} className="text-yellow-500" />;
      case 2:
        return <Medal size={18} className="text-gray-400" />;
      case 3:
        return <Medal size={18} className="text-amber-700" />;
      default:
        return <span className="w-5 text-center">{rank}</span>;
    }
  };
  return (
    <div className="rounded-xl border border-blue-500/30 bg-gray-800 bg-opacity-70 backdrop-blur-lg p-6 shadow-xl">      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">Leaderboard</h3>
        <button
          onClick={refreshLeaderboards}
          className="p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-600/70 text-blue-300 hover:text-blue-200 transition-all duration-200 border border-transparent hover:border-blue-500/30 hover:shadow-sm hover:shadow-blue-500/20"
          disabled={isLoadingWeekly || isLoadingMonthly}
        >
          <RefreshCw size={16} className={isLoadingWeekly || isLoadingMonthly ? 'animate-spin' : ''} />
        </button>
      </div>{/* User ranking card */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2 text-blue-300">Your Ranking</h4>
        {isLoadingUserRanking ? (
          <div className="border border-gray-700/50 rounded-lg p-4 animate-pulse bg-gray-700/40">
            <div className="h-4 bg-gray-600/50 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-gray-600/50 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-gray-600/50 rounded w-full"></div>
          </div>
        ) : userRanking ? (          <div className="border border-blue-500/30 rounded-lg p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm hover:from-blue-900/40 hover:to-purple-900/40 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-blue-300">Current Rank</div>
                <div className="text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-white hover:text-transparent hover:from-blue-200 hover:to-purple-200 transition-all duration-300">#{userRanking?.rank || 'N/A'}</div>
                <div className="text-sm mt-1 text-gray-300">
                  Top {userRanking?.percentile ? userRanking.percentile.toFixed(1) : '10'}% 
                  of all users ({userRanking?.totalUsers || 0} total)
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-300">Points</div>
                <div className="text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-white hover:text-transparent hover:from-blue-200 hover:to-purple-200 transition-all duration-300">{userRanking?.points || 0}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-gray-700/50 rounded-lg p-4 text-center bg-gray-800/50">
            <p className="text-gray-300">Start swapping to earn points and rank on the leaderboard!</p>
          </div>
        )}
      </div>      {/* Leaderboard tabs */}
      <Tabs defaultValue="weekly">        <TabsList className="w-full mb-4 bg-gray-900/50 border border-gray-700/50">
          <TabsTrigger value="weekly" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white hover:bg-gray-700/50 hover:text-blue-200 transition-all duration-200">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white hover:bg-gray-700/50 hover:text-purple-200 transition-all duration-200">Monthly</TabsTrigger>
        </TabsList><TabsContent value="weekly">
          <div className="space-y-1">
            {isLoadingWeekly ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse flex items-center p-3">
                  <div className="w-6 h-6 bg-gray-700 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-12"></div>
                </div>
              ))
            ) : weeklyLeaderboard.length === 0 ? (
              <div className="text-center py-8 text-blue-300">
                No data available for this week yet.
              </div>
            ) : (              weeklyLeaderboard.map((leaderboardUser) => (
                <div key={leaderboardUser?.telegramId || `user-${Math.random()}`} className="flex items-center p-3 rounded-md hover:bg-gray-700/50 border border-transparent hover:border-blue-500/20 transition-all duration-200 group hover:shadow-md hover:shadow-blue-500/5">
                  <div className="w-6 text-center mr-3">
                    {getRankMedal(leaderboardUser?.rank)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-blue-100">{formatUsername(leaderboardUser)}</div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300">
                      {leaderboardUser?.swapVolume ? `$${leaderboardUser.swapVolume} volume` : ''} 
                      {leaderboardUser?.swapCount ? ` • ${leaderboardUser.swapCount} swaps` : ''}
                    </div>
                  </div>
                  <div className="font-medium text-blue-300 group-hover:text-blue-200">{leaderboardUser?.points || 0} pts</div>
                </div>
              ))
            )}            <div className="text-center mt-4">
              <button className="text-blue-300 text-sm flex items-center mx-auto hover:text-blue-200 transition-all duration-200 px-3 py-1.5 rounded-md hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 hover:shadow-sm hover:shadow-blue-500/10">
                View Full Leaderboard <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </TabsContent>        <TabsContent value="monthly">
          <div className="space-y-1">
            {isLoadingMonthly ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse flex items-center p-3">
                  <div className="w-6 h-6 bg-gray-700 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-12"></div>
                </div>
              ))
            ) : monthlyLeaderboard.length === 0 ? (
              <div className="text-center py-8 text-purple-300">
                No data available for this month yet.
              </div>
            ) : (              monthlyLeaderboard.map((leaderboardUser) => (
                <div key={leaderboardUser?.telegramId || `user-${Math.random()}`} className="flex items-center p-3 rounded-md hover:bg-gray-700/50 border border-transparent hover:border-purple-500/20 transition-all duration-200 group hover:shadow-md hover:shadow-purple-500/5">
                  <div className="w-6 text-center mr-3">
                    {getRankMedal(leaderboardUser?.rank)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-purple-100">{formatUsername(leaderboardUser)}</div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300">
                      {leaderboardUser?.swapVolume ? `$${leaderboardUser.swapVolume} volume` : ''} 
                      {leaderboardUser?.swapCount ? ` • ${leaderboardUser.swapCount} swaps` : ''}
                    </div>
                  </div>
                  <div className="font-medium text-purple-300 group-hover:text-purple-200">{leaderboardUser?.points || 0} pts</div>
                </div>
              ))
            )}            <div className="text-center mt-4">
              <button className="text-purple-300 text-sm flex items-center mx-auto hover:text-purple-200 transition-all duration-200 px-3 py-1.5 rounded-md hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20 hover:shadow-sm hover:shadow-purple-500/10">
                View Full Leaderboard <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
