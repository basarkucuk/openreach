# OpenReach v1.0 — Deployment Guide
## Deploy to app.openreach.io via Vercel

---

### Prerequisites
- Node.js 18+ installed
- A [Vercel](https://vercel.com) account (free)
- openreach.io domain registered and DNS access

---

### Step 1 — Install & Build Locally

```bash
cd openreach-app
npm install
npm run build        # produces /dist folder
npm run preview      # optional: preview at localhost:4173
```

---

### Step 2 — Deploy to Vercel

**Option A — Vercel CLI (fastest)**

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts:
- Set up and deploy: **Y**
- Which scope: your account
- Link to existing project: **N**
- Project name: **openreach**
- Directory: **./** (current)

**Option B — GitHub (recommended for ongoing deploys)**

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "OpenReach v1.0"
   git remote add origin https://github.com/YOUR_USERNAME/openreach.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**

---

### Step 3 — Add Custom Domain (app.openreach.io)

1. In your Vercel project → **Settings → Domains**
2. Add domain: `app.openreach.io`
3. Vercel will show you a DNS record to add — copy it

**Then in your domain registrar (Namecheap / Porkbun / Cloudflare):**

Add a **CNAME record**:
| Type  | Host | Value                     | TTL  |
|-------|------|---------------------------|------|
| CNAME | app  | cname.vercel-dns.com      | Auto |

> If you're using Cloudflare, set the proxy to **DNS only** (grey cloud) initially.

4. Back in Vercel, click **Verify** — it turns green within minutes (up to 24h for propagation)

---

### Step 4 — SSL

Vercel provisions a free Let's Encrypt SSL certificate automatically once DNS is verified. Your app will be live at:

```
https://app.openreach.io
```

---

### Updating the App

Every time you push to `main` on GitHub, Vercel redeploys automatically. For manual updates:

```bash
vercel --prod
```

---

### Environment Variables (future)

When you add a real backend, set env vars in Vercel:
- **Settings → Environment Variables**
- Or via CLI: `vercel env add`

---

*OpenReach v1.0 — Built with React + Vite + Tailwind CSS*
