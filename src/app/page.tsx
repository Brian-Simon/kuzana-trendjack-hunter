import { Bounty2Dashboard } from '@/components/bounty-2-dashboard';
import { ModuleCard } from '@/components/module-card';
import { ScanHistory } from '@/components/scan-history';
import { bountyModules } from '@/modules/bounties/shared/registry';

export default function HomePage() {
  return (
    <main className="grid-noise min-h-screen px-4 py-8 text-white md:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="glass overflow-hidden rounded-[36px] border border-white/10 px-6 py-8 shadow-glow md:px-10 md:py-12">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8ef0c9]">Kuzana x MiniHack Builder Bounty Programme</p>
            <h1 className="mt-4 font-[var(--font-display)] text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Build a real modular bounty platform now, then escalate the system later.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#b5bfd0] md:text-lg">
              This workspace is structured so each bounty lives as its own module, each integration can be swapped or expanded, and bounty 2 already works as a live MVP.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">Current focus</p>
              <p className="mt-3 text-lg font-semibold text-white">Bounty 2: Trendjack Hunter</p>
              <p className="mt-2 text-sm leading-6 text-[#d9dfeb]">A live scan that turns public signals into a publishable founder-content brief.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">Architecture</p>
              <p className="mt-3 text-lg font-semibold text-white">Modular from day one</p>
              <p className="mt-2 text-sm leading-6 text-[#d9dfeb]">Each bounty gets its own module, source adapters, and output layer so future work stays isolated.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b5bfd0]">Future path</p>
              <p className="mt-3 text-lg font-semibold text-white">Avalanche-ready boundary</p>
              <p className="mt-2 text-sm leading-6 text-[#d9dfeb]">The app stays blockchain-agnostic now but can plug into cloud and Avalanche workflows later.</p>
            </div>
          </div>
        </section>

        <Bounty2Dashboard />

        <ScanHistory />

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bountyModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </section>
      </div>
    </main>
  );
}
