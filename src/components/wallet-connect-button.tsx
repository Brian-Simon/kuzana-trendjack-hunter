'use client';

import { useActiveAccount, useConnectModal } from 'thirdweb/react';
import { useState } from 'react';

export function WalletConnectButton() {
  const account = useActiveAccount();
  const { connect, isConnecting } = useConnectModal();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setError(null);
    try {
      await connect({});
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Connection failed';
      setError(errorMsg);
      console.error('Connection error:', err);
    }
  };

  if (account?.address) {
    return (
      <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8ef0c9]/20 to-[#8ef0c9]/10 border border-[#8ef0c9]/50 text-sm font-semibold text-[#8ef0c9] shadow-lg shadow-[#8ef0c9]/20">
        <span className="hidden sm:inline">{account.address.slice(0, 6)}...{account.address.slice(-4)}</span>
        <span className="sm:hidden">✓ Connected</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8ef0c9] to-[#6dd9a8] text-[#08111f] font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-[#8ef0c9]/40 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 whitespace-nowrap"
      >
        {isConnecting ? '⏳ Connecting...' : '🔗 Connect Wallet'}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
