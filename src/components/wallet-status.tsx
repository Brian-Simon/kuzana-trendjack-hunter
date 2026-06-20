'use client';

import { useActiveAccount, useDisconnect } from 'thirdweb/react';

export function WalletStatus() {
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();

  if (!account) {
    return null;
  }

  const handleDisconnect = async () => {
    if (disconnect) {
      await disconnect();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.24em] text-[#8ef0c9]">Connected</p>
        <p className="text-sm font-mono text-white">{account.address?.slice(0, 6)}...{account.address?.slice(-4)}</p>
      </div>
      <button
        onClick={handleDisconnect}
        className="rounded px-3 py-1 text-xs font-medium text-white hover:bg-white/10 transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
}
