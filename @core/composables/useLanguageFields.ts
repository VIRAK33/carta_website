export const useLanguageFields = () => {
  const { locale } = useI18n()

  const getFieldName = (baseField: string): string => {
    const suffix = locale.value === 'km' ? '_km' : ''
    return `${baseField}${suffix}`
  }

  const getNewsFields = (): string[] => {
    const suffix = locale.value === 'km' ? '_km' : ''
    return [
      `thumbnail`,
      `title${suffix}`,
      `short_content${suffix}`,
      `slug`,
    ]
  }

  const getFieldValue = (item: Record<string, any>, baseField: string): any => {
    const fieldName = getFieldName(baseField)
    return item[fieldName] || item[baseField]
  }

  return {
    locale: computed(() => locale.value),
    getFieldName,
    getNewsFields,
    getFieldValue,
  }
}
