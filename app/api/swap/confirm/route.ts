import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { getTransactionReceipt } from '@/app/lib/blockchain/ethereum';
import { sendTransactionNotification } from '@/app/lib/telegram/bot';

/**
 * POST /api/swap/confirm
 * Confirms a real blockchain swap transaction
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
    const { transactionId, txHash, network } = body;
    
    // Validate parameters
    if (!transactionId || !txHash) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // Find the transaction
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        userId: user.id,
      },
      include: {
        fromToken: true,
        toToken: true,
      },
    });
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    // Check if transaction is already confirmed or failed
    if (transaction.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Transaction already ${transaction.status.toLowerCase()}` },
        { status: 400 }
      );
    }
    
    // Verify the transaction on the blockchain
    // This is a simplified version - in a real app you would:
    // 1. Check the receipt status
    // 2. Parse the logs to confirm the swap was successful
    // 3. Verify the amounts match the expected values
    
    // Get the network from the token if not provided
    const tokenNetwork = network || transaction.fromToken.network;
    
    // Get transaction receipt
    const receipt = await getTransactionReceipt(txHash, tokenNetwork);
    
    // Update the transaction status
    let newStatus: 'SUCCESS' | 'FAILED';
    
    if (receipt && receipt.status === 1) {
      newStatus = 'SUCCESS';
    } else {
      newStatus = 'FAILED';
    }
    
    // Update transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: newStatus,
        txHash,
      },
    });
    
    // If transaction was successful, award activity points
    if (newStatus === 'SUCCESS') {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          activityPoints: {
            increment: 5, // Add more points for real transactions
          },
        },
      });
    }
    
    // Send notification
    await sendTransactionNotification(
      user.telegramId,
      transaction.id,
      newStatus,
      {
        fromToken: transaction.fromToken.symbol,
        toToken: transaction.toToken.symbol,
        fromAmount: transaction.fromAmount,
        toAmount: transaction.toAmount,
      }
    );
    
    return NextResponse.json({
      transaction: {
        id: updatedTransaction.id,
        status: updatedTransaction.status,
        txHash: updatedTransaction.txHash,
      },
    });
  } catch (error) {
    console.error('Error confirming swap:', error);
    return NextResponse.json(
      { error: 'Failed to confirm swap' },
      { status: 500 }
    );
  }
}
