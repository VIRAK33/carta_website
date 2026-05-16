export interface INews {
  id: string
  data: NewsData
  createdAt: string
  updatedAt: string
}

export interface NewsData {
  thumbnail: string
  title: string
  slug: string
  short_content: string
  content: string
  gallery: string[]
}

export interface NewsResponse {
  success: boolean
  data: INews[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface Medum {
  order: number
  image: string
}
