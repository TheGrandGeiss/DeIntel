import { NextResponse } from 'next/server';
import { getOrCreateUser } from '@/lib/actions/user';
import {
  verifySignature,
  getUtf8Encoder,
  signatureBytes,
  getBase58Encoder,
} from '@solana/kit';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { publicKey, signature, message } = await req.json();

    if (!publicKey || !signature || !message) {
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 },
      );
    }

    const messageBytes = getUtf8Encoder().encode(message);

    const signBytes = signatureBytes(new Uint8Array(signature));

    const pubKeyBytes = getBase58Encoder().encode(publicKey);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      pubKeyBytes,
      'Ed25519',
      true,
      ['verify'],
    );

    const isValid = await verifySignature(cryptoKey, signBytes, messageBytes);

    if (!isValid) {
      console.log('Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const dbResult = await getOrCreateUser(publicKey);

    if (!dbResult.success || !dbResult.user?.id) {
      return NextResponse.json(
        { error: 'Failed to sync with database' },
        { status: 500 },
      );
    }

    (await cookies()).set('deintel_session', dbResult.user?.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json(
      {
        success: true,
        user: dbResult.user,
        message: 'Authentication successful',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
