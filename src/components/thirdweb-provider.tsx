'use client';

import { ThirdwebProvider as ThirdwebProviderBase } from 'thirdweb/react';
import { client } from '@/lib/client';
import type { ReactNode } from 'react';

export function ThirdwebClientProvider({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProviderBase client={client}>
      {children}
    </ThirdwebProviderBase>
  );
}
