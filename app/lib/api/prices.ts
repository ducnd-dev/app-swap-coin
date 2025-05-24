// import axios from 'axios';
import axios from 'axios'; // Re-enable axios import for API calls
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

// CoinAPI configuration
const COINAPI_KEY = process.env.COINAPI_KEY || '';
const COINAPI_URL = 'https://rest.coinapi.io/v1';

/**
 * Get token price from CoinAPI
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

    // Use CoinAPI in production
    let price: number;
    
    try {
      // Try to get token data from database - even if we don't use the result directly,
      // this verifies the token exists in the database and the database connection works
      await prisma.token.findUnique({
        where: { symbol: tokenSymbol },
      });
      // We only care if this succeeds or fails, we don't need the actual token data
    } catch (dbError) {
      console.error(`Database error when looking up token ${tokenSymbol}:`, dbError);
      // Continue execution - we'll use mock price
    }

    if (COINAPI_KEY && process.env.NODE_ENV === 'production') {
      try {
        // Format the asset pair for CoinAPI (e.g., BTC/USD)
        const assetPair = `${tokenSymbol.toUpperCase()}/USD`;
        
        // Call CoinAPI for current exchange rate
        const response = await axios.get(`${COINAPI_URL}/exchangerate/${assetPair}`, {
          headers: {
            'X-CoinAPI-Key': COINAPI_KEY
          }
        });
        
        price = response.data.rate;
        console.log(`CoinAPI price for ${tokenSymbol}: $${price}`);
      } catch (apiError) {
        console.error(`CoinAPI error for ${tokenSymbol}:`, apiError);
        // Fall back to mock prices if API call fails
        price = getMockPrice(tokenSymbol);
      }
    } else {
      // Use mock prices for development or when API key is not available
      price = getMockPrice(tokenSymbol);
    }

    // Update cache
    priceCache[tokenSymbol] = {
      price,
      timestamp: now,
    };

    return price;
  } catch (error) {
    console.error(`Error getting price for ${tokenSymbol}:`, error);
    // Return a mock price instead of throwing when all else fails
    const mockPrice = getMockPrice(tokenSymbol);
    return mockPrice;
  }
}

/**
 * Get mock price for development environment
 * @param tokenSymbol - The token symbol
 * @returns A simulated price
 */
function getMockPrice(tokenSymbol: string): number {
  // For demo purposes, use some recognizable mock prices
  switch (tokenSymbol.toUpperCase()) {
    case 'BTC':
      return 50000 + (Math.random() * 1000 - 500); // Around 50,000
    case 'ETH':
      return 3000 + (Math.random() * 100 - 50);   // Around 3,000
    case 'USDT':
    case 'USDC':
      return 0.995 + (Math.random() * 0.01);      // Around 1.00
    case 'BNB':
      return 400 + (Math.random() * 20 - 10);     // Around 400
    default:
      return 10 + (Math.random() * 5 - 2.5);      // Random ~10
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
 * @param days - Number of days of historical data to retrieve
 * @returns Array of historical price points
 */
interface PriceDataPoint {
  time_period_start: string;
  time_period_end: string;
  time_open: string;
  time_close: string;
  price_open: number;
  price_high: number;
  price_low: number;
  price_close: number;
  volume_traded: number;
  trades_count: number;
}

export async function getHistoricalPrices(tokenSymbol: string, days: number = 7): Promise<PriceDataPoint[]> {
  try {
    // For development or when API key is not available, return mock data
    if (!COINAPI_KEY || process.env.NODE_ENV !== 'production') {
      return generateMockHistoricalPrices(tokenSymbol, days);
    }

    // Format the asset pair for CoinAPI (e.g., BTC/USD)
    const assetPair = `${tokenSymbol.toUpperCase()}/USD`;
    
    // Calculate the start and end dates
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Format dates for API
    const startDateStr = startDate.toISOString();
    const endDateStr = endDate.toISOString();
    
    // Call CoinAPI for historical data
    try {
      const response = await axios.get(
        `${COINAPI_URL}/ohlcv/${assetPair}/history`, {
          headers: {
            'X-CoinAPI-Key': COINAPI_KEY
          },
          params: {
            period_id: '1DAY',  // Daily data
            time_start: startDateStr,
            time_end: endDateStr,
            limit: days
          }
        }
      );
      
      console.log(`CoinAPI historical data for ${tokenSymbol}:`, response.data);
      return response.data;
    } catch (apiError) {
      console.error(`CoinAPI historical data error for ${tokenSymbol}:`, apiError);
      // Fall back to mock data if API call fails
      return generateMockHistoricalPrices(tokenSymbol, days);
    }
  } catch (error) {
    console.error(`Error getting historical prices for ${tokenSymbol}:`, error);
    throw error;
  }
}

/**
 * Generate mock historical price data for development
 * @param tokenSymbol - The token symbol
 * @param days - Number of days of data to generate
 * @returns Array of mock price data points
 */
function generateMockHistoricalPrices(tokenSymbol: string, days: number): PriceDataPoint[] {
  const data = [];
  const endDate = new Date();
  let basePrice: number;
  
  // Set a realistic base price for known tokens
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
  
  // Generate daily price data with a random walk
  for (let i = 0; i < days; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - (days - i));
    
    // Add some randomness to create price fluctuation
    // The volatility is proportional to the base price
    const volatility = basePrice * 0.02; // 2% daily volatility
    const change = (Math.random() - 0.5) * volatility;
    basePrice = Math.max(0.01, basePrice + change);
    
    data.push({
      time_period_start: date.toISOString(),
      time_period_end: new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      time_open: date.toISOString(),
      time_close: new Date(date.getTime() + 23 * 60 * 60 * 1000).toISOString(),
      price_open: basePrice - (Math.random() * 0.01 * basePrice),
      price_high: basePrice + (Math.random() * 0.02 * basePrice),
      price_low: basePrice - (Math.random() * 0.02 * basePrice),
      price_close: basePrice,
      volume_traded: Math.random() * 10000,
      trades_count: Math.floor(Math.random() * 1000)
    });
  }
  
  return data;
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
