// composables/useImageOrientation.ts
export const useImageOrientation = (
  imageUrl: string
): Promise<'horizontal' | 'vertical' | 'square'> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      const { width, height } = img

      if (width > height) {
        resolve('horizontal')
      } else if (width < height) {
        resolve('vertical')
      } else {
        resolve('square')
      }
    }

    img.onerror = () => {
      // Instead of rejecting the promise on error, return a fallback value for error handling
      resolve('square') // Default to square if the image fails to load
    }
  })
}
