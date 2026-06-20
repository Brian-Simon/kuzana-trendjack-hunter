'use client';

import { useState, useTransition } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { ScanPaymentGate } from './scan-payment-gate';
import { BriefViewer } from './brief-viewer';
import { TrendItemCard } from './trend-item-card';
import type { TrendScanResult } from '@/modules/bounties/bounty-2/types';

const initialTopic = 'Kenyan founders';

export function ScanInterface() {
  const account = useActiveAccount();
  const [topic, setTopic] = useState(initialTopic);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<TrendScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

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

  const handleNewScan = () => {
    setResult(null);
    setPaymentComplete(false);
  };

  return (
    <section id="scan" className="space-y-6">
      {/* Scanner Header */}
      <div className="glass overflow-hidden rounded-[32px] border border-white/10">
        <div className="border-b border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">⚡ Trendjack Scanner</p>
              <h2 className="mt-2 text-2xl md:text-4xl font-bold text-white">
                Scan trends. Generate briefs. Publish in minutes.
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#b5bfd0]">
                Search across 10 platforms in parallel. Get a founder-ready content brief ready to shoot. Payment gates access to ensure quality usage.
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b5bfd0] mb-2 block">
                What trend do you want to explore?
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Kenyan founders, AI tools, startup culture..."
                  className="flex-1 rounded-2xl border border-white/10 bg-[#07101d] px-4 py-3 text-white outline-none placeholder:text-[#6d788b] focus:border-[#8ef0c9]/70 focus:ring-1 focus:ring-[#8ef0c9]/30 transition-colors"
                />
                <button
                  onClick={runScan}
                  disabled={isPending || !account || !paymentComplete}
                  className="rounded-2xl bg-gradient-to-r from-[#8ef0c9] to-[#6dd9a8] text-[#08111f] px-8 py-3 font-semibold hover:shadow-xl hover:shadow-[#8ef0c9]/40 active:scale-95 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 hover:scale-105"
                >
                  {isPending ? '⏳ Scanning...' : '🔍 Scan Trends'}
                </button>
              </div>
            </label>

            {/* Error Message */}
            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-900/10 p-4">
                <p className="text-sm text-red-200">⚠️ {error}</p>
              </div>
            )}

            {/* Example Topics */}
            {!result && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b5bfd0] mb-2">
                  💡 Try these topics:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Founder culture',
                    'Startup funding',
                    'AI tools',
                    'Money hacks',
                    'Business growth',
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className="text-xs px-3 py-2 rounded-full border border-[#8ef0c9]/30 text-[#8ef0c9] hover:bg-[#8ef0c9]/10 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Gate - Only show if not complete and account exists */}
        {account && !paymentComplete && (
          <div className="p-6 md:p-8 border-t border-white/10">
            <ScanPaymentGate 
              onPaymentComplete={() => setPaymentComplete(true)}
              scanCost="0.001"
            />
          </div>
        )}

        {!account && (
          <div className="p-6 md:p-8 border-t border-white/10">
            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-900/10 p-4">
              <p className="text-sm text-yellow-100">
                🔐 <strong>Connect your wallet</strong> to start scanning. Your Avalanche Fuji wallet will be used for payment verification.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* New Scan Button */}
          <button
            onClick={handleNewScan}
            className="text-sm text-[#8ef0c9] hover:text-[#4ad9a1] font-semibold flex items-center gap-2"
          >
            ← Start New Scan
          </button>

          {/* Top Trend Summary */}
          <div className="rounded-3xl border border-[#8ef0c9]/20 bg-gradient-to-br from-[rgba(142,240,201,0.1)] to-[rgba(142,240,201,0.03)] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">🔥 #1 Trending</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white">{result.topTrend.title}</h3>
                <p className="mt-2 text-[#d9dfeb]">{result.topTrend.whyItMatters}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-3xl font-bold text-[#8ef0c9]">{result.ranking.score.toFixed(1)}</p>
                <p className="text-xs text-[#b5bfd0] uppercase tracking-[0.2em] mt-1">Score</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-[#b5bfd0] uppercase tracking-[0.2em]">Lifespan</p>
                <p className="text-lg font-bold text-white mt-1">{result.topTrend.lifespan}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-[#b5bfd0] uppercase tracking-[0.2em]">Sources</p>
                <p className="text-lg font-bold text-white mt-1">{result.topTrend.sourceCount}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-[#b5bfd0] uppercase tracking-[0.2em]">Impressions</p>
                <p className="text-lg font-bold text-white mt-1">{(result.ranking.totalImpressions / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </div>

          {/* Brief Viewer */}
          <BriefViewer 
            brief={result.brief}
            trendTitle={result.topTrend.title}
            trendCategory={result.topTrend.topic}
          />

          {/* Sources Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Sources</h3>
              <p className="text-[#b5bfd0] mt-1">The trends ranked by engagement across {result.items.length} signals</p>
            </div>
            <div className="grid gap-3">
              {result.items.map((item, idx) => (
                <TrendItemCard key={`${item.source}-${idx}`} item={item} rank={idx + 1} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
