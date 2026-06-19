# Production Deployment Checklist

Complete this checklist step-by-step to deploy Trendjack Hunter to production.

## Phase 1: API Credentials Setup

- [ ] **X/Twitter API**
  - [ ] Go to [https://developer.twitter.com](https://developer.twitter.com)
  - [ ] Create or select existing project
  - [ ] Request Elevated tier access
  - [ ] Generate Bearer Token
  - [ ] Copy token: `___________________________________`
  - [ ] Store securely (don't commit to git)

- [ ] **Meta/Instagram (Optional)**
  - [ ] Go to [https://developers.facebook.com](https://developers.facebook.com)
  - [ ] Create Business app
  - [ ] Add Instagram Graph API
  - [ ] Generate Business Access Token
  - [ ] Copy token: `___________________________________`

- [ ] **Tesseract OCR (Optional)**
  - [ ] Choose provider:
    - [ ] Azure Computer Vision (paid)
    - [ ] Self-hosted Docker (free)
  - [ ] Get API key or endpoint
  - [ ] Copy: `___________________________________`

- [ ] **Sentry (Optional)**
  - [ ] Go to [https://sentry.io](https://sentry.io)
  - [ ] Create project (Platform: Next.js)
  - [ ] Copy DSN: `___________________________________`

---

## Phase 2: Supabase Database

- [ ] **Create Supabase Project**
  - [ ] Go to [https://supabase.com](https://supabase.com)
  - [ ] Create new project
  - [ ] Choose region
  - [ ] Save password securely
  - [ ] Wait for initialization (2-3 min)

- [ ] **Create Database Schema**
  - [ ] Go to SQL Editor
  - [ ] Create new query
  - [ ] Paste SQL from DEPLOYMENT.md Step 2.2
  - [ ] Run query
  - [ ] Verify: "SUCCESS: Tables created"

- [ ] **Get Supabase Credentials**
  - [ ] Go to Settings → API
  - [ ] Copy Project URL: `https://_______________.supabase.co`
  - [ ] Copy Anon Public Key: `___________________________________`

---

## Phase 3: GitHub Setup

- [ ] **Initialize Git Locally**
  ```powershell
  cd d:\xampp\htdocs\Kuzana-3.0
  git init
  git config user.email "your-email@example.com"
  git config user.name "Your Name"
  git add .
  git commit -m "Trendjack Hunter: Production-ready MVP"
  ```

- [ ] **Create GitHub Repository**
  - [ ] Go to [https://github.com/new](https://github.com/new)
  - [ ] Name: `kuzana-trendjack-hunter`
  - [ ] **Do NOT initialize with README**
  - [ ] Click Create

- [ ] **Push to GitHub**
  ```powershell
  git remote add origin https://github.com/YOUR_USERNAME/kuzana-trendjack-hunter.git
  git branch -M main
  git push -u origin main
  ```
  - [ ] Verify: Files appear on GitHub

---

## Phase 4: Vercel Deployment

- [ ] **Connect to Vercel**
  - [ ] Go to [https://vercel.com](https://vercel.com)
  - [ ] Click "New Project"
  - [ ] Import from GitHub: `kuzana-trendjack-hunter`
  - [ ] Click "Import"

- [ ] **Add Environment Variables**
  - [ ] Fill in Vercel environment variables panel:
    - [ ] `NEXT_PUBLIC_SUPABASE_URL` = Supabase URL
    - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Supabase anon key
    - [ ] `X_BEARER_TOKEN` = Twitter bearer token
    - [ ] `META_ACCESS_TOKEN` = Instagram business token (optional)
    - [ ] `TESSERACT_API_KEY` = OCR API key (optional)
    - [ ] `NEXT_PUBLIC_SENTRY_DSN` = Sentry DSN (optional)

- [ ] **Deploy**
  - [ ] Click "Deploy"
  - [ ] Wait for build to complete (3-5 minutes)
  - [ ] Verify: Deployment succeeds with green checkmark

- [ ] **Get Live URL**
  - [ ] Copy deployment URL: `https://_____________________.vercel.app`

---

## Phase 5: Testing & Verification

- [ ] **Test Live Dashboard**
  - [ ] Visit: `https://your-project.vercel.app`
  - [ ] Dashboard loads
  - [ ] No console errors (F12 → Console)

- [ ] **Test API Endpoint**
  ```powershell
  Invoke-WebRequest -Uri "https://your-project.vercel.app/api/bounty-2/scan?topic=founder%20culture" -Method Get | Select-Object -ExpandProperty Content | ConvertFrom-Json
  ```
  - [ ] API returns 200 response
  - [ ] Response includes `topTrend`, `brief`, `ranking`

- [ ] **Test Database Persistence**
  - [ ] Run scan on dashboard
  - [ ] Go to Supabase → Data Editor → `trend_scans`
  - [ ] Verify: New row appears in table

- [ ] **Check Sentry (if enabled)**
  - [ ] Go to Sentry project
  - [ ] Verify: Project receives events from deployment

---

## Phase 6: Seed User Rollout

- [ ] **Create Seed User Documentation**
  - [ ] Copy template from DEPLOYMENT.md → "Share with Seed Users"
  - [ ] Customize with your live URL
  - [ ] Add feedback email/form

- [ ] **Share with Initial Users (3-5 recommended)**
  - [ ] [ ] User 1: ___________________ (email: _______________)
  - [ ] User 2: ___________________ (email: _______________)
  - [ ] User 3: ___________________ (email: _______________)
  - [ ] User 4: ___________________ (email: _______________)
  - [ ] User 5: ___________________ (email: _______________)

- [ ] **Set Up Feedback Tracking**
  - [ ] Create Google Form or Typeform for feedback
  - [ ] Share link with seed users
  - [ ] Check responses daily

- [ ] **Monitor Health**
  - [ ] Check Vercel dashboard daily for errors
  - [ ] Check Sentry for exceptions
  - [ ] Check Supabase for query performance

---

## Phase 7: Production Readiness

- [ ] **Performance Checks**
  - [ ] Dashboard load time < 2 seconds
  - [ ] API response time < 3 seconds
  - [ ] Database queries completing < 500ms

- [ ] **Monitoring Active**
  - [ ] Sentry alerts configured
  - [ ] Vercel deployment notifications enabled
  - [ ] Supabase usage dashboard checked

- [ ] **Documentation Complete**
  - [ ] README.md updated with live URL
  - [ ] DEPLOYMENT.md available for future deployments
  - [ ] API documentation clear

- [ ] **Ready for Scale**
  - [ ] Seed user feedback collected
  - [ ] Major issues fixed
  - [ ] Performance baseline established

---

## Deployment Complete! 🎉

Next steps:
1. Gather seed user feedback (1-2 weeks)
2. Iterate based on feedback
3. Add more platforms (Phase 2)
4. Upgrade to Pro tier for scale
5. Build content calendar integration

**Live URL:** `https://______________________.vercel.app`

**Support Contacts:**
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- Sentry Support: support@sentry.io

---

## Rollback Instructions (if needed)

If something goes wrong:

**Revert to Previous Vercel Deployment:**
1. Go to Vercel → Deployments
2. Find last successful deployment
3. Click its menu → "Redeploy"
4. Wait for build to complete

**Clear Supabase & Restart:**
```sql
-- Delete all scan records
DELETE FROM trend_scans;

-- Verify table is empty
SELECT COUNT(*) FROM trend_scans;
```

**Force Rebuild:**
```powershell
# Push a new commit to trigger Vercel rebuild
git add .
git commit -m "Trigger rebuild"
git push
```
