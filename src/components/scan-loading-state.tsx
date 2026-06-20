'use client';

export function ScanLoadingState() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
        <div className="h-8 bg-white/10 rounded-lg w-1/3 mb-4"></div>
        <div className="h-6 bg-white/10 rounded-lg w-2/3"></div>
        <div className="mt-4 h-4 bg-white/10 rounded-lg w-full"></div>
        <div className="mt-2 h-4 bg-white/10 rounded-lg w-3/4"></div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
            <div className="h-4 bg-white/10 rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>

      {/* Brief Skeleton */}
      <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
        <div className="h-6 bg-white/10 rounded-lg w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
          <div className="h-4 bg-white/10 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}
