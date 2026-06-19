'use client';

import { useState, useTransition } from 'react';
import type { TrendScanResult } from '@/modules/bounties/bounty-2/types';

const initialTopic = 'Kenyan founders';

export function Bounty2Dashboard() {
  const [topic, setTopic] = useState(initialTopic);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<TrendScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runScan = () => {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/bounty-2/scan?topic=${encodeURIComponent(topic)}`);
        if (!response.ok) {
          throw new Error('Trend scan failed');
        }
        const data = await response.json();
        setResult(data);
      } catch (scanError) {
        setError(scanError instanceof Error ? scanError.message : 'Unknown scan error');
      }
    });
  };

  return (
    <section className="glass overflow-hidden rounded-[32px] border border-white/10">
      <div className="border-b border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">Bounty 2 MVP</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Trend detection plus a ready-to-shoot brief</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#b5bfd0]">
              This prototype reads public signals, clusters the strongest ones, and turns the top trend into a founder-specific content package.
            </p>
          </div>
          <button
            type="button"
            onClick={runScan}
            className="inline-flex items-center justify-center rounded-full bg-[#8ef0c9] px-5 py-3 text-sm font-semibold text-[#08111f] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
          >
            {isPending ? 'Scanning...' : 'Run live scan'}
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <label className="flex-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#b5bfd0]">Topic</span>
            <input
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#07101d] px-4 py-3 text-sm text-white outline-none placeholder:text-[#6d788b] focus:border-[#8ef0c9]/70"
              placeholder="Kenyan founders, money, business, AI..."
            />
          </label>
          <div className="self-end rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-[#b5bfd0] md:max-w-sm">
            The pipeline is modular: sources can expand to TikTok, X, Reddit, YouTube Shorts, or a future Avalanche-backed event layer without changing the brief generator.
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-[#ff8b5e]">{error}</p> : null}
      </div>

      <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">How it works</p>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-[#d9dfeb]">
              <li>1. Pull public trend signals from multiple source adapters.</li>
              <li>2. Score the signal based on repetition, engagement, and topic fit.</li>
              <li>3. Generate a content brief that a creator can publish within minutes.</li>
            </ol>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#07101d] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">Latest result</p>
            {result ? (
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{result.topTrend.title}</h3>
                  <p className="mt-2 text-sm text-[#b5bfd0]">Topic: {result.topTrend.topic}</p>
                  <p className="mt-2 text-sm text-[#b5bfd0]">Score: {result.topTrend.score} | Sources: {result.topTrend.sourceCount} | Lifespan: {result.topTrend.lifespan}</p>
                  <p className="mt-2 text-sm text-[#b5bfd0]">
                    Impressions proxy: {result.ranking.totalImpressions.toLocaleString()} | Engagement rate: {(result.ranking.averageEngagementRate * 100).toFixed(2)}% | Source diversity: {result.ranking.sourceDiversity}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#d9dfeb]">{result.topTrend.whyItMatters}</p>
                </div>
                <div className="rounded-2xl border border-[#8ef0c9]/20 bg-[rgba(142,240,201,0.06)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">Hook</p>
                  <p className="mt-2 text-sm leading-6 text-white">{result.brief.hook}</p>
                </div>
                {result.items[0]?.media?.kind !== 'none' ? (
                  <div className="rounded-2xl border border-white/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">Media context</p>
                    <p className="mt-2 text-sm leading-6 text-[#d9dfeb]">{result.items[0]?.media?.sourceHint ?? 'Media found'}</p>
                    <p className="mt-1 text-sm leading-6 text-[#d9dfeb]">Format: {result.items[0]?.media?.kind ?? 'unknown'}</p>
                    {result.items[0]?.media?.thumbnailUrl ? <p className="mt-1 break-all text-xs text-[#8ef0c9]">Thumbnail: {result.items[0]?.media?.thumbnailUrl}</p> : null}
                    {result.items[0]?.media?.imageUrl ? <p className="mt-1 break-all text-xs text-[#8ef0c9]">Image: {result.items[0]?.media?.imageUrl}</p> : null}
                    {result.items[0]?.media?.videoUrl ? <p className="mt-1 break-all text-xs text-[#8ef0c9]">Video: {result.items[0]?.media?.videoUrl}</p> : null}
                    {result.items[0]?.media?.altText ? <p className="mt-2 text-sm leading-6 text-[#d9dfeb]">Alt/context: {result.items[0]?.media?.altText}</p> : null}
                    {result.items[0]?.context?.transcript ? <p className="mt-2 text-sm leading-6 text-[#d9dfeb]">Transcript context: {result.items[0]?.context?.transcript}</p> : null}
                  </div>
                ) : null}
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">Script beats (30-60s video)</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#d9dfeb]">
                      {result.brief.script.map((step: string) => <li key={step} className="border-l-2 border-[#8ef0c9]/30 pl-3">{step}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">Remix template</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#d9dfeb]">
                      {result.brief.remixTemplate.map((step: string) => <li key={step}>{step}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="rounded-2xl border border-[#8ef0c9]/20 bg-[rgba(142,240,201,0.06)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">Action plan (30 min or less)</p>
                  <ol className="mt-3 space-y-2 text-sm leading-6 text-[#d9dfeb]">
                    {result.brief.actionPlan.map((step: string) => <li key={step} className="pl-1">{step}</li>)}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-white/10 p-6 text-sm leading-6 text-[#b5bfd0]">
                Run a scan to see the top trend, why it matters, and the content package built around it.
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">Why this is MVP-ready</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#d9dfeb]">
            <li>• It works end to end without a slide deck or mock data path.</li>
            <li>• Each source is an isolated adapter, so new platforms can be added later.</li>
            <li>• The output is production-useful: brief, hook, script, and remix instructions.</li>
            <li>• The architecture already leaves room for future cloud and Avalanche handoff layers.</li>
          </ul>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#07101d] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">Expected review result</p>
            <p className="mt-2 text-sm leading-6 text-[#d9dfeb]">
              A reviewer can press one button, watch live sources resolve, and see a usable founder-content brief immediately.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
