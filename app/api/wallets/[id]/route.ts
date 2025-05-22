import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * PUT /api/wallets/[id]
 * Updates a wallet's information
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authenticate request
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = params;
    
    // Get wallet data from request
    const body = await req.json();
    const { name } = body;

    // Check if wallet exists and belongs to the user
    const existingWallet = await prisma.wallet.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingWallet) {
      return NextResponse.json(
        { error: 'Wallet not found or doesn\'t belong to you' },
        { status: 404 }
      );
    }

    // Update the wallet
    const updatedWallet = await prisma.wallet.update({
      where: {
        id,
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ wallet: updatedWallet });
  } catch (error) {
    console.error('Error updating wallet:', error);
    return NextResponse.json(
      { error: 'Failed to update wallet' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/wallets/[id]
 * Deletes a wallet
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authenticate request
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }

    const { id } = params;

    // Check if wallet exists and belongs to the user
    const existingWallet = await prisma.wallet.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingWallet) {
      return NextResponse.json(
        { error: 'Wallet not found or doesn\'t belong to you' },
        { status: 404 }
      );
    }

    // If this is the default wallet, find a new default wallet
    if (existingWallet.isDefault) {
      // Find another wallet to set as default
      const anotherWallet = await prisma.wallet.findFirst({
        where: {
          userId: user.id,
          id: { not: id },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (anotherWallet) {
        await prisma.wallet.update({
          where: {
            id: anotherWallet.id,
          },
          data: {
            isDefault: true,
          },
        });
      }
    }

    // Delete the wallet
    await prisma.wallet.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: 'Wallet deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting wallet:', error);
    return NextResponse.json(
      { error: 'Failed to delete wallet' },
      { status: 500 }
    );
  }
}
