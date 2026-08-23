export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const CMS_API_KEY = config.public.CMS_API_KEY
  const CMS_SITE_ID = '1e549040-d9a9-4567-b65e-09d313f1fd81'
  const query = getQuery(event)

  if (!CMS_API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'CMS_API_KEY not configured',
    })
  }

  try {
    const url = new URL(`https://cms-api.graphmining.dev/api/public/${CMS_SITE_ID}/news`)
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })

    // Request fields for both languages
    url.searchParams.append('fields', 'thumbnail,title,title_km,short_content,short_content_km,slug')

    const response = await $fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-API-Key': CMS_API_KEY,
      },
    })

    return response
  } catch (error) {
    console.error('Error fetching news from CMS:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch news from CMS API',
    })
  }
})
