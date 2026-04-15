import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import AuthListener from './auth-listener';
import { cookies } from 'next/headers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DeIntel | Automated Due Diligence',
  description:
    'Tier-1 AI-powered crypto research, on-chain scraping, and intelligence reporting. Uncover the truth.',
  openGraph: {
    title: 'DeIntel | Automated Due Diligence',
    description: 'Tier-1 AI-powered crypto research and intelligence.',
    url: 'https://de-intel.vercel.app',
    siteName: 'DeIntel',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeIntel',
    description: 'Tier-1 AI-powered crypto research and intelligence.',
    creator: '@thegrandgeiss',
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionCookie = await (await cookies()).get('deintel_session');
  const hasCookie = !!sessionCookie?.value;
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        <Providers>
          <AuthListener hasCookie={hasCookie} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
