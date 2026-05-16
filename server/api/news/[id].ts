export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const CMS_API_KEY = config.public.CMS_API_KEY
  const CMS_SITE_ID = '1e549040-d9a9-4567-b65e-09d313f1fd81'
  const slug = getRouterParam(event, 'id')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'News slug is required',
    })
  }

  if (!CMS_API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'CMS_API_KEY not configured',
    })
  }

  try {
    const url = new URL(`https://cms-api.graphmining.dev/api/public/${CMS_SITE_ID}/news`)
    url.searchParams.append('limit', '100')
    // Request fields for both languages
    url.searchParams.append('fields', 'thumbnail,title,title_km,short_content,short_content_km,content,content_km,slug,gallery')

    const response = await $fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-API-Key': CMS_API_KEY,
      },
    })

    // Find the news item with matching slug
    const newsItem = response.data?.find((item: any) => item.data?.slug === slug)

    if (!newsItem) {
      throw createError({
        statusCode: 404,
        statusMessage: 'News article not found',
      })
    }

    return {
      success: true,
      data: newsItem,
    }
  } catch (error) {
    console.error(`Error fetching news with slug ${slug}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch news details',
    })
  }
})
