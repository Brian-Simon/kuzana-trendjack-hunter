import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ScanInterface } from '@/components/scan-interface';
import { ScanHistory } from '@/components/scan-history';
import { ModuleCard } from '@/components/module-card';
import { bountyModules } from '@/modules/bounties/shared/registry';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08111f]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 grid-noise">
        {/* Hero Section */}
        <section className="relative px-4 py-12 md:py-20 lg:py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8ef0c9]/30 bg-[rgba(142,240,201,0.08)] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#8ef0c9]"></span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8ef0c9]">Web3 Powered Platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Discover trends.<br />
                <span className="text-[#8ef0c9]">Generate briefs.</span><br />
                Publish fast.
              </h1>
              <p className="text-lg md:text-xl text-[#b5bfd0] max-w-2xl mx-auto mb-8">
                Trendjack Hunter scans 10 platforms in parallel to find what's trending, then generates a founder-ready content brief you can film in minutes. Pay once, publish immediately.
              </p>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-[#d9dfeb]">
                  ⚡ 30-minute workflow
                </div>
                <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-[#d9dfeb]">
                  🌍 10 platforms scanned
                </div>
                <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-[#d9dfeb]">
                  💳 Pay in AVAX
                </div>
                <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-[#d9dfeb]">
                  🔐 Web3 native
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scan Interface */}
        <section className="px-4 md:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <ScanInterface />
          </div>
        </section>

        {/* Scan History Section */}
        <section id="history" className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <ScanHistory />
          </div>
        </section>

        {/* Bounty Modules Section */}
        <section id="bounties" className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8ef0c9]/30 bg-[rgba(142,240,201,0.08)] mb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8ef0c9]">Platform Architecture</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Modular Bounty System</h2>
              <p className="text-lg text-[#b5bfd0] max-w-2xl">
                Each bounty module is isolated, scalable, and designed for future integration with blockchain infrastructure.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {bountyModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[32px] border border-[#8ef0c9]/20 bg-gradient-to-br from-[rgba(142,240,201,0.1)] to-[rgba(142,240,201,0.03)] p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to find the next big trend?
              </h2>
              <p className="text-lg text-[#b5bfd0] mb-8">
                Get 1 AVAX free testnet tokens and start scanning now. Pay per scan, own your briefs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#scan" className="px-8 py-3 rounded-2xl bg-[#8ef0c9] text-[#08111f] font-semibold hover:shadow-lg hover:shadow-[#8ef0c9]/50 transition-all">
                  Start Scanning
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors">
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
