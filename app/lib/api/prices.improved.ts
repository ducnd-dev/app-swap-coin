import axios, { AxiosError } from 'axios';

// CoinAPI configuration
const COINAPI_KEY = process.env.COINAPI_KEY || '';
const COINAPI_URL = 'https://rest.coinapi.io/v1';

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

// Define types for better type safety
export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
  source: 'api' | 'mock';
}

export interface PriceDataPoint {
  time_period_start: string;
  time_period_end: string;
  time_open?: string;
  time_close?: string;
  price_open: number;
  price_high: number;
  price_low: number;
  price_close: number;
  volume_traded?: number;
  trades_count?: number;
  source?: 'api' | 'mock';
}

export interface ApiErrorResponse {
  error: true;
  message: string;
  details?: unknown;
}

/**
 * Get token price from CoinAPI - Database-free implementation
 * @param tokenSymbol - The token symbol
 * @returns The current price in USD
 */
export async function getTokenPrice(tokenSymbol: string): Promise<PriceData | ApiErrorResponse> {
  try {
    // Normalize symbol
    const symbol = tokenSymbol.toUpperCase();
    
    // Check cache first
    const cachedData = priceCache[symbol];
    const now = Date.now();
    
    if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
      return {
        symbol,
        price: cachedData.price,
        timestamp: cachedData.timestamp,
        source: 'mock' // Mark as coming from cache
      };
    }

    // Use CoinAPI if API key is available
    let price: number;
    let source: 'api' | 'mock' = 'mock';

    if (COINAPI_KEY) {
      try {
        // Format the asset pair for CoinAPI (e.g., BTC/USD)
        const assetPair = `${symbol}/USD`;
        
        // Call CoinAPI for current exchange rate
        const response = await axios.get(`${COINAPI_URL}/exchangerate/${assetPair}`, {
          headers: {
            'X-CoinAPI-Key': COINAPI_KEY
          },
          timeout: 10000 // 10 seconds timeout
        });
        
        price = response.data.rate;
        source = 'api';
        console.log(`CoinAPI price for ${symbol}: $${price}`);
      } catch (apiError) {
        console.error(`CoinAPI error for ${symbol}:`, apiError);
        // Fall back to mock prices if API call fails
        price = getMockPrice(symbol);
      }
    } else {
      // Use mock prices when API key is not available
      price = getMockPrice(symbol);
    }

    // Update cache
    priceCache[symbol] = {
      price,
      timestamp: now,
    };

    return {
      symbol,
      price,
      timestamp: now,
      source
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error getting price for ${tokenSymbol}:`, error);
    
    return {
      error: true,
      message: `Failed to get price for ${tokenSymbol}: ${errorMessage}`,
      details: error
    };
  }
}

/**
 * Get mock price for development or when API is unavailable
 * @param tokenSymbol - The token symbol
 * @returns A simulated price
 */
function getMockPrice(tokenSymbol: string): number {
  // For demo purposes, use recognizable mock prices
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
 * Get multiple token prices at once without database dependency
 * @param tokenSymbols - Array of token symbols
 * @returns Object with token symbols as keys and price data as values
 */
export async function getMultipleTokenPrices(
  tokenSymbols: string[]
): Promise<Record<string, PriceData | ApiErrorResponse>> {
  try {
    const results: Record<string, PriceData | ApiErrorResponse> = {};
    
    // Process in batches to avoid overwhelming APIs
    const batchSize = 5; // Smaller batch size to avoid rate limits
    
    for (let i = 0; i < tokenSymbols.length; i += batchSize) {
      const batch = tokenSymbols.slice(i, i + batchSize);
      
      // Process batch in parallel
      const promises = batch.map(symbol => getTokenPrice(symbol));
      const prices = await Promise.all(promises);
      
      // Map results
      batch.forEach((symbol, index) => {
        results[symbol] = prices[index];
      });
      
      // Add a small delay between batches to be API-friendly
      if (i + batchSize < tokenSymbols.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error getting multiple token prices:', error);
    
    // Return an object with error for each requested symbol
    const errorResults: Record<string, ApiErrorResponse> = {};
    tokenSymbols.forEach(symbol => {
      errorResults[symbol] = {
        error: true,
        message: `Failed to get price: ${errorMessage}`,
        details: error
      };
    });
    
    return errorResults;
  }
}

/**
 * Get historical price data for a token without database dependency
 * @param tokenSymbol - The token symbol
 * @param days - Number of days of historical data to retrieve
 * @returns Array of historical price points
 */
export async function getHistoricalPrices(
  tokenSymbol: string, 
  days: number = 7
): Promise<PriceDataPoint[] | ApiErrorResponse> {
  try {
    // Normalize symbol
    const symbol = tokenSymbol.toUpperCase();
    
    // If no API key is available, return mock data right away
    if (!COINAPI_KEY) {
      return generateMockHistoricalPrices(symbol, days);
    }

    // Format the asset pair for CoinAPI (e.g., BTC/USD)
    const assetPair = `${symbol}/USD`;
    
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
          },
          timeout: 10000 // 10 seconds timeout
        }
      );
      
      // Add source information to each data point
      const apiData = response.data.map((point: PriceDataPoint) => ({
        ...point,
        source: 'api' as const
      }));
      
      console.log(`CoinAPI historical data for ${symbol}: ${apiData.length} points`);
      return apiData;
    } catch (apiError) {
      const axiosError = apiError as AxiosError;
      console.error(`CoinAPI historical data error for ${symbol}:`, 
        axiosError.response?.data || axiosError.message);
      
      // Fall back to mock data if API call fails
      return generateMockHistoricalPrices(symbol, days);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error getting historical prices for ${tokenSymbol}:`, error);
    
    return {
      error: true,
      message: `Failed to get historical prices for ${tokenSymbol}: ${errorMessage}`,
      details: error
    };
  }
}

/**
 * Generate mock historical price data for development or when API is unavailable
 * @param tokenSymbol - The token symbol
 * @param days - Number of days of data to generate
 * @returns Array of mock price data points
 */
function generateMockHistoricalPrices(tokenSymbol: string, days: number): PriceDataPoint[] {
  const data: PriceDataPoint[] = [];
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
      trades_count: Math.floor(Math.random() * 1000),
      source: 'mock'
    });
  }
  
  return data;
}
