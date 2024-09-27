import { defineStore } from 'pinia'

interface ILocaleState {}

export const useLocaleStore = defineStore('localeStore', {
  state: (): ILocaleState => ({
    locale: 'en',
  }),
  actions: {
    onSetLocale(newLocale: string): void {
      this.locale = newLocale
    },
  },
  persist: {
    storage: sessionStorage,
    pick: ['locale'],
  },
})
