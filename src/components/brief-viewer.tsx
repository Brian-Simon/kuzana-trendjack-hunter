'use client';

import type { ContentBrief } from '@/modules/bounties/shared/types';

interface BriefViewerProps {
  brief: ContentBrief;
  trendTitle: string;
  trendCategory: string;
}

export function BriefViewer({ brief, trendTitle, trendCategory }: BriefViewerProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#08111f] via-[rgba(142,240,201,0.05)] to-[#08111f] p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">📋 Content Brief</p>
            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white">{trendTitle}</h3>
            <p className="mt-2 text-[#b5bfd0]">Category: <span className="font-semibold text-[#8ef0c9]">{trendCategory}</span></p>
          </div>
          <div className="rounded-2xl border border-[#8ef0c9]/30 bg-[rgba(142,240,201,0.1)] px-4 py-2 text-right">
            <p className="text-xs text-[#8ef0c9] font-semibold uppercase">Ready</p>
            <p className="text-xs text-[#b5bfd0] mt-1">to publish</p>
          </div>
        </div>
      </div>

      {/* Hook */}
      <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9] mb-3">🎯 Hook (0-3 seconds)</p>
        <p className="text-lg md:text-xl font-semibold text-white leading-relaxed">{brief.hook}</p>
        <p className="mt-3 text-sm text-[#b5bfd0]">The opening line that stops the scroll. This works on TikTok, Instagram, and YouTube Shorts.</p>
      </div>

      {/* Context */}
      <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9] mb-3">📖 Context (3-7 seconds)</p>
        <p className="text-base text-white leading-relaxed">{brief.context}</p>
      </div>

      {/* Angle */}
      <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9] mb-3">💡 Founder Angle (7-17 seconds)</p>
        <p className="text-base text-white leading-relaxed">{brief.angle}</p>
      </div>

      {/* Proof */}
      <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9] mb-3">✅ Proof (17-25 seconds)</p>
        <p className="text-base text-white leading-relaxed">{brief.proof}</p>
      </div>

      {/* CTA */}
      <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9] mb-3">📢 Call-to-Action (25-35 seconds)</p>
        <p className="text-base text-white leading-relaxed">{brief.cta}</p>
      </div>

      {/* Script Beats Summary */}
      <div className="rounded-3xl border border-[#8ef0c9]/20 bg-[rgba(142,240,201,0.06)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9] mb-4">📹 Full Script Structure</p>
        <div className="space-y-3 text-sm text-[#d9dfeb]">
          <div className="flex gap-3">
            <span className="font-bold text-[#8ef0c9] min-w-fit">0-3s:</span>
            <span>Hook - Problem setup + why NOW</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-[#8ef0c9] min-w-fit">3-7s:</span>
            <span>Context - Explain trend clearly</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-[#8ef0c9] min-w-fit">7-17s:</span>
            <span>Angle - Connect to founder problem</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-[#8ef0c9] min-w-fit">17-25s:</span>
            <span>Proof - Real example from trend</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-[#8ef0c9] min-w-fit">25-35s:</span>
            <span>CTA - Exact action for this week</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 rounded-2xl bg-[#8ef0c9] text-[#08111f] py-3 font-semibold hover:shadow-lg hover:shadow-[#8ef0c9]/50 transition-all">
          📋 Copy to Clipboard
        </button>
        <button className="flex-1 rounded-2xl border border-white/10 bg-white/5 text-white py-3 font-semibold hover:bg-white/10 transition-colors">
          ⬇️ Export PDF
        </button>
        <button className="flex-1 rounded-2xl border border-white/10 bg-white/5 text-white py-3 font-semibold hover:bg-white/10 transition-colors">
          🔗 Share Brief
        </button>
      </div>
    </div>
  );
}
