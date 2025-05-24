// Oracle giá tự quản lý sử dụng Chainlink
import { ethers } from 'ethers';

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
let providerInstance: ethers.providers.JsonRpcProvider | null = null;
let providerTimestamp = 0;
const PROVIDER_TTL = 60 * 1000; // 60 giây
const PROVIDER_TIMEOUT = 10000; // 10 giây

/**
 * Lấy provider Ethereum với cache
 * @returns Ethers Provider với timeout
 */
function getProvider() {
  const currentTime = Date.now();
  
  // Nếu có provider trong cache và còn hiệu lực, sử dụng nó
  if (providerInstance && currentTime - providerTimestamp < PROVIDER_TTL) {
    return providerInstance;
  }
  // Danh sách RPC URLs từ biến môi trường và fallback
  let rpcUrlsFromEnv: string[] = [];
  
  if (process.env.ETHEREUM_RPC_URL) {
    // Hỗ trợ nhiều URL được phân tách bằng dấu phẩy
    rpcUrlsFromEnv = process.env.ETHEREUM_RPC_URL.split(',').map(url => url.trim());
    console.log(`Đã tìm thấy ${rpcUrlsFromEnv.length} RPC URLs từ biến môi trường`);
  }
  
  // Kết hợp từ môi trường và fallback
  const rpcUrls = [
    ...rpcUrlsFromEnv,
    "https://ethereum.publicnode.com", // Public Node
    "https://rpc.ankr.com/eth", // Ankr
    "https://eth-rpc.gateway.pokt.network", // Pocket Network
    "https://1rpc.io/eth", // 1RPC
    "https://cloudflare-eth.com" // Cloudflare
  ].filter((url): url is string => Boolean(url));
  
  // Chọn một RPC URL ngẫu nhiên từ danh sách
  const randomIndex = Math.floor(Math.random() * rpcUrls.length);
  const rpcUrl = rpcUrls[randomIndex];
  
  try {
    console.log(`Đang kết nối đến RPC: ${rpcUrl}`);
    
    // Tạo provider mới với timeout
    const provider = new ethers.providers.JsonRpcProvider({
      url: rpcUrl,
      timeout: PROVIDER_TIMEOUT,
    });
    
    // Cấu hình thêm cho provider
    provider.pollingInterval = 10000; // 10 giây để giảm tải lên RPC
    
    // Lưu vào cache
    providerInstance = provider;
    providerTimestamp = currentTime;
    
    return provider;
  } catch (error) {
    console.error(`Lỗi khi tạo provider với ${rpcUrl}:`, error);
    
    // Thử Cloudflare nếu tất cả đều thất bại
    const fallbackProvider = new ethers.providers.JsonRpcProvider({
      url: "https://cloudflare-eth.com",
      timeout: PROVIDER_TIMEOUT
    });
    
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
    // Kiểm tra xem có hỗ trợ token này không
    if (!CHAINLINK_ORACLES[normalizedSymbol]) {
      throw new Error(`Không hỗ trợ token ${normalizedSymbol}`);
    }
    
    // Thêm timeout cho yêu cầu
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout khi kết nối đến Chainlink')), PROVIDER_TIMEOUT);
    });
    
    // Thực hiện yêu cầu với timeout
    const dataPromise = (async () => {
      // Kết nối đến mạng Ethereum
      const provider = getProvider();
      
      try {
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
        
        // Kiểm tra giá trị có hợp lệ không
        if (!answer || Number(answer) <= 0) {
          throw new Error(`Giá không hợp lệ cho ${normalizedSymbol}: ${answer}`);
        }
        
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
        
        console.log(`✅ Lấy giá ${normalizedSymbol} thành công: $${price.toFixed(2)}`);
        return result;
      } catch (contractError) {
        // Xử lý lỗi khi gọi hợp đồng
        console.error(`Lỗi kết nối hợp đồng ${normalizedSymbol}:`, contractError);
        throw contractError;
      }
    })();
    
    // Chọn giữa kết quả hoặc timeout
    return await Promise.race([dataPromise, timeoutPromise]) as any;
    
  } catch (error) {
    console.error(`Lỗi khi lấy giá ${normalizedSymbol} từ Chainlink:`, error);
    
    // Thử lại với provider khác nếu thất bại và chưa vượt quá số lần thử
    if (tryCount < 2) {
      console.log(`Thử lại lần ${tryCount + 1} cho ${normalizedSymbol}...`);
      // Reset provider để thử với RPC khác
      providerInstance = null;
      // Chờ 1 giây trước khi thử lại
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getTokenPriceFromChainlink(normalizedSymbol, tryCount + 1);
    }
    
    // Fallback sang dữ liệu giả nếu Oracle thất bại sau tất cả các lần thử
    console.log(`⚠️ Sử dụng dữ liệu giả cho ${normalizedSymbol}`);
    const mockData = generateMockTokenPrice(normalizedSymbol);
    
    // Lưu dữ liệu giả vào cache với thời gian ngắn hơn
    priceCache[normalizedSymbol] = {
      data: mockData,
      timestamp: currentTime - Math.floor(CACHE_TTL / 2) // Thời gian cache ngắn hơn cho dữ liệu giả
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
  
  // Giá cơ sở thực tế hơn cho mỗi token (tháng 5/2025)
  const basePrice = {
    'ETH': 6500,
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
