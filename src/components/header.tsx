'use client';

import Link from 'next/link';
import { WalletConnectButton } from './wallet-connect-button';
import { UserMenu } from './user-menu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08111f]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8ef0c9] to-[#4ad9a1] flex items-center justify-center font-bold text-[#08111f] text-sm">
            K
          </div>
          <span className="hidden sm:inline font-bold text-white text-lg">Kuzana</span>
          <span className="inline sm:hidden font-bold text-white text-lg">K</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/#scan" 
            className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors font-medium"
          >
            Scanner
          </Link>
          <Link 
            href="/#history" 
            className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors font-medium"
          >
            History
          </Link>
          <Link 
            href="/#bounties" 
            className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors font-medium"
          >
            Modules
          </Link>
          <a 
            href="https://github.com/kuzana" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-[#b5bfd0] hover:text-[#8ef0c9] transition-colors font-medium"
          >
            GitHub
          </a>
        </nav>

        {/* Right Side: Wallet + Menu */}
        <div className="flex items-center gap-3">
          <WalletConnectButton />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
