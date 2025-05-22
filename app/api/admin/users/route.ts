import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse, isAdmin } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * GET /api/admin/users
 * Admin endpoint to manage users
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
    
    // Parse query parameters
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const skip = parseInt(url.searchParams.get('skip') || '0', 10);
    const search = url.searchParams.get('search');
    
    // Build filters
    const filters: Record<string, unknown> = {};
    
    if (search) {
      filters.OR = [
        {
          username: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          telegramId: {
            equals: parseInt(search) || undefined,
          },
        },
      ];
    }
    
    // Fetch users
    const users = await prisma.user.findMany({
      where: filters,
      include: {
        _count: {
          select: {
            wallets: true,
            transactions: true,
            priceAlerts: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: skip,
    });
    
    // Get total count for pagination
    const totalCount = await prisma.user.count({
      where: filters,
    });
      return NextResponse.json({
      users: users.map((user: { 
        id: string;
        telegramId: number;
        username: string | null;
        firstName: string | null;
        language: string | null;
        activityPoints: number;
        createdAt: Date;
        updatedAt: Date;
        _count: {
          wallets: number;
          transactions: number;
          priceAlerts: number;
        }
      }) => ({
        id: user.id,
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
        language: user.language,
        activityPoints: user.activityPoints,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        walletsCount: user._count.wallets,
        transactionsCount: user._count.transactions,
        alertsCount: user._count.priceAlerts,
      })),
      pagination: {
        total: totalCount,
        limit,
        skip,
      },
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
