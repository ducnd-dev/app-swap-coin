// Debug endpoint for Telegram WebApp data
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get data from request
    const body = await req.json();
    const { initData } = body;
    
    // Parse and analyze the initData
    let analysis: Record<string, any> = {
      received: !!initData,
      length: initData?.length || 0,
      env: {
        TELEGRAM_BOT_TOKEN: {
          available: !!process.env.TELEGRAM_BOT_TOKEN,
          length: process.env.TELEGRAM_BOT_TOKEN?.length || 0,
          prefix: process.env.TELEGRAM_BOT_TOKEN?.substring(0, 5) || 'none',
        },
        NODE_ENV: process.env.NODE_ENV,
      }
    };
    
    // Parse if initData exists
    if (initData && typeof initData === 'string') {
      try {
        const params = new URLSearchParams(initData);
        
        // Get all keys from initData
        const keys = Array.from(params.keys());
        
        analysis.keys = keys;
        analysis.hasHash = keys.includes('hash');
        analysis.hasUser = keys.includes('user');
        
        // If hash exists, get its value (partially)
        if (analysis.hasHash) {
          const hash = params.get('hash');
          analysis.hashPrefix = hash?.substring(0, 10) + '...';
        }
        
        // If user exists, try to parse it
        if (analysis.hasUser) {
          try {
            const userStr = params.get('user');
            const user = JSON.parse(decodeURIComponent(userStr || '{}'));
            analysis.userParsed = {
              id: user.id,
              username: user.username,
              first_name: user.first_name,
            };
          } catch (e) {
            analysis.userParsed = { error: 'Failed to parse user data' };
          }
        }
      } catch (e) {
        analysis.parseError = String(e);
      }
    }
    
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({
      error: String(error)
    }, { status: 500 });
  }
}
