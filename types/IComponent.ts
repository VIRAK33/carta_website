export interface ICard {
  slug: string
  thumbnail: string
  title: string
  photos?: string[]
  created_date?: string
}

export interface IInfiniteLoadingState {
  loaded(): void

  complete(): void

  reset(): void
}

export enum ILocale {
  KM = 'km',
  EN = 'en',
}
