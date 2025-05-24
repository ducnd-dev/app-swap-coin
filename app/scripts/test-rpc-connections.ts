// Script kiểm tra chất lượng kết nối RPC
import { ethers } from 'ethers';

// Danh sách RPC URLs để kiểm tra
const RPC_URLS = [
  "https://ethereum.publicnode.com",
  "https://rpc.ankr.com/eth",
  "https://eth-rpc.gateway.pokt.network",
  "https://1rpc.io/eth",
  "https://cloudflare-eth.com",
  "https://eth-mainnet.g.alchemy.com/v2/demo" // Alchemy demo key
];

// Thời gian timeout cho mỗi yêu cầu (ms)
const TIMEOUT = 5000;

// Hàm kiểm tra và đánh giá kết nối
async function testRpcConnection(url: string): Promise<{
  url: string;
  success: boolean;
  latency?: number;
  blockNumber?: number;
  error?: string;
}> {
  console.log(`Đang kiểm tra: ${url}`);
  
  const startTime = Date.now();
  let success = false;
  let latency = 0;
  let blockNumber = 0;
  let error = '';
  
  try {
    // Tạo provider với timeout
    const provider = new ethers.providers.JsonRpcProvider({
      url,
      timeout: TIMEOUT,
    });
    
    // Thực hiện yêu cầu đơn giản để kiểm tra kết nối
    const networkPromise = provider.getNetwork();
    const blockNumberPromise = provider.getBlockNumber();
    
    // Chờ tất cả hoàn thành hoặc có lỗi
    const [network, currentBlock] = await Promise.all([
      networkPromise,
      blockNumberPromise
    ]);
    
    latency = Date.now() - startTime;
    
    // Xác định kết quả
    success = true;
    blockNumber = currentBlock;
    
    console.log(`  ✓ Thành công! Mạng: ${network.name}, Block: ${currentBlock}, Độ trễ: ${latency}ms`);
    
  } catch (err: unknown) {
    latency = Date.now() - startTime;
    error = err instanceof Error ? err.message : 'Lỗi không xác định';
    console.log(`  ✗ Lỗi: ${error}, Độ trễ: ${latency}ms`);
  }
  
  return {
    url,
    success,
    latency,
    blockNumber,
    error: error || undefined
  };
}

// Hàm chính
async function main() {
  console.log('\n🔍 KIỂM TRA KẾT NỐI RPC ETHEREUM\n');
  console.log(`Thời gian hiện tại: ${new Date().toLocaleString()}`);
  console.log(`Thời gian timeout: ${TIMEOUT}ms`);
  console.log(`Số lượng RPC cần kiểm tra: ${RPC_URLS.length}`);
  console.log('\n---------------------------------\n');
  
  // TỪNG RPC URL được kiểm tra tuần tự
  const results = [];
  
  for (const url of RPC_URLS) {
    const result = await testRpcConnection(url);
    results.push(result);
    console.log(''); // Khoảng cách giữa các kết quả
  }
  
  // Thống kê
  console.log('\n---------------------------------');
  console.log('\n📊 KẾT QUẢ TỔNG HỢP:\n');
  
  // Số RPC thành công
  const successCount = results.filter(r => r.success).length;
  console.log(`- Thành công: ${successCount}/${results.length} RPC URLs (${Math.round(successCount/results.length*100)}%)`);
  
  // Xếp hạng RPC theo độ trễ (chỉ những cái thành công)
  const successfulResults = results.filter(r => r.success);
  successfulResults.sort((a, b) => (a.latency || Infinity) - (b.latency || Infinity));
  
  console.log('\n🏆 XẾP HẠNG RPC URLS THEO ĐỘ TRỄ:\n');
  successfulResults.forEach((result, index) => {
    console.log(`${index + 1}. ${result.url}`);
    console.log(`   Độ trễ: ${result.latency}ms, Block: ${result.blockNumber}`);
  });
  
  // Gợi ý cấu hình tốt nhất cho .env
  if (successfulResults.length > 0) {
    console.log('\n✨ GỢI Ý CẤU HÌNH CHO .ENV:\n');
    const bestRpcUrls = successfulResults.slice(0, 3).map(r => r.url);
    console.log(`ETHEREUM_RPC_URL="${bestRpcUrls.join(',')}"`);
    console.log('\nHãy sao chép dòng trên vào file .env của bạn để có hiệu suất Oracle tốt nhất.');
  } else {
    console.log('\n❌ Không có RPC URL nào kết nối thành công. Hãy kiểm tra lại kết nối mạng của bạn.');
  }
}

// Chạy script
main()
  .then(() => {
    console.log('\n✅ Kiểm tra hoàn tất.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Đã xảy ra lỗi:', error);
    process.exit(1);
  });
