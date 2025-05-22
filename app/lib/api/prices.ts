// import axios from 'axios';
import { prisma } from '../utils/prisma';

// Cache price data to minimize API calls
interface PriceCache {
  [key: string]: {
    price: number;
    timestamp: number;
  };
}

// In-memory cache with 5-minute expiry
const priceCache: PriceCache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Get token price from CoinGecko or other API
 * @param tokenSymbol - The token symbol
 * @returns The current price in USD
 */
export async function getTokenPrice(tokenSymbol: string): Promise<number> {
  try {
    // Check cache first
    const cachedData = priceCache[tokenSymbol];
    const now = Date.now();
    
    if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
      return cachedData.price;
    }

    // Get token data from database
    const token = await prisma.token.findUnique({
      where: { symbol: tokenSymbol },
    });

    if (!token) {
      throw new Error(`Token ${tokenSymbol} not found in database`);
    }

    // In a real implementation, use CoinGecko or similar API
    // For now, use a mock API call
    
    // This is a placeholder - in production, you would use a real API
    // Example with CoinGecko (would need to map your token symbols to CoinGecko IDs)
    // const response = await axios.get(
    //   `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd`
    // );
    // const price = response.data[coinGeckoId].usd;

    // Mock response for demonstration
    let price: number;

    // For demo purposes, use some recognizable mock prices
    switch (tokenSymbol.toUpperCase()) {
      case 'BTC':
        price = 50000 + (Math.random() * 1000 - 500); // Around 50,000
        break;
      case 'ETH':
        price = 3000 + (Math.random() * 100 - 50);   // Around 3,000
        break;
      case 'USDT':
      case 'USDC':
        price = 0.995 + (Math.random() * 0.01);      // Around 1.00
        break;
      case 'BNB':
        price = 400 + (Math.random() * 20 - 10);     // Around 400
        break;
      default:
        price = 10 + (Math.random() * 5 - 2.5);      // Random ~10
    }

    // Update cache
    priceCache[tokenSymbol] = {
      price,
      timestamp: now,
    };

    return price;
  } catch (error) {
    console.error(`Error getting price for ${tokenSymbol}:`, error);
    throw error;
  }
}

/**
 * Get multiple token prices at once
 * @param tokenSymbols - Array of token symbols
 * @returns Object with token symbols as keys and prices as values
 */
export async function getMultipleTokenPrices(
  tokenSymbols: string[]
): Promise<Record<string, number>> {
  try {
    const results: Record<string, number> = {};
    
    // Process in batches to avoid overwhelming APIs
    const batchSize = 10;
    
    for (let i = 0; i < tokenSymbols.length; i += batchSize) {
      const batch = tokenSymbols.slice(i, i + batchSize);
      
      // Process batch in parallel
      const promises = batch.map(symbol => getTokenPrice(symbol));
      const prices = await Promise.all(promises);
      
      // Map results
      batch.forEach((symbol, index) => {
        results[symbol] = prices[index];
      });
    }
    
    return results;
  } catch (error) {
    console.error('Error getting multiple token prices:', error);
    throw error;
  }
}

/**
 * Get historical price data for a token
 * @param tokenSymbol - The token symbol
 * @param days - Number of days of historical data
 * @returns Array of [timestamp, price] pairs
 */
export async function getHistoricalPrices(
  tokenSymbol: string,
  days: number = 7
): Promise<Array<[number, number]>> {
  try {
    // This would normally fetch from an API like CoinGecko:
    // const response = await axios.get(
    //   `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/market_chart?vs_currency=usd&days=${days}`
    // );
    // return response.data.prices;
    
    // Mock implementation for demonstration
    const now = Date.now();
    const data: Array<[number, number]> = [];
    
    // Create mock daily price data
    let basePrice: number;
    switch (tokenSymbol.toUpperCase()) {
      case 'BTC':
        basePrice = 50000;
        break;
      case 'ETH':
        basePrice = 3000;
        break;
      case 'USDT':
      case 'USDC':
        basePrice = 1;
        break;
      case 'BNB':
        basePrice = 400;
        break;
      default:
        basePrice = 10;
    }
    
    // Generate daily prices with some randomness
    for (let i = days; i >= 0; i--) {
      const timestamp = now - (i * 24 * 60 * 60 * 1000);
      const randomFactor = 1 + ((Math.random() * 10 - 5) / 100); // Random ±5%
      const price = basePrice * randomFactor;
      data.push([timestamp, price]);
    }
    
    return data;
  } catch (error) {
    console.error(`Error getting historical prices for ${tokenSymbol}:`, error);
    throw error;
  }
}

/**
 * Check price alerts and trigger notifications if conditions are met
 */
export async function checkPriceAlerts(): Promise<void> {
  try {
    // Get all active price alerts
    const alerts = await prisma.priceAlert.findMany({
      where: {
        isActive: true,
        isTriggered: false,
      },
      include: {
        user: true,
        token: true,
      },
    });

    // Process each alert
    for (const alert of alerts) {
      const currentPrice = await getTokenPrice(alert.token.symbol);

      // Check if condition is met
      const isTriggered = 
        (alert.condition === 'ABOVE' && currentPrice >= alert.targetPrice) ||
        (alert.condition === 'BELOW' && currentPrice <= alert.targetPrice);

      if (isTriggered) {
        // Update alert status
        await prisma.priceAlert.update({
          where: { id: alert.id },
          data: { isTriggered: true },
        });

        // Import only when needed to avoid circular dependencies
        const { sendPriceAlertNotification } = await import('../telegram/bot');

        // Send notification
        await sendPriceAlertNotification(
          alert.user.telegramId,
          alert.id,
          alert.token.symbol,
          currentPrice,
          alert.targetPrice,
          alert.condition as 'ABOVE' | 'BELOW'
        );
      }
    }
  } catch (error) {
    console.error('Error checking price alerts:', error);
  }
}
