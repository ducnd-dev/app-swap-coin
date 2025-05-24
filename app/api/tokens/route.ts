import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { getMultipleTokenPrices } from '@/app/lib/api/prices';

/**
 * GET /api/tokens
 * Fetches all supported tokens with optional filters
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authentication optional - public endpoint
    // We're not using the user object, but we still authenticate the request
    await authenticateRequest(req);
    
    // Parse query parameters
    const url = new URL(req.url);
    const network = url.searchParams.get('network');
    const active = url.searchParams.get('active');
    const popular = url.searchParams.get('popular');
    const stablecoins = url.searchParams.get('stablecoins');
      
    // Build filters
    interface TokenFilters {
      network?: string;
      isActive?: boolean;
      isPopular?: boolean;
      isStablecoin?: boolean;
    }
    
    const filters: TokenFilters = {};
    
    if (network) {
      filters.network = network;
    }
    
    if (active === 'true') {
      filters.isActive = true;
    } else if (active === 'false') {
      filters.isActive = false;
    }
    
    if (popular === 'true') {
      filters.isPopular = true;
    }
    
    if (stablecoins === 'true') {
      filters.isStablecoin = true;
    }
    
    // Fetch tokens
    const tokens = await prisma.token.findMany({
      where: filters,
      orderBy: {
        symbol: 'asc',
      },    });
    
    // If user is authenticated and tokens are fetched, add price data
    if (tokens.length > 0) {
      try {
        // Get all token symbols
        const symbols = tokens.map((token: { symbol: string }) => token.symbol);
        
        // Fetch prices for all tokens
        const prices = await getMultipleTokenPrices(symbols);
        
        // Add price data to tokens
        const tokensWithPrices = tokens.map((token: { symbol: string, [key: string]: unknown }) => ({
          ...token,
          currentPrice: prices[token.symbol] || null,
        }));
        
        const response = {
          tokens: tokensWithPrices,
          count: tokensWithPrices.length,
          timestamp: new Date().toISOString()
        };
        
        return NextResponse.json(response);      } catch (error) {
        console.error('Error fetching token prices:', error);
        // Return tokens without prices if price fetch fails
        const errorResponse = {
          tokens,
          count: tokens.length,
          timestamp: new Date().toISOString(),
          error: 'Failed to fetch price data'
        };
        return NextResponse.json(errorResponse);
      }
    }
    
    const response = {
      tokens,
      count: tokens.length,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}
