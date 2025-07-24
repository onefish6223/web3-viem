'use client';
import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { NFT_MARKET_ABI } from '@/lib/abi';
import { NFT_MARKET_ADDRESS } from '@/lib/config';

interface ListNFTFormProps {
  onListSuccess: () => void;
}

export function ListNFTForm({ onListSuccess }: ListNFTFormProps) {
  const [nftContract, setNftContract] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  // 调用NFTMarket的list方法
  const { writeContract, data: listTxHash } = useWriteContract();

  const handleList = () => {
    if (!nftContract || !tokenId || !price) {
      setError('请填写所有字段');
      return;
    }

    try {
      writeContract({
        address: NFT_MARKET_ADDRESS as `0x${string}`,
        abi: NFT_MARKET_ABI,
        functionName: 'list',
        args: [
          nftContract as `0x${string}`,
          BigInt(tokenId),
          BigInt(price) // 假设价格单位是wei
        ]
      });
    } catch (err) {
      setError(`上架失败: ${err instanceof Error ? err.message : '未知错误'}`);
    }
  };

  // 等待交易确认
  const { isSuccess } = useWaitForTransactionReceipt({
    hash: listTxHash
  });

  // 交易成功后刷新列表
  if (isSuccess) {
    onListSuccess();
  }

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">上架NFT</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="NFT合约地址"
          value={nftContract}
          onChange={(e) => setNftContract(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="价格（支付代币数量）"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleList}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          确认上架
        </button>
      </div>
    </div>
  );
}