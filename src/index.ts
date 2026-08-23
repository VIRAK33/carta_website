export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://www.carta.org.kh',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
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
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://www.carta.org.kh',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
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
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://www.carta.org.kh',
          },
        }
      );
    }
  },
};
