export interface IMenuItem {
  value: string
  title: string
  path?: string
  icon?: string
  route?: string
  children?: Array<IMenuItem>
}

export interface IAppState {
  menus: Array<IMenuItem>
  navbarHeight: number | string
  loading: boolean
  activeDrawer: boolean
}

export const useAppConfigStore = defineStore('appStore', {
  state: (): IAppState => ({
    menus: [
      {
        value: 'about',
        route: 'about',
        title: 'About',
      },
      {
        value: 'our-committees',
        route: 'our-committees',
        title: 'Our Committees',
      },
      {
        value: 'members',
        route: 'members',
        title: 'Members',
      },
      {
        value: 'news-events',
        route: 'news',
        title: 'News & Events',
      },
      {
        value: 'library',
        route: 'library',
        title: 'Library',
        children: [
          {
            value: 'library-photos',
            route: 'library-photos',
            title: 'Photos',
            icon: 'material-symbols:photo-prints',
          },
          // {
          //   value: 'videos',
          //   title: 'Videos',
          //   icons: 'material-symbols:video-library-rounded',
          // },
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
