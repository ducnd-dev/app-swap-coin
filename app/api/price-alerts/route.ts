import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { getTokenPrice } from '@/app/lib/api/prices';

/**
 * GET /api/price-alerts
 * Fetches price alerts for the current user
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
    const active = url.searchParams.get('active');
    const triggered = url.searchParams.get('triggered');
      // Build filters
    interface AlertFilters {
      userId: string;
      isActive?: boolean;
      isTriggered?: boolean;
    }
    
    const filters: AlertFilters = {
      userId: user.id,
    };
    
    if (active === 'true') {
      filters.isActive = true;
    } else if (active === 'false') {
      filters.isActive = false;
    }
    
    if (triggered === 'true') {
      filters.isTriggered = true;
    } else if (triggered === 'false') {
      filters.isTriggered = false;
    }
    
    // Fetch price alerts
    const alerts = await prisma.priceAlert.findMany({
      where: filters,
      include: {
        token: {
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
    });
      // Get current prices for each alert
    const alertsWithCurrentPrices = await Promise.all(
      alerts.map(async (alert: {
        id: string;
        token: { symbol: string };
        [key: string]: unknown;
      }) => {
        try {
          const currentPrice = await getTokenPrice(alert.token.symbol);
          return {
            ...alert,
            currentPrice,
          };
        } catch (error) {
          console.error(`Error getting price for ${alert.token.symbol}:`, error);
          return {
            ...alert,
            currentPrice: null,
          };
        }
      })
    );
    
    return NextResponse.json({ alerts: alertsWithCurrentPrices });
  } catch (error) {
    console.error('Error fetching price alerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price alerts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/price-alerts
 * Creates a new price alert
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Authentication required
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }
    
    // Get request body
    const body = await req.json();
    const { tokenSymbol, targetPrice, condition } = body;
    
    // Validate parameters
    if (!tokenSymbol || !targetPrice || !condition) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // Check if condition is valid
    if (condition !== 'ABOVE' && condition !== 'BELOW') {
      return NextResponse.json(
        { error: 'Invalid condition. Must be ABOVE or BELOW' },
        { status: 400 }
      );
    }
    
    // Find token
    const token = await prisma.token.findUnique({
      where: { symbol: tokenSymbol },
    });
    
    if (!token) {
      return NextResponse.json(
        { error: `Token ${tokenSymbol} not found` },
        { status: 404 }
      );
    }
    
    // Get current price to check if alert would trigger immediately
    const currentPrice = await getTokenPrice(tokenSymbol);
    const wouldTriggerImmediately = 
      (condition === 'ABOVE' && currentPrice >= targetPrice) ||
      (condition === 'BELOW' && currentPrice <= targetPrice);
    
    // Create price alert
    const priceAlert = await prisma.priceAlert.create({
      data: {
        userId: user.id,
        tokenId: token.id,
        targetPrice: parseFloat(targetPrice.toString()),
        condition,
        isTriggered: wouldTriggerImmediately,
        isActive: true,
      },
      include: {
        token: {
          select: {
            symbol: true,
            name: true,
            icon: true,
          },
        },
      },
    });
    
    return NextResponse.json(
      { 
        alert: {
          ...priceAlert,
          currentPrice,
        } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating price alert:', error);
    return NextResponse.json(
      { error: 'Failed to create price alert' },
      { status: 500 }
    );
  }
}
