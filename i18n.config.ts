import en from './locales/en.yml'
import km from './locales/km.yml'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'km',
  messages: {
    en,
    km,
  },
}))
