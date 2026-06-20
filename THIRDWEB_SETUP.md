# Thirdweb v5 Integration - Wallet Payment Gating

## Overview

Kuzana now uses **Thirdweb v5 SDK** with wallet-gated trend scanning:

- 🔐 **ConnectButton** for easy wallet connection (MetaMask, WalletConnect, Coinbase, etc.)
- 💳 **Payment Gate** — Users pay in AVAX before running trend scans
- ⛓️ **Avalanche Fuji** — Testnet for development (1 AVAX = ~$0.01 to test)
- 📱 **Type-safe contracts** — Full TypeScript support for transactions
- 🏗️ **Modular design** — Payment logic isolated for easy updates

---

## Quick Start

### 1. Install Dependencies

Your `package.json` is already updated. Install packages:

```bash
npm install --legacy-peer-deps
# OR clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
```

### 2. Environment Setup (Already Done)

Your `.env.local` now has:

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=c70944866bd556a711f59eb8e18fdd8a
NEXT_PUBLIC_SUPABASE_URL=https://jrgxfpualvmppilqtood.supabase.co
```

### 3. Run the App

```bash
npm run dev
# Visit http://localhost:3000
```

You should see a **ConnectButton** in the top right (styled by Thirdweb).

---

## What's New in v5

### Single Package

**Old (v4)**: Required 3+ packages
```typescript
// ❌ Old
@thirdweb-dev/react
@thirdweb-dev/sdk
@thirdweb-dev/wallets
```

**New (v5)**: One package, everything included
```typescript
// ✅ New
import { ThirdwebProvider } from 'thirdweb/react';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';
import { prepareContractCall, getContract } from 'thirdweb';
```

### Key Changes

| Feature | v4 | v5 |
|---------|-----|-----|
| Setup | `ThirdwebSDKProvider` + config | `ThirdwebProvider` (simple) |
| Wallet Button | Custom hook + UI | `ConnectButton` (built-in) |
| Client | Implicit | Explicit `createThirdwebClient()` |
| Chains | String aliases | Type-safe chain objects |
| Type Safety | Partial | Full ABI typing |

---

## Component Architecture

### Files & Their Roles

| File | Purpose |
|------|---------|
| `src/lib/client.ts` | Creates thirdweb client with your API key |
| `src/lib/chains.ts` | Avalanche Fuji + Mainnet chain configs |
| `src/components/thirdweb-provider.tsx` | Wraps app with ThirdwebProvider |
| `src/components/wallet-connect-button.tsx` | Renders official ConnectButton |
| `src/components/wallet-status.tsx` | Shows connected address + disconnect |
| `src/components/scan-payment-gate.tsx` | **NEW** — Payment gate before scanning |

### Payment Gate Flow

```
User clicks "Scan Trends"
  ↓
Is wallet connected? No → Show "Connect Wallet"
  ↓ Yes
Is payment processed? No → Show "Pay & Scan" (with 0.001 AVAX cost)
  ↓ Yes
Run trend scan (existing logic)
```

---

## Usage Examples

### Check if Wallet is Connected

```typescript
'use client';
import { useActiveAccount } from 'thirdweb/react';

export function MyComponent() {
  const account = useActiveAccount();
  
  return (
    <div>
      {account ? (
        <p>Connected: {account.address}</p>
      ) : (
        <p>Please connect wallet</p>
      )}
    </div>
  );
}
```

### Send a Transaction (for payment)

```typescript
import { useSendTransaction } from 'thirdweb/react';
import { prepareContractCall, getContract } from 'thirdweb';
import { client } from '@/lib/client';
import { avalancheFujiTestnet } from '@/lib/chains';

const { mutate: sendTransaction, isPending } = useSendTransaction();

const handlePay = async () => {
  const contract = getContract({
    client,
    address: '0x...PAYMENT_CONTRACT_ADDRESS',
    chain: avalancheFujiTestnet,
  });
  
  const transaction = prepareContractCall({
    contract,
    method: 'function processScan() payable',
    params: [],
  });
  
  sendTransaction(transaction);
};
```

### Integrate ScanPaymentGate in Dashboard

```typescript
import { ScanPaymentGate } from '@/components/scan-payment-gate';
import { useState } from 'react';

export function Bounty2Dashboard() {
  const [canScan, setCanScan] = useState(false);
  
  return (
    <>
      <ScanPaymentGate 
        onPaymentComplete={() => setCanScan(true)}
        scanCost="0.001"
      />
      {canScan && <TrendScanner />}
    </>
  );
}
```

---

## Next Steps: Payment Contract Deployment

### 1. **Deploy Payment Contract to Avalanche Fuji**

Option A: Use thirdweb ContractKit (no-code)
- Visit [thirdweb.com/contracts](https://thirdweb.com/contracts)
- Deploy a "Pay to Access" contract
- Configure cost: 0.001 AVAX per scan

Option B: Deploy custom Solidity contract
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrendjackPayment {
  uint256 public scanCost = 0.001 ether;
  address public owner;
  
  constructor() {
    owner = msg.sender;
  }
  
  function processScan(string memory topic) payable external {
    require(msg.value >= scanCost, "Insufficient payment");
    // Emit event for off-chain scanner to process trend
    emit ScanRequested(msg.sender, topic, block.timestamp);
  }
  
  event ScanRequested(address indexed user, string topic, uint256 timestamp);
}
```

### 2. Update `ScanPaymentGate` with Contract Address

```typescript
// src/components/scan-payment-gate.tsx
const PAYMENT_CONTRACT = '0x...YOUR_DEPLOYED_CONTRACT_ADDRESS';
const SCAN_COST_AVAX = '0.001';

// In handlePayment:
const contract = getContract({
  client,
  address: PAYMENT_CONTRACT,
  chain: avalancheFujiTestnet,
});
```

### 3. Test on Faucet

Get testnet AVAX to pay for scans:
- [Avalanche Testnet Faucet](https://core.app/en/tools/testnet-faucet/?subnet=c&token=avax)
- Paste your wallet address → Get ~1 AVAX (free)

---

## Troubleshooting

### ConnectButton not showing
- Check `.env.local` has `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
- Restart dev server: `npm run dev`
- Open DevTools → check for errors

### Wallet connects but no button styling
- Thirdweb provides default styling
- To customize, create a wrapper:
```typescript
<div className="my-custom-styles">
  <ConnectButton client={client} />
</div>
```

### Payment transaction fails
- Ensure wallet has AVAX on Avalanche Fuji testnet
- Check contract address is correct
- Verify payment contract is deployed

### Wrong network showing
- ConnectButton should auto-suggest Avalanche Fuji
- If not, check `createThirdwebClient()` in `src/lib/client.ts`
- May need to add chain config to client initialization

---

## Architecture & Design Decisions

### Why v5?
- ✅ Single package (lighter bundle)
- ✅ Better TypeScript support
- ✅ Simpler provider setup
- ✅ Built-in ConnectButton (no custom styling needed)
- ✅ Better performance for React 19

### Why Avalanche Fuji for testing?
- 🆓 Free testnet AVAX from faucet
- ⚡ Fast transactions (2-3 seconds)
- 💰 ~0.01 cents per transaction (negligible cost)
- 📊 Real network, not mock (good for testing)
- 🚀 Escalates to production Avalanche later

### Why Payment Gate Before Scanning?
**Current Model:**
- Free scan of public trend data
- Pay AVAX to run advanced analysis (classifying, generating briefs)

**Future Model:**
- Subscription: Pay monthly for unlimited scans
- Per-scan credits: Buy 10 scans for 0.01 AVAX
- Creator revenue share: 50% of scan fees to top trend detectors

---

## Resources

📚 **Documentation**
- [Thirdweb v5 TypeScript SDK](https://portal.thirdweb.com/typescript/v5)
- [React Components & Hooks](https://portal.thirdweb.com/react/v5)
- [ConnectButton Reference](https://portal.thirdweb.com/references/typescript/v5/ConnectButton)

🔗 **Networks**
- [Avalanche Network](https://www.avax.network/)
- [Fuji Testnet Info](https://docs.avax.network/blockchains/avalanche-c-chain)
- [SnowTrace Explorer](https://testnet.snowtrace.io)

💡 **Examples**
- [Thirdweb Next.js Starter](https://github.com/thirdweb-example/next-starter)
- [Smart Contract Examples](https://github.com/thirdweb-dev/contracts)

---

## Questions?

Check:
1. DevTools console for error messages
2. `.env.local` for correct client ID
3. Wallet has testnet AVAX
4. Network is set to Avalanche Fuji

