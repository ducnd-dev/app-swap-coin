// Self-managed price Oracle using Chainlink
import { ethers } from 'ethers';

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
  }// Danh sách RPC URLs từ biến môi trường và fallback
  let rpcUrlsFromEnv: string[] = [];
    if (process.env.ETHEREUM_RPC_URL) {
    // Support multiple URLs separated by commas
    rpcUrlsFromEnv = process.env.ETHEREUM_RPC_URL.split(',').map(url => url.trim());
    console.log(`Found ${rpcUrlsFromEnv.length} RPC URLs from environment variables`);
  }
  
  // Kết hợp từ môi trường và fallback
  const rpcUrls = [
    ...rpcUrlsFromEnv,
    "https://ethereum.publicnode.com", // Public Node
    "https://1rpc.io/eth", // 1RPC
    "https://cloudflare-eth.com" // Cloudflare
  ].filter(Boolean) as string[];
  
  // Chọn một RPC URL ngẫu nhiên từ danh sách
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
    
    // Lưu vào cache
    providerInstance = provider;
    providerTimestamp = currentTime;
    
    return provider;  } catch (error) {
    console.error(`Error creating provider with ${rpcUrl}:`, error);
    
    // Try Cloudflare if all else fails
    const fallbackProvider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com");
    providerInstance = fallbackProvider;
    providerTimestamp = currentTime;
    
    return fallbackProvider;
  }
}

// Cache cho giá Chainlink để giảm số lượng yêu cầu
interface PriceCache {
  data: {
    symbol: string;
    price: number;
    lastUpdated: string;
    source: string;
    change24h: number;
  };
  timestamp: number;
}

const priceCache: Record<string, PriceCache> = {};
const CACHE_TTL = 30 * 1000; // 30 giây

/**
 * Lấy giá từ Chainlink Oracle với timeout và cache
 * @param symbol Ký hiệu tiền điện tử (ETH, BTC, USDT)
 * @param tryCount Số lần thử lại (để xử lý lỗi)
 * @returns Giá tiền và thông tin cập nhật
 */
export async function getTokenPriceFromChainlink(symbol: string, tryCount: number = 0) {
  const normalizedSymbol = symbol.toUpperCase();
  
  // Kiểm tra cache
  const currentTime = Date.now();
  if (priceCache[normalizedSymbol] && 
      currentTime - priceCache[normalizedSymbol].timestamp < CACHE_TTL) {
    return priceCache[normalizedSymbol].data;
  }
    try {
    if (!CHAINLINK_ORACLES[normalizedSymbol]) {
      throw new Error(`Token ${normalizedSymbol} not supported`);
    }
    
    const timeoutPromise = new Promise((_, reject) => {
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
          
          const result = {
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
          return result;      } catch (contractError) {
        console.error(`Contract connection error for ${normalizedSymbol}:`, contractError);
        throw contractError;
      }
    })();
    const result = await Promise.race([dataPromise, timeoutPromise]);
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
 * Tạo biến động giá 24h giả lập
 * @param symbol Ký hiệu tiền tệ
 * @returns Phần trăm thay đổi (từ -10 đến +10)
 */
function getSimulatedPriceChange(symbol: string): number {
  const date = new Date();
  const dateValue = date.getDate() + date.getMonth();
  const symbolValue = symbol.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const seed = (dateValue * symbolValue) % 100;
  return (seed - 50) / 5;
}

/**
 * Tạo dữ liệu giá giả khi Oracle thất bại
 * @param symbol Ký hiệu tiền điện tử
 * @returns Dữ liệu giá giả
 */
export function generateMockTokenPrice(symbol: string) {
  const normalizedSymbol = symbol.toUpperCase();
  // Giá cơ sở thực tế hơn cho mỗi token (tháng 5/2025)
  const basePrice = {
    'BTC': 120000,
    'USDT': 1,
    'USDC': 1,
    'BNB': 850,
    'XRP': 1.25,
    'SOL': 350,
    'DOT': 45,
    'ADA': 2.80
  }[normalizedSymbol] || 100;
  
  // Thêm biến động ngẫu nhiên ±3%
  const fluctuation = (Math.random() * 0.06) - 0.03; 
  const price = basePrice * (1 + fluctuation);
  
  // Biến động 24h ngẫu nhiên từ -8% đến +8%
  const change24h = (Math.random() * 16) - 8;
  
  return {
    symbol: normalizedSymbol,
    price,
    lastUpdated: new Date().toISOString(),
    change24h,
    source: 'mock'
  };
}
