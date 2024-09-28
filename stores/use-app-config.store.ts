import { defineStore } from 'pinia'

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

export const useAppConfigStore = defineStore('appStore', () => {
  const menus = ref<Array<IMenuItem>>([
    {
      value: 'about',
      route: 'about',
      title: 'menus.about',
    },
    {
      value: 'our-committees',
      route: 'our-committees',
      title: 'menus.our_committees',
    },
    {
      value: 'members',
      route: 'members',
      title: 'menus.members',
    },
    {
      value: 'news-events',
      route: 'news',
      title: 'menus.news_and_events',
    },
    {
      value: 'library',
      route: 'library',
      title: 'menus.library',
      children: [
        {
          value: 'library-photos',
          route: 'library-photos',
          title: 'menus.photos',
          icon: 'material-symbols:photo-prints',
        },
        // {
        //   value: 'videos',
        //   title: 'Videos',
        //   icons: 'material-symbols:video-library-rounded',
        // },
      ],
    },
  ])

  const navbarHeight = ref<number>(0)
  const loading = ref<boolean>(false)
  const activeDrawer = ref<boolean>(false)

  const onUpdateLoading = (value: boolean): void => {
    loading.value = value
  }

  const onUpdateActiveDrawer = (value: boolean): void => {
    activeDrawer.value = value
  }

  const onToggleActiveDrawer = (): void => {
    activeDrawer.value = !activeDrawer.value
  }

  const onSetNavbarHeight = ($value: number): void => {
    navbarHeight.value = $value
  }

  return {
    menus,
    navbarHeight,
    loading,
    activeDrawer,
    onUpdateLoading,
    onUpdateActiveDrawer,
    onToggleActiveDrawer,
    onSetNavbarHeight,
  }
})
