'use client';

import type { SolanaClientConfig } from '@solana/client';
import { SolanaProvider } from '@solana/react-hooks';

const defaultConfig: SolanaClientConfig = {
  cluster: 'mainnet',
  rpc: `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  websocket: `wss://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SolanaProvider config={defaultConfig}>{children}</SolanaProvider>;
}
