export type BountyStatus = 'planned' | 'prototype' | 'ready';

export interface BountyModule {
  id: number;
  title: string;
  summary: string;
  status: BountyStatus;
  delivery: string;
  integrationNotes: string;
}

export interface TrendSignal {
  source: string;
  title: string;
  url: string;
  publishedAt: string;
  score: number;
  topic: string;
  whyItMatters: string;
}

export interface ContentBrief {
  trend: {
    topic: string;
    angle: string;
    lifespan: string;
    confidence: string;
    whyItMatters?: string;
  };
  hook: string;
  context: string;
  angle: string;
  proof: string;
  cta: string;
  script: string[];
  remixTemplate: string[];
  actionPlan: string[];
}
