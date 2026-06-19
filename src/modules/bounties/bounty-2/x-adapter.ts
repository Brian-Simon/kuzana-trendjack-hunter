import type { TrendSourceItem } from './types';

interface XTweet {
  id?: string;
  text?: string;
  author_id?: string;
  created_at?: string;
  public_metrics?: {
    retweet_count?: number;
    reply_count?: number;
    like_count?: number;
    quote_count?: number;
    impression_count?: number;
    bookmark_count?: number;
  };
  attachments?: {
    media_keys?: string[];
  };
}

interface XUser {
  id?: string;
  username?: string;
}

function cleanText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function computeXEngagement(metrics?: XTweet['public_metrics']) {
  if (!metrics) {
    return 0;
  }

  return (metrics.like_count ?? 0) + (metrics.retweet_count ?? 0) * 2 + (metrics.reply_count ?? 0) * 1.5 + (metrics.bookmark_count ?? 0) * 0.5;
}

function getXImpressions(metrics?: XTweet['public_metrics']) {
  if (!metrics?.impression_count) {
    return undefined;
  }

  return Math.max(metrics.impression_count, 100);
}

export async function fetchXTrends(topic: string): Promise<TrendSourceItem[]> {
  const bearerToken = process.env.X_BEARER_TOKEN;
  if (!bearerToken) {
    return [];
  }

  const query = `${encodeURIComponent(topic)} -is:retweet lang:en -is:reply`;
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=10&tweet.fields=public_metrics,created_at,author_id,attachments&expansions=author_id&user.fields=username`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'User-Agent': 'KuzanaTrendjack/1.0',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error(`X API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const tweets = data?.data ?? [];
    const usersMap = new Map((data?.includes?.users ?? []).map((u: XUser) => [u?.id, u?.username]));

    return tweets.map((tweet: XTweet) => {
      const engagement = computeXEngagement(tweet.public_metrics);
      const impressions = getXImpressions(tweet.public_metrics);
      const engagementRate = impressions ? engagement / impressions : undefined;

      return {
        source: 'X',
        platform: 'x' as const,
        title: cleanText(tweet.text?.slice(0, 140) ?? 'Untitled X post'),
        url: `https://x.com/${usersMap.get(tweet.author_id) ?? tweet.author_id}/status/${tweet.id}`,
        publishedAt: tweet.created_at ?? new Date().toISOString(),
        engagement,
        impressions,
        engagementRate,
        excerpt: cleanText(tweet.text ?? 'X post trend signal'),
        media: tweet.attachments?.media_keys
          ? {
              kind: 'image' as const,
              altText: cleanText(tweet.text ?? 'X media trend'),
              sourceHint: 'X media attachment',
            }
          : {
              kind: 'article' as const,
              altText: cleanText(tweet.text ?? 'X post trend'),
              sourceHint: 'X text post',
            },
      } satisfies TrendSourceItem;
    });
  } catch (error) {
    console.error('X trend fetch failed:', error);
    return [];
  }
}
