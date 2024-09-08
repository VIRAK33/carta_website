export interface IMenuItem {
  value: string
  title: string
  path?: string
  icon?: string
  children?: Array<IMenuItem>
}

export interface IAppState {
  appName: string
  menus: Array<IMenuItem>
  navbarHeight: number | string
  loading: boolean
  activeDrawer: boolean
}

export const useAppConfigStore = defineStore('appStore', {
  state: (): IAppState => ({
    appName: process.env.APP_NAME ?? '',
    menus: [
      {
        value: 'about',
        title: 'About',
      },
      {
        value: 'our-committees',
        title: 'Our Committees',
      },
      {
        value: 'members',
        title: 'Members',
      },
      {
        value: 'news-events',
        title: 'News & Events',
      },
      {
        value: 'library',
        title: 'Library',
        children: [
          { value: 'photos', title: 'Photos', icon: 'material-symbols:photo-prints' },
          { value: 'videos', title: 'Videos', icon: 'material-symbols:video-library-rounded' },
        ],
      },
    ],
    navbarHeight: 0,
    loading: false,
    activeDrawer: false,
  }),
  actions: {
    onUpdateLoading(value: boolean): void {
      this.loading = value
    },
    onUpdateActiveDrawer(value: boolean): void {
      this.activeDrawer = value
    },
    onToggleActiveDrawer(): void {
      this.activeDrawer = !this.activeDrawer
    },
  },
})
