'use client';
import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { NFT_MARKET_ABI } from '@/lib/abi';
import { NFT_MARKET_ADDRESS } from '@/lib/config';
import { BuyNFTButton } from './BuyNFTButton';
import { config } from '@/app/appkit-provider'; // 确保正确导入配置

export function NFTList() {
  // 获取所有上架的NFT
  const [listings, setListings] = useState<any[]>([]);
  const { data: nextListingId } = useReadContract({
    address: NFT_MARKET_ADDRESS as `0x${string}`,
    abi: NFT_MARKET_ABI,
    functionName: 'nextListingId'
  });

  const fetchListings = async () => {
    const tempListings = [];
    for (let i = 1; i < Number(nextListingId); i++) {
      const listing = await readContract(config,{
      //const { data: listing } = await useReadContract({
        address: NFT_MARKET_ADDRESS as `0x${string}`,
        abi: NFT_MARKET_ABI,
        functionName: 'listings',
        //@ts-ignore
        args: [i] // listingId从1开始
      });
      // 数组解构处理
      const [seller, nftContract, tokenId, price, isActive] = listing;
      // 结构化数据
      const structuredListing = {
        seller,
        nftContract,
        tokenId,
        price,
        isActive
      };
      if (structuredListing.isActive) {
        tempListings.push({ id: i, ...structuredListing });
      }
    }
    setListings(tempListings);
  };

  // 读取每个listing的详情
  useEffect(() => {
    if (!nextListingId) return;
    fetchListings();
  }, [nextListingId]);

  if (listings.length === 0) {
    return (
      <div className="mt-4 space-y-2">
        <p className="text-center py-4">暂无上架的NFT,nextListingId: {nextListingId}</p>
        <button onClick={fetchListings} className="w-full p-2 bg-yellow-500 text-white rounded">查询列表</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {listings.map((listing) => (
        <div key={listing.id} className="border rounded-lg p-4">
          <p>NFT合约: {listing.nftContract.slice(0, 10)}...</p>
          <p>Token ID: {listing.tokenId.toString()}</p>
          <p>价格: {listing.price.toString()} 支付代币</p>
          <p>卖家: {listing.seller.slice(0, 10)}...</p>
          <BuyNFTButton listingId={listing.id} price={listing.price} />
        </div>
      ))}
    </div>
  );
}