// Test mock implementation for Telegram WebApp authentication
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * POST /api/debug/mock-telegram-auth
 * Create a mock Telegram WebApp initData with valid hash for testing
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      return NextResponse.json({
        error: 'TELEGRAM_BOT_TOKEN is not configured',
        envCheck: {
          NODE_ENV: process.env.NODE_ENV,
          tokenAvailable: !!process.env.TELEGRAM_BOT_TOKEN,
        }
      }, { status: 400 });
    }
    
    // Create a mock user
    const mockUser = {
      id: 123456789,
      first_name: "Test",
      last_name: "User",
      username: "testuser",
      language_code: "en"
    };
    
    // Create initData params
    const params = new URLSearchParams();
    params.set('query_id', Math.random().toString(36).substring(2, 15));
    params.set('user', encodeURIComponent(JSON.stringify(mockUser)));
    params.set('auth_date', Math.floor(Date.now() / 1000).toString());
    
    // Save params for hash calculation
    const dataCheckArray: string[] = [];
    Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, value]) => {
        dataCheckArray.push(`${key}=${value}`);
      });
    
    const dataCheckString = dataCheckArray.join('\n');
    
    // Calculate hash
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();
    
    const hash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');
    
    // Add hash to params
    params.set('hash', hash);
    
    // Return the initData string and other debug info
    return NextResponse.json({
      initData: params.toString(),
      details: {
        botTokenLength: botToken.length,
        botTokenPrefix: botToken.substring(0, 5) + '...',
        userIdMock: mockUser.id,
        hashCreated: hash.substring(0, 10) + '...',
        hashCalculation: {
          method: 'HMAC-SHA256',
          keyDerivation: 'HMAC-SHA256 of "WebAppData" using bot token',
          dataFormat: 'Sorted key=value pairs joined with newlines'
        }
      }
    });
  } catch (error) {
    console.error('Error creating mock auth data:', error);
    return NextResponse.json({
      error: 'Failed to create mock auth data: ' + (error as Error).message
    }, { status: 500 });
  }
}
