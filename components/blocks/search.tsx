'use client';

import React, { useState } from 'react';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';

import { useRouter } from 'next/navigation';

const Search = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (data.success) {
        router.push(`dashboard/report/${data.reportId}`);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className='w-full max-w-2xl flex flex-col items-center gap-10'>
        {/* The DeIntel Logo Area */}
        <div className='text-center space-y-4'>
          <h1 className='text-5xl md:text-7xl font-bold tracking-tighter text-white'>
            De<span className='text-zinc-500'>Intel</span>
          </h1>
          <p className='text-zinc-400 text-lg md:text-xl font-medium tracking-wide'>
            Automated due diligence. Uncover the truth.
          </p>
        </div>

        {/* The Unified Search Pill */}
        <div className='relative w-full group'>
          <div className='absolute -inset-0.5 bg-linear-to-r from-zinc-800 to-zinc-700 rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition duration-500'></div>

          <div className='relative flex items-center w-full min-h-18 bg-[#0a0a0a] rounded-2xl border border-zinc-800 px-4 focus-within:border-zinc-500 transition-colors'>
            <SearchIcon
              className='text-zinc-500 ml-2'
              size={24}
            />

            <input
              type='url'
              placeholder='Paste token contract or whitepaper URL...'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className='flex-1 bg-transparent text-white placeholder:text-zinc-600 text-lg md:text-xl px-4 py-4 outline-none'
              required
            />

            {/* The Submit Button (Inside the bar) */}
            <button
              type='submit'
              className='h-12 w-12 bg-white hover:bg-zinc-200 text-black rounded-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50'>
              <ArrowRight
                size={20}
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </form>

      {/* Deep AI Loading Screen */}
      {isLoading && (
        <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg animate-in fade-in duration-300'>
          <div className='relative flex items-center justify-center'>
            {/* Pulsing ring */}
            {/* <div className='absolute w-24 h-24 border-2 border-zinc-700 rounded-full animate-ping'></div> */}
            {/* Core block */}
            {/* <div className='w-12 h-12 bg-white rounded-lg animate-pulse shadow-[0_0_40px_rgba(255,255,255,0.4)]'></div> */}
            <div className='loader'></div>
          </div>

          <p className='mt-10 text-zinc-300 font-mono text-sm tracking-widest uppercase'>
            Decrypting & Analyzing
          </p>
        </div>
      )}
    </>
  );
};

export default Search;
