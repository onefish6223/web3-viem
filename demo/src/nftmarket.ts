import { createPublicClient, http, parseAbiItem } from 'viem';
import { foundry } from 'viem/chains'; // 根据实际部署的链选择（如 sepolia、polygon 等）

// 1. 配置客户端（根据合约实际部署的链调整）
const publicClient = createPublicClient({
  chain: foundry, // 替换为你的合约部署链（如 sepolia）
  transport: http(), // 替换为你的 RPC 节点
});

// 2. 合约信息（替换为你的实际合约地址和部署链ID）
const contractAddress = '0x9a9f2ccfde556a7e9ff0848998aa4a0cfd8863ae'; // 你的 MyNFTMarket 合约地址
const chainId = foundry.id; // 对应链的 ID

// 3. 定义事件 ABI（从合约中提取的事件签名）
const events = [
  parseAbiItem('event Listed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price)'),
  parseAbiItem('event Purchased(uint256 listingId, address buyer, address nftContract, uint256 tokenId, uint256 price)'),
];
console.log(`合约地址：${contractAddress}`);
// 4. 监听事件的函数
async function listenToMarketEvents() {
  console.log(`开始监听 NFT 市场事件（合约地址：${contractAddress}，链ID：${chainId}）...`);
  console.log('等待链上事件发生...\n');

  // 监听 Listed 事件
  publicClient.watchEvent({
    address: contractAddress,
    event: events[0], // Listed 事件
    onLogs: (logs) => {
      logs.forEach((log) => {
        // 明确指定为 Listed 事件的参数类型
        const args = log.args as {
          listingId: bigint;
          seller: `0x${string}`;
          nftContract: `0x${string}`;
          tokenId: bigint;
          price: bigint;
        };
        const { listingId, seller, nftContract, tokenId, price } = args;
        console.log('📤 检测到 NFT 上架事件：');
        console.log({
          事件类型: 'Listed',
          列表ID: listingId.toString(),
          卖家地址: seller,
          NFT合约地址: nftContract,
          NFTID: tokenId.toString(),
          价格: `${price.toString()}（指定ERC20代币）`,
          区块号: log.blockNumber?.toString(),
          交易哈希: log.transactionHash,
        });
        console.log('----------------------------------------\n');
      });
    },
  });

  // 监听 Purchased 事件
  publicClient.watchEvent({
    address: contractAddress,
    event: events[1], // Purchased 事件
    onLogs: (logs) => {
      logs.forEach((log) => {
        const args = log.args as {
          listingId: bigint;
          buyer: `0x${string}`;
          nftContract: `0x${string}`;
          tokenId: bigint;
          price: bigint;
        };
        const { listingId, buyer, nftContract, tokenId, price } = args;
        console.log('🛒 检测到 NFT 购买事件：');
        console.log({
          事件类型: 'Purchased',
          列表ID: listingId.toString(),
          买家地址: buyer,
          NFT合约地址: nftContract,
          NFTID: tokenId.toString(),
          成交价格: `${price.toString()}（指定ERC20代币）`,
          区块号: log.blockNumber?.toString(),
          交易哈希: log.transactionHash,
        });
        console.log('----------------------------------------\n');
      });
    },
  });
}

// 启动监听
listenToMarketEvents().catch((error) => {
  console.error('监听事件出错：', error);
});