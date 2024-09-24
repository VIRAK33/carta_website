export interface INews {
  slug: string
  title: string
  short_description: string
  thumbnail: string
  content: string
  category_slug: string
  category_name: string
  created_by: string
  created_date: string
  media: Medum[]
}

export interface Medum {
  order: number
  image: string
}
