'use client';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08111f]/50 backdrop-blur-sm mt-16 md:mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#8ef0c9] to-[#4ad9a1] flex items-center justify-center font-bold text-[#08111f] text-xs">
                K
              </div>
              <span className="font-bold text-white">Kuzana</span>
            </div>
            <p className="text-sm text-[#b5bfd0] leading-relaxed">
              Real-time trend detection + production-ready content briefs for founders.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#scan" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Scanner</a></li>
              <li><a href="#history" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">History</a></li>
              <li><a href="#bounties" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Modules</a></li>
              <li><a href="/" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Docs</a></li>
              <li><a href="/" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Blog</a></li>
              <li><a href="/" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Status</a></li>
              <li><a href="/" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">API</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Twitter</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">GitHub</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Discord</a></li>
              <li><a href="mailto:hello@kuzana.app" className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6d788b]">
            © 2026 Kuzana. All rights reserved. | Built on <span className="text-[#8ef0c9]">Avalanche</span> + <span className="text-[#8ef0c9]">Thirdweb</span>
          </p>
          <div className="flex items-center gap-6 text-sm text-[#6d788b]">
            <a href="/" className="hover:text-[#8ef0c9] transition-colors">Privacy</a>
            <a href="/" className="hover:text-[#8ef0c9] transition-colors">Terms</a>
            <a href="/" className="hover:text-[#8ef0c9] transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
