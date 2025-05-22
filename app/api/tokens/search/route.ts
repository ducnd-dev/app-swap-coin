import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { getTokenPrice } from '@/app/lib/api/prices';

/**
 * GET /api/tokens/search
 * Searches for tokens based on a query string
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authentication optional - public endpoint
    await authenticateRequest(req);
    
    // Parse query parameter
    const url = new URL(req.url);
    const query = url.searchParams.get('q') || '';
    
    // Return empty if query is too short
    if (query.length < 2) {
      return NextResponse.json({ tokens: [] });
    }
    
    // Search for tokens
    const tokens = await prisma.token.findMany({
      where: {
        OR: [
          {
            symbol: {
              contains: query.toUpperCase(),
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
        isActive: true,
      },
      take: 10, // Limit results
      orderBy: {
        symbol: 'asc',
      },
    });
    
    return NextResponse.json({ tokens });
  } catch (error) {
    console.error('Error searching tokens:', error);
    return NextResponse.json(
      { error: 'Failed to search tokens' },
      { status: 500 }
    );
  }
}
