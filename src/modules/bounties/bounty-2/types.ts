export interface TrendSourceItem {
  source: string;
  platform?: 'reddit' | 'youtube' | 'youtube-shorts' | 'x' | 'meta' | 'google-news' | 'hacker-news' | 'tiktok' | 'instagram-reels' | 'kenyan-news';
  title: string;
  url: string;
  publishedAt: string;
  engagement: number;
  impressions?: number;
  engagementRate?: number;
  excerpt: string;
  media?: {
    kind: 'none' | 'image' | 'video' | 'article';
    thumbnailUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    altText?: string;
    sourceHint?: string;
  };
  context?: {
    transcript?: string;
    ocrText?: string;
    caption?: string;
    extractedFrom?: string;
  };
}

export interface TrendScanResult {
  topic: string;
  topTrend: {
    title: string;
    topic: string;
    score: number;
    sourceCount: number;
    lifespan: string;
    whyItMatters: string;
  };
  items: TrendSourceItem[];
  brief: import('@/modules/bounties/shared/types').ContentBrief;
  ranking: {
    score: number;
    totalImpressions: number;
    averageEngagementRate: number;
    sourceDiversity: number;
  };
}
