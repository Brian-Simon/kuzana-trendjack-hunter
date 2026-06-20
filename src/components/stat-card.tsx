'use client';

export function StatCard({ label, value, unit, icon }: { label: string; value: string | number; unit?: string; icon?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-colors p-4 md:p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b5bfd0]">{label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
            {unit && <p className="text-sm text-[#8ef0c9]">{unit}</p>}
          </div>
        </div>
        {icon && <span className="text-3xl md:text-4xl">{icon}</span>}
      </div>
    </div>
  );
}
