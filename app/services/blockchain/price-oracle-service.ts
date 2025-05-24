// Backend service for blockchain operations
import { ethers } from 'ethers';
import { TokenPrice } from '@/app/lib/api/oracle-price-api';

// Chainlink Oracle contract addresses on Ethereum
const CHAINLINK_ORACLES: Record<string, string> = {
  'ETH': '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH/USD
  'BTC': '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c', // BTC/USD
  'USDT': '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D', // USDT/USD
};

// Simple ABI for Chainlink Price Feed
const CHAINLINK_PRICE_FEED_ABI = [
  "function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
  "function decimals() external view returns (uint8)"
];

// Cache provider to increase performance
let providerInstance: ethers.providers.JsonRpcProvider | null = null;
let providerTimestamp = 0;
const PROVIDER_TTL = 60 * 1000; // 60 seconds
const PROVIDER_TIMEOUT = 5000; // 5 seconds

/**
 * Get Ethereum provider with caching
 * @returns Ethers Provider with timeout
 */
function getProvider() {
  const currentTime = Date.now();
  
  // If there is a provider in the cache and it's still valid, use it
  if (providerInstance && currentTime - providerTimestamp < PROVIDER_TTL) {
    return providerInstance;
  }

  // List of RPC URLs from environment variables and fallback
  let rpcUrlsFromEnv: string[] = [];
  if (process.env.ETHEREUM_RPC_URL) {
    // Support multiple URLs separated by commas
    rpcUrlsFromEnv = process.env.ETHEREUM_RPC_URL.split(',').map(url => url.trim());
    console.log(`Found ${rpcUrlsFromEnv.length} RPC URLs from environment variables`);
  }
  
  // Combine from environment and fallback
  const rpcUrls = [
    ...rpcUrlsFromEnv,
    "https://ethereum.publicnode.com", // Public Node
    "https://1rpc.io/eth", // 1RPC
    "https://cloudflare-eth.com" // Cloudflare
  ].filter(Boolean) as string[];
  
  // Choose a random RPC URL from the list
  const randomIndex = Math.floor(Math.random() * rpcUrls.length);
  const rpcUrl = rpcUrls[randomIndex];
  
  try {
    console.log(`Connecting to RPC: ${rpcUrl}`);
    
    // Create a new provider with timeout
    const provider = new ethers.providers.JsonRpcProvider({
      url: rpcUrl,
      timeout: PROVIDER_TIMEOUT,
    });
    
    // Additional configuration for the provider
    provider.pollingInterval = 10000; // 10 seconds to reduce load on RPC
    
    // Save to cache
    providerInstance = provider;
    providerTimestamp = currentTime;
    
    return provider;
  } catch (error) {
    console.error(`Error creating provider with ${rpcUrl}:`, error);
    
    // Try Cloudflare if all else fails
    const fallbackProvider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com");
    providerInstance = fallbackProvider;
    providerTimestamp = currentTime;
    
    return fallbackProvider;
  }
}

// Cache for Chainlink prices to reduce number of requests
interface PriceCache {
  data: TokenPrice;
  timestamp: number;
}

const priceCache: Record<string, PriceCache> = {};
const CACHE_TTL = 30 * 1000; // 30 seconds

/**
 * Get price from Chainlink Oracle with timeout and cache
 * @param symbol Cryptocurrency symbol (ETH, BTC, USDT)
 * @param tryCount Number of retry attempts (for error handling)
 * @returns Price and update information
 */
export async function getTokenPriceFromChainlink(symbol: string, tryCount: number = 0): Promise<TokenPrice> {
  const normalizedSymbol = symbol.toUpperCase();
  
  // Check cache
  const currentTime = Date.now();
  if (priceCache[normalizedSymbol] && 
      currentTime - priceCache[normalizedSymbol].timestamp < CACHE_TTL) {
    return priceCache[normalizedSymbol].data;
  }
  
  try {
    if (!CHAINLINK_ORACLES[normalizedSymbol]) {
      throw new Error(`Token ${normalizedSymbol} not supported`);
    }
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout connecting to Chainlink')), 7000);
    });
    
    const dataPromise = (async () => {
      const provider = getProvider();
      
      try {
        const oracle = new ethers.Contract(
          CHAINLINK_ORACLES[normalizedSymbol],
          CHAINLINK_PRICE_FEED_ABI,
          provider
        );
        
        const [decimals, latestData] = await Promise.all([
          oracle.decimals(),
          oracle.latestRoundData()
        ]);
        
        const { answer, updatedAt } = latestData;
        if (!answer || Number(answer) <= 0) {
          throw new Error(`Invalid price for ${normalizedSymbol}: ${answer}`);
        }
        
        const price = Number(answer) / Math.pow(10, decimals);
        const lastUpdated = new Date(Number(updatedAt) * 1000).toISOString();
        
        const result: TokenPrice = {
          symbol: normalizedSymbol,
          price,
          lastUpdated,
          source: 'chainlink',
          change24h: getSimulatedPriceChange(normalizedSymbol)
        };
        
        priceCache[normalizedSymbol] = {
          data: result,
          timestamp: currentTime
        };
        
        console.log(`✅ Retrieved ${normalizedSymbol} price successfully: $${price}`);
        return result;
      } catch (contractError) {
        console.error(`Contract connection error for ${normalizedSymbol}:`, contractError);
        throw contractError;
      }
    })();

    // Race between the actual data fetch and a timeout
    const result = await Promise.race([dataPromise, timeoutPromise]) as TokenPrice;
    return result;
    
  } catch (error) {
    console.error(`Error retrieving ${normalizedSymbol} price from Chainlink:`, error);
    
    if (tryCount < 2) {
      console.log(`Retrying attempt ${tryCount + 1} for ${normalizedSymbol}...`);
      providerInstance = null;
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getTokenPriceFromChainlink(normalizedSymbol, tryCount + 1);
    }
    console.log(`⚠️ Using mock data for ${normalizedSymbol}`);
    const mockData = generateMockTokenPrice(normalizedSymbol);
    
    priceCache[normalizedSymbol] = {
      data: mockData,
      timestamp: currentTime - Math.floor(CACHE_TTL / 2)
    };
    
    return mockData;
  }
}

/**
 * Generate simulated 24h price change
 * @param symbol Currency symbol
 * @returns Change percentage (from -10 to +10)
 */
function getSimulatedPriceChange(symbol: string): number {
  const date = new Date();
  const dateValue = date.getDate() + date.getMonth();
  const symbolValue = symbol.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const seed = (dateValue * symbolValue) % 100;
  return (seed - 50) / 5;
}

/**
 * Generate mock price data when Oracle fails
 * @param symbol Cryptocurrency symbol
 * @returns Mock price data
 */
export function generateMockTokenPrice(symbol: string): TokenPrice {
  const normalizedSymbol = symbol.toUpperCase();
  // More realistic base prices for each token (May 2025)
  const basePrice = {
    'BTC': 120000,
    'ETH': 8500,
    'USDT': 1,
    'USDC': 1,
    'BNB': 850,
    'XRP': 1.25,
    'SOL': 350,
    'DOT': 45,
    'ADA': 2.80
  }[normalizedSymbol] || 100;
  
  // Add random fluctuation ±3%
  const fluctuation = (Math.random() * 0.06) - 0.03; 
  const price = basePrice * (1 + fluctuation);
  
  // Random 24h change from -8% to +8%
  const change24h = (Math.random() * 16) - 8;
  
  return {
    symbol: normalizedSymbol,
    price,
    lastUpdated: new Date().toISOString(),
    change24h,
    source: 'mock'
  };
}

/**
 * Get prices for multiple tokens in parallel
 * @param symbols Array of token symbols
 * @returns Array of token prices
 */
export async function getMultipleTokenPrices(symbols: string[]): Promise<TokenPrice[]> {
  const limitedSymbols = symbols.slice(0, 10); // Limit to 10 tokens for performance
  
  const pricePromises = limitedSymbols.map(async (symbol) => {
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout getting price for ${symbol}`)), 8000);
      });
      
      const dataPromise = getTokenPriceFromChainlink(symbol);
      
      // Use Promise.race to implement timeout
      return await Promise.race([dataPromise, timeoutPromise])
        .catch((error) => {
          console.warn(`Timeout getting price for ${symbol}, using mock data:`, error);
          console.log(`Error occurred at: ${new Date().toISOString()}`);
          
          return {
            ...generateMockTokenPrice(symbol),
            source: 'mock',
            mockReason: 'timeout'
          };
        });
    } catch (error) {
      console.log(`Error getting price for ${symbol}:`, error);
      
      return {
        ...generateMockTokenPrice(symbol),
        source: 'mock', 
        mockReason: 'error'
      };
    }
  });
  
  const results = await Promise.allSettled(pricePromises);
  
  return results
    .map(result => result.status === 'fulfilled' ? result.value : null)
    .filter(Boolean) as TokenPrice[];
}
