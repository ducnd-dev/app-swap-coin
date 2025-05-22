import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { getTokenPrice, getHistoricalPrices } from '@/app/lib/api/prices';

/**
 * GET /api/tokens/price
 * Fetches real-time and historical price data for a token
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authentication optional - public endpoint
    await authenticateRequest(req);
    
    // Parse query parameters
    const url = new URL(req.url);
    const symbol = url.searchParams.get('symbol');
    const days = url.searchParams.get('days');
    
    // Validate symbol
    if (!symbol) {
      return NextResponse.json(
        { error: 'Token symbol is required' },
        { status: 400 }
      );
    }
    
    // Check if token exists in our database
    const token = await prisma.token.findUnique({
      where: { symbol },
    });
    
    if (!token) {
      return NextResponse.json(
        { error: `Token ${symbol} not found` },
        { status: 404 }
      );
    }
    
    // Get current price
    const price = await getTokenPrice(symbol);
    
    // Get historical data if requested
    let history = null;
    if (days) {
      try {
        const daysNum = parseInt(days, 10) || 7;
        history = await getHistoricalPrices(symbol, daysNum);
      } catch (error) {
        console.error(`Error getting historical prices for ${symbol}:`, error);
        // Continue with current price only if history fails
      }
    }
    
    return NextResponse.json({
      token: {
        symbol: token.symbol,
        name: token.name,
        network: token.network,
      },
      price,
      history,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching token price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token price' },
      { status: 500 }
    );
  }
}
