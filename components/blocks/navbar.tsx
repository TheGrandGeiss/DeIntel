'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDisconnectWallet, useWallet } from '@solana/react-hooks';
import { LogOut, ChevronDown, Activity, Library } from 'lucide-react';
import { getUserReports } from '@/lib/actions/report';

export default function Navbar() {
  const disconnectWallet = useDisconnectWallet();
  const wallet = useWallet();
  const [reports, setReports] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch reports when wallet connects
  useEffect(() => {
    if (wallet.status === 'connected') {
      getUserReports().then((res) => {
        if (res.success) setReports(res.reports);
      });
    } else {
      setReports([]);
      setDropdownOpen(false);
    }
  }, [wallet.status]);

  const formatAddress = (address?: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <header className='fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-50 pointer-events-none'>
      {/* Make inner elements pointer-events-auto so you can click them, 
          but the transparent header doesn't block clicks on the page below */}

      <Link
        href='/'
        className='font-black text-2xl tracking-tighter text-white pointer-events-auto'>
        De<span className='text-blue-500'>Intel</span>
      </Link>

      <div className='flex items-center gap-3 pointer-events-auto'>
        {wallet.status === 'connected' && wallet.session?.account?.address && (
          <div
            className='relative'
            ref={dropdownRef}>
            {/* My Reports Dropdown Trigger */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-blue-400 transition-all bg-white/3 hover:bg-blue-500/10 px-4 py-2 rounded-full border border-white/10 hover:border-blue-500/30 shadow-lg backdrop-blur-md'>
              <Library size={16} />
              <span className='hidden sm:inline'>History</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className='absolute right-0 mt-3 w-72 bg-[#0A0F1E]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2'>
                <div className='p-3 border-b border-white/5'>
                  <span className='text-xs font-bold text-zinc-500 uppercase tracking-widest'>
                    Recent Reports
                  </span>
                </div>

                <div className='max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar'>
                  {reports.length === 0 ? (
                    <div className='p-4 text-center text-sm text-zinc-500'>
                      No reports generated yet.
                    </div>
                  ) : (
                    reports.map((report) => (
                      <Link
                        key={report.id}
                        href={`/report/${report.id}`}
                        onClick={() => setDropdownOpen(false)}
                        className='flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group'>
                        <div className='flex items-center gap-3 overflow-hidden'>
                          <Activity
                            size={14}
                            className='text-blue-500 shrink-0 group-hover:scale-110 transition-transform'
                          />
                          <div className='flex flex-col truncate'>
                            <span className='text-sm font-bold text-white truncate'>
                              {report.projectName}
                            </span>
                            <span className='text-[10px] font-mono text-blue-400 uppercase tracking-widest'>
                              ${report.ticker}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`text-xs font-black px-2 py-1 rounded bg-black/50 border border-white/5 ${report.trustScore >= 70 ? 'text-emerald-400' : report.trustScore >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {report.trustScore}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {wallet.status === 'connected' && wallet.session?.account?.address && (
          <span className='text-sm text-zinc-400 font-mono bg-black/40 px-4 py-2 rounded-full border border-white/10 hidden sm:block backdrop-blur-md'>
            {formatAddress(wallet.session.account.address)}
          </span>
        )}

        <button
          onClick={() => disconnectWallet()}
          className='flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-rose-400 transition-all bg-black/40 hover:bg-rose-500/10 px-4 py-2 rounded-full border border-white/10 hover:border-rose-500/30 backdrop-blur-md'>
          <LogOut size={16} />
          <span className='hidden sm:inline'>Disconnect</span>
        </button>
      </div>
    </header>
  );
}
