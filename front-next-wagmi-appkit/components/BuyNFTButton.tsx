'use client';
import { useState, useEffect } from 'react';
import { readContract } from 'wagmi/actions';
import { useReadContract,useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { NFT_MARKET_ABI, PAYMENT_TOKEN_ABI } from '@/lib/abi';
import { NFT_MARKET_ADDRESS, PAYMENT_TOKEN_ADDRESS } from '@/lib/config';
import { config } from '@/app/appkit-provider'; // 确保正确导入配置

interface BuyNFTButtonProps {
  listingId: number;
  price: bigint;
}

export function BuyNFTButton({ listingId, price }: BuyNFTButtonProps) {
  const { address } = useAccount();
  // alert("address1111: " + address);
  const [isApproved, setIsApproved] = useState(false);

  // 1. 先授权代币给市场合约
  const { writeContract: approveToken , isSuccess:apprSucc} = useWriteContract();
  // 2. 购买NFT
  const { writeContract: buyNFT, data: buyTxHash } = useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({ hash: buyTxHash });

  // 使用 useReadContract 读取合约数据
  const { data: allowanceamt, refetch: refetchAllowanceamt } = useReadContract({
      address: PAYMENT_TOKEN_ADDRESS as `0x${string}`,
      abi: PAYMENT_TOKEN_ABI,
      functionName: 'allowance',
      args: [address, NFT_MARKET_ADDRESS]
  });
  // alert("waim allamt: " + allowanceamt);
  // 检查授权状态
  const checkApproval = () => {
    refetchAllowanceamt();
    alert("allowanceamt: " + allowanceamt + ", price: " + price);
    // 直接断言为 bigint 类型
    const allowanceBigInt = allowanceamt as unknown as bigint;
    // 然后进行比较
    setIsApproved(allowanceBigInt >= price);
  };

  const handleApprove = () => {
    approveToken({
      address: PAYMENT_TOKEN_ADDRESS as `0x${string}`,
      abi: PAYMENT_TOKEN_ABI,
      functionName: 'approve',
      args: [NFT_MARKET_ADDRESS, price]
    });
  };

  const handleBuy = () => {
    try {
      buyNFT({
        address: NFT_MARKET_ADDRESS as `0x${string}`,
        abi: NFT_MARKET_ABI,
        functionName: 'buyNFT',
        args: [
          BigInt(listingId) // 传入listingId
        ]
      });
    } catch (err) {
      alert(`购买失败: ${err instanceof Error ? err.message : '未知错误'}`);
    }
    // alert('购买NFT');
  };

  // // 授权后刷新状态
  useEffect(() => {
    checkApproval();
  }, [isSuccess, refetchAllowanceamt,apprSucc]);

  if (isSuccess) {
    return <p className="text-green-500 mt-2">购买成功！</p>;
  }

  return (
    <div className="mt-4 space-y-2">
      {!isApproved ? (
        <button
          onClick={handleApprove}
          className="w-full p-2 bg-yellow-500 text-white rounded"
        >
          授权代币
        </button>
      ) : (
        <button
          onClick={handleBuy}
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={!address}
        >
          购买NFT
        </button>
      )} 
    </div>
  );
}