import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse, isAdmin } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * GET /api/admin/transactions
 * Admin endpoint to manage transactions
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
    const status = url.searchParams.get('status');
    const isSimulated = url.searchParams.get('isSimulated');
    const telegramId = url.searchParams.get('telegramId');
    
    // Build filters
    const filters: any = {};
    
    if (status) {
      filters.status = status.toUpperCase();
    }
    
    if (isSimulated === 'true') {
      filters.isSimulated = true;
    } else if (isSimulated === 'false') {
      filters.isSimulated = false;
    }
    
    if (telegramId) {
      filters.user = {
        telegramId: parseInt(telegramId),
      };
    }
    
    // Fetch transactions
    const transactions = await prisma.transaction.findMany({
      where: filters,
      include: {
        user: {
          select: {
            telegramId: true,
            username: true,
            firstName: true,
          },
        },
        fromToken: {
          select: {
            symbol: true,
            name: true,
          },
        },
        toToken: {
          select: {
            symbol: true,
            name: true,
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
    const totalCount = await prisma.transaction.count({
      where: filters,
    });
    
    return NextResponse.json({
      transactions,
      pagination: {
        total: totalCount,
        limit,
        skip,
      },
    });
  } catch (error) {
    console.error('Error fetching admin transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
