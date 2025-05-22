import { NextRequest, NextResponse } from 'next/server';
import { validateTelegramWebAppData, extractTelegramUserData } from '@/app/lib/telegram/auth';
import { prisma, initializePrisma } from '@/app/lib/utils/server';

/**
 * POST /api/auth/telegram
 * Authenticates a user based on Telegram WebApp init data
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Initialize Prisma before use
    await initializePrisma();
    
    // Get init data from request
    const body = await req.json();
    const { initData } = body;

    if (!initData) {
      return NextResponse.json(
        { error: 'Missing Telegram WebApp initData' }, 
        { status: 400 }
      );
    }

    // Validate the data
    const isValid = validateTelegramWebAppData(initData);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid Telegram WebApp data' }, 
        { status: 401 }
      );
    }

    // Extract user data
    const userData = extractTelegramUserData(initData);
    if (!userData) {
      return NextResponse.json(
        { error: 'Could not extract user data' }, 
        { status: 400 }
      );
    }

    // Find or create the user in the database
    const user = await prisma.user.upsert({
      where: {
        telegramId: userData.id,
      },
      update: {
        username: userData.username,
        firstName: userData.first_name,
        language: userData.language_code,
        updatedAt: new Date(),
      },
      create: {
        telegramId: userData.id,
        username: userData.username,
        firstName: userData.first_name,
        language: userData.language_code,
      },
    });

    // Generate a session token (in a real app, use a proper auth library)
    // This is for demonstration - in production use next-auth or similar
    const sessionToken = Buffer.from(
      JSON.stringify({
        userId: user.id,
        telegramId: user.telegramId,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    ).toString('base64');

    return NextResponse.json({
      user: {
        id: user.id,
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
        activityPoints: user.activityPoints,
      },
      sessionToken,
    });
  } catch (error) {
    console.error('Error in Telegram authentication:', error);
    return NextResponse.json(
      { error: 'Authentication failed' }, 
      { status: 500 }
    );
  }
}
