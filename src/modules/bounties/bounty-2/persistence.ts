import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { saveScanToSupabase, getRecentScansFromSupabase } from '@/lib/supabase';
import type { TrendScanResult } from './types';

const storageDir = path.join(process.cwd(), 'data');
const storageFile = path.join(storageDir, 'bounty-2-scans.json');

type StoredScan = TrendScanResult & {
  scannedAt: string;
  topic: string;
};

async function ensureStorage() {
  await mkdir(storageDir, { recursive: true });
}

async function readScans(): Promise<StoredScan[]> {
  try {
    const raw = await readFile(storageFile, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveScanResult(result: TrendScanResult) {
  const stored: StoredScan = {
    ...result,
    topic: result.topic,
    scannedAt: new Date().toISOString(),
  };

  // Primary: Save to Supabase (production database)
  try {
    await saveScanToSupabase({
      topic: result.topic,
      result: stored,
      score: result.ranking?.score ?? 0,
      sourceCount: result.topTrend?.sourceCount ?? 0,
      lifespan: result.topTrend?.lifespan ?? 'unknown',
    });
  } catch (err) {
    console.warn('Supabase save failed, continuing with file backup:', err);
  }

  // Secondary: Save to file (backup for development, Vercel ephemeral storage backup)
  try {
    await ensureStorage();
    const scans = await readScans();
    scans.unshift(stored);
    await writeFile(storageFile, JSON.stringify(scans.slice(0, 50), null, 2), 'utf8');
  } catch (err) {
    console.warn('File storage save failed:', err);
  }

  return stored;
}

export async function loadRecentScans(limit = 10): Promise<StoredScan[]> {
  // Primary: Try Supabase (production database)
  try {
    const supabaseScans = await getRecentScansFromSupabase(limit);
    if (supabaseScans.length > 0) {
      return supabaseScans.map((scan) => ({
        ...scan.result,
        scannedAt: scan.created_at,
        topic: scan.topic,
      })) as StoredScan[];
    }
  } catch (err) {
    console.warn('Supabase fetch failed, trying file storage:', err);
  }

  // Secondary: Fallback to file storage (development)
  const scans = await readScans();
  return scans.slice(0, limit);
}
