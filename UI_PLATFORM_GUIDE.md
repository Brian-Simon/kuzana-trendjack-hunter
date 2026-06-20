# Kuzana UI Platform - Complete Guide

## Overview

Kuzana's full-stack user interface is built with:
- **Next.js 16** - React framework with optimized performance
- **Tailwind CSS** - Utility-first styling with custom color palette
- **Thirdweb v5** - Web3 wallet integration
- **TypeScript** - Full type safety

The UI is fully responsive, dark-themed, and designed for modern Web3 UX.

---

## Component Architecture

### Layout Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Header` | `src/components/header.tsx` | Fixed header with nav, logo, wallet button, user menu |
| `Footer` | `src/components/footer.tsx` | Footer with links, social, company info |
| `ThirdwebClientProvider` | `src/components/thirdweb-provider.tsx` | Wraps app with Thirdweb SDK |

### Core Scanning Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `ScanInterface` | `src/components/scan-interface.tsx` | Main scanning interface with payment gate |
| `ScanPaymentGate` | `src/components/scan-payment-gate.tsx` | Payment verification before scanning |
| `BriefViewer` | `src/components/brief-viewer.tsx` | Display generated content brief |
| `TrendItemCard` | `src/components/trend-item-card.tsx` | Display individual trend with ranking |
| `ScanLoadingState` | `src/components/scan-loading-state.tsx` | Skeleton loading state during scan |

### User Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `WalletConnectButton` | `src/components/wallet-connect-button.tsx` | Official Thirdweb ConnectButton |
| `WalletStatus` | `src/components/wallet-status.tsx` | Show connected wallet address |
| `UserMenu` | `src/components/user-menu.tsx` | User profile dropdown menu |

### Utility Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `StatCard` | `src/components/stat-card.tsx` | Display metric with label and unit |
| `ScanHistory` | `src/components/scan-history.tsx` | List of recent scans (server component) |
| `ModuleCard` | `src/components/module-card.tsx` | Display bounty module info |

---

## Design System

### Color Palette

```
Primary:    #8ef0c9 (Teal - accent, buttons, highlights)
Dark:       #08111f (Background)
Surface:    #07101d (Cards, inputs)
Text:       #ffffff (White - headings)
Text Alt:   #d9dfeb (Light gray - body text)
Text Muted: #b5bfd0 (Medium gray - secondary text)
Text Dim:   #6d788b (Dark gray - labels, meta)
```

### Typography

- **Display**: 4xl-6xl, font-bold, text-white
- **Heading**: 2xl-3xl, font-semibold, text-white
- **Body**: base-lg, text-[#d9dfeb]
- **Caption**: xs-sm, text-[#b5bfd0]
- **Labels**: xs, uppercase, tracking-wider

### Spacing Scale

- `xs`: 2px
- `sm`: 4px
- `base`: 8px
- `lg`: 16px
- `xl`: 24px
- `2xl`: 32px
- `3xl`: 48px
- `4xl`: 64px

### Border & Shadow

- **Border**: 1px solid rgba(255, 255, 255, 0.1)
- **Border Light**: 1px solid rgba(142, 240, 201, 0.3)
- **Shadow**: 0 24px 80px rgba(0, 0, 0, 0.32)
- **Shadow Glow**: 0 0 20px rgba(142, 240, 201, 0.5)

### Border Radius

- Small buttons: `rounded-lg` (8px)
- Cards: `rounded-2xl` (16px)
- Large sections: `rounded-3xl` (24px)
- Hero sections: `rounded-[32px]` (32px)

---

## Page Structure

### Home Page (`src/app/page.tsx`)

1. **Header** (sticky)
   - Logo, navigation links
   - Wallet connect button
   - User menu

2. **Hero Section**
   - Main headline
   - Feature badges
   - Call-to-action

3. **Scan Interface**
   - Input field with topic
   - Payment gate (before results)
   - Results display (brief + trends)

4. **Scan History Section**
   - List of recent scans
   - Audit trail view

5. **Bounty Modules Section**
   - Grid of bounty cards
   - Module info and status

6. **CTA Section**
   - "Ready to find trends?" call-to-action

7. **Footer** (sticky bottom)
   - Links, social, company info

---

## User Flows

### 1. First-Time User

```
Visit app
  ↓
See hero + features
  ↓
Click "Start Scanning"
  ↓
Scroll to ScanInterface
  ↓
Click "Connect Wallet"
  ↓
Select wallet (MetaMask, WalletConnect, etc.)
  ↓
Approve connection
  ↓
Enter topic
  ↓
See payment gate: "0.001 AVAX to scan"
  ↓
Click "Pay & Scan"
  ↓
Confirm transaction in wallet
  ↓
Payment processed
  ↓
Scan runs (2-10 seconds)
  ↓
Results display with brief + trends
```

### 2. Returning User

```
Visit app
  ↓
Already connected (wallet shows address)
  ↓
Payment gate pre-filled if already paid
  ↓
Enter topic
  ↓
Run scan immediately
  ↓
View results
```

### 3. View History

```
Home page loads
  ↓
Scroll to "Recent Scans" section
  ↓
See list of past scans
  ↓
Click on a scan to re-view brief
  ↓
Export or share brief
```

---

## Component Usage Examples

### Using the ScanInterface

```typescript
import { ScanInterface } from '@/components/scan-interface';

export default function Page() {
  return <ScanInterface />;
}
```

### Using StatCard

```typescript
import { StatCard } from '@/components/stat-card';

<div className="grid grid-cols-3 gap-4">
  <StatCard label="Sources" value={10} icon="📡" />
  <StatCard label="Impressions" value={250} unit="K" icon="👥" />
  <StatCard label="Engagement" value={4.2} unit="%" icon="📈" />
</div>
```

### Using BriefViewer

```typescript
import { BriefViewer } from '@/components/brief-viewer';

<BriefViewer 
  brief={scanResult.brief}
  trendTitle="Founder culture on TikTok"
  trendCategory="Founder Culture"
/>
```

---

## Styling Patterns

### Glass Morphism

Cards with blurred background:

```typescript
<div className="glass rounded-3xl border border-white/10">
  {/* content */}
</div>
```

CSS in `globals.css`:
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}
```

### Gradient Overlays

```typescript
<div className="bg-gradient-to-br from-[rgba(142,240,201,0.1)] to-[rgba(142,240,201,0.03)]">
  {/* content */}
</div>
```

### Hover Effects

```typescript
<button className="hover:shadow-lg hover:shadow-[#8ef0c9]/50 hover:scale-[1.01] transition-all">
  Click me
</button>
```

### Dark Mode

All components are optimized for dark mode (no light mode implementation).

---

## Responsive Breakpoints

- **Mobile**: < 640px (default, no prefix)
- **Tablet**: ≥ 640px (`sm:`)
- **Desktop**: ≥ 768px (`md:`)
- **Large Desktop**: ≥ 1024px (`lg:`)
- **XL Desktop**: ≥ 1280px (`xl:`)

Example:
```typescript
<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive text size */}
</div>
```

---

## Accessibility

### ARIA Labels

All interactive elements have proper labels:

```typescript
<button aria-label="Connect wallet">
  <ConnectButton />
</button>
```

### Keyboard Navigation

- Tab through header links
- Tab to scan button
- Enter to submit forms
- Escape to close menus

### Color Contrast

- Text on background: ≥ 4.5:1 ratio
- Interactive elements: Clearly visible with teal accents
- Error states: Red with proper contrast

---

## Performance Optimizations

### Image Optimization

- Trend thumbnails are lazy-loaded
- User avatars use gradients (no images)
- Hero images use next/image for optimization

### Code Splitting

- ScanInterface is client-side only (`'use client'`)
- ScanHistory is server-side (CSR disabled)
- Layout is hybrid

### Bundle Size

- Thirdweb SDK: ~200KB
- Tailwind: ~60KB (purged)
- Total app: ~350KB (gzipped)

---

## Future Enhancements

### Phase 2 - Features

1. **Brief Editor**
   - Edit generated briefs
   - Save custom templates
   - Version history

2. **Social Sharing**
   - Share briefs via Twitter
   - Discord notifications
   - Email digest

3. **Creator Dashboard**
   - Analytics (views, engagement)
   - Revenue tracking
   - Creator leaderboard

4. **Team Collaboration**
   - Share scans with team
   - Comments and notes
   - Approval workflow

### Phase 3 - NFT Integration

1. **Brief NFTs**
   - Mint briefs as NFTs
   - Transfer ownership
   - Royalty tracking

2. **Creator Tokens**
   - Earn tokens for good trends
   - Stake and govern
   - Yield farming

---

## Testing

### Component Tests

```bash
# Test Header component
npm test src/components/header.tsx

# Test ScanInterface
npm test src/components/scan-interface.tsx
```

### E2E Tests

```bash
# Test full scan workflow
npm run test:e2e
```

### Visual Regression

```bash
# Compare with baseline
npm run visual:test
```

---

## Deployment

### Vercel (Recommended)

```bash
git push origin main
# Auto-deploys via Vercel
# Visit https://kuzana.vercel.app
```

### Self-Hosted

```bash
npm run build
npm start
# App runs on localhost:3000
```

---

## Troubleshooting

### Wallet Button Not Showing

- Check if ConnectButton is wrapped with ThirdwebClientProvider
- Verify NEXT_PUBLIC_THIRDWEB_CLIENT_ID in .env.local

### Styles Not Loading

- Run `npm run build`
- Clear `.next` folder: `rm -r .next`
- Restart dev server

### Types Not Found

- Install types: `npm install --save-dev @types/node`
- Restart TypeScript server in VS Code

---

## Resources

- 📖 [Tailwind CSS Docs](https://tailwindcss.com)
- 🎨 [Design System Guide](./DESIGN_SYSTEM.md)
- 🧩 [Component Library](https://storybook.kuzana.app)
- 🚀 [Deployment Guide](https://vercel.com/docs)

---

**Last Updated**: June 20, 2026 | Built with ❤️ + Thirdweb
