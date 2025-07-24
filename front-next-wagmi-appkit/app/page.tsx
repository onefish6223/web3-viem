'use client';
import { AppKitProvider } from './appkit-provider';
import { ConnectButton } from '@/components/ConnectButton';
import { ListNFTForm } from '@/components/ListNFTForm';
import { NFTList } from '@/components/NFTList';

export default function Home() {
  return (
    <AppKitProvider>
      <main className="container mx-auto p-4">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">NFT市场</h1>
          <ConnectButton />
        </header>
        
        <ListNFTForm onListSuccess={() => window.location.reload()} />
        <NFTList />
      </main>
    </AppKitProvider>
  );
}