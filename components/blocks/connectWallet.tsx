'use client';

import { useEffect, useState } from 'react';
import {
  useConnectWallet,
  useWallet,
  useWalletConnection,
} from '@solana/react-hooks';
import { WalletConnector } from '@solana/client';
import { useRouter } from 'next/navigation';
import { X, Shield } from 'lucide-react';

interface CustomWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomWalletModal({
  isOpen,
  onClose,
}: CustomWalletModalProps) {
  const router = useRouter();
  const wallet = useWallet();
  const wallets = useWalletConnection();

  const connectWallet = useConnectWallet();
  const [detectedWallets, setDetectedWallets] = useState<WalletConnector[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWaitingForSignature, setIsWaitingForSignature] = useState(false);

  const activeSession =
    wallet.status === 'connected' ? wallet.session : undefined;

  const signAndVerify = async () => {
    if (
      wallet.status === 'connected' &&
      isWaitingForSignature &&
      wallet.session
    ) {
      try {
        if (typeof wallet.session.signMessage !== 'function') {
          throw new Error('This wallet does not support message signing.');
        }

        const messageText = `Verify ownership of this wallet. Nonce: ${crypto.randomUUID()}`;
        const message = new TextEncoder().encode(messageText);

        const signature = await wallet.session.signMessage(message);

        const response = await fetch('api/auth/verify/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            signature: Array.from(signature),
            message: messageText,
            publicKey: wallet.session.account.address,
          }),
        });

        if (response.ok) {
          console.log('Authenticated successfully!');
          setIsWaitingForSignature(false);
          window.location.href = '/dashboard';
          onClose();
        }
      } catch (err) {
        console.error('Signing rejected or failed', err);
        setIsWaitingForSignature(false);
      }
    }
  };

  useEffect(() => {
    if (wallets?.connectors) {
      setDetectedWallets(wallets.connectors.filter((w) => w.ready));
    }
  }, [wallets]);

  // 2. Handle Connection
  async function handleConnect(connectorId: string) {
    try {
      setIsConnecting(true);
      // We set this to true so the useEffect knows to trigger the signature once connected
      setIsWaitingForSignature(true);
      await connectWallet(connectorId);
      await signAndVerify();
    } catch (err) {
      setIsWaitingForSignature(false);
      console.error('Connection failed:', err);
    } finally {
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    if (wallet.status === 'connected' && isWaitingForSignature) {
      signAndVerify();
    }
  }, [wallet.status, isWaitingForSignature]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4'>
      <div className='relative w-full max-w-md bg-[#0a0a0b] border border-zinc-800 rounded-3xl p-8 shadow-2xl'>
        <button
          onClick={onClose}
          className='absolute top-5 right-5 text-zinc-500 hover:text-white'>
          <X size={18} />
        </button>

        <div className='flex flex-col items-center mb-8'>
          <div className='w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4'>
            <Shield
              className='text-white'
              size={32}
            />
          </div>
          <h2 className='text-2xl font-bold text-white'>Connect Wallet</h2>
        </div>

        <div className='space-y-2'>
          {detectedWallets.map((w) => (
            <button
              key={w.id}
              disabled={isConnecting}
              onClick={() => handleConnect(w.id)}
              className='w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-900/40 hover:bg-zinc-800 text-white transition-all border border-transparent hover:border-zinc-700'>
              <div className='flex items-center gap-4'>
                <img
                  src={w.icon}
                  alt={w.name}
                  className='w-8 h-8 rounded-lg'
                />
                <span className='font-semibold'>{w.name}</span>
              </div>
              {isConnecting && (
                <span className='text-xs text-zinc-500 animate-pulse'>
                  Connecting...
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
