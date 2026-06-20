# Quick Reference - Kuzana UI Commands

## 🚀 Get Started

```bash
# Start dev server (already running)
npm run dev

# Visit the app
open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## 📂 Key File Locations

### Components
```
src/components/
├── header.tsx                   # Top navigation
├── footer.tsx                   # Bottom nav + links
├── scan-interface.tsx          # Main scanner
├── brief-viewer.tsx            # Brief display
├── trend-item-card.tsx         # Individual trend
├── scan-payment-gate.tsx       # Payment UI
├── user-menu.tsx               # User dropdown
├── wallet-connect-button.tsx   # Thirdweb button
├── wallet-status.tsx           # Wallet info
├── stat-card.tsx               # Metric display
└── scan-loading-state.tsx      # Skeleton loader
```

### Pages
```
src/app/
├── page.tsx                    # Home page (main UI)
├── layout.tsx                  # Root wrapper
└── api/bounty-2/
    └── scan/route.ts           # Scan API endpoint
```

### Libraries
```
src/lib/
├── client.ts                   # Thirdweb client
├── chains.ts                   # Avalanche config
└── supabase.ts                 # Database
```

---

## 🎨 Styling Quick Tips

### Colors
```typescript
// Primary accent (buttons, highlights)
className="text-[#8ef0c9]"
className="bg-[#8ef0c9]"
className="border-[#8ef0c9]"

// Dark background
className="bg-[#08111f]"

// Card surface
className="bg-[#07101d]"

// Text
className="text-white"           // headings
className="text-[#d9dfeb]"       // body
className="text-[#b5bfd0]"       // secondary
className="text-[#6d788b]"       // muted
```

### Components
```typescript
// Glass effect (blurred card)
className="glass"

// Border
className="border border-white/10"

// Rounded corners
className="rounded-2xl"           // cards
className="rounded-3xl"           // sections
className="rounded-[32px]"        // hero

// Shadow
className="shadow-lg shadow-[#8ef0c9]/50"

// Gradient
className="bg-gradient-to-br from-[...] to-[...]"

// Responsive
className="hidden md:flex"        // hide on mobile
className="px-4 md:px-8"          // spacing
className="text-sm md:text-lg"    // text size
```

---

## 🔧 Common Tasks

### Add a New Section
```typescript
<section className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
  <div className="mx-auto max-w-7xl">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Section Title</h2>
    <p className="text-lg text-[#b5bfd0] max-w-2xl">Description...</p>
    {/* Content */}
  </div>
</section>
```

### Add a Card
```typescript
<div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
  {/* Content */}
</div>
```

### Add a Button
```typescript
<button className="rounded-2xl bg-[#8ef0c9] text-[#08111f] px-6 py-3 font-semibold hover:shadow-lg hover:shadow-[#8ef0c9]/50 transition-all">
  Click Me
</button>
```

### Add Responsive Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

---

## 🧩 Component Usage

### ScanInterface
```typescript
import { ScanInterface } from '@/components/scan-interface';

<ScanInterface />
```

### BriefViewer
```typescript
import { BriefViewer } from '@/components/brief-viewer';

<BriefViewer 
  brief={scanResult.brief}
  trendTitle="Founder Culture"
  trendCategory="Business"
/>
```

### StatCard
```typescript
import { StatCard } from '@/components/stat-card';

<StatCard 
  label="Sources"
  value={10}
  icon="📡"
/>
```

### Header
```typescript
import { Header } from '@/components/header';

<Header />
```

---

## 🔐 Web3 Integration

### Check if Wallet Connected
```typescript
import { useActiveAccount } from 'thirdweb/react';

const account = useActiveAccount();
if (account) {
  console.log(account.address);
}
```

### Send Transaction
```typescript
import { useSendTransaction } from 'thirdweb/react';

const { mutate: sendTransaction, isPending } = useSendTransaction();

const handlePay = () => {
  const tx = prepareContractCall({...});
  sendTransaction(tx);
};
```

### Get Wallet Balance
```typescript
import { useWalletBalance } from 'thirdweb/react';

const { data: balance } = useWalletBalance({
  client,
  chain: avalancheFujiTestnet,
  address: account?.address,
});
```

---

## 🐛 Debugging

### Check Console
```bash
# Browser DevTools (F12)
→ Console tab for errors
→ Network tab for API calls
→ Elements tab for HTML
```

### Common Errors

**"Cannot find module"**
```bash
# Clear cache and reinstall
rm -r .next node_modules
npm install
```

**"Type errors"**
```bash
# Check TypeScript
npx tsc --noEmit
```

**"Build fails"**
```bash
# Full clean rebuild
rm -r .next dist
npm run build
```

---

## 📊 File Size Check

```bash
# Check build size
npm run build

# Analyze bundle
npm run analyze  # if configured

# Typical sizes:
- JavaScript: ~180KB
- CSS: ~45KB
- Total gzipped: ~275KB
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel
# Auto-deploys on git push
git push origin main
```

### Self-Hosted
```bash
npm run build
npm start
# Runs on port 3000
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=c70944866bd556a711f59eb8e18fdd8a
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 📱 Responsive Testing

### Mobile (375px)
```bash
Chrome DevTools → Device Toolbar → iPhone SE
Test: Header collapse, full-width buttons, stacked cards
```

### Tablet (768px)
```bash
Chrome DevTools → Device Toolbar → iPad
Test: 2-column layouts, nav visible, readable text
```

### Desktop (1920px)
```bash
Chrome DevTools → Device Toolbar → Desktop
Test: 3-column layouts, hover effects, full nav
```

---

## 🎯 Next Steps

1. **Test UI** → Visit http://localhost:3000
2. **Connect Wallet** → Click ConnectButton
3. **Try Scanner** → Enter topic, see payment gate
4. **Deploy Contract** → Get from Thirdweb
5. **Test Payment** → Get testnet AVAX, pay for scan
6. **Export Brief** → Copy or download PDF

---

## 💬 Quick Help

| Question | Answer |
|----------|--------|
| Where is the main page? | `src/app/page.tsx` |
| How do I add a color? | Use Tailwind classes like `text-[#8ef0c9]` |
| How do I make something mobile-only? | Use `block md:hidden` |
| How do I connect wallet? | Use `<ConnectButton client={client} />` |
| Where are components? | `src/components/` directory |
| How do I update design? | Edit colors in `src/app/globals.css` |
| How do I deploy? | Push to Vercel, auto-deploys |
| Where are docs? | Read UI_PLATFORM_GUIDE.md |

---

**Pro Tips**
- 💡 Use `className="..."` for single changes, not CSS files
- 🎨 Copy-paste card structure for consistency
- 📱 Always test responsive with `md:` and `lg:` prefixes
- 🔐 Never hardcode sensitive data in components
- ⚡ Use `const` for components, avoid `function`
- 🧪 Test on real devices, not just DevTools

---

**Version**: June 20, 2026 | Next.js 16 + React 19 + Tailwind CSS + Thirdweb v5
