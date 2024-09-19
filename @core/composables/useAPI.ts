// composables/useAPI.ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface ApiOptions {
  method: HttpMethod
  url: string
  data?: any // For POST/PUT/PATCH requests
  params?: any // For query parameters
  headers?: any // Additional headers if needed
}

export const useAPI = <T>({
  method,
  url,
  data,
  params,
  headers,
}: ApiOptions) => {
  const { $axios } = useNuxtApp()

  const fetchData = async () => {
    try {
      const response = await $axios.request<T>({
        method,
        url,
        data, // Body for POST, PUT, PATCH
        params, // Query parameters for GET, DELETE
        headers, // Additional headers
      })
      return response.data
    } catch (error) {
      throw createError({
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'API request failed',
      })
    }
  }

  return useAsyncData<T>(() => fetchData())
}
