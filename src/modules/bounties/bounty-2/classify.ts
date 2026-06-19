import type { TrendSourceItem } from './types';

const themeRules: Array<{ topic: string; keywords: string[]; angle: string; lifespan: string; whyItMatters: string }> = [
  {
    topic: 'founder culture',
    keywords: ['founder', 'startup', 'entrepreneur', 'business', 'ceo', 'leadership'],
    angle: 'Use the trend to show the real pressure behind building a Kenyan company, not just the hype. Founders relate to founders—make the story personal.',
    lifespan: '3-7 days',
    whyItMatters: 'It maps quickly to audience identity, which keeps the conversation moving in founder circles. The longer lifespan lets you catch follow-up angles.',
  },
  {
    topic: 'money and growth',
    keywords: ['funding', 'revenue', 'profit', 'sales', 'cash', 'vc', 'investment', 'loan', 'debt'],
    angle: 'Turn the trend into a practical lesson on cash flow, growth, and survival. Show the founder math, not the hype.',
    lifespan: '5-14 days',
    whyItMatters: 'Money stories travel fast when people can tie them to operating reality. They compound when referenced in multiple contexts.',
  },
  {
    topic: 'ai and systems',
    keywords: ['ai', 'automation', 'tool', 'workflow', 'software', 'api', 'gpt', 'agent', 'llm'],
    angle: 'Translate the trend into an operator-friendly workflow or system founders can copy. Show the before/after time savings.',
    lifespan: '2-7 days',
    whyItMatters: 'Builders share useful systems when they are directly applicable, not abstract. New tools trend fast but fall off quickly if the benefit is unclear.',
  },
  {
    topic: 'consumer behavior',
    keywords: ['viral', 'meme', 'culture', 'trend', 'content', 'challenge', 'dance', 'format'],
    angle: 'Show what the trend reveals about audience behavior and how a business can use it. Adapt the format, not just comment on it.',
    lifespan: '6-36 hours',
    whyItMatters: 'Cultural trends burn hot and are valuable if the brief is immediate and concrete. Speed is your only advantage.',
  },
  {
    topic: 'market news',
    keywords: ['inflation', 'economy', 'regulatory', 'policy', 'law', 'market', 'rate', 'tax'],
    angle: 'Connect macro shifts to founder operating reality: How does this change hiring, pricing, or customer acquisition for Kuzana operators?',
    lifespan: '7-30 days',
    whyItMatters: 'Policy and market shifts have staying power. Founders need clear interpretation and action steps to act at all.',
  },
];

export function classifyTrend(items: TrendSourceItem[], topic: string) {
  const normalizedTopic = topic.toLowerCase();
  const matched = themeRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedTopic.includes(keyword) || items.some((item) => item.title.toLowerCase().includes(keyword) || item.excerpt.toLowerCase().includes(keyword)))
  );

  return matched ?? themeRules[0];
}

export function estimateTrendLifespan(items: TrendSourceItem[], classification: typeof themeRules[0]): string {
  // Data-driven lifespan estimate: shorter if all items are from short-form platforms, longer if from established news
  const hasShortForm = items.some((item) => item.platform === 'tiktok' || item.platform === 'instagram-reels' || item.platform === 'youtube-shorts');
  const hasNews = items.some((item) => item.platform === 'google-news' || item.platform === 'kenyan-news' || item.platform === 'hacker-news');
  const hasMultipleSources = new Set(items.map((item) => item.source)).size > 2;

  // If trending across multiple news sources, assume longer lifespan
  if (hasNews && hasMultipleSources) {
    const ranges = classification.lifespan.split('-').map((x) => parseInt(x));
    return `${ranges[1] || ranges[0]} days (sustained across news)`;
  }

  // If primarily short-form, it's faster-burning
  if (hasShortForm && !hasNews) {
    const ranges = classification.lifespan.split('-').map((x) => parseInt(x));
    return `${ranges[0]}-${(ranges[1] || ranges[0]) / 2} hours`;
  }

  return classification.lifespan;
}

export function scoreTrend(items: TrendSourceItem[]) {
  const sourceCount = new Set(items.map((item) => item.source)).size;
  const weightedEngagement = items.reduce((total, item) => total + item.engagement, 0);
  const totalImpressions = items.reduce((total, item) => total + (item.impressions ?? item.engagement * 20), 0);
  const averageEngagementRate = weightedEngagement / Math.max(1, totalImpressions);
  const recencyBonus = items.reduce((total, item) => {
    const ageMs = Date.now() - new Date(item.publishedAt).getTime();
    const ageHours = Math.max(ageMs / (1000 * 60 * 60), 1);
    return total + Math.max(0, 24 / ageHours);
  }, 0) / Math.max(1, items.length);

  return Math.round(
    (weightedEngagement / Math.max(1, items.length)) * 0.45 +
      averageEngagementRate * 1000 * 0.3 +
      sourceCount * 16 +
      recencyBonus * 12
  );
}

export function summarizeRanking(items: TrendSourceItem[]) {
  const totalImpressions = items.reduce((total, item) => total + (item.impressions ?? 0), 0);
  const totalEngagement = items.reduce((total, item) => total + item.engagement, 0);
  const averageEngagementRate = totalEngagement / Math.max(1, totalImpressions || items.length);
  const sourceDiversity = new Set(items.map((item) => item.source)).size;

  return {
    totalImpressions,
    averageEngagementRate,
    sourceDiversity,
  };
}
