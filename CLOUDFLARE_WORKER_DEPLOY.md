# Deploy Cloudflare Worker - CMS Proxy

## Quick Start (5 minutes)

### Step 1: Install Wrangler CLI
```bash
npm install -g wrangler
# or
npm create cloudflare@latest cms-proxy -- --type=worker
cd cms-proxy
```

### Step 2: Create Worker Files

Copy these files to your Cloudflare Worker project:
- `wrangler.toml` - Configuration file
- `src/index.ts` - Worker code

Or replace them if already exists.

### Step 3: Add API Key as Secret
```bash
npx wrangler secret put CMS_API_KEY
# Paste your CMS API key when prompted
```

The API key is:
```
sk_live_xxxxxxxxxxxxxxxx  # Your actual key
```

### Step 4: Test Locally (Optional)
```bash
npx wrangler dev
# Worker runs at: http://localhost:8787
# Test: curl "http://localhost:8787/api/news"
```

### Step 5: Deploy to Production
```bash
npx wrangler deploy
```

✅ Your worker is now live at:
```
https://carta-cms-proxy.seamvirak55.workers.dev
```

## Test the Worker

Visit this URL in browser (replace YOUR_WORKER_URL):
```
https://carta-cms-proxy.seamvirak55.workers.dev/api/news?limit=3
https://carta-cms-proxy.seamvirak55.workers.dev/api/slider?fields=image
```

You should get JSON responses from the CMS API.

## What the Worker Does

✅ Proxies requests from frontend to CMS API
✅ Adds X-API-Key header server-side (secure)
✅ Handles CORS preflight requests
✅ Caches responses for 5 minutes (performance)
✅ Restricts origin to your domain only

## Update Frontend Code

Once worker is deployed, update API URLs in these files:

### pages/index.vue
```typescript
// OLD:
const { data: newsResponse, pending } = useFetch(
  `https://cms-api.graphmining.dev/api/public/${CMS_SITE_ID}/news`,
  { headers: { 'X-API-Key': config.public.CMS_API_KEY } }
)

// NEW:
const { data: newsResponse, pending } = useFetch(
  `https://carta-cms-proxy.seamvirak55.workers.dev/api/news`,
  { params: { page: 1, limit: 3, fields: '...' } }
)
```

Replace these URLs:
- `https://cms-api.graphmining.dev/api/public/1e549040-d9a9-4567-b65e-09d313f1fd81/news`
- With: `https://carta-cms-proxy.seamvirak55.workers.dev/api/news`

And remove the headers with X-API-Key (worker handles it now).

## Environment Variables

No need to expose CMS_API_KEY in frontend anymore!

Remove from `.env`:
```
NUXT_PUBLIC_CMS_API_KEY=sk_live_xxx  # ❌ DELETE THIS
```

The key is now stored securely in the Cloudflare Worker.

## Troubleshooting

### Worker not responding
- Check logs: `npx wrangler tail`
- Verify API key is set: `npx wrangler secret list`
- Test locally: `npx wrangler dev`

### CORS still failing
- Make sure origin in worker matches your domain: `https://www.carta.org.kh`
- Check browser console for exact error
- Verify worker is deployed: `npx wrangler deployments list`

### Cache not working
- Clear browser cache (Ctrl+Shift+Delete)
- Check Cache-Control header: `max-age=300` (5 min)
- Purge cache: Go to Cloudflare Dashboard → Purge Cache

## Security Benefits

✅ API key never exposed in frontend code
✅ CORS restricted to your domain only
✅ DDoS protection (Cloudflare edge)
✅ Rate limiting (if configured)
✅ Request logging (if configured)

## Next Steps

1. Deploy this worker
2. Get your worker URL
3. Tell me the URL
4. I'll update all frontend API calls
5. Rebuild and redeploy static files
