import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, unauthorizedResponse, isAdmin } from '@/app/lib/api/auth';
import { prisma } from '@/app/lib/utils/prisma';
import { sendBroadcastMessage } from '@/app/lib/telegram/bot';

/**
 * POST /api/admin/broadcast
 * Admin endpoint to broadcast messages to users
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate and check admin status
    const user = await authenticateRequest(req);
    if (!user) {
      return unauthorizedResponse();
    }
    
    if (!isAdmin(user.telegramId)) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }
    
    // Get request body
    const body = await req.json();
    const { message, target } = body;
    
    // Validate parameters
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Get target users
    let telegramIds: number[] = [];
    
    switch (target) {
      case 'all':
        // Send to all users
        const allUsers = await prisma.user.findMany({
          select: {
            telegramId: true,
          },
        });
        telegramIds = allUsers.map((u: { telegramId: number }) => u.telegramId);
        break;
      case 'active':
        // Send to users who have transactions in the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const activeUsers = await prisma.user.findMany({
          where: {
            transactions: {
              some: {
                createdAt: {
                  gte: thirtyDaysAgo,
                },
              },
            },
          },
          select: {
            telegramId: true,
          },
        });
        telegramIds = activeUsers.map((u: { telegramId: number }) => u.telegramId);
        break;
      case 'inactive':
        // Send to users without transactions in the last 30 days
        const thirtyDaysAgo2 = new Date();
        thirtyDaysAgo2.setDate(thirtyDaysAgo2.getDate() - 30);
        
        const inactiveUsers = await prisma.user.findMany({
          where: {
            transactions: {
              none: {
                createdAt: {
                  gte: thirtyDaysAgo2,
                },
              },
            },
          },
          select: {
            telegramId: true,
          },
        });
        telegramIds = inactiveUsers.map((u: { telegramId: number }) => u.telegramId);
        break;
      case 'custom':
        // Send to specific user IDs
        if (!body.telegramIds || !Array.isArray(body.telegramIds)) {
          return NextResponse.json(
            { error: 'telegramIds array is required when target is custom' },
            { status: 400 }
          );
        }
        telegramIds = body.telegramIds.map((id: string | number) => 
          typeof id === 'string' ? parseInt(id) : id
        );
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid target. Must be all, active, inactive, or custom' },
          { status: 400 }
        );
    }
    
    // Send broadcast message
    await sendBroadcastMessage(telegramIds, message);
    
    return NextResponse.json({
      success: true,
      recipientCount: telegramIds.length,
      message: `Broadcast sent to ${telegramIds.length} users`,
    });
  } catch (error) {
    console.error('Error sending broadcast message:', error);
    return NextResponse.json(
      { error: 'Failed to send broadcast message' },
      { status: 500 }
    );
  }
}
