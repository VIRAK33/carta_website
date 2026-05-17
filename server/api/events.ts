export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  try {
    const url = new URL('https://web-api.carta.org.kh/api/events')
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })

    const response = await $fetch(url.toString(), { method: 'GET' })

    return response
  } catch (error) {
    console.error('Error fetching events:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch events',
    })
  }
})
