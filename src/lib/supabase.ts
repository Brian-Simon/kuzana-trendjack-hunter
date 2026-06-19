import { createClient } from '@supabase/supabase-js';

export interface TrendScanRecord {
  id: string;
  topic: string;
  result: Record<string, any>;
  score: number;
  source_count: number;
  trend_lifespan: string;
  created_at: string;
  updated_at: string;
}

// Initialize Supabase client (server-side with service role key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('⚠️ Supabase credentials not configured. Falling back to file-based storage.');
}

export const supabase = supabaseUrl && supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    })
  : null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey);

export async function saveScanToSupabase(data: {
  topic: string;
  result: Record<string, any>;
  score: number;
  sourceCount: number;
  lifespan: string;
}): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase not configured; skipping database save');
    return null;
  }

  try {
    const { data: saved, error } = await supabase
      .from('trend_scans')
      .insert([
        {
          topic: data.topic,
          result: data.result,
          score: data.score,
          source_count: data.sourceCount,
          trend_lifespan: data.lifespan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase save error:', error);
      return null;
    }

    return saved?.id ?? null;
  } catch (err) {
    console.error('Error saving scan to Supabase:', err);
    return null;
  }
}

export async function getRecentScansFromSupabase(limit: number = 10): Promise<TrendScanRecord[]> {
  if (!supabase) {
    console.warn('Supabase not configured; returning empty array');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('trend_scans')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Supabase fetch error:', error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error('Error fetching scans from Supabase:', err);
    return [];
  }
}

export async function getScanByIdFromSupabase(id: string): Promise<TrendScanRecord | null> {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('trend_scans')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase fetch error:', error);
      return null;
    }

    return data ?? null;
  } catch (err) {
    console.error('Error fetching scan from Supabase:', err);
    return null;
  }
}
