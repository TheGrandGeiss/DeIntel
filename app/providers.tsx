'use client';

import type { SolanaClientConfig } from '@solana/client';
import { SolanaProvider } from '@solana/react-hooks';

const defaultConfig: SolanaClientConfig = {
  cluster: 'devnet',
  rpc: `https://solana-devnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  websocket: `wss://solana-devnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SolanaProvider config={defaultConfig}>{children}</SolanaProvider>;
}
