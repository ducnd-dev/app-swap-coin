import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * PUT /api/wallets/[id]/default
 * Sets a wallet as the default wallet
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // Authenticate request
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    // Check if wallet exists and belongs to the user
    const wallet = await prisma.wallet.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found or doesn\'t belong to you' },
        { status: 404 }
      );
    }

    // If already default, nothing to do
    if (wallet.isDefault) {
      return NextResponse.json({ wallet });
    }

    // Execute in a transaction to ensure data consistency
    await prisma.$transaction([
      // Unset current default wallets
      prisma.wallet.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      }),
      // Set the requested wallet as default
      prisma.wallet.update({
        where: {
          id,
        },
        data: {
          isDefault: true,
        },
      }),
    ]);

    // Get the updated wallet
    const updatedWallet = await prisma.wallet.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json({ wallet: updatedWallet });
  } catch (error) {
    console.error('Error setting default wallet:', error);
    return NextResponse.json(
      { error: 'Failed to set default wallet' },
      { status: 500 }
    );
  }
}
