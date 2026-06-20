'use client';

import { ConnectButton } from 'thirdweb/react';
import { client } from '@/lib/client';

export function WalletConnectButton() {
  return (
    <ConnectButton
      client={client}
      appMetadata={{
        name: 'Kuzana Trendjack Hunter',
        description: 'Discover trends, generate content briefs',
        url: 'https://kuzana.app',
      }}
    />
  );
}
