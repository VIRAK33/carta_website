# CMS API Analysis & Solutions

## Current Architecture

### Content Weaver CMS
- **Type**: React + TypeScript + Lovable project
- **Frontend**: `/Users/virak/Documents/carta/content-weaver`
- **Location**: Deployed at `https://cms.graphmining.dev`
- **Backend**: Cloudflare Workers (uses `VITE_API_URL` env variable)
- **Internal API**: Uses Bearer token auth with `/api/collections`, `/api/items`, etc.

### Carta Website
- **Type**: Nuxt 3 project
- **Location**: `/Users/virak/Documents/carta`
- **Dev Server**: `http://localhost:3000`

## The Problem

The endpoint `https://cms.graphmining.dev/api/public/1e549040-d9a9-4567-b65e-09d313f1fd81/news` returns **HTML dashboard** instead of JSON because:

1. ❌ **No public API endpoint exists** at that path on the CMS
2. ❌ The CMS frontend doesn't expose a public data API
3. ❌ The internal API requires authentication with Bearer tokens

The API structure you were provided appears to be **documentation for a planned feature** rather than an actual implemented endpoint.

## Available Solutions

### Solution 1: Create a Cloudflare Worker Proxy (Recommended)
Create a Cloudflare Worker that:
- Fetches data from the CMS admin API (with authentication)
- Exposes it as a public JSON endpoint
- Handles CORS for browser requests
- No authentication required for reads

**Advantages**:
- ✅ Separates public data API from admin API
- ✅ Can add caching for performance
- ✅ Rate limiting possible
- ✅ This is what you were using before (`cms-proxy.seamvirak55.workers.dev`)

**Implementation**:
```javascript
// Cloudflare Worker
export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    // Fetch from CMS admin API (you'll need admin credentials)
    const response = await fetch(
      `https://cms.graphmining.dev/api/items?collectionId=news&page=${page}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${ADMIN_API_KEY}`,
        }
      }
    );

    const data = await response.json();
    
    // Transform to public format
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};
```

### Solution 2: Add Public API to Content Weaver
Modify the CMS to add explicit public API endpoints:
- Add a new route `/api/public/collections/{id}/items`
- Require API key header instead of Bearer token
- Return published items only
- Add caching headers

**File to modify**: `content-weaver/src/services/api.ts`

### Solution 3: Use Mock Data During Development
Create a Nuxt API endpoint that returns mock news data:

```typescript
// server/api/news.ts
export default defineEventHandler(async () => {
  return {
    success: true,
    data: [
      {
        id: 'news-1',
        data: {
          title: 'Sample News',
          content: '<p>Sample content</p>',
          thumbnail: 'https://example.com/image.jpg',
          gallery: []
        },
        createdAt: new Date().toISOString(),
      }
    ],
    pagination: { page: 1, limit: 10, total: 1, totalPages: 1 }
  }
})
```

## Next Steps

**Option A (Quickest Fix):**
1. Recreate the Cloudflare Worker proxy you had before
2. Point Carta news pages to use that worker

**Option B (Recommended Long-term):**
1. Add public API endpoints to Content Weaver CMS
2. Update the CMS to support API key authentication
3. Document the public API

**Option C (For Development):**
1. Use mock data API routes in Nuxt
2. Later integrate with real CMS when public API is ready

## Questions to Answer

1. Do you have access to the Cloudflare Worker dashboard?
2. What's the admin API key/authentication for the CMS?
3. Is there a "news" or "articles" collection in the CMS?
4. Should the API require authentication or be completely public?
5. Do you want to restore the old worker (`cms-proxy.seamvirak55.workers.dev`)?

## Current Issue Status

Your Nuxt app is correctly configured to:
- ✅ Read API key from environment
- ✅ Use server-side proxying (no CORS issues)
- ✅ Format the data properly

But it's blocked by the missing public API endpoint on the CMS side.
