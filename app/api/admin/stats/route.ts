import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse, isAdmin } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * GET /api/admin/stats
 * Admin endpoint to get system statistics
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate and check admin status
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }
    
    if (!isAdmin(user.telegramId)) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }
    
    // Get overall stats
    const totalUsers = await prisma.user.count();
    const totalWallets = await prisma.wallet.count();
    const totalTransactions = await prisma.transaction.count();
    const totalAlerts = await prisma.priceAlert.count();
    
    // Get transaction stats
    const transactionStats = await prisma.transaction.groupBy({
      by: ['status'],
      _count: true,
    });
    
    const transactionByStatus = {
      SUCCESS: 0,
      PENDING: 0,
      FAILED: 0,
    };
      transactionStats.forEach((stat) => {
      if (stat.status === 'SUCCESS' || stat.status === 'PENDING' || stat.status === 'FAILED') {
        transactionByStatus[stat.status as keyof typeof transactionByStatus] = stat._count;
      }
    });
    
    // Get transaction stats by simulation type
    const realTransactions = await prisma.transaction.count({
      where: { isSimulated: false },
    });
    
    const simulatedTransactions = await prisma.transaction.count({
      where: { isSimulated: true },
    });
    
    // Get recent user growth (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });
    
    // Get active users (with transactions in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = await prisma.user.count({
      where: {
        transactions: {
          some: {
            createdAt: {
              gte: thirtyDaysAgo,
            },
          },
        },
      },
    });
    
    // Get most popular tokens from transactions
    const topFromTokens = await prisma.transaction.groupBy({
      by: ['fromTokenId'],
      _count: true,
      orderBy: {
        _count: {
          fromTokenId: 'desc',
        },
      },
      take: 5,
    });
      // Get token details
    const tokenIds = topFromTokens.map((t: { fromTokenId: string }) => t.fromTokenId);
    const tokenDetails = await prisma.token.findMany({
      where: {
        id: {
          in: tokenIds,
        },
      },
    });
      // Create top tokens response
    const topTokens = topFromTokens.map((t: { fromTokenId: string, _count: number }) => {
      const token = tokenDetails.find((td: { id: string }) => td.id === t.fromTokenId);
      return {
        tokenId: t.fromTokenId,
        symbol: token?.symbol || 'Unknown',
        name: token?.name || 'Unknown',
        count: t._count,
      };
    });
    
    return NextResponse.json({
      overview: {
        totalUsers,
        totalWallets,
        totalTransactions,
        totalAlerts,
        activeUsers,
        newUsersLast7Days: newUsers,
      },
      transactions: {
        total: totalTransactions,
        byStatus: transactionByStatus,
        real: realTransactions,
        simulated: simulatedTransactions,
      },
      topTokens,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
