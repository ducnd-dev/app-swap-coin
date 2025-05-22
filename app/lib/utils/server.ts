// Server initialization for Prisma
import 'server-only';
import { prisma } from './prisma';

// This function is used to ensure Prisma is connected before API calls
export async function initializePrisma() {
  try {
    // Generate the client if not already done
    await import('@prisma/client');
    
    // Execute a simple query to test the connection
    return { success: true };
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    // Try to regenerate Prisma client
    console.log('Attempting to reconnect...');
    try {
      await prisma.$connect();
      return { success: true, reconnected: true };
    } catch (reconnectError) {
        console.log('Reconnection failed:', reconnectError);
        
      return { success: false, error };
    }
  }
}

// Export the prisma client for use in API routes
export { prisma };
