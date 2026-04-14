'use client';

import React, { useState } from 'react';
import { Syne, DM_Mono, Inter } from 'next/font/google';
import {
  ShieldCheck,
  AlertTriangle,
  Users,
  CheckCircle2,
  XCircle,
  PieChart,
  Info,
  TrendingUp,
  Globe,
  Clock,
  Fingerprint,
} from 'lucide-react';

// Configure Next.js fonts
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export default function ReportDashboard({ data }: { data: any }) {
  const [showSignature, setShowSignature] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#34D399';
    if (score >= 40) return '#ffde73';
    return '#ff4d6b';
  };

  const getScoreGlow = (score: number) => {
    if (score >= 70) return 'rgba(52,211,153,0.15)';
    if (score >= 40) return 'rgba(255,222,115,0.15)';
    return 'rgba(255,77,107,0.15)';
  };

  const getRiskColor = (risk: string) => {
    const key = risk.toLowerCase();
    if (key === 'low') return '#34D399';
    if (key === 'medium') return '#ffde73';
    return '#ff4d6b';
  };

  const allocColors = ['#3B82F6', '#34D399', '#a78bfa', '#ffde73', '#ff4d6b'];

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (data.trustScore / 100) * circumference;
  const scoreColor = getScoreColor(data.trustScore);
  const riskColor = getRiskColor(data.riskLevel);

  // SVG Noise Texture for the cards
  const noiseImage = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`;

  return (
    <div
      className={`min-h-screen bg-[#080D1A] text-[#E2E8F0] px-6 pt-32 pb-10 ${inter.className}`}>
      <div className='max-w-[1160px] mx-auto flex flex-col gap-7'>
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <header className='flex flex-wrap justify-between items-start gap-6 pb-7 border-b border-white/5'>
          <div className='flex flex-col gap-3.5'>
            {/* Title row */}
            <div className='flex flex-wrap items-center gap-3'>
              <h1
                className={`${syne.className} text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-[-0.03em] text-[#F0F6FF] leading-[1.05]`}>
                {data.projectName}
              </h1>

              <span className='px-3.5 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full text-[15px] font-bold tracking-[0.12em] text-[#60A5FA] uppercase'>
                ${data.ticker}
              </span>

              <span
                className={`inline-flex items-center gap-1.25 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-[0.06em] text-[#6B8CAE] uppercase`}>
                <Globe
                  size={11}
                  className='opacity-70'
                />
                {data.category}
              </span>
            </div>

            {/* AI Verified badge */}
            <div className='relative inline-block'>
              <button
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#34D399]/10 hover:bg-[#34D399]/20 border border-[#34D399]/20 rounded-full cursor-pointer transition-colors text-[10px] font-medium tracking-[0.12em] uppercase text-[#34D399] ${dmMono.className}`}
                onMouseEnter={() => setShowSignature(true)}
                onMouseLeave={() => setShowSignature(false)}>
                <ShieldCheck size={12} />
                AI Generated & Verified
              </button>

              {showSignature && (
                <div className='absolute left-0 top-9 z-20 w-80 px-3.5 py-3 bg-[#0F1928] border border-white/10 rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.5)]'>
                  <div
                    className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] mb-1.5 ${dmMono.className}`}>
                    Cryptographic Signature
                  </div>
                  <div
                    className={`text-[11px] text-[#3B82F6] break-all leading-[1.6] ${syne.className}`}>
                    {data.signature || '0xAI_VERIFIED_HASH_UNAVAILABLE_IN_DB'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div className='flex flex-col gap-1.5 items-end'>
            <span
              className={`flex items-center gap-1.25 text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] ${dmMono.className}`}>
              <Clock size={10} /> Updated: Just Now
            </span>
            <span
              className={`flex items-center gap-1.25 text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] ${dmMono.className}`}>
              <Fingerprint size={10} />
              <span className='text-[10px] text-[#4A6080] tracking-[0.08em]'>
                {data.authorId?.slice(0, 8)}...
              </span>
            </span>
          </div>
        </header>

        {/* ── SUMMARY + SCORE ROW ─────────────────────────────────────── */}
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-stretch'>
          {/* Executive Summary */}
          <div className='relative px-8 py-7 overflow-hidden bg-[#0F1928] border border-white/5 rounded-2xl'>
            {/* Noise Overlay */}
            <div
              className='absolute inset-0 opacity-40 pointer-events-none'
              style={{ backgroundImage: noiseImage }}
            />

            {/* subtle top accent line */}
            <div className='absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent' />

            <div className='flex items-center gap-2 mb-4 relative z-10'>
              <Info
                size={13}
                color='#3B82F6'
              />
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] ${dmMono.className}`}>
                Executive Summary
              </span>
            </div>
            <p className='text-[15px] leading-[1.75] text-[#C8D8E8] font-normal relative z-10'>
              {data.executiveSummary}
            </p>
          </div>

          {/* Score + Risk stack */}
          <div className='flex flex-col gap-5 min-w-55'>
            {/* Trust Score radial */}
            <div className='relative flex-1 p-6 flex flex-col items-center justify-center overflow-hidden bg-[#0F1928] border border-white/5 rounded-2xl'>
              <div
                className='absolute inset-0 opacity-40 pointer-events-none'
                style={{ backgroundImage: noiseImage }}
              />
              <div
                className='absolute inset-0 rounded-2xl'
                style={{
                  background: `radial-gradient(ellipse at 50% 60%, ${getScoreGlow(data.trustScore)}, transparent 70%)`,
                }}
              />

              <div className='relative w-27 h-27 flex items-center justify-center'>
                <svg
                  width='108'
                  height='108'
                  className='-rotate-90'>
                  <circle
                    cx='54'
                    cy='54'
                    r={radius}
                    stroke='rgba(255,255,255,0.04)'
                    strokeWidth='10'
                    fill='none'
                  />
                  <circle
                    cx='54'
                    cy='54'
                    r={radius}
                    stroke={scoreColor}
                    strokeWidth='10'
                    fill='none'
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap='round'
                    className='transition-[stroke-dashoffset] duration-1000 ease-in-out'
                  />
                </svg>
                <div className='absolute flex flex-col items-center'>
                  <span
                    className={`text-[30px] font-bold tracking-[-0.04em] leading-none ${dmMono.className}`}
                    style={{ color: scoreColor }}>
                    {data.trustScore}
                  </span>
                  <span
                    className={`text-[8px] font-normal tracking-[0.18em] uppercase text-[#4A6080] mt-0.5 ${dmMono.className}`}>
                    /100
                  </span>
                </div>
              </div>
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] mt-2.5 relative z-10 ${dmMono.className}`}>
                Trust Score
              </span>
            </div>

            {/* Risk Level */}
            <div
              className='relative flex-1 p-5 flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#0F1928]'
              style={{ border: `0.5px solid ${riskColor}22` }}>
              <div
                className='absolute inset-0 opacity-40 pointer-events-none z-0'
                style={{ backgroundImage: noiseImage }}
              />
              <div
                className='absolute inset-0 rounded-2xl z-0'
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${riskColor}0A, transparent 70%)`,
                }}
              />
              <AlertTriangle
                size={24}
                color={riskColor}
                className='mb-2.5 relative z-10'
              />
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] mb-1.5 relative z-10 ${dmMono.className}`}>
                Risk Profile
              </span>
              <span
                className='text-[18px] font-extrabold tracking-widest uppercase relative z-10'
                style={{ color: riskColor }}>
                {data.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* ── SECURITY + TEAM ROW ─────────────────────────────────────── */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {/* Security */}
          <div className='relative px-7 py-6 overflow-hidden bg-[#0F1928] border border-white/5 rounded-2xl'>
            <div
              className='absolute inset-0 opacity-40 pointer-events-none'
              style={{ backgroundImage: noiseImage }}
            />

            <div className='flex items-center gap-2 mb-5 relative z-10'>
              <ShieldCheck
                size={13}
                color='#3B82F6'
              />
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] ${dmMono.className}`}>
                Security Audit
              </span>
            </div>

            <div className='mb-4 relative z-10'>
              {data.security.audited ? (
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#34D399]/10 border border-[#34D399]/20 rounded-full text-[11px] font-medium tracking-widest uppercase text-[#34D399] ${dmMono.className}`}>
                  <CheckCircle2 size={13} /> Audited & Verified
                </div>
              ) : (
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ff4d6b]/10 border border-[#ff4d6b]/20 rounded-full text-[11px] font-medium tracking-widest uppercase text-[#ff4d6b] ${dmMono.className}`}>
                  <XCircle size={13} /> Unaudited
                </div>
              )}
            </div>

            <p className='text-[13px] leading-[1.65] text-[#6B8CAE] pl-3.5 border-l-[1.5px] border-white/10 relative z-10'>
              {data.security.details}
            </p>
          </div>

          {/* Team & Backers */}
          <div className='relative px-7 py-6 overflow-hidden bg-[#0F1928] border border-white/5 rounded-2xl'>
            <div
              className='absolute inset-0 opacity-40 pointer-events-none'
              style={{ backgroundImage: noiseImage }}
            />

            <div className='flex items-center gap-2 mb-5 relative z-10'>
              <Users
                size={13}
                color='#3B82F6'
              />
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] ${dmMono.className}`}>
                Identity & Backers
              </span>
            </div>

            <div className='mb-4 relative z-10'>
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase ${dmMono.className}`}
                style={{
                  background: data.teamAndBackers.is_doxxed
                    ? 'rgba(52,211,153,0.07)'
                    : 'rgba(255,222,115,0.07)',
                  border: `0.5px solid ${data.teamAndBackers.is_doxxed ? 'rgba(52,211,153,0.2)' : 'rgba(255,222,115,0.2)'}`,
                  color: data.teamAndBackers.is_doxxed ? '#34D399' : '#ffde73',
                }}>
                {data.teamAndBackers.is_doxxed ? (
                  <>
                    <CheckCircle2 size={13} /> Public Team
                  </>
                ) : (
                  <>
                    <AlertTriangle size={13} /> Anonymous Team
                  </>
                )}
              </div>
            </div>

            <p className='text-[13px] leading-[1.65] text-[#6B8CAE] pl-3.5 border-l-[1.5px] border-white/10 relative z-10'>
              {data.teamAndBackers.details}
            </p>
          </div>
        </div>

        {/* ── TOKENOMICS ─────────────────────────────────────────────── */}
        <div className='relative px-8 py-7 overflow-hidden bg-[#0F1928] border border-white/5 rounded-2xl'>
          <div
            className='absolute inset-0 opacity-40 pointer-events-none'
            style={{ backgroundImage: noiseImage }}
          />

          {/* Header row */}
          <div className='flex justify-between items-end mb-7 flex-wrap gap-4 relative z-10'>
            <div className='flex items-center gap-2'>
              <PieChart
                size={13}
                color='#3B82F6'
              />
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] ${dmMono.className}`}>
                Tokenomics Distribution
              </span>
            </div>
            <div className='text-right'>
              <div
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] mb-1 ${dmMono.className}`}>
                Total Supply
              </div>
              <div
                className={`text-[18px] font-semibold text-[#E2E8F0] tracking-[-0.02em] ${dmMono.className}`}>
                {data.tokenomics.total_supply}
              </div>
            </div>
          </div>

          {/* Allocation bar */}
          <div className='flex h-2.5 rounded-full overflow-hidden bg-white/5 mb-6 gap-px relative z-10'>
            {data.tokenomics.allocations.map((alloc: any, i: number) => (
              <div
                key={i}
                title={`${alloc.category}: ${alloc.percentage}%`}
                className='opacity-85 hover:opacity-100 hover:brightness-110 cursor-crosshair transition-all duration-200'
                style={{
                  width: `${alloc.percentage}%`,
                  background: allocColors[i % allocColors.length],
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className='grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 mb-7 relative z-10'>
            {data.tokenomics.allocations.map((alloc: any, i: number) => (
              <div
                key={i}
                className='flex flex-col gap-1'>
                <div className='flex items-center gap-1.5'>
                  <div
                    className='w-1.5 h-1.5 rounded-sm shrink-0'
                    style={{ background: allocColors[i % allocColors.length] }}
                  />
                  <span
                    className={`text-[9px] font-normal tracking-[0.18em] uppercase text-[#4A6080] overflow-hidden text-ellipsis whitespace-nowrap ${dmMono.className}`}>
                    {alloc.category}
                  </span>
                </div>
                <span
                  className={`text-[22px] font-bold text-[#D8E8F5] tracking-[-0.03em] leading-none ${dmMono.className}`}>
                  {alloc.percentage}
                  <span className='text-[13px] font-normal text-[#4A6080] ml-0.5'>
                    %
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* Utility tags */}
          <div className='pt-5 border-t border-white/5 relative z-10'>
            <div
              className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#4A6080] mb-2.5 ${dmMono.className}`}>
              Core Utility
            </div>
            <div className='flex flex-wrap gap-2'>
              {data.tokenomics.utility.map((u: string, i: number) => (
                <span
                  key={i}
                  className={`px-3.5 py-1.5 bg-[#0A1020] border border-white/5 rounded-full text-[11px] font-normal tracking-[0.08em] uppercase text-[#7A9BB8] ${dmMono.className}`}>
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── flags + CATALYSTS ─────────────────────────────────────── */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {/* Green Flags */}
          <div className='relative px-6 py-6 overflow-hidden bg-[#0F1928] border border-white/5 rounded-2xl'>
            <div
              className='absolute inset-0 opacity-40 pointer-events-none'
              style={{ backgroundImage: noiseImage }}
            />
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/30 to-transparent' />

            <div className='flex items-center gap-2 mb-4 relative z-10'>
              <CheckCircle2
                size={12}
                color='#34D399'
              />
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#34D399]/80 ${dmMono.className}`}>
                Positive Vectors
              </span>
            </div>

            <div className='relative z-10'>
              {data.greenFlags.map((flag: string, i: number) => (
                <div
                  key={i}
                  className='flex items-start gap-2.5 py-2.5 border-b border-white/5 last:border-0 text-sm leading-[1.55] text-[#C8D8E8]'>
                  <div className='w-1 h-1 rounded-full bg-[#34D399] mt-1.5 shrink-0' />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags */}
          <div className='relative px-6 py-6 overflow-hidden bg-[#0F1928] border border-[#ff4d6b]/10 rounded-2xl'>
            <div
              className='absolute inset-0 opacity-40 pointer-events-none'
              style={{ backgroundImage: noiseImage }}
            />
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff4d6b]/40 to-transparent' />
            <div className='absolute -top-10 -right-10 w-35 h-35 bg-[radial-gradient(circle,rgba(255,77,107,0.06),transparent_70%)] rounded-full pointer-events-none' />

            <div className='flex items-center gap-2 mb-4 relative z-10'>
              <AlertTriangle
                size={12}
                color='#ff4d6b'
              />
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#ff4d6b]/80 ${dmMono.className}`}>
                Threat Vectors
              </span>
            </div>

            <div className='relative z-10'>
              {data.redFlags.map((flag: string, i: number) => (
                <div
                  key={i}
                  className='flex items-start gap-2.5 py-2.5 border-b border-white/5 last:border-0 text-sm leading-[1.55] text-[#C8D8E8]'>
                  <AlertTriangle
                    size={12}
                    color='#ff4d6b'
                    className='mt-0.5 shrink-0'
                  />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Catalysts */}
          <div className='relative px-6 py-6 overflow-hidden bg-[#0F1928] border border-white/5 rounded-2xl'>
            <div
              className='absolute inset-0 opacity-40 pointer-events-none'
              style={{ backgroundImage: noiseImage }}
            />
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent' />

            <div className='flex items-center gap-2 mb-4 relative z-10'>
              <TrendingUp
                size={12}
                color='#3B82F6'
              />
              <span
                className={`text-[10px] font-normal tracking-[0.18em] uppercase text-[#3B82F6]/80 ${dmMono.className}`}>
                Future Catalysts
              </span>
            </div>

            <div className='relative z-10'>
              {data.catalysts.map((catalyst: string, i: number) => (
                <div
                  key={i}
                  className='flex items-start gap-3 py-3 border-b border-white/5 last:border-0 text-sm leading-[1.55] text-[#C8D8E8]'>
                  <div className='w-[1.5px] self-stretch bg-[#3B82F6]/25 rounded shrink-0 mt-0.5' />
                  <span>{catalyst}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
