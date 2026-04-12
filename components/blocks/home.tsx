'use client';

import React from 'react';
import Search from './search';

export default function Home() {
  return (
    <main className='min-h-full bg-[#05050a] text-white flex flex-col justify-center items-center p-4 selection:bg-blue-500/30 relative overflow-hidden pt-24'>
      {/* GLOWING BACKGROUND ORBS */}
      <div className='absolute top-[-10%] left-[-10%] w-125 h-125 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none' />

      {/* Main Search Area */}
      <div className='z-10 w-full flex justify-center'>
        <Search />
      </div>
    </main>
  );
}
