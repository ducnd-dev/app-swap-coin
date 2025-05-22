import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * GET /api/notifications
 * Fetches notifications history for the current user
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
    const type = url.searchParams.get('type');
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const skip = parseInt(url.searchParams.get('skip') || '0', 10);
    
    // Build filters
    const filters: Record<string, unknown> = {
      telegramId: user.telegramId,
    };
    
    if (type) {
      filters.type = type.toUpperCase();
    }
    
    // Fetch notifications
    const notifications = await prisma.notification.findMany({
      where: filters,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: skip,
    });
    
    // Get total count for pagination
    const totalCount = await prisma.notification.count({
      where: filters,
    });
    
    return NextResponse.json({
      notifications,
      pagination: {
        total: totalCount,
        limit,
        skip,
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}
