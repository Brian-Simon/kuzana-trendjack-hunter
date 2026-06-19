import { buildBrief } from './brief';
import { classifyTrend, scoreTrend, summarizeRanking, estimateTrendLifespan } from './classify';
import { sourceAdapters } from './adapters';
import { saveScanResult } from './persistence';
import type { TrendScanResult } from './types';

export async function runTrendScan(topic: string): Promise<TrendScanResult & { brief: ReturnType<typeof buildBrief> }> {
  const activeAdapters = sourceAdapters.filter((adapter) => adapter.enabled);
  const feedResults = await Promise.all(activeAdapters.map(async (adapter) => adapter.fetchTrends(topic)));

  const items = feedResults.flat()
    .sort((a, b) => {
      const scoreA = (a.engagementRate ?? a.engagement / Math.max(1, a.impressions ?? a.engagement * 20)) * 1000 + a.engagement;
      const scoreB = (b.engagementRate ?? b.engagement / Math.max(1, b.impressions ?? b.engagement * 20)) * 1000 + b.engagement;
      return scoreB - scoreA;
    })
    .slice(0, 12);

  const classifier = classifyTrend(items, topic);
  const lifespan = estimateTrendLifespan(items, classifier);
  const score = scoreTrend(items);
  const ranking = summarizeRanking(items);
  const topTrend = {
    title: items[0]?.title ?? `${topic} signal`,
    topic: classifier.topic,
    score,
    sourceCount: new Set(items.map((item) => item.source)).size,
    lifespan,
    whyItMatters: classifier.whyItMatters,
  };

  const brief = buildBrief({
    topic: topTrend.title,
    angle: classifier.angle,
    lifespan,
    whyItMatters: classifier.whyItMatters,
  });

  const result = {
    topic,
    topTrend,
    items,
    brief,
    ranking: {
      score,
      totalImpressions: ranking.totalImpressions,
      averageEngagementRate: ranking.averageEngagementRate,
      sourceDiversity: ranking.sourceDiversity,
    },
  };

  await saveScanResult(result);

  return result;
}
