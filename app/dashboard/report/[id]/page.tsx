import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ReportDashboard from '@/components/blocks/report';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function ReportPage({ params }: PageProps) {
  const resolvedParams = await params;
  const reportId = resolvedParams.id;

  const reportData = await prisma.report.findUnique({
    where: { id: reportId },
    include: { author: true },
  });

  if (!reportData) {
    notFound();
  }

  return (
    <main className='min-h-screen bg-[#323246] py-12 px-4'>
      {/* 4. Pass the DB record down to your UI component */}
      <ReportDashboard data={reportData} />
    </main>
  );
}
