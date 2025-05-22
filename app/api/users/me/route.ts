import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * GET /api/users/me
 * Fetches the current user's information
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate request
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get user data with related wallets
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        wallets: {
          orderBy: {
            isDefault: 'desc',
          },
        },
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }

    // Calculate user statistics
    const transactionCount = await prisma.transaction.count({
      where: {
        userId: user.id,
      },
    });
    
    // Get the successful transactions to calculate volume
    const successTransactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        status: 'SUCCESS',
      },
      select: {
        fromAmount: true,
        rate: true,
        slippage: true
      }
    });
    
    // Calculate total volume by summing fromAmount values (parsing from string)
    const totalVolumeUSD = successTransactions.reduce((sum, tx) => {
      // Try to parse the fromAmount as a number
      try {
        const amount = parseFloat(tx.fromAmount);
        return !isNaN(amount) ? sum + amount : sum;
      } catch {
        return sum;
      }
    }, 0);
    
    // Calculate average slippage
    const avgSlippage = successTransactions.length > 0 
      ? successTransactions.reduce((sum, tx) => sum + (tx.slippage || 0), 0) / successTransactions.length
      : 0;
    
    console.log('Transaction stats:', { totalVolumeUSD, avgSlippage });
    
    return NextResponse.json({
      user: {
        id: userData.id,
        telegramId: userData.telegramId,
        username: userData.username,
        firstName: userData.firstName,
        language: userData.language,
        activityPoints: userData.activityPoints,
        createdAt: userData.createdAt,
      },
      wallets: userData.wallets.map((wallet) => ({
        id: wallet.id,
        address: wallet.address,
        name: wallet.name,
        type: wallet.type,
        isDefault: wallet.isDefault,
      })),
      stats: {
        transactionCount,
        totalVolumeUSD, 
        avgSlippage: parseFloat(avgSlippage.toFixed(4)) // Format to 4 decimal places
      },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/me
 * Updates the current user's information
 */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate request
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get update data from request
    const body = await req.json();
    const { language } = body;

    // Update user
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        language,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        telegramId: updatedUser.telegramId,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        language: updatedUser.language,
        activityPoints: updatedUser.activityPoints,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
