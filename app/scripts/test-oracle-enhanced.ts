// Script test nâng cao cho Oracle giá
import { getTokenPriceFromChainlink as getTokenPriceFromOriginalOracle } from '../lib/blockchain/price-oracle';
import { getTokenPriceFromChainlink as getTokenPriceFromNewOracle } from '../services/blockchain/price-oracle-service';

// Kiểm tra xem có sử dụng Oracle mới hay không
const useNewOracle = process.argv.includes('--use-new-oracle');
const getTokenPriceFromChainlink = useNewOracle ? getTokenPriceFromNewOracle : getTokenPriceFromOriginalOracle;

// Đảm bảo sử dụng các RPC URLs từ biến môi trường
// Trích xuất ETHEREUM_RPC_URL từ .env và đặt nó vào quá trình
if (process.env.ETHEREUM_RPC_URL) {
  console.log(`Tìm thấy ETHEREUM_RPC_URL: ${process.env.ETHEREUM_RPC_URL.split(',').length} URL(s)`);
} else {
  console.log('Không tìm thấy ETHEREUM_RPC_URL trong biến môi trường');
}

console.log(`Sử dụng ${useNewOracle ? 'ORACLE MỚI' : 'Oracle cũ'}`);
import axios from 'axios';

// Định dạng giá tiền
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
}

// Định dạng phần trăm thay đổi
function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  const color = change >= 0 ? '\x1b[32m' : '\x1b[31m'; // Xanh cho dương, đỏ cho âm
  return `${color}${sign}${change.toFixed(2)}%\x1b[0m`;
}

// Định nghĩa kiểu dữ liệu cho kết quả Oracle
interface TokenPriceResult {
  symbol: string;
  price: number;
  lastUpdated: string;
  source: string;
  change24h: number;
}

// Lấy giá thị trường từ CoinGecko API để so sánh
async function getMarketPrice(symbol: string): Promise<number | null> {
  try {
    const coinGeckoIds: Record<string, string> = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'USDT': 'tether',
    };
    
    const id = coinGeckoIds[symbol];
    if (!id) return null;
    
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
      { timeout: 5000 }
    );
    
    if (response.data && response.data[id] && response.data[id].usd) {
      return response.data[id].usd;
    }
    
    return null;
  } catch (error) {
    console.error('Không thể lấy giá từ CoinGecko:', error);
    return null;
  }
}

/**
 * Test lấy giá từ Oracle và so sánh với thị trường
 */
async function testEnhancedOraclePrices() {
  console.log('\n🔍 TEST NÂNG CAO ORACLE CUNG CẤP GIÁ\n');
  console.log('Đang kiểm tra kết nối và độ chính xác của Oracle...\n');
  
  const symbols = ['ETH', 'BTC', 'USDT'];
  const results: TokenPriceResult[] = [];
  const timings: Record<string, number> = {};
  const marketPrices: Record<string, number | null> = {};
  
  // Lấy giá thị trường song song để so sánh
  console.log('⚖️ Đang lấy giá thị trường để so sánh...');
  
  await Promise.all(
    symbols.map(async (symbol) => {
      marketPrices[symbol] = await getMarketPrice(symbol);
    })
  );
  
  // Thực hiện test Oracle
  console.log('\n⚙️ Khởi tạo kết nối đến blockchain...\n');
  
  for (const symbol of symbols) {
    try {
      console.log(`⏳ Đang lấy giá cho ${symbol}...`);
      const startTime = Date.now();
      
      const result = await getTokenPriceFromChainlink(symbol) as TokenPriceResult;
      
      const endTime = Date.now();
      timings[symbol] = endTime - startTime;
      
      results.push(result);
      
      // In thông tin giá
      console.log(`✅ ${symbol}: ${formatPrice(result.price)} (${formatChange(result.change24h)})`);
      console.log(`   Nguồn: ${result.source}, Thời gian: ${timings[symbol]}ms`);
      console.log(`   Cập nhật: ${new Date(result.lastUpdated).toLocaleString()}`);
      
      // So sánh với giá thị trường
      if (marketPrices[symbol]) {
        const diff = ((result.price - marketPrices[symbol]!) / marketPrices[symbol]!) * 100;
        const diffStatus = Math.abs(diff) < 1 ? '✅ Chính xác' : Math.abs(diff) < 5 ? '⚠️ Khác biệt nhỏ' : '❌ Khác biệt lớn';
        
        console.log(`   Giá thị trường: ${formatPrice(marketPrices[symbol]!)}`);
        console.log(`   Chênh lệch: ${diff > 0 ? '+' : ''}${diff.toFixed(2)}% ${diffStatus}`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`❌ Lỗi khi lấy giá cho ${symbol}:`, error);
    }
  }
  
  // Tổng kết
  console.log('\n📊 Tổng kết:');
  console.log(`- Đã kiểm tra ${results.length}/${symbols.length} token thành công`);
  console.log(`- Nguồn dữ liệu: ${results.filter(r => r.source === 'chainlink').length} từ Chainlink, ${results.filter(r => r.source === 'mock').length} từ dữ liệu giả`);
  
  // In thời gian truy vấn
  console.log('\n⏱️ Thời gian truy vấn:');
  for (const symbol of symbols) {
    if (timings[symbol]) {
      const status = timings[symbol] > 3000 ? '⚠️ Chậm' : '✅ Tốt';
      console.log(`- ${symbol}: ${timings[symbol]}ms ${status}`);
    }
  }
  
  // Đánh giá độ chính xác
  console.log('\n🎯 Độ chính xác:');
  let accuracyCount = 0;
  
  for (const symbol of symbols) {
    const result = results.find(r => r.symbol === symbol);
    if (result && marketPrices[symbol]) {
      const diff = ((result.price - marketPrices[symbol]!) / marketPrices[symbol]!) * 100;
      let accuracyStatus = '';
      
      if (Math.abs(diff) < 1) {
        accuracyStatus = '\x1b[32mRất chính xác\x1b[0m';
        accuracyCount++;
      } else if (Math.abs(diff) < 5) {
        accuracyStatus = '\x1b[33mChấp nhận được\x1b[0m';
        accuracyCount += 0.5;
      } else {
        accuracyStatus = '\x1b[31mKhông chính xác\x1b[0m';
      }
      
      console.log(`- ${symbol}: ${diff.toFixed(2)}% (${accuracyStatus})`);
    } else if (result && result.source === 'mock') {
      console.log(`- ${symbol}: \x1b[31mDữ liệu giả\x1b[0m`);
    }
  }
  
  const accuracyScore = (accuracyCount / symbols.length) * 100;
  console.log(`\n📈 Điểm độ chính xác: ${accuracyScore.toFixed(1)}%\n`);
  
  if (results.length === symbols.length && results.every(r => r.source === 'chainlink')) {
    console.log('\n✅ Tất cả các token đã được lấy giá thành công từ Chainlink Oracle!\n');
  } else {
    console.log(`\n⚠️ Chú ý: ${symbols.length - results.filter(r => r.source === 'chainlink').length} tokens không lấy được giá từ Chainlink.\n`);
  }
}

// Chạy test
testEnhancedOraclePrices()
  .then(() => {
    console.log('🏁 Test hoàn tất.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test thất bại:', error);
    process.exit(1);
  });
