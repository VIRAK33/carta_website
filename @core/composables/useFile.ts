export const usePathImageUrl = (
  path: string,
  size: string = 'medium'
): string => {
  const $config = useRuntimeConfig()
  return `${$config.public.API_URL}/media/files/${size}/${path}`
}
