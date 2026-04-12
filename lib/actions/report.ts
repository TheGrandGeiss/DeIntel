'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function getUserReports() {
  try {
    const sessionCookie = (await cookies()).get('deintel_session');

    if (!sessionCookie || !sessionCookie.value) {
      return { success: false, reports: [] };
    }

    const reports = await prisma.report.findMany({
      where: { authorId: sessionCookie.value },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        projectName: true,
        ticker: true,
        trustScore: true,
      },
      take: 10, // Limit the dropdown to the 10 most recent
    });

    return { success: true, reports };
  } catch (error) {
    console.error('Error fetching reports:', error);
    return { success: false, reports: [] };
  }
}
