// Environment variable debug endpoint - REMOVE FOR PRODUCTION
import { NextResponse } from 'next/server';

export async function GET() {
  // Get environment variable statuses (not the actual values for security)
  const envStatus = {
    TELEGRAM_BOT_TOKEN: {
      exists: !!process.env.TELEGRAM_BOT_TOKEN,
      length: (process.env.TELEGRAM_BOT_TOKEN || '').length,
    },
    NEXT_PUBLIC_APP_URL: {
      exists: !!process.env.NEXT_PUBLIC_APP_URL,
      value: process.env.NEXT_PUBLIC_APP_URL, // Public URL is safe to expose
    },
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json(envStatus);
}
