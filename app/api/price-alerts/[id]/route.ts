import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { getTokenPrice } from '@/app/lib/api/prices';

/**
 * PUT /api/price-alerts/[id]
 * Updates a price alert
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authentication required
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }
    
    const { id } = params;
    
    // Find price alert and check if it belongs to the user
    const existingAlert = await prisma.priceAlert.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        token: true,
      },
    });
    
    if (!existingAlert) {
      return NextResponse.json(
        { error: 'Price alert not found' },
        { status: 404 }
      );
    }
    
    // Get request body
    const body = await req.json();
    const { targetPrice, condition, isActive } = body;
    
    // Prepare update data
    const updateData: any = {};
    
    if (targetPrice !== undefined) {
      updateData.targetPrice = parseFloat(targetPrice.toString());
    }
    
    if (condition !== undefined) {
      if (condition !== 'ABOVE' && condition !== 'BELOW') {
        return NextResponse.json(
          { error: 'Invalid condition. Must be ABOVE or BELOW' },
          { status: 400 }
        );
      }
      updateData.condition = condition;
    }
    
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }
    
    // Check if the alert would trigger immediately
    if ((targetPrice !== undefined || condition !== undefined) && isActive) {
      const currentPrice = await getTokenPrice(existingAlert.token.symbol);
      const newTargetPrice = targetPrice !== undefined 
        ? parseFloat(targetPrice.toString()) 
        : existingAlert.targetPrice;
      const newCondition = condition || existingAlert.condition;
      
      const wouldTriggerImmediately = 
        (newCondition === 'ABOVE' && currentPrice >= newTargetPrice) ||
        (newCondition === 'BELOW' && currentPrice <= newTargetPrice);
      
      updateData.isTriggered = wouldTriggerImmediately;
    }
    
    // Update price alert
    const updatedAlert = await prisma.priceAlert.update({
      where: { id },
      data: updateData,
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
    
    // Get current price
    const currentPrice = await getTokenPrice(existingAlert.token.symbol);
    
    return NextResponse.json({
      alert: {
        ...updatedAlert,
        currentPrice,
      },
    });
  } catch (error) {
    console.error('Error updating price alert:', error);
    return NextResponse.json(
      { error: 'Failed to update price alert' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/price-alerts/[id]
 * Deletes a price alert
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Authentication required
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }
    
    const { id } = params;
    
    // Find price alert and check if it belongs to the user
    const existingAlert = await prisma.priceAlert.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
    
    if (!existingAlert) {
      return NextResponse.json(
        { error: 'Price alert not found' },
        { status: 404 }
      );
    }
    
    // Delete price alert
    await prisma.priceAlert.delete({
      where: { id },
    });
    
    return NextResponse.json(
      { message: 'Price alert deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting price alert:', error);
    return NextResponse.json(
      { error: 'Failed to delete price alert' },
      { status: 500 }
    );
  }
}
