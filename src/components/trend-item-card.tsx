'use client';

import type { TrendSourceItem } from '@/modules/bounties/bounty-2/types';

interface TrendItemProps {
  item: TrendSourceItem;
  rank: number;
}

export function TrendItemCard({ item, rank }: TrendItemProps) {
  const platformEmoji: Record<string, string> = {
    'reddit': '🔴',
    'youtube': '▶️',
    'youtube-shorts': '📱',
    'x': '𝕏',
    'tiktok': '🎵',
    'instagram-reels': '📸',
    'google-news': '📰',
    'hacker-news': '⟨⟩',
    'kenyan-news': '🇰🇪',
    'meta': '📘',
  };

  const platformLabel = item.platform || item.source;
  const emoji = platformEmoji[platformLabel] || '🔗';

  return (
    <article className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-colors p-5">
      <div className="flex gap-4">
        {/* Rank Badge */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#8ef0c9]/20 flex items-center justify-center">
          <span className="font-bold text-[#8ef0c9] text-sm">#{rank}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-semibold text-white text-sm md:text-base leading-snug line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs text-[#b5bfd0] bg-white/5 rounded-full px-2 py-1">
                  {emoji} {platformLabel}
                </span>
                {item.engagementRate && (
                  <span className="text-xs text-[#8ef0c9] font-medium">
                    {(item.engagementRate * 100).toFixed(2)}% engagement
                  </span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-xs font-bold text-[#8ef0c9]">{item.engagement.toLocaleString()}</p>
              <p className="text-xs text-[#b5bfd0]">engagement</p>
            </div>
          </div>

          {/* Excerpt */}
          <p className="mt-3 text-xs md:text-sm text-[#d9dfeb] line-clamp-2">
            {item.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-2 mt-3 text-xs text-[#6d788b]">
            <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
            {item.impressions && (
              <>
                <span>•</span>
                <span>{item.impressions.toLocaleString()} impressions</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      {item.media?.kind !== 'none' && item.media?.thumbnailUrl && (
        <div className="mt-4 rounded-lg overflow-hidden">
          <img 
            src={item.media.thumbnailUrl} 
            alt={item.title}
            className="w-full h-32 object-cover"
          />
        </div>
      )}
    </article>
  );
}
