import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { simulateSwap } from '@/app/lib/blockchain/ethereum';
import { sendTransactionNotification } from '@/app/lib/telegram/bot';

/**
 * POST /api/swap/execute
 * Executes a token swap (simulation or preparation for real swap)
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
    const { 
      fromToken, 
      toToken, 
      fromAmount, 
      walletAddress,
      slippage = 0.5,
      isSimulated = true 
    } = body;
    
    // Validate parameters
    if (!fromToken || !toToken || !fromAmount || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    console.log('Execute swap parameters:', { fromToken, toToken, fromAmount, walletAddress, slippage });
    
    // Check if fromToken and toToken are IDs or symbols
    let fromTokenData = null;
    let toTokenData = null;
    
    // Try to find by symbol first
    fromTokenData = await prisma.token.findUnique({
      where: { symbol: fromToken },
    });
    
    // If not found by symbol, try to find by ID
    if (!fromTokenData) {
      fromTokenData = await prisma.token.findUnique({
        where: { id: fromToken },
      });
    }
    
    // Same for toToken
    toTokenData = await prisma.token.findUnique({
      where: { symbol: toToken },
    });
    
    if (!toTokenData) {
      toTokenData = await prisma.token.findUnique({
        where: { id: toToken },
      });
    }
    
    if (!fromTokenData || !toTokenData) {
      return NextResponse.json(
        { error: 'One or both tokens not found' },
        { status: 404 }
      );
    }
    
    // Use symbol for simulation
    const fromTokenSymbol = fromTokenData.symbol;
    const toTokenSymbol = toTokenData.symbol;
    
    // Check if the wallet belongs to the user
    const wallet = await prisma.wallet.findFirst({
      where: {
        userId: user.id,
        address: walletAddress,
      },
    });
    
    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found or doesn\'t belong to you' },
        { status: 404 }
      );
    }
    
    // Simulate or prepare the swap
    try {
      const swapResult = await simulateSwap(
        fromTokenSymbol,
        toTokenSymbol,
        fromAmount,
        slippage
      );
      
      // Create transaction record
      const transaction = await prisma.transaction.create({
        data: {
          userId: user.id,
          fromTokenId: fromTokenData.id,
          toTokenId: toTokenData.id,
          fromAmount,
          toAmount: swapResult.toAmount,
          rate: swapResult.rate,
          status: 'PENDING',
          walletAddress,
          slippage,
          gasFee: swapResult.estimatedGas,
          isSimulated,
        },
      });
      
      // If it's a simulated swap, mark it as successful immediately
      if (isSimulated) {
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'SUCCESS',
          },
        });
        
        // Increase user's activity points
        await prisma.user.update({
          where: { id: user.id },
          data: {
            activityPoints: {
              increment: 1, // Add 1 point for simulated swap
            },
          },
        });
          // Send notification
        await sendTransactionNotification(
          user.telegramId,
          transaction.id,
          'SUCCESS',
          {
            fromToken: fromTokenSymbol,
            toToken: toTokenSymbol,
            fromAmount,
            toAmount: swapResult.toAmount,
          }
        );
          return NextResponse.json({
          transaction: {
            id: transaction.id,
            status: 'SUCCESS',
            fromToken: fromTokenSymbol,
            toToken: toTokenSymbol,
            fromAmount,
            toAmount: swapResult.toAmount,
            rate: swapResult.rate,
            isSimulated: true,
          },
        });
      }
      
      // For real transactions, return data needed for blockchain interaction
      // In a real implementation, this would return the transaction data to sign
      return NextResponse.json({
        transaction: {
          id: transaction.id,
          status: 'PENDING',
          fromToken: fromTokenSymbol,
          toToken: toTokenSymbol,
          fromAmount,
          toAmount: swapResult.toAmount,
          rate: swapResult.rate,
          isSimulated: false,
          // This would include blockchain transaction details in a real app
          transactionData: {
            // For demo purposes only
            to: "0xSwapContractAddress",
            value: "0",
            data: "0xEncodedSwapFunction",
            gasLimit: "300000",
          }
        },
      });
      
    } catch (error) {
      console.error('Error executing swap:', error);
      return NextResponse.json(
        { error: 'Failed to execute swap' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error executing swap:', error);
    return NextResponse.json(
      { error: 'Failed to execute swap' },
      { status: 500 }
    );
  }
}
