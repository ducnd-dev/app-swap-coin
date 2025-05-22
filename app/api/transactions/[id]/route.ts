import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';

/**
 * GET /api/transactions/[id]
 * Fetches details of a specific transaction
 */
export async function GET(
  req: NextRequest,
{params}: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // Authentication required
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }
    
    const { id } = await params;
    
    // Fetch transaction
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
        userId: user.id, // Ensure transaction belongs to the user
      },
      include: {
        fromToken: {
          select: {
            symbol: true,
            name: true,
            icon: true,
            network: true,
            contractAddress: true,
            decimals: true,
          },
        },
        toToken: {
          select: {
            symbol: true,
            name: true,
            icon: true,
            network: true,
            contractAddress: true,
            decimals: true,
          },
        },
      },
    });
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    // If it's a real transaction, get the transaction details from blockchain
    if (!transaction.isSimulated && transaction.txHash) {
      // In a real app, you would fetch additional details from the blockchain here
      // For now, we'll just return the existing transaction data
    }
    
    return NextResponse.json({ transaction });
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction details' },
      { status: 500 }
    );
  }
}
