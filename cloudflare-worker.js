/**
 * Cloudflare Worker - CMS API Proxy
 *
 * This worker proxies requests to the CMS API and adds authentication headers.
 * Deploy to Cloudflare Workers and use the URL in your frontend.
 *
 * Usage: https://your-worker.workers.dev/api/news
 */

export default {
  async fetch(request, env, ctx) {
    // Get the API path from the request URL
    const url = new URL(request.url);
    const pathname = url.pathname;
    const search = url.search;

    // Extract the CMS API path (remove /api prefix if present)
    let cmsPath = pathname;
    if (cmsPath.startsWith('/api')) {
      cmsPath = cmsPath.slice(4); // Remove '/api' prefix
    }

    // Build the CMS API URL
    const cmsApiUrl = `https://cms-api.graphmining.dev/api/public/1e549040-d9a9-4567-b65e-09d313f1fd81${cmsPath}${search}`;

    console.log('Proxying request to:', cmsApiUrl);

    try {
      // Make the request to CMS API with authentication
      const response = await fetch(cmsApiUrl, {
        method: request.method,
        headers: {
          'X-API-Key': env.CMS_API_KEY || '', // Use environment variable
          'Content-Type': 'application/json',
        },
        body: request.method !== 'GET' ? request.body : undefined,
      });

      // Clone the response and add CORS headers
      const responseBody = await response.text();

      return new Response(responseBody, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      });
    } catch (error) {
      console.error('Proxy error:', error);
      return new Response(
        JSON.stringify({ error: 'Proxy request failed', details: error.message }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};
