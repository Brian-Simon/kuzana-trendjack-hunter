# Trendjack Hunter 🚀

**Real-time trend detection + production-ready content briefs**

Discover trending topics across 10 platforms, classify them for founder relevance, and generate ready-to-shoot scripts in under 30 minutes.

## Live Demo

**Dashboard:** [https://kuzana-trendjack-hunter.vercel.app](https://kuzana-trendjack-hunter.vercel.app)

**API:** `GET /api/bounty-2/scan?topic=founder%20culture`

---

## What Is This?

**Problem:** Content creators spend 2-4 hours daily searching for trend inspiration, often missing the momentum window.

**Solution:** Trendjack Hunter scans 10 platforms in parallel, classifies relevance to entrepreneurship/money/AI/culture, and outputs:
- ✅ A proven hook (3 seconds)
- ✅ Script beats for 30-60 second video
- ✅ Multiple format templates (TikTok, LinkedIn, YouTube)
- ✅ Estimated trend lifespan (hours/days)
- ✅ Step-by-step action plan

**Result:** From trend discovery to publishable script in <30 minutes.

---

## How It Works

### 1. **Multi-Platform Monitoring**
- Reddit (community discussions)
- YouTube (long-form + transcripts)
- YouTube Shorts (short-form signals)
- TikTok (discover trends)
- Instagram Reels (explore feed)
- X/Twitter (authenticated API)
- Google News (global tech/business)
- Hacker News (startup/dev signals)
- Kenyan Business News (local market)
- Meta/Instagram (placeholder for API integration)

### 2. **Smart Classification**
Trends categorized as:
- **Founder Culture** (3-7 days): Company building, leadership
- **Money & Growth** (5-14 days): Funding, revenue, survival tactics
- **AI & Systems** (2-7 days): Tools, workflows, automation
- **Consumer Behavior** (6-36 hours): Viral trends, memes, formats
- **Market News** (7-30 days): Policy, economy, regulations

### 3. **Multi-Factor Ranking**
- **Engagement** (45%): Upvotes, comments, shares
- **Engagement Rate** (30%): Normalized by impressions
- **Source Diversity** (16 pts): How many platforms report it
- **Recency** (12 pts): Fresh trends weighted higher

### 4. **Production Content Brief**
```
[HOOK - 3s]      "Everyone's talking about..."
[CONTEXT - 7s]   Why it's happening NOW
[ANGLE - 10s]    Kuzana-specific founder angle
[PROOF - 8s]     Real example from scan
[CTA - 10s]      What to do this week
[CLOSE - 3s]     Engagement question
```

Plus:
- Remix templates for TikTok, LinkedIn, long-form
- 5-step action plan with exact timelines
- Media context (transcripts, frames, OCR)

---

## Quick Start (Development)

### Install & Run
```bash
git clone https://github.com/your-username/kuzana-trendjack-hunter.git
cd kuzana-trendjack-hunter

# Install dependencies
npm install --legacy-peer-deps

# Create .env.local with Supabase credentials
cp .env.example .env.local
# Edit .env.local with your values

# Run dev server
npm run dev

# Visit http://localhost:3000
```

### Test API Locally
```bash
# In PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/bounty-2/scan?topic=AI%20startup" -Method Get | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

---

## Production Deployment

**Full guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

**Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

### Quick Summary:
1. Get API tokens (X, Meta, Tesseract)
2. Set up Supabase database
3. Push to GitHub
4. Import to Vercel with env vars
5. Share live URL with seed users
6. Monitor & iterate

**Estimated time:** 1-2 hours for full setup

---

## Architecture

### Files Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing + dashboard
│   └── api/bounty-2/
│       ├── scan/route.ts    # Trend scan endpoint
│       └── history/route.ts # Scan history endpoint
│
├── components/
│   ├── bounty-2-dashboard.tsx    # Main UI
│   └── scan-history.tsx          # Past scans
│
├── modules/bounties/bounty-2/
│   ├── adapters.ts          # Platform registry
│   ├── sources.ts           # 8 public adapters
│   ├── x-adapter.ts         # Twitter API v2
│   ├── classify.ts          # Ranking + classification
│   ├── brief.ts             # Script generation
│   ├── media-extraction.ts  # Transcript/OCR/frames
│   ├── scan.ts              # Orchestration
│   ├── persistence.ts       # Supabase + file storage
│   ├── types.ts             # TypeScript interfaces
│   └── README.md            # Bounty 2 docs
│
└── lib/
    ├── supabase.ts          # Supabase client
    └── sentry.ts            # Error monitoring
```

### Data Flow
```
User Input (topic)
    ↓
Scan Orchestrator
    ↓
Parallel Platform Adapters (Reddit, YouTube, Twitter, etc.)
    ↓
Trend Classifier (5 categories)
    ↓
Multi-Factor Ranker (engagement, rate, sources, recency)
    ↓
Content Brief Generator (hook + script + action plan)
    ↓
Persistence Layer (Supabase + file backup)
    ↓
API Response / Dashboard Display
```

---

## API Reference

### GET `/api/bounty-2/scan?topic=...`
Run a live trend scan.

**Query Parameters:**
- `topic` (required): String to search for (e.g., "founder culture", "AI startup")

**Response:**
```json
{
  "topic": "founder culture",
  "topTrend": {
    "title": "Trend title",
    "topic": "Classification",
    "score": 193,
    "sourceCount": 4,
    "lifespan": "3-7 days",
    "whyItMatters": "Explanation"
  },
  "items": [
    {
      "source": "Platform",
      "title": "Item title",
      "url": "https://...",
      "engagement": 501,
      "impressions": 6400,
      "media": {...}
    }
  ],
  "brief": {
    "trend": {...},
    "hook": "Everyone is talking about...",
    "script": ["[HOOK - 3s]...", ...],
    "remixTemplate": [...],
    "actionPlan": [...]
  },
  "ranking": {
    "score": 193,
    "totalImpressions": 19244,
    "averageEngagementRate": 0.078,
    "sourceDiversity": 4
  }
}
```

**Example:**
```bash
curl "https://kuzana-trendjack-hunter.vercel.app/api/bounty-2/scan?topic=founder%20culture"
```

### GET `/api/bounty-2/history?limit=10`
Get recent scans from database.

**Query Parameters:**
- `limit` (optional): Max results (default: 10)

**Response:** Array of past scan results

---

## Environment Variables

See [.env.example](./.env.example) for all available variables.

### Required
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### Optional (Recommended)
```env
X_BEARER_TOKEN=your_twitter_token
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Optional (For Full Features)
```env
META_ACCESS_TOKEN=your_instagram_token
TESSERACT_API_KEY=your_ocr_key
```

---

## Development

### Adding a New Platform Adapter

1. **Create adapter function** in `src/modules/bounties/bounty-2/sources.ts`:
```typescript
export async function fetchYourPlatformTrends(topic: string): Promise<TrendSourceItem[]> {
  // Your logic here
  return trends;
}
```

2. **Register in adapters.ts**:
```typescript
{
  platform: 'your-platform',
  label: 'Your Platform',
  enabled: true,
  fetchTrends: fetchYourPlatformTrends,
}
```

3. **Add type** to `src/modules/bounties/bounty-2/types.ts`:
```typescript
export type SocialPlatform = '...' | 'your-platform';
```

That's it! Platform is now integrated.

### Adding a New Classification

Edit `src/modules/bounties/bounty-2/classify.ts` → `themeRules`:
```typescript
{
  topic: 'your category',
  keywords: ['keyword1', 'keyword2'],
  angle: 'Your angle description',
  lifespan: 'X-Y days',
  whyItMatters: 'Why this category matters',
}
```

### Testing Locally

```bash
# Run dev server
npm run dev

# Test API
curl "http://localhost:3000/api/bounty-2/scan?topic=test"

# Run build (before deploying)
npm run build

# Lint
npm run lint
```

---

## Monitoring

### Vercel
- Dashboard: [https://vercel.com](https://vercel.com) → Your Project
- Check: Deployments, Logs, Analytics

### Sentry
- Dashboard: [https://sentry.io](https://sentry.io) → Your Project
- Monitor: Errors, Performance, Releases

### Supabase
- Dashboard: [https://supabase.com](https://supabase.com) → Your Project
- Monitor: Database Usage, Query Performance

---

## Roadmap

### Phase 1 (Done ✅)
- [x] 10-platform monitoring
- [x] Trend classification
- [x] Content brief generation
- [x] Multi-factor ranking
- [x] Supabase integration
- [x] Vercel deployment
- [x] Error monitoring (Sentry)

### Phase 2 (In Progress)
- [ ] Activate real API credentials
- [ ] Seed user testing & feedback
- [ ] Performance optimization

### Phase 3 (Planned)
- [ ] Meta/Instagram Graph API
- [ ] TikTok Ads API
- [ ] Advanced media extraction (OCR at scale)
- [ ] Real-time WebSocket feeds

### Phase 4 (Future)
- [ ] Avalanche blockchain integration
- [ ] On-chain creator credentials
- [ ] Automated payment splits
- [ ] Content calendar automation
- [ ] Performance analytics dashboard

---

## Success Metrics

Track these to measure product-market fit:

1. **Adoption**: Scans/day, unique users/week
2. **Relevance**: Classified trends match user expectations
3. **Velocity**: Time from scan to published content
4. **Performance**: Engagement on trend-driven vs evergreen posts
5. **Retention**: Users returning for multiple scans

---

## FAQ

**Q: Can I run this locally without Supabase?**
A: Yes! Default falls back to file-based storage in `data/bounty-2-scans.json`

**Q: How often does data refresh?**
A: Each scan pulls fresh data. Caching is 5 minutes per source to respect rate limits.

**Q: Do I need all three API tokens?**
A: No. X is recommended; Meta and OCR are optional. The system degrades gracefully.

**Q: Can I add more platforms?**
A: Yes! Add a new adapter function + register in adapters.ts. No other changes needed.

**Q: What's the cost?**
- Vercel: Free tier (up to 1M invocations/month)
- Supabase: Free tier (up to 500MB)
- X API: Free tier (450 requests/15-min window)
- Total: **$0/month for early stage**

---

## License

MIT

---

## Support

**Issues or questions?**
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for setup help
2. Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for troubleshooting
3. See [src/modules/bounties/bounty-2/README.md](./src/modules/bounties/bounty-2/README.md) for technical details
4. Open an issue on GitHub

---

**Built for Kuzana** 🇰🇪

*Helping Kenyan founders stay ahead of trends, faster.*
