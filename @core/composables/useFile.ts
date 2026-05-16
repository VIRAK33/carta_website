export const usePathImageUrl = (
  path: string,
  size: string = 'medium'
): string => {
  // If the path is already an absolute URL (starts with http:// or https://), return it as-is
  if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path
  }
  
  // Otherwise, prepend the base URL for relative paths
  return `https://ggas-api.ggas.edu.kh/media/files/${size}/${path}`
}
