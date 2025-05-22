import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { simulateSwap } from '@/app/lib/blockchain/ethereum';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET /api/swap/quote
 * Gets a quote for swapping tokens
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
    const fromToken = url.searchParams.get('fromToken');
    const toToken = url.searchParams.get('toToken');
    const amount = url.searchParams.get('amount');
    const slippage = url.searchParams.get('slippage') || '0.5';
    
    // Validate parameters
    if (!fromToken || !toToken || !amount) {
      return NextResponse.json(
        { error: 'fromToken, toToken, and amount are required parameters' },
        { status: 400 }
      );
    }
    
    // Check if tokens exist
    const fromTokenData = await prisma.token.findUnique({
      where: { symbol: fromToken },
    });
    
    const toTokenData = await prisma.token.findUnique({
      where: { symbol: toToken },
    });
    
    if (!fromTokenData || !toTokenData) {
      return NextResponse.json(
        { error: 'One or both tokens not found' },
        { status: 404 }
      );
    }
    
    // Simulate swap
    try {
      const swapResult = await simulateSwap(
        fromToken,
        toToken,
        amount,
        parseFloat(slippage)
      );
      
      // Add expiration time to quote
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + 30); // Quote valid for 30 seconds
      
      return NextResponse.json({
        quoteId: uuidv4(), // Generate random ID for the quote
        fromToken,
        toToken,
        fromAmount: swapResult.fromAmount,
        toAmount: swapResult.toAmount,
        rate: swapResult.rate,
        estimatedGas: swapResult.estimatedGas,
        expiresAt: expiresAt.toISOString(),
      });
    } catch (error) {
      console.error('Error simulating swap:', error);
      return NextResponse.json(
        { error: 'Failed to simulate swap' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error getting swap quote:', error);
    return NextResponse.json(
      { error: 'Failed to get swap quote' },
      { status: 500 }
    );
  }
}
