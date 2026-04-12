import React from 'react';
import Navbar from '@/components/blocks/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative min-h-screen bg-[#05050a] text-zinc-100 font-sans selection:bg-blue-500/30 antialiased'>
      <Navbar />

      {/* Main Content Area - pt-24 pushes content down so it sits below the fixed Navbar */}
      <div className='pt-24'>{children}</div>
    </div>
  );
}
