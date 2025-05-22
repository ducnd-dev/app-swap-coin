import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * Helper function to get start and end dates for a period
 * @param period - 'daily', 'weekly', or 'monthly'
 * @returns Start and end dates
 */
function getPeriodDates(period: 'daily' | 'weekly' | 'monthly') {
  const now = new Date();
  let startDate: Date;
  
  switch (period) {
    case 'daily':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case 'weekly':
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'monthly':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      throw new Error('Invalid period');
  }
  
  return {
    startDate,
    endDate: new Date(), // Current time
  };
}

/**
 * GET /api/leaderboard/monthly
 * Fetches the monthly leaderboard
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authentication optional
    await authenticateRequest(req);
    
    // Parse query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    
    // Get date range for the month
    const { startDate, endDate } = getPeriodDates('monthly');
    
    // Get users with the most activity points from successful transactions this month
    const users = await prisma.user.findMany({
      where: {
        // Filter users who had successful transactions this month
        transactions: {
          some: {
            status: 'SUCCESS',
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      orderBy: {
        activityPoints: 'desc',
      },
      take: limit,
      select: {
        id: true,
        telegramId: true,
        username: true,
        firstName: true,
        activityPoints: true,
        _count: {
          select: {
            transactions: {
              where: {
                status: 'SUCCESS',
                createdAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          },
        },
      },
    });
    // Format the response
    const leaderboard = users.map((user: { 
      id: string;
      telegramId: number;
      username: string | null;
      firstName: string | null;
      activityPoints: number;
      _count: { transactions: number }
    }, index: number) => ({
      rank: index + 1,
      userId: user.id,
      telegramId: user.telegramId,
      username: user.username || user.firstName || `User ${user.telegramId}`,
      points: user.activityPoints,
      transactionsCount: user._count.transactions,
    }));
    
    return NextResponse.json({
      period: 'monthly',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      leaderboard,
    });
  } catch (error) {
    console.error('Error fetching monthly leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
