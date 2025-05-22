import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * GET /api/transactions
 * Fetches transaction history for the current user
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authentication required
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }
    
    // Parse query parameters
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const walletAddress = url.searchParams.get('walletAddress');
    const isSimulated = url.searchParams.get('isSimulated');
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = parseInt(url.searchParams.get('skip') || '0', 10);
    
    // Build filters
    const filters: any = {
      userId: user.id,
    };
    
    if (status) {
      filters.status = status.toUpperCase();
    }
    
    if (walletAddress) {
      filters.walletAddress = walletAddress;
    }
    
    if (isSimulated === 'true') {
      filters.isSimulated = true;
    } else if (isSimulated === 'false') {
      filters.isSimulated = false;
    }
    
    // Fetch transactions
    const transactions = await prisma.transaction.findMany({
      where: filters,
      include: {
        fromToken: {
          select: {
            symbol: true,
            name: true,
            icon: true,
            network: true,
          },
        },
        toToken: {
          select: {
            symbol: true,
            name: true,
            icon: true,
            network: true,
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
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
