import Home from '@/components/blocks/home';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  return (
    <>
      <Home />
    </>
  );
}
