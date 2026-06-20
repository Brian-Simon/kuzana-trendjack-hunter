'use client';

import { useActiveAccount } from 'thirdweb/react';
import { useState } from 'react';

export function UserMenu() {
  const account = useActiveAccount();
  const [isOpen, setIsOpen] = useState(false);

  if (!account) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8ef0c9] to-[#4ad9a1] flex items-center justify-center text-[#08111f] font-bold text-sm hover:shadow-lg transition-shadow"
        title={account.address}
      >
        {account.address?.slice(0, 1).toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-[#08111f] shadow-lg backdrop-blur-md">
          <div className="p-4 border-b border-white/10">
            <p className="text-xs text-[#b5bfd0]">Connected Wallet</p>
            <p className="font-mono text-sm text-white mt-1">{account.address?.slice(0, 10)}...{account.address?.slice(-8)}</p>
          </div>
          <div className="p-3 space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#d9dfeb] hover:bg-white/5 transition-colors">
              📊 Dashboard
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#d9dfeb] hover:bg-white/5 transition-colors">
              ⚙️ Settings
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#d9dfeb] hover:bg-white/5 transition-colors">
              💡 Docs
            </button>
          </div>
          <button className="w-full border-t border-white/10 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
