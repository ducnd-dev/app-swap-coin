import { NextRequest, NextResponse } from 'next/server';
import { extractTelegramUserData } from '@/app/lib/telegram/auth';
import { validateTelegramWebAppData } from '@/app/lib/telegram/auth-fix';
import { prisma, initializePrisma } from '@/app/lib/utils/server';

/**
 * POST /api/auth/telegram
 * Authenticates a user based on Telegram WebApp init data
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Initialize Prisma before use
    const dbResult = await initializePrisma().catch(err => {
      console.error('Prisma initialization error:', err);
      return { success: false, error: err };
    });
    
    // Get init data from request
    const body = await req.json();
    const { initData, devMode } = body;
    
    console.log('Auth request received, data length:', initData?.length || 0);
    console.log('Development mode:', devMode === true ? 'YES' : 'NO');

    // Check if in development mode
    if (devMode === true || initData === 'dev_mode_access' || process.env.NODE_ENV === 'development') {
      console.log('Using development mode authentication');
      // Skip validation for development mode
    } else {
      // Validate the data for production
      console.log('Validating with bot token:', process.env.TELEGRAM_BOT_TOKEN ? 'Available' : 'Missing');
      const isValid = validateTelegramWebAppData(initData);
      console.log('Validation result:', isValid);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid Telegram WebApp data' }, 
          { status: 401 }
        );
      }
    }
    
    // Handle user data based on mode
    let userData;
    
    if (devMode === true || initData === 'dev_mode_access' || process.env.NODE_ENV === 'development') {
      // Create mock data for development mode
      userData = {
        id: 12345678,  // Numeric ID to match Telegram ID type
        username: "dev_user",
        first_name: "Developer",
        language_code: "en",
        is_dev: true
      };
      console.log('Using development user:', userData);
    } else {
      // Extract real user data from Telegram
      userData = extractTelegramUserData(initData);
      if (!userData) {
        return NextResponse.json(
          { error: 'Could not extract user data' }, 
          { status: 400 }
        );
      }
    }

    // If database initialization failed and we're not in development mode, return error
    if (!dbResult.success && process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Database connection error', details: dbResult.error },
        { status: 503 }
      );
    }
    
    let user;
    
    try {
      // Find or create the user in the database
      user = await prisma.user.upsert({
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
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      
      // In development mode, create a mock user object
      if (process.env.NODE_ENV === 'development') {
        user = {
          id: 'mock-user-id',
          telegramId: userData.id,
          username: userData.username,
          firstName: userData.first_name,
          activityPoints: 0,
        };
        console.log('Created mock user object:', user);
      } else {
        throw dbError; // Re-throw in production
      }
    }

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
      { error: 'Authentication failed', message: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
