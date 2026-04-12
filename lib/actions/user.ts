'use server';

import prisma from '../prisma';

export async function getOrCreateUser(walletAddress: string) {
  try {
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });
    return { success: true, user };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, error: 'Failed to sync user' };
  }
}

export async function checkUserStatus(walletAddress: string) {
  const user = await prisma.user.findUnique({
    where: { walletAddress },
    select: { id: true },
  });

  return { exists: !!user };
}
