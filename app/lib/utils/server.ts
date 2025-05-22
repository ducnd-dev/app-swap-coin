// Server initialization for Prisma
import 'server-only';
import { prisma } from './prisma';

// This function is used to ensure Prisma is connected before API calls
export async function initializePrisma() {
  try {
    // Log database URL for debugging (hide credentials)
    const dbUrl = process.env.DATABASE_URL || '';
    const hiddenDbUrl = dbUrl.replace(/:\/\/[^@]+@/, '://***:***@');
    console.log('DB Connection String:', hiddenDbUrl);
    
    // Check if URL has database name
    const urlParts = dbUrl.split('?')[0].split('/');
    const dbName = urlParts[urlParts.length - 1];
    console.log('Database name:', dbName || 'MISSING');
    
    // Generate the client if not already done
    await import('@prisma/client');
    
    // Execute a simple query to test the connection
    try {
      // Try a simple query that doesn't depend on schema
      await prisma.$runCommandRaw({ ping: 1 });
      console.log('✅ MongoDB connection test successful');
      return { success: true };
    } catch (pingError) {
      console.error('⚠️ Connection test failed:', pingError);
      
      // If we're in development mode, allow proceeding without a working database
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ Running in development mode - continuing despite DB error');
        return { success: true, warning: 'Database connection failed but continuing in dev mode' };
      }
      
      throw pingError; // Let the outer catch handle it
    }
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    
    // Try to reconnect
    console.log('Attempting to reconnect...');
    try {
      await prisma.$disconnect();
      await prisma.$connect();
      return { success: true, reconnected: true };
    } catch (reconnectError) {
      console.error('Reconnection failed:', reconnectError);
      
      // In development mode, allow proceeding without DB
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ Running in development mode - continuing despite DB error');
        return { success: true, warning: 'Database connection failed but continuing in dev mode' };
      }
      
      return { success: false, error };
    }
  }
}

// Export the prisma client for use in API routes
export { prisma };
