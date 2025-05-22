import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * GET /api/users/me/points
 * Fetches the current user's points and ranking
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authentication required
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }
    
    // Get user's current points
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        activityPoints: true,
      },
    });
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get user's rank
    const usersWithHigherPoints = await prisma.user.count({
      where: {
        activityPoints: {
          gt: userData.activityPoints,
        },
      },
    });
    
    const rank = usersWithHigherPoints + 1; // Add 1 to get the rank (1-indexed)
    
    // Get user's transaction stats
    const userStats = await prisma.transaction.groupBy({
      by: ['status'],
      where: {
        userId: user.id,
      },
      _count: true,
    });
    
    // Organize transaction counts
    const stats = {
      totalTransactions: 0,
      successfulTransactions: 0,
      pendingTransactions: 0,
      failedTransactions: 0,
    };
    
    userStats.forEach(stat => {
      stats.totalTransactions += stat._count;
      
      switch (stat.status) {
        case 'SUCCESS':
          stats.successfulTransactions = stat._count;
          break;
        case 'PENDING':
          stats.pendingTransactions = stat._count;
          break;
        case 'FAILED':
          stats.failedTransactions = stat._count;
          break;
      }
    });
    
    // Calculate progress to next level (simple implementation)
    const currentLevel = Math.floor(userData.activityPoints / 100);
    const nextLevelPoints = (currentLevel + 1) * 100;
    const pointsToNextLevel = nextLevelPoints - userData.activityPoints;
    const progress = Math.floor(((userData.activityPoints % 100) / 100) * 100);
    
    return NextResponse.json({
      points: userData.activityPoints,
      rank,
      level: currentLevel,
      nextLevelPoints,
      pointsToNextLevel,
      progress,
      stats,
    });
  } catch (error) {
    console.error('Error fetching user points:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user points' },
      { status: 500 }
    );
  }
}
