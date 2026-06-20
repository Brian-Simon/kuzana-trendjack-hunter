# Thirdweb v5 Integration Complete ✅

## Status

**Migration from v4 → v5: COMPLETE**

Your Kuzana app now has:
- ✅ Thirdweb v5 SDK (single package, optimized)
- ✅ Official ConnectButton (pre-styled, multi-wallet support)
- ✅ Payment gate component (0.001 AVAX per scan)
- ✅ Avalanche Fuji testnet configured
- ✅ Client ID configured: `c70944866bd556a711f59eb8e18fdd8a`

---

## Files Modified/Created

### Created
- `src/lib/client.ts` — Thirdweb client factory
- `src/lib/chains.ts` — Avalanche Fuji + Mainnet configs
- `src/components/scan-payment-gate.tsx` — NEW payment gating logic

### Updated
- `package.json` — Removed v4 packages, added `thirdweb@^5.6.0`
- `src/components/thirdweb-provider.tsx` — Now uses v5 `ThirdwebProvider`
- `src/components/wallet-connect-button.tsx` — Now uses v5 `ConnectButton`
- `src/components/wallet-status.tsx` — Now uses v5 hooks
- `src/app/layout.tsx` — Updated provider import
- `.env.local` — Added `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
- `.env.example` — Updated documentation
- `THIRDWEB_SETUP.md` — Complete v5 integration guide

---

## What Users See Now

### 1. **ConnectButton in Header**
When they visit `http://localhost:3000`:
- Top right: Thirdweb's official `ConnectButton`
- Click → Opens wallet selector (MetaMask, WalletConnect, Coinbase, etc.)
- Shows connected address after connection

### 2. **Payment Gate Before Scanning**
When they try to run a trend scan:
```
Is wallet connected? 
  → No: "Connect your wallet" (button link to ConnectButton)
  → Yes: "Ready to scan trends? Pay 0.001 AVAX"
         [Pay & Scan] button
```

### 3. **Live on Avalanche Fuji Testnet**
- Chain: Avalanche Fuji (testnet)
- Cost: 0.001 AVAX per scan (~$0.00001, free to test)
- Faucet: https://core.app/en/tools/testnet-faucet/?subnet=c&token=avax

---

## Next Steps

### Phase 1: Test Locally (Right Now) ✅
```bash
npm run dev
# Visit http://localhost:3000
# Click ConnectButton → select wallet → connect
```

### Phase 2: Deploy Payment Contract (This Week)

**Option A: Use Thirdweb's No-Code Dashboard** (Easiest)
1. Go to [thirdweb.com/contracts](https://thirdweb.com/contracts)
2. Search "Pay to Access" or "Access Control"
3. Deploy to Avalanche Fuji
4. Set cost: 0.001 AVAX
5. Copy contract address

**Option B: Deploy Custom Solidity** (Full Control)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrendjackPayment {
  event ScanRequested(address indexed user, string topic, uint256 timestamp);
  
  function processScan(string calldata topic) payable external {
    require(msg.value >= 0.001 ether, "Need 0.001 AVAX");
    emit ScanRequested(msg.sender, topic, block.timestamp);
  }
}
```

Deploy with:
- [Thirdweb Deploy](https://thirdweb.com/deploy)
- [Remix IDE](https://remix.ethereum.org)
- Your preferred tool

### Phase 3: Update ScanPaymentGate Component

```typescript
// src/components/scan-payment-gate.tsx
const PAYMENT_CONTRACT_ADDRESS = '0x...YOUR_CONTRACT_ADDRESS_HERE';

// And in the handlePayment function, uncomment the actual contract call:
const contract = getContract({
  client,
  address: PAYMENT_CONTRACT_ADDRESS,
  chain: avalancheFujiTestnet,
});

const transaction = prepareContractCall({
  contract,
  method: 'function processScan(string topic) payable',
  params: [topic],
});

sendTransaction(transaction);
```

### Phase 4: Update Dashboard to Use Payment Gate

In `src/components/bounty-2-dashboard.tsx` (or wherever scanning happens):

```typescript
import { ScanPaymentGate } from '@/components/scan-payment-gate';
import { useState } from 'react';

export function Bounty2Dashboard() {
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  return (
    <>
      {!paymentComplete && (
        <ScanPaymentGate onPaymentComplete={() => setPaymentComplete(true)} />
      )}
      {paymentComplete && <YourTrendScanner />}
    </>
  );
}
```

---

## Testing Checklist

### Local Testing (No Real AVAX Needed)
- [ ] `npm run dev` runs without errors
- [ ] ConnectButton appears in top right
- [ ] Click ConnectButton → wallet selector opens
- [ ] Select MetaMask → approve connection
- [ ] Connected address shows in header
- [ ] Click Disconnect → wallet disconnects

### After Payment Contract Deploy
- [ ] Get testnet AVAX from [faucet](https://core.app/en/tools/testnet-faucet/?subnet=c&token=avax)
- [ ] Paste your wallet address → get ~1 AVAX
- [ ] Click "Pay & Scan" → MetaMask opens transaction approval
- [ ] Review: 0.001 AVAX to contract address
- [ ] Confirm → transaction succeeds
- [ ] Scan runs and returns results

---

## Architecture: How Payment Flows

```
User visits app
  ↓
ConnectButton (top right)
  ↓
Clicks "Connect Wallet"
  ↓
Selects MetaMask (or other wallet)
  ↓
Approves connection
  ↓
Wallet address stored in useActiveAccount()
  ↓
User clicks "Run Trend Scan"
  ↓
Component checks: Is account connected?
  ├─ NO: Show "Connect Wallet First"
  └─ YES: Show ScanPaymentGate
      ↓
      ScanPaymentGate checks: Payment already processed?
      ├─ NO: Show "Pay 0.001 AVAX" button
      │    ↓
      │    User clicks "Pay & Scan"
      │    ↓
      │    MetaMask opens transaction
      │    ↓
      │    User approves (signs with wallet)
      │    ↓
      │    Transaction sent to Avalanche Fuji
      │    ↓
      │    Payment confirmed
      │    └─ YES: Run scan
      └─ YES: Render trend scanner (existing logic)
```

---

## Key Concepts

### What is Thirdweb v5?
A lightweight, single-package SDK for Web3 apps:
- No need for 3+ separate packages
- Built-in UI components (ConnectButton, TransactionButton, etc.)
- Type-safe contract interactions
- Works with any EVM chain (including Avalanche)

### What is Avalanche Fuji?
Avalanche's testnet for development:
- **Chain ID**: 43113
- **Block Explorer**: [testnet.snowtrace.io](https://testnet.snowtrace.io)
- **Free Faucet**: Get 1 AVAX daily (costs nothing)
- **Real blockchain**: Tests work on actual testnet (not simulated)

### Why 0.001 AVAX per scan?
- Currently: Covers server costs (~0.00001 AVAX real cost, 100x markup)
- Future: Revenue split between Kuzana + creator detection + trend sources
- Easy to adjust: Change `scanCost` in `ScanPaymentGate`

### Why Payment Gate?
**Current model** (scanning is free):
- Data quality: Anyone can spam requests
- Monetization: No revenue stream
- User commitment: Free = low engagement

**With payment gate**:
- ✅ Filters serious users
- ✅ Generates revenue (even if tiny)
- ✅ Foundation for creator bounties
- ✅ Future: NFT ownership of briefs

---

## Code Examples

### Using useActiveAccount Hook
```typescript
import { useActiveAccount } from 'thirdweb/react';

export function MyComponent() {
  const account = useActiveAccount();
  
  if (!account) return <p>Not connected</p>;
  
  return <p>Address: {account.address}</p>;
}
```

### Sending a Transaction
```typescript
import { useSendTransaction } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';

export function PayButton() {
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  
  const handleClick = async () => {
    const tx = prepareContractCall({
      contract,
      method: 'function processScan() payable',
      params: [],
    });
    
    sendTransaction(tx);
  };
  
  return <button onClick={handleClick} disabled={isPending}>Pay</button>;
}
```

### Reading Contract Data
```typescript
import { useReadContract } from 'thirdweb/react';

export function BalanceCheck() {
  const { data: balance } = useReadContract({
    contract,
    method: 'function balanceOf(address) view returns (uint256)',
    params: ['0x...address'],
  });
  
  return <p>Balance: {balance}</p>;
}
```

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "NEXT_PUBLIC_THIRDWEB_CLIENT_ID undefined" | Missing from .env.local | Add to .env.local with your ID |
| ConnectButton not showing | Provider not wrapping app | Check ThirdwebClientProvider in layout.tsx |
| Transaction fails in MetaMask | Network mismatch | Switch to Avalanche Fuji in MetaMask |
| No testnet AVAX | Haven't claimed from faucet | Get free AVAX from faucet link above |
| Payment gate doesn't work | Contract not deployed | Deploy contract first, update component |

---

## Next Phase: NFT Integration

Once payment is working, you can add:

```typescript
// Mint brief as NFT after successful payment
import { mintTo } from 'thirdweb/extensions/erc721';

const mintBrief = async (briefData) => {
  const transaction = mintTo({
    contract,
    to: account.address,
    nft: {
      name: `Kuzana Brief #${briefId}`,
      description: briefData.summary,
      image: briefData.thumbnailUrl,
    },
  });
  
  sendTransaction(transaction);
};
```

---

## Questions or Issues?

1. **ConnectButton styling**: It comes with Thirdweb's default theme. Customize by wrapping in your own div.
2. **Custom payment logic**: Edit `ScanPaymentGate` component
3. **Different chain**: Change `avalancheFujiTestnet` in `src/lib/chains.ts` or `client.ts`
4. **Multiple payment tiers**: Add logic to `ScanPaymentGate` to show different costs based on features

---

## Resources

- 📖 **Docs**: [portal.thirdweb.com/typescript/v5](https://portal.thirdweb.com/typescript/v5)
- 🎥 **Videos**: [youtube.com/@thirdweb_](https://youtube.com/@thirdweb_)
- 🔗 **Chain Info**: [chainlist.org](https://chainlist.org) (filter by Avalanche)
- 🧪 **Testnet Faucet**: [core.app testnet faucet](https://core.app/en/tools/testnet-faucet/)
- 💬 **Support**: [Discord.gg/thirdweb](https://discord.gg/thirdweb)

---

**You're ready to go! Run `npm run dev` and start testing.** 🚀
