'use client';

import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export class WalletErrorBoundary extends React.Component<Props> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    // Suppress wallet initialization errors at page load
    if (error.message.includes('Can not set a wallet')) {
      return { hasError: false }; // Don't show error, just suppress it
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Silently log wallet initialization errors
    if (error.message.includes('Can not set a wallet')) {
      console.debug('Wallet initialization pending...', error.message);
      return;
    }
    console.error('Wallet error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="text-xs text-red-400">Wallet connection unavailable</div>
        )
      );
    }
    return this.props.children;
  }
}
