/**
 * Zero-dependency native date formatter to replace heavy moment.js (~300KB)
 */
export const formatDate = (
  dateInput: string | number | Date | null | undefined,
  format: 'MMM DD, YYYY' | 'MM-DD-YYYY' = 'MMM DD, YYYY'
): string => {
  if (!dateInput) return ''
  const d = new Date(dateInput)
  if (isNaN(d.getTime())) return ''

  if (format === 'MM-DD-YYYY') {
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const year = d.getFullYear()
    return `${month}-${day}-${year}`
  }

  // Default: 'MMM DD, YYYY' (e.g. "Sep 13, 2024")
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[d.getMonth()]
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${month} ${day}, ${year}`
}
