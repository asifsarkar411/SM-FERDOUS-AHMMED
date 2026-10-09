import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';

export async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== 'admin') {
    return null;
  }
  return session;
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, error: 'Unauthorized: Admin access required.' },
    { status: 401 }
  );
}
