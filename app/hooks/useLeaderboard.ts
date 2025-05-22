'use client';

import { useState, useEffect, useCallback } from 'react';
import axiosClient from '@/app/lib/api/axios';
import { toast } from 'react-hot-toast';

export interface LeaderboardUser {
  telegramId: number;
  username?: string;
  firstName?: string;
  points: number;
  rank: number;
  swapVolume?: string;
  swapCount?: number;
}

export interface UserRanking {
  points: number;
  rank: number;
  totalUsers: number;
  percentile?: number;
}

export const useLeaderboard = () => {
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardUser[]>([]);
  const [monthlyLeaderboard, setMonthlyLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoadingWeekly, setIsLoadingWeekly] = useState<boolean>(true);
  const [isLoadingMonthly, setIsLoadingMonthly] = useState<boolean>(true);
  const [userRanking, setUserRanking] = useState<UserRanking | null>(null);
  const [isLoadingUserRanking, setIsLoadingUserRanking] = useState<boolean>(true);

  const fetchWeeklyLeaderboard = useCallback(async () => {
    try {
      setIsLoadingWeekly(true);
      const response = await axiosClient.get('/api/leaderboard/weekly');
      setWeeklyLeaderboard(response.data.users);
      return response.data.users;
    } catch (error) {
      console.error('Error fetching weekly leaderboard:', error);
      toast.error('Failed to load weekly leaderboard');
      return [];
    } finally {
      setIsLoadingWeekly(false);
    }
  }, []);

  const fetchMonthlyLeaderboard = useCallback(async () => {
    try {
      setIsLoadingMonthly(true);
      const response = await axiosClient.get('/api/leaderboard/monthly');
      setMonthlyLeaderboard(response.data.users);
      return response.data.users;
    } catch (error) {
      console.error('Error fetching monthly leaderboard:', error);
      toast.error('Failed to load monthly leaderboard');
      return [];
    } finally {
      setIsLoadingMonthly(false);
    }
  }, []);

  const fetchUserRanking = useCallback(async () => {
    try {
      setIsLoadingUserRanking(true);
      const response = await axiosClient.get('/api/users/me/points');
      setUserRanking(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user ranking:', error);
      return null;
    } finally {
      setIsLoadingUserRanking(false);
    }
  }, []);

  const refreshLeaderboards = useCallback(async () => {
    await Promise.all([
      fetchWeeklyLeaderboard(),
      fetchMonthlyLeaderboard(),
      fetchUserRanking()
    ]);
  }, [fetchWeeklyLeaderboard, fetchMonthlyLeaderboard, fetchUserRanking]);

  // Initial fetch
  useEffect(() => {
    refreshLeaderboards();
  }, [refreshLeaderboards]);

  return {
    weeklyLeaderboard,
    monthlyLeaderboard,
    userRanking,
    isLoadingWeekly,
    isLoadingMonthly,
    isLoadingUserRanking,
    refreshLeaderboards,
    fetchWeeklyLeaderboard,
    fetchMonthlyLeaderboard,
    fetchUserRanking
  };
};
