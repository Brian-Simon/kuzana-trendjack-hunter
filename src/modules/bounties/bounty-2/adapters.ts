import { fetchGoogleNewsTrends, fetchHackerNewsTrends, fetchRedditTrends, fetchYouTubeTrends, fetchTikTokTrends, fetchInstagramReelsTrends, fetchYouTubeShortsTrends, fetchKenyanNewsTrends } from './sources';
import { fetchXTrends } from './x-adapter';
import type { TrendSourceItem } from './types';

export type SocialPlatform = 'reddit' | 'youtube' | 'x' | 'meta' | 'google-news' | 'hacker-news' | 'tiktok' | 'instagram-reels' | 'youtube-shorts' | 'kenyan-news';

export interface SourceAdapter {
  platform: SocialPlatform;
  label: string;
  enabled: boolean;
  fetchTrends: (topic: string) => Promise<TrendSourceItem[]>;
}

function envEnabled(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

async function emptyFeed() {
  return [] as TrendSourceItem[];
}

export const sourceAdapters: SourceAdapter[] = [
  {
    platform: 'reddit',
    label: 'Reddit',
    enabled: true,
    fetchTrends: fetchRedditTrends,
  },
  {
    platform: 'youtube',
    label: 'YouTube',
    enabled: true,
    fetchTrends: fetchYouTubeTrends,
  },
  {
    platform: 'youtube-shorts',
    label: 'YouTube Shorts',
    enabled: true,
    fetchTrends: fetchYouTubeShortsTrends,
  },
  {
    platform: 'tiktok',
    label: 'TikTok',
    enabled: true,
    fetchTrends: fetchTikTokTrends,
  },
  {
    platform: 'instagram-reels',
    label: 'Instagram Reels',
    enabled: true,
    fetchTrends: fetchInstagramReelsTrends,
  },
  {
    platform: 'x',
    label: 'X',
    enabled: envEnabled(process.env.X_BEARER_TOKEN),
    fetchTrends: fetchXTrends,
  },
  {
    platform: 'meta',
    label: 'Meta / Instagram',
    enabled: envEnabled(process.env.META_ACCESS_TOKEN),
    fetchTrends: emptyFeed,
  },
  {
    platform: 'google-news',
    label: 'Google News',
    enabled: true,
    fetchTrends: fetchGoogleNewsTrends,
  },
  {
    platform: 'kenyan-news',
    label: 'Kenyan Business News',
    enabled: true,
    fetchTrends: fetchKenyanNewsTrends,
  },
  {
    platform: 'hacker-news',
    label: 'Hacker News',
    enabled: true,
    fetchTrends: fetchHackerNewsTrends,
  },
];
