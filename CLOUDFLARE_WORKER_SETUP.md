# Cloudflare Worker Setup Guide

## Overview
This Cloudflare Worker proxies requests to the CMS API and handles authentication, avoiding CORS issues on static deployment.

## Deploy to Cloudflare Workers

### Step 1: Create Cloudflare Workers Account
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sign in or create account
3. Navigate to **Workers & Pages** → **Create application**

### Step 2: Create New Worker
1. Click **Create Worker**
2. Name it something like `carta-cms-proxy`
3. Click **Deploy**

### Step 3: Deploy the Code
1. After deployment, click **Edit code**
2. Replace the default code with contents of `cloudflare-worker.js`
3. Click **Save and Deploy**

### Step 4: Add Environment Variable
1. Go to your Worker settings
2. Click **Settings** → **Environment variables**
3. Add a new variable:
   - **Variable name**: `CMS_API_KEY`
   - **Value**: Your CMS API Key (the actual key value)
4. Click **Save**

### Step 5: Get Your Worker URL
After deployment, your worker will be available at:
```
https://carta-cms-proxy.{your-account}.workers.dev
```

Example (yours will be different):
```
https://carta-cms-proxy.seamvirak55.workers.dev
```

## Test the Worker

Visit this URL in your browser to test:
```
https://your-worker-url.workers.dev/api/slider?fields=image
```

You should get a JSON response from the CMS API.

## Update Frontend Code

Once you have your worker URL, provide it to update all API calls:
- Replace `https://cms-api.graphmining.dev/api/public/1e549040-d9a9-4567-b65e-09d313f1fd81/news`
- With: `https://your-worker-url.workers.dev/api/news`

## How It Works

1. Browser makes request to Cloudflare Worker (no auth header needed)
2. Worker adds X-API-Key header server-side
3. Worker requests CMS API
4. Worker returns response with CORS headers
5. Browser receives data successfully

This approach:
✅ Avoids CORS issues
✅ Keeps API key secure (not exposed in frontend code)
✅ Works with static deployment
✅ Caches responses for 1 hour
