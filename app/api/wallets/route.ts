import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { isValidAddress } from '@/app/lib/blockchain/ethereum';

/**
 * GET /api/wallets
 * Fetches all wallets for the current user
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate request
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get all wallets for the user
    const wallets = await prisma.wallet.findMany({
      where: {
        userId: user.id,
      },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ wallets });
  } catch (error) {
    console.error('Error fetching wallets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallets' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wallets
 * Creates a new wallet for the current user
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate request
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get wallet data from request
    const body = await req.json();
    const { address, name, type } = body;

    // Validate address
    if (!isValidAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    // Check if wallet already exists
    const existingWallet = await prisma.wallet.findFirst({
      where: {
        userId: user.id,
        address: address,
      },
    });

    if (existingWallet) {
      return NextResponse.json(
        { error: 'Wallet with this address already exists' },
        { status: 400 }
      );
    }

    // Determine if this is the first wallet (to set as default)
    const walletCount = await prisma.wallet.count({
      where: {
        userId: user.id,
      },
    });

    // Create the wallet
    const wallet = await prisma.wallet.create({
      data: {
        address,
        name: name || `${type} Wallet`,
        type,
        isDefault: walletCount === 0, // Set as default if it's the first wallet
        userId: user.id,
      },
    });

    return NextResponse.json(
      { wallet },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating wallet:', error);
    return NextResponse.json(
      { error: 'Failed to create wallet' },
      { status: 500 }
    );
  }
}
