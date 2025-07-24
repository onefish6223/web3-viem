'use client';
import { useAccount, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button 
          onClick={() => disconnect()}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          断开连接
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => open({ view: 'Connect' })}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      连接钱包（WalletConnect）
    </button>
  );
}