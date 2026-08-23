import { defineStore } from 'pinia'
import type { INews } from '~/types/INews'

export const useNewsStore = defineStore('news', () => {
  const selectedNews = ref<INews | null>(null)

  const setSelectedNews = (news: INews) => {
    selectedNews.value = news
  }

  const getSelectedNews = () => {
    return selectedNews.value
  }

  const clearSelectedNews = () => {
    selectedNews.value = null
  }

  return {
    selectedNews,
    setSelectedNews,
    getSelectedNews,
    clearSelectedNews,
  }
})
