import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../utils/prisma';

/**
 * Middleware to authenticate API requests
 * @param req - The incoming request
 * @returns The user object if authenticated, null otherwise
 */
export async function authenticateRequest(req: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    
    // Decode the token (in a real app, use proper JWT verification)
    // This is a simplified version for demonstration
    const decodedToken = JSON.parse(
      Buffer.from(token, 'base64').toString()
    );

    // Check if token is expired
    if (decodedToken.exp < Date.now()) {
      return null;
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

/**
 * Creates a response for unauthorized requests
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}

/**
 * Middleware to verify user is an admin
 * @param telegramId - The user's Telegram ID
 * @returns Whether the user is an admin
 */
export function isAdmin(telegramId: number): boolean {
  const adminIds = process.env.ADMIN_TELEGRAM_IDS?.split(',').map(Number) || [];
  return adminIds.includes(telegramId);
}
