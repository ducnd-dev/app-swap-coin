// Script test giá từ Oracle nội bộ - Phiên bản cải tiến
import { getTokenPriceFromChainlink } from '../lib/blockchain/price-oracle';

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

/**
 * Test lấy giá từ Oracle cải tiến
 */
async function testOraclePrices() {
  console.log('\n🔍 Đang kiểm tra giá từ Oracle nội bộ...\n');
  
  const symbols = ['ETH', 'BTC', 'USDT'];
  const results: TokenPriceResult[] = [];
  const timings: Record<string, number> = {};
  
  // Hiển thị thông tin môi trường
  console.log(`📊 Thông tin môi trường:`);
  console.log(`- Thời gian: ${new Date().toLocaleString()}`);
  console.log(`- RPC URL: ${process.env.ETHEREUM_RPC_URL || 'Không được cấu hình (sẽ dùng fallback)'}`);
  
  // Khởi tạo provider trước để giảm thời gian chờ
  console.log('\n⚙️ Bắt đầu quá trình lấy giá từ Oracle...\n');
  
  // Thực hiện lấy giá tuần tự để thấy rõ quá trình
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
      console.log(`   Nguồn: ${result.source === 'chainlink' ? 'Chainlink Oracle' : 'Dữ liệu giả'}, Thời gian: ${timings[symbol]}ms`);
      console.log(`   Cập nhật: ${new Date(result.lastUpdated).toLocaleString()}`);
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
  
  if (results.length === symbols.length) {
    console.log('\n✅ Tất cả các token đã được lấy giá thành công!\n');
  } else {
    console.log(`\n⚠️ Chú ý: ${symbols.length - results.length} token không lấy được giá.\n`);
  }
  
  // Khuyến nghị
  if (results.filter(r => r.source === 'chainlink').length < symbols.length) {
    console.log('\n🔧 Khuyến nghị:');
    console.log('1. Kiểm tra lại RPC URL trong .env.local');
    console.log('2. Đảm bảo bạn có kết nối internet ổn định');
    console.log('3. Thử lại sau một thời gian (các RPC công cộng có thể bị giới hạn số lượt truy cập)');
  }
}

// Chạy test
testOraclePrices()
  .then(() => {
    console.log('🏁 Test hoàn tất.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test thất bại:', error);
    process.exit(1);
  });
