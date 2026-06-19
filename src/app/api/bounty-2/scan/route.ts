import { NextResponse } from 'next/server';
import { runTrendScan } from '@/modules/bounties/bounty-2/scan';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const topic = url.searchParams.get('topic') || 'Kenyan founders';
  const result = await runTrendScan(topic);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    ...result,
  });
}
