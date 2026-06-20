'use client';

import { useActiveAccount, useConnect } from 'thirdweb/react';
import { embeddedWallet } from 'thirdweb/wallets';
import { useState } from 'react';

export function WalletConnectButton() {
  const account = useActiveAccount();
  const { connect } = useConnect();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Show wallet options with embedded wallet
      const result = await connect({ wallet: embeddedWallet() });
      console.log('Connected:', result);
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (account?.address) {
    return (
      <div className="px-4 py-2 rounded-lg bg-[#8ef0c9]/10 border border-[#8ef0c9]/30 text-sm font-medium text-[#8ef0c9]">
        {account.address.slice(0, 6)}...{account.address.slice(-4)}
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="px-4 py-2 rounded-lg bg-[#8ef0c9] text-[#08111f] font-semibold hover:shadow-lg hover:shadow-[#8ef0c9]/50 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
    >
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
