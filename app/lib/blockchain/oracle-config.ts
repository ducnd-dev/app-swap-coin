// Cấu hình chung cho Oracle giá
import { ethers } from 'ethers';

// Địa chỉ Oracle hợp đồng Chainlink trên Ethereum
export const CHAINLINK_ORACLES: Record<string, string> = {
  'ETH': '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH/USD
  'BTC': '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c', // BTC/USD
  'USDT': '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D', // USDT/USD
};

// ABI đơn giản cho Chainlink Price Feed
export const CHAINLINK_PRICE_FEED_ABI = [
  "function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
  "function decimals() external view returns (uint8)"
];

// Cache thời gian và timeout
export const PROVIDER_TTL = 60 * 1000; // 60 giây
export const PROVIDER_TIMEOUT = 5000; // 5 giây
export const CACHE_TTL = 30 * 1000; // 30 giây

// Hàm để lấy danh sách RPC URLs từ biến môi trường
export function getRpcUrls(): string[] {
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
    "https://1rpc.io/eth", // 1RPC
    "https://eth-rpc.gateway.pokt.network", // Pocket Network
    "https://rpc.ankr.com/eth", // Ankr
    "https://cloudflare-eth.com" // Cloudflare
  ].filter((url): url is string => Boolean(url));
  
  return rpcUrls;
}

// Hàm chung để tạo provider
export function createProvider(rpcUrl: string): ethers.providers.JsonRpcProvider {
  console.log(`Đang kết nối đến RPC: ${rpcUrl}`);
  
  // Tạo provider mới với timeout
  const provider = new ethers.providers.JsonRpcProvider({
    url: rpcUrl,
    timeout: PROVIDER_TIMEOUT,
  });
  
  // Cấu hình thêm cho provider
  provider.pollingInterval = 10000; // 10 giây để giảm tải lên RPC
  
  return provider;
}

// Giá cơ sở thực tế hơn cho mỗi token (tháng 5/2025)
export const BASE_PRICES: Record<string, number> = {
  'ETH': 6500,
  'BTC': 120000,
  'USDT': 1,
  'USDC': 1,
  'BNB': 850,
  'XRP': 1.25,
  'SOL': 350,
  'DOT': 45,
  'ADA': 2.80
};
