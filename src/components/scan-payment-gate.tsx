'use client';

import { useActiveAccount, useSendTransaction } from 'thirdweb/react';
import { useState } from 'react';
import { prepareContractCall, getContract } from 'thirdweb';
import { client } from '@/lib/client';
import { avalancheFuji } from 'thirdweb/chains';

interface ScanPaymentGateProps {
  onPaymentComplete: () => void;
  scanCost?: string; // in AVAX
}

/**
 * Payment gate component that requires wallet connection + payment before running scan
 * 
 * For now: Shows placeholder for payment contract
 * Future: Deploy a contract to accept AVAX for trend scans
 */
export function ScanPaymentGate({ onPaymentComplete, scanCost = '0.001' }: ScanPaymentGateProps) {
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  const handlePayment = async () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // TODO: Deploy a payment contract to Avalanche Fuji
      // For now, we simulate successful payment after a delay
      console.log(`Processing ${scanCost} AVAX payment from ${account.address}`);
      
      // Simulated payment - in production, this would be:
      // const contract = getContract({
      //   client,
      //   address: '0x...YOUR_PAYMENT_CONTRACT...',
      //   chain: avalancheFuji,
      // });
      // const transaction = prepareContractCall({
      //   contract,
      //   method: 'function processScan(string topic) payable',
      //   params: ['Kenyan founders'],
      // });
      // sendTransaction(transaction);

      setPaymentProcessed(true);
      onPaymentComplete();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment processing failed. Please try again.');
    }
  };

  if (!account) {
    return (
      <div className="rounded-lg border border-yellow-500/30 bg-yellow-900/10 p-6 text-center">
        <p className="text-sm text-yellow-100">🔐 Connect your wallet to scan trends</p>
      </div>
    );
  }

  if (paymentProcessed) {
    return null;
  }

  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/10 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-emerald-100">Ready to scan trends?</p>
          <p className="text-xs text-emerald-200/70">
            Payment: <span className="font-mono">{scanCost} AVAX</span> (Avalanche Fuji testnet)
          </p>
          <p className="text-xs text-emerald-200/70">
            From: <span className="font-mono">{account.address.slice(0, 10)}...{account.address.slice(-8)}</span>
          </p>
        </div>
        <button
          onClick={handlePayment}
          disabled={isPending}
          className="rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Processing...' : `Pay & Scan`}
        </button>
      </div>
    </div>
  );
}
