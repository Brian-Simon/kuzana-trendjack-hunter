import { loadRecentScans } from '@/modules/bounties/bounty-2/persistence';

function formatPercentage(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

export async function ScanHistory() {
  const scans = await loadRecentScans(6);

  return (
    <section className="glass overflow-hidden rounded-[32px] border border-white/10 p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">Audit trail</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Recent saved scans</h2>
        </div>
        <p className="text-sm text-[#b5bfd0]">Evidence that the scanner is producing and storing usable results.</p>
      </div>

      <div className="mt-6 grid gap-4">
        {scans.length > 0 ? (
          scans.map((scan) => (
            <article key={`${scan.topic}-${scan.scannedAt}`} className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{scan.topTrend.title}</h3>
                  <p className="mt-1 text-sm text-[#b5bfd0]">Topic: {scan.topic}</p>
                  <p className="mt-1 text-sm text-[#b5bfd0]">Scanned: {new Date(scan.scannedAt).toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-[#8ef0c9]/20 bg-[rgba(142,240,201,0.06)] px-4 py-3 text-right text-sm text-[#d9dfeb]">
                  <p>Score: {scan.ranking.score}</p>
                  <p>Impressions: {scan.ranking.totalImpressions.toLocaleString()}</p>
                  <p>Engagement: {formatPercentage(scan.ranking.averageEngagementRate)}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#d9dfeb]">{scan.topTrend.whyItMatters}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[#8ef0c9]">
                <span className="rounded-full border border-white/10 px-3 py-1">{scan.topTrend.topic}</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Sources {scan.topTrend.sourceCount}</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Lifespan {scan.topTrend.lifespan}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 p-6 text-sm leading-6 text-[#b5bfd0]">
            No saved scans yet. Run the Trendjack Hunter scan once and the history will appear here.
          </div>
        )}
      </div>
    </section>
  );
}
