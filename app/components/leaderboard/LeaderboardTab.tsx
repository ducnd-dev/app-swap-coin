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
  } = useLeaderboard();

  // Format username for display
  const formatUsername = (user: LeaderboardUser) => {
    return user.username || user.firstName || `User${user.telegramId}`;
  };

  // Get medal for top 3 ranks
  const getRankMedal = (rank: number) => {
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
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Leaderboard</h3>
        <button
          onClick={refreshLeaderboards}
          className="p-1.5 rounded-full hover:bg-gray-100"
          disabled={isLoadingWeekly || isLoadingMonthly}
        >
          <RefreshCw size={16} className={isLoadingWeekly || isLoadingMonthly ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* User ranking card */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Your Ranking</h4>
        {isLoadingUserRanking ? (
          <div className="border rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ) : userRanking ? (
          <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500">Current Rank</div>
                <div className="text-2xl font-bold">#{userRanking.rank}</div>
                <div className="text-sm mt-1">
                  Top {userRanking.percentile ? userRanking.percentile.toFixed(1) : '10'}% 
                  of all users ({userRanking.totalUsers} total)
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Points</div>
                <div className="text-2xl font-bold">{userRanking.points}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-4 text-center">
            <p className="text-gray-500">Start swapping to earn points and rank on the leaderboard!</p>
          </div>
        )}
      </div>

      {/* Leaderboard tabs */}
      <Tabs defaultValue="weekly">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="weekly" className="flex-1">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <div className="space-y-1">
            {isLoadingWeekly ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse flex items-center p-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              ))
            ) : weeklyLeaderboard.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No data available for this week yet.
              </div>
            ) : (
              weeklyLeaderboard.map((leaderboardUser) => (
                <div key={leaderboardUser.telegramId} className="flex items-center p-3 rounded-md hover:bg-gray-50">
                  <div className="w-6 text-center mr-3">
                    {getRankMedal(leaderboardUser.rank)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{formatUsername(leaderboardUser)}</div>
                    <div className="text-xs text-gray-500">
                      {leaderboardUser.swapVolume && `$${leaderboardUser.swapVolume} volume`} 
                      {leaderboardUser.swapCount && ` • ${leaderboardUser.swapCount} swaps`}
                    </div>
                  </div>
                  <div className="font-medium">{leaderboardUser.points} pts</div>
                </div>
              ))
            )}

            <div className="text-center mt-4">
              <button className="text-blue-500 text-sm flex items-center mx-auto hover:text-blue-600">
                View Full Leaderboard <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <div className="space-y-1">
            {isLoadingMonthly ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse flex items-center p-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              ))
            ) : monthlyLeaderboard.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No data available for this month yet.
              </div>
            ) : (
              monthlyLeaderboard.map((leaderboardUser) => (
                <div key={leaderboardUser.telegramId} className="flex items-center p-3 rounded-md hover:bg-gray-50">
                  <div className="w-6 text-center mr-3">
                    {getRankMedal(leaderboardUser.rank)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{formatUsername(leaderboardUser)}</div>
                    <div className="text-xs text-gray-500">
                      {leaderboardUser.swapVolume && `$${leaderboardUser.swapVolume} volume`} 
                      {leaderboardUser.swapCount && ` • ${leaderboardUser.swapCount} swaps`}
                    </div>
                  </div>
                  <div className="font-medium">{leaderboardUser.points} pts</div>
                </div>
              ))
            )}

            <div className="text-center mt-4">
              <button className="text-blue-500 text-sm flex items-center mx-auto hover:text-blue-600">
                View Full Leaderboard <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
