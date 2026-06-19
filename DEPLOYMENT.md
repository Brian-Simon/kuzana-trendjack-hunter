# Production Deployment Guide: Trendjack Hunter

This guide walks through deploying Trendjack Hunter to production using Supabase, Vercel, and Sentry.

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Supabase account (free tier)
- Twitter/X API access (optional but recommended)
- Sentry account (free tier, optional)

---

## Step 1: Get API Tokens

### 1.1 X/Twitter API v2 Token
1. Go to [https://developer.twitter.com/en/portal/dashboard](https://developer.twitter.com/en/portal/dashboard)
2. Create a new Project or use existing one
3. Request **Elevated** access tier (needed for recent tweets)
4. Under "Keys and tokens" → Create **Bearer Token**
5. Copy the token (looks like `AAAAAxxxxxxxxxxxxxxxxxxxx`)
6. **Keep this safe** — you'll add it to Vercel env vars

### 1.2 Meta/Instagram Business Token (Optional)
1. Go to [https://developers.facebook.com](https://developers.facebook.com)
2. Create app → Select "Business"
3. Add "Instagram Graph API" product
4. Configure app with your Instagram Business Account
5. Go to Tools → Graph Explorer
6. Generate Business Access Token with scopes: `instagram_business_account`
7. Copy token (long string)

### 1.3 Tesseract OCR (Optional — for image text extraction)
**Option A: Azure Computer Vision (recommended for production)**
1. Go to [https://portal.azure.com](https://portal.azure.com)
2. Create "Computer Vision" resource
3. Get API key and endpoint URL
4. Use as `TESSERACT_API_KEY`

**Option B: Self-hosted via Docker (free)**
```bash
docker run -p 8080:8080 tesseractshadow/tesseract
# Use http://your-server:8080 as endpoint
```

---

## Step 2: Set Up Supabase Database

### 2.1 Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Choose region closest to your users
5. Set a strong database password
6. **Wait for project to initialize** (2-3 minutes)

### 2.2 Create Database Schema
Once project is ready:

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Paste this SQL:

```sql
-- Create trend_scans table
CREATE TABLE trend_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  result JSONB NOT NULL,
  score INTEGER NOT NULL,
  source_count INTEGER NOT NULL,
  trend_lifespan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_trend_scans_created_at ON trend_scans(created_at DESC);
CREATE INDEX idx_trend_scans_topic ON trend_scans(topic);

-- Enable RLS (Row Level Security)
ALTER TABLE trend_scans ENABLE ROW LEVEL SECURITY;

-- Allow public read access (no authentication required for reads)
CREATE POLICY "Allow public read" ON trend_scans
  FOR SELECT USING (true);

-- Allow public insert (no authentication for writes)
CREATE POLICY "Allow public insert" ON trend_scans
  FOR INSERT WITH CHECK (true);
```

4. Click **"Run"**
5. You should see: `SUCCESS: Tables created`

### 2.3 Get Supabase Credentials
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon Public Key** (under "Project API keys")
3. Keep these safe — you'll need them in Vercel

---

## Step 3: Initialize Git & Push to GitHub

### 3.1 Initialize Git Locally
```powershell
cd d:\xampp\htdocs\Kuzana-3.0

# Initialize repo
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Add all files
git add .

# Create initial commit
git commit -m "Trendjack Hunter: Production-ready MVP with Supabase, Sentry, and multi-platform trend detection"
```

### 3.2 Create GitHub Repository
1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `kuzana-trendjack-hunter`
3. Description: "Real-time trend detection and content brief generation"
4. **Do NOT initialize with README** (we already have one)
5. Click **Create repository**

### 3.3 Push to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/kuzana-trendjack-hunter.git
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy to Vercel

### 4.1 Connect to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Search for and select: `kuzana-trendjack-hunter`
5. Click **"Import"**

### 4.2 Configure Environment Variables
In the Vercel import dialog, under "Environment Variables", add:

| Variable | Value | Source |
|----------|-------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | Supabase Settings → API |
| `X_BEARER_TOKEN` | Your Twitter bearer token | Twitter Developer Portal |
| `META_ACCESS_TOKEN` | Your Instagram business token | Facebook Developers |
| `TESSERACT_API_KEY` | Your OCR API key | Azure or self-hosted |
| `NEXT_PUBLIC_SENTRY_DSN` | Your Sentry DSN | Sentry Project Settings |

**Note:** Variables starting with `NEXT_PUBLIC_` are exposed to the browser (safe for non-secret data).

### 4.3 Deploy
1. Click **"Deploy"**
2. Wait 3-5 minutes for build to complete
3. You'll see a success message with your URL: `https://kuzana-trendjack-hunter.vercel.app`

### 4.4 Test Live Deployment
```powershell
# Test the API
Invoke-WebRequest -Uri "https://your-project.vercel.app/api/bounty-2/scan?topic=founder%20culture" -Method Get | Select-Object -ExpandProperty Content
```

---

## Step 5: Set Up Sentry Error Monitoring (Optional)

### 5.1 Create Sentry Project
1. Go to [https://sentry.io](https://sentry.io)
2. Sign up / Log in
3. Click **"Create Project"**
4. Platform: **Next.js**
5. Alert rule: Optional
6. Click **"Create Project"**

### 5.2 Get Sentry DSN
1. In your Sentry project, go to **Settings** → **Client Keys (DSN)**
2. Copy the DSN (looks like `https://xxxxx@sentry.io/xxxxx`)
3. Add to Vercel as `NEXT_PUBLIC_SENTRY_DSN` environment variable

### 5.3 Redeploy with Sentry
Once Sentry DSN is added to Vercel env vars:
1. Go to Vercel → Your Project → **Settings** → **Environment Variables**
2. Add/update `NEXT_PUBLIC_SENTRY_DSN`
3. Go to **Deployments** → Click the latest deployment → **Redeploy**
4. Wait for redeploy to complete

---

## Step 6: Share with Seed Users

### 6.1 Generate Shareable Link
Your live deployment is ready at:
```
https://your-project.vercel.app
```

### 6.2 Share Documentation
Create a seed user guide:

```markdown
# Trendjack Hunter - Live Test Link

**Live Dashboard:** https://your-project.vercel.app

## How to Use

1. **Visit the dashboard** at the link above
2. **Enter a trend topic** (e.g., "founder culture", "AI startup", "money")
3. **Click "Run live scan"**
4. **Review the results:**
   - Top trend with score and lifespan
   - Ready-to-use hook for creators
   - 6-beat script for 30-60 second video
   - Remix template for different formats
   - Step-by-step action plan

## API Endpoint (for integrations)

```bash
curl "https://your-project.vercel.app/api/bounty-2/scan?topic=founder%20culture"
```

## Feedback to Share

- Does the trend classification match your market?
- Is the 30-minute timeline realistic?
- Which platform adapter do you want prioritized?
- What content angles resonate most?

**Submit feedback to:** [your email]
```

### 6.3 Set Up Monitoring
1. **Vercel Dashboard:** Check deployment logs and error reports
2. **Sentry:** Real-time error monitoring and alerts
3. **Supabase:** View scan history and database usage
4. **Analytics:** Vercel provides basic analytics (visits, performance)

---

## Step 7: Iterate Based on Feedback

### Common Issues & Solutions

**Issue: Supabase queries timing out**
- Solution: Increase query timeout in `src/lib/supabase.ts`
- Check Supabase database logs for slow queries

**Issue: X API returning no results**
- Solution: Verify `X_BEARER_TOKEN` has "Elevated" access tier
- Check Twitter API rate limits

**Issue: Cold start times > 5 seconds**
- Solution: Expected on free tier. Upgrade Vercel Pro for consistent performance.

**Issue: Scans not persisting**
- Solution: Check Supabase credentials are set correctly in Vercel env vars
- Verify database schema was created (run SQL from Step 2.2 again)

---

## Step 8: Scale to Production

Once seed users validate the product:

### 8.1 Upgrade Database
```sql
-- Enable backups
-- Upgrade Supabase project tier to Pro ($25/month)
-- Add read replicas for scale
```

### 8.2 Optimize API Performance
- Add Redis caching for trending scans
- Implement request rate limiting per seed user
- Add API key authentication for external consumers

### 8.3 Monitor & Alert
- Set up Sentry alerts for error spikes
- Configure Vercel alerts for deployment failures
- Create Supabase alerts for database size

### 8.4 Content Pipeline Integration
Once creators start using briefs:
- Track which trends lead to published content
- Measure engagement on trend-driven vs evergreen posts
- A/B test script variations
- Build automated content calendar

---

## Quick Reference: Live Endpoints

| Endpoint | Purpose | Method |
|----------|---------|--------|
| `GET /` | Dashboard UI | Browser |
| `GET /api/bounty-2/scan?topic=X` | Run trend scan | API |
| `GET /api/bounty-2/history` | Last 10 scans | API |

---

## Support & Troubleshooting

**Questions?**
- Check Vercel logs: Project → Deployments → Logs
- Check Sentry: Project → Issues
- Check Supabase: Project → SQL Editor → Query history

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Sentry Docs: https://docs.sentry.io

---

## Success Metrics

After going live, track:
1. **Scan volume:** How many times is the API called per day?
2. **Trend accuracy:** Do classified trends match user expectations?
3. **Creator adoption:** How many creators use the generated briefs?
4. **Content performance:** Do trend-driven posts outperform evergreen?
5. **Feedback quality:** What improvements do seed users request?

Good luck! 🚀
