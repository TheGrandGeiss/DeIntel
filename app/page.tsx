'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet, Shield, Zap, Activity, ChevronRight } from 'lucide-react';
import CustomWalletModal from '@/components/blocks/connectWallet';
import { useWallet } from '@solana/react-hooks';

export default function LandingPage() {
  const wallet = useWallet();

  const isConnected = wallet.status === 'connected';
  const address = isConnected
    ? wallet.session.account.address.toString()
    : null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function truncate(address: string) {
    return `${address.slice(0, 4)}…${address.slice(-4)}`;
  }

  return (
    <main className='min-h-screen bg-black text-white selection:bg-zinc-800 flex flex-col relative'>
      {/* NAVBAR */}
      <nav className='w-full flex items-center justify-between p-6 md:px-12 border-b border-zinc-900/50 backdrop-blur-md sticky top-0 z-50'>
        <div className='flex items-center gap-2'>
          <Shield
            className='text-zinc-100'
            size={28}
          />
          <span className='text-2xl font-bold tracking-tighter'>
            De<span className='text-zinc-500'>Intel</span>
          </span>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white text-black text-sm font-bold rounded-full transition-all active:scale-95 disabled:opacity-70'>
          <Wallet size={16} />
          <span>Connect Wallet</span>
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className='flex-1 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden'>
        {/* Background glow */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none -z-10'></div>

        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
          <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
          Agent Version 1.0 Live
        </div>

        <h1 className='text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100'>
          Automated <br className='hidden md:block' />
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-600'>
            Due Diligence.
          </span>
        </h1>

        <p className='max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200'>
          Drop a token contract or whitepaper link. Our AI agents extract the
          data, cross-reference the chain, and generate an institutional-grade
          risk report in 5 seconds.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className='group relative flex items-center gap-3 px-8 py-4 bg-zinc-100 text-black rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300'>
          <span>Start Researching</span>
          <ChevronRight
            size={20}
            className='transition-transform group-hover:translate-x-1'
          />
        </button>
      </section>

      {/* FEATURE GRID */}
      <section className='w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-12 border-t border-zinc-900/50 bg-[#050505]'>
        <div className='p-6 rounded-2xl border border-zinc-800/50 bg-black'>
          <Activity
            className='text-zinc-400 mb-4'
            size={28}
          />
          <h3 className='text-lg font-bold text-white mb-2'>
            Instant Tokenomics
          </h3>
          <p className='text-zinc-500 text-sm leading-relaxed'>
            We extract and visualize supply metrics, vesting schedules, and
            exact team allocations instantly.
          </p>
        </div>
        <div className='p-6 rounded-2xl border border-zinc-800/50 bg-black'>
          <Shield
            className='text-zinc-400 mb-4'
            size={28}
          />
          <h3 className='text-lg font-bold text-white mb-2'>
            Rug-Pull Detection
          </h3>
          <p className='text-zinc-500 text-sm leading-relaxed'>
            Our AI scans for centralization risks, anonymous teams, and missing
            audit data to calculate a Trust Score.
          </p>
        </div>
        <div className='p-6 rounded-2xl border border-zinc-800/50 bg-black'>
          <Zap
            className='text-zinc-400 mb-4'
            size={28}
          />
          <h3 className='text-lg font-bold text-white mb-2'>Groq LPU Speed</h3>
          <p className='text-zinc-500 text-sm leading-relaxed'>
            Powered by Llama 3 70b running on specialized Groq hardware. Deep
            analysis finishes in under 5 seconds.
          </p>
        </div>
      </section>

      {/* Render your exact Custom Modal here */}
      <CustomWalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
