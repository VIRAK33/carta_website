import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ebf5ff',
          100: '#d0e3ff',
          200: '#a9c7ff',
          300: '#82abff',
          400: '#5d90ff',
          500: '#3a76ff',
          600: '#295fc4',
          700: '#204899',
          800: '#18327a',
          900: '#112259',
          950: '#0a173a',
        },
      },
    },
  },
}
