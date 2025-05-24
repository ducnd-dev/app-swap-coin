// Oracle giá tự quản lý sử dụng Chainlink
import { ethers } from 'ethers';

// Số thập phân mà Chainlink Oracle sử dụng
// const DECIMALS = 8;

// Địa chỉ Oracle hợp đồng Chainlink trên Ethereum
const CHAINLINK_ORACLES: Record<string, string> = {
  'ETH': '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH/USD
  'BTC': '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c', // BTC/USD
  'USDT': '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D', // USDT/USD
};

// ABI đơn giản cho Chainlink Price Feed
const CHAINLINK_PRICE_FEED_ABI = [
  "function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
  "function decimals() external view returns (uint8)"
];

// Cache provider để tăng hiệu suất
const providerInstances: Record<string, ethers.providers.JsonRpcProvider> = {};
const providerTimestamps: Record<string, number> = {};
const providerErrors: Record<string, number> = {};
const PROVIDER_TTL = 90 * 1000; // 90 giây

/**
 * Lấy provider Ethereum với cache và fallback
 * @returns Ethers Provider với timeout
 */
function getProvider() {
  const currentTime = Date.now();
    // Danh sách các RPC URLs tin cậy với ưu tiên
  const rpcUrls = [
    process.env.ETHEREUM_RPC_URL,
    "https://rpc.ankr.com/eth", // Ankr - khá đáng tin cậy
    "https://eth-mainnet.public.blastapi.io", // Blast
    "https://ethereum.publicnode.com", // Public Node
    "https://cloudflare-eth.com", // Cloudflare
    "https://eth.llamarpc.com", // LlamaRPC
    "https://eth-mainnet.g.alchemy.com/v2/demo" // Alchemy demo
  ].filter((url): url is string => Boolean(url));
  
  // Tìm provider đã cache mà còn hiệu lực
  for (const rpcUrl of rpcUrls) {
    if (!rpcUrl) continue;
    
    // Bỏ qua các RPC đã từng lỗi nhiều lần
    if (providerErrors[rpcUrl] && providerErrors[rpcUrl] > 3) {
      continue;
    }
    
    // Kiểm tra provider có trong cache và còn hiệu lực
    if (providerInstances[rpcUrl] && 
        providerTimestamps[rpcUrl] && 
        currentTime - providerTimestamps[rpcUrl] < PROVIDER_TTL) {
      return providerInstances[rpcUrl];
    }
  }
  
  // Chọn một RPC URL từ danh sách, ưu tiên các URL đáng tin cậy hơn
  const shuffledRpcs = [...rpcUrls].sort((a, b) => {
    // Các RPC có lỗi sẽ đứng sau
    const aErrors = providerErrors[a] || 0;
    const bErrors = providerErrors[b] || 0;
    return aErrors - bErrors;
  });
  
  const rpcUrl = shuffledRpcs[0] || "https://rpc.ankr.com/eth";
  
  try {
    // Tạo provider mới với cấu hình tối ưu
    const provider = new ethers.providers.JsonRpcProvider({
      url: rpcUrl,
      timeout: 6000, // 6 giây timeout
    });
    
    provider.pollingInterval = 10000; // 10 giây để giảm tải lên RPC
    
    // Lưu vào cache
    providerInstances[rpcUrl] = provider;
    providerTimestamps[rpcUrl] = currentTime;
    
    // Reset error count nếu thành công
    providerErrors[rpcUrl] = 0;
    
    return provider;
  } catch (error) {
    // Đánh dấu RPC này có lỗi
    providerErrors[rpcUrl] = (providerErrors[rpcUrl] || 0) + 1;
    console.error(`Lỗi khi tạo provider với URL ${rpcUrl}:`, error);
    
    // Thử URL khác nếu hiện tại thất bại
    if (shuffledRpcs.length > 1) {
      const backupRpc = shuffledRpcs[1];
      console.log(`Thử lại với RPC dự phòng: ${backupRpc}`);
      
      const backupProvider = new ethers.providers.JsonRpcProvider({
        url: backupRpc,
        timeout: 6000,
      });
      
      providerInstances[backupRpc] = backupProvider;
      providerTimestamps[backupRpc] = currentTime;
      
      return backupProvider;
    }
    
    // Fallback to last chance provider
    return new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com");
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
 * @returns Giá tiền và thông tin cập nhật
 */
export async function getTokenPriceFromChainlink(symbol: string) {
  const normalizedSymbol = symbol.toUpperCase();
  
  // Kiểm tra cache
  const currentTime = Date.now();
  if (priceCache[normalizedSymbol] && 
      currentTime - priceCache[normalizedSymbol].timestamp < CACHE_TTL) {
    return priceCache[normalizedSymbol].data;
  }
  
  try {
    // Kiểm tra xem có hỗ trợ token này không
    if (!CHAINLINK_ORACLES[normalizedSymbol]) {
      throw new Error(`Không hỗ trợ token ${normalizedSymbol}`);
    }
    
    // Thêm timeout cho yêu cầu
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout khi kết nối đến Chainlink')), 5000);
    });
    
    // Thực hiện yêu cầu với timeout
    const dataPromise = (async () => {
      // Kết nối đến mạng Ethereum
      const provider = getProvider();
      
      // Kết nối đến hợp đồng Oracle
      const oracle = new ethers.Contract(
        CHAINLINK_ORACLES[normalizedSymbol],
        CHAINLINK_PRICE_FEED_ABI,
        provider
      );
      
      // Lấy số decimals và dữ liệu mới nhất song song
      const [decimals, latestData] = await Promise.all([
        oracle.decimals(),
        oracle.latestRoundData()
      ]);
      
      const { answer, updatedAt } = latestData;
      
      // Chuyển đổi sang giá USD
      const price = Number(answer) / Math.pow(10, decimals);
      
      // Tạo thời gian cập nhật từ timestamp
      const lastUpdated = new Date(Number(updatedAt) * 1000).toISOString();
      
      const result = {
        symbol: normalizedSymbol,
        price,
        lastUpdated,
        source: 'chainlink',
        change24h: getSimulatedPriceChange(normalizedSymbol)
      };
      
      // Lưu vào cache
      priceCache[normalizedSymbol] = {
        data: result,
        timestamp: currentTime
      };
      
      return result;
    })();
    
    // Chọn giữa kết quả hoặc timeout
    return await Promise.race([dataPromise, timeoutPromise]);
    
  } catch (error) {
    console.error(`Lỗi khi lấy giá ${normalizedSymbol} từ Chainlink:`, error);
    
    // Fallback sang dữ liệu giả nếu Oracle thất bại
    const mockData = generateMockTokenPrice(normalizedSymbol);
    
    // Lưu dữ liệu giả vào cache với thời gian ngắn hơn
    priceCache[normalizedSymbol] = {
      data: mockData,
      timestamp: currentTime - (CACHE_TTL / 2) // Thời gian cache ngắn hơn cho dữ liệu giả
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
  // Giả lập biến động giá dựa trên ngày và ký hiệu token
  const date = new Date();
  const dateValue = date.getDate() + date.getMonth();
  const symbolValue = symbol.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  // Tạo giá trị giả lập từ -10 đến +10
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
  
  // Giá cơ sở cho mỗi token
  const basePrice = {
    'ETH': 3000,
    'BTC': 60000,
    'USDT': 1,
    'USDC': 1,
    'BNB': 400,
    'XRP': 0.5,
  }[normalizedSymbol] || 100;
  
  // Thêm biến động ngẫu nhiên ±5%
  const fluctuation = (Math.random() * 0.1) - 0.05; 
  const price = basePrice * (1 + fluctuation);
  
  // Biến động 24h ngẫu nhiên từ -10% đến +10%
  const change24h = (Math.random() * 20) - 10;
  
  return {
    symbol: normalizedSymbol,
    price,
    lastUpdated: new Date().toISOString(),
    change24h,
    source: 'mock'
  };
}
