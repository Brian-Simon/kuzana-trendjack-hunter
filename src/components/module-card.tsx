import type { BountyModule } from '@/modules/bounties/shared/types';

const statusLabels: Record<BountyModule['status'], string> = {
  planned: 'Planned',
  prototype: 'Live prototype',
  ready: 'Ready',
};

export function ModuleCard({ module }: { module: BountyModule }) {
  return (
    <article className="glass rounded-3xl p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-[rgba(142,240,201,0.3)] bg-[rgba(142,240,201,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0c9]">
          Bounty {module.id}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#f6f1e8]">
          {statusLabels[module.status]}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-white">{module.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#b5bfd0]">{module.summary}</p>
      <div className="mt-5 space-y-3 text-sm leading-6 text-[#d9dfeb]">
        <p><span className="font-semibold text-[#f6f1e8]">Deliverable:</span> {module.delivery}</p>
        <p><span className="font-semibold text-[#f6f1e8]">Integration boundary:</span> {module.integrationNotes}</p>
      </div>
    </article>
  );
}
