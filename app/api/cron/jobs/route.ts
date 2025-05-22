import { NextRequest, NextResponse } from 'next/server';
import { runScheduledJobs } from '@/app/lib/jobs';

export async function POST(req: NextRequest) {
  try {
    // Check for authorization token
    const authHeader = req.headers.get('authorization');
    const apiKey = process.env.CRON_API_KEY;
    
    // Verify the authorization token if API key is set
    if (apiKey && (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== apiKey)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Run the scheduled jobs
    await runScheduledJobs();
    
    return NextResponse.json({ success: true, message: 'Jobs executed successfully' });
  } catch (error) {
    console.error('Error running jobs via API:', error);
    return NextResponse.json(
      { error: 'Failed to run jobs' },
      { status: 500 }
    );
  }
}

// This allows for external services to trigger our jobs with a GET request if needed
export async function GET(req: NextRequest) {
  return POST(req);
}
