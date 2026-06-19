import { NextResponse } from 'next/server';
import { loadRecentScans } from '@/modules/bounties/bounty-2/persistence';

export async function GET() {
  const scans = await loadRecentScans(10);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    scans,
  });
}
