// Database check script to verify connection and tokens existence
import { PrismaClient } from '../generated/prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database check...');
  
  try {
    // 1. Check database connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // 2. Check if tokens table exists and has data
    console.log('\nChecking tokens table...');
    const tokenCount = await prisma.token.count();
    console.log(`Found ${tokenCount} tokens in database`);
    
    if (tokenCount > 0) {
      // List available tokens
      const tokens = await prisma.token.findMany({
        select: {
          id: true,
          symbol: true,
          name: true,
          network: true,
          isActive: true
        },
        orderBy: {
          symbol: 'asc'
        }
      });
      
      console.log('\nAvailable tokens:');
      tokens.forEach(token => {
        console.log(`- ${token.symbol} (${token.name}), Network: ${token.network}, Active: ${token.isActive}, ID: ${token.id}`);
      });
    } else {
      console.log('\n⚠️ No tokens found in database. Run seed script with:');
      console.log('npm run prisma:seed:tokens');
    }
    
    // 3. Test token lookup by symbol
    if (tokenCount > 0) {
      console.log('\nTesting token lookup by symbol...');
      const btcToken = await prisma.token.findUnique({
        where: { symbol: 'BTC' }
      });
      
      if (btcToken) {
        console.log('✅ Successfully retrieved BTC token by symbol');
      } else {
        console.log('❌ Could not find BTC token by symbol');
      }
    }
    
  } catch (error) {
    console.error('❌ Error accessing database:', error);
  }
}

main()
  .catch((e) => {
    console.error('Unhandled error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
