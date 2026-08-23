const ALLOWED_ORIGINS = new Set([
  'https://www.carta.org.kh',
  'https://carta.org.kh',
  'https://carta-4vz.pages.dev',
  'http://localhost:3000',
  'http://localhost:5173',
]);

function resolveCorsOrigin(origin: string | null): string {
  if (origin) {
    // Allow the Cloudflare Pages project (production + any deployment/preview subdomains)
    if (origin === 'https://carta-4vz.pages.dev' || origin.endsWith('.carta-4vz.pages.dev')) {
      return origin;
    }
    if (ALLOWED_ORIGINS.has(origin)) {
      return origin;
    }
  }
  return 'https://www.carta.org.kh';
}

function corsHeaders(origin: string | null, extra: Record<string, string> = {}): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': resolveCorsOrigin(origin),
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...extra,
  };
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    // Only allow /api/* paths
    if (!url.pathname.startsWith('/api/')) {
      return new Response('Not found', { status: 404 });
    }

    const CMS_SITE_ID = '1e549040-d9a9-4567-b65e-09d313f1fd81';
    const CMS_API_BASE = 'https://cms-api.graphmining.dev/api/public';

    // Extract collection name from path: /api/news -> news
    const pathParts = url.pathname.replace('/api/', '').split('/');
    const collection = pathParts[0];

    // Build CMS API URL
    const cmsUrl = new URL(
      `${CMS_API_BASE}/${CMS_SITE_ID}/${collection}${url.search}`,
      'https://cms-api.graphmining.dev'
    );

    try {
      const response = await fetch(cmsUrl.toString(), {
        method: request.method,
        headers: {
          'X-API-Key': env.CMS_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: request.method !== 'GET' ? await request.text() : undefined,
      });

      const data = await response.text();

      // Return with proper CORS headers
      return new Response(data, {
        status: response.status,
        headers: corsHeaders(origin, {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        }),
      });
    } catch (error) {
      console.error('Proxy error:', error);
      return new Response(
        JSON.stringify({
          error: 'Proxy request failed',
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: corsHeaders(origin, { 'Content-Type': 'application/json' }),
        }
      );
    }
  },
};
