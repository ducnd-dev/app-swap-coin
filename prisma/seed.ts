// Prisma seed script for database seeding
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Define common tokens
  const tokens = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '/icons/btc.svg',
      contractAddress: null, // Native currency
      decimals: 8,
      network: 'BTC',
      isActive: true
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '/icons/eth.svg',
      contractAddress: null, // Native currency
      decimals: 18,
      network: 'ETH',
      isActive: true
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      icon: '/icons/usdt.svg',
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 6,
      network: 'ETH',
      isActive: true
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: '/icons/usdc.svg',
      contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
      network: 'ETH',
      isActive: true
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      icon: '/icons/bnb.svg',
      contractAddress: null, // Native currency
      decimals: 18,
      network: 'BSC',
      isActive: true
    }
  ];

  // Upsert each token (create if not exists, update if exists)
  for (const token of tokens) {
    const result = await prisma.token.upsert({
      where: { symbol: token.symbol },
      update: token,
      create: token,
    });
    console.log(`Upserted token: ${result.symbol}`);
  }

  console.log('Database seeding completed.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
