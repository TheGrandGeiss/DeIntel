'use client';

import { useWallet } from '@solana/react-hooks';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function AuthListener({ hasCookie }: { hasCookie: boolean }) {
  const wallet = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  // 1. The safeguard: Wait for the browser to fully mount before judging the wallet
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const wasConnected = useRef(false);

  useEffect(() => {
    // 🛑 Rule 1: Do absolutely nothing until fully mounted or if currently connecting
    if (!isMounted || wallet.status === 'connecting') return;

    const isCurrentlyConnected = wallet.status === 'connected';

    // ----------------------------------------------------------------
    // SCENARIO A: User physically clicked "Disconnect"
    // ----------------------------------------------------------------
    if (wasConnected.current && !isCurrentlyConnected && hasCookie) {
      console.log('🚨 Wallet disconnected! Destroying session...');
      fetch('/api/auth/logout', { method: 'POST' }).then(() => {
        if (pathname !== '/') {
          router.push('/');
          router.refresh();
        }
      });
    }

    // ----------------------------------------------------------------
    // SCENARIO B: User is on a private page without the Cookie
    // ----------------------------------------------------------------
    if (!hasCookie && pathname.startsWith('/dashboard')) {
      console.log('🚨 Missing cookie. Kicking to home...');
      router.push('/');
    }

    // ----------------------------------------------------------------
    // SCENARIO C: Fully logged in and sitting on the homepage
    // ----------------------------------------------------------------
    if (isCurrentlyConnected && hasCookie && pathname === '/') {
      router.push('/dashboard');
    }

    // Update the tracker for the next render loop
    wasConnected.current = isCurrentlyConnected;
  }, [wallet.status, hasCookie, pathname, router, isMounted]);

  return null;
}
