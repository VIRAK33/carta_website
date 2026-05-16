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
    const url = new URL(`https://cms-api.graphmining.dev/api/public/${CMS_SITE_ID}/slider`)
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })

    // Request only needed fields
    url.searchParams.append('fields', 'image')

    const response = await $fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-API-Key': CMS_API_KEY,
      },
    })

    return response
  } catch (error) {
    console.error('Error fetching slider from CMS:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch slider from CMS API',
    })
  }
})
