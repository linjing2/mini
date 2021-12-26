import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const SearchPage = () => import('@/components/middle_box/router_views/search_page/SearchPage')
const DiscoverPage = () => import('@/components/middle_box/router_views/discover_page/DiscoverPage')
const LikedPage = () => import('@/components/middle_box/router_views/liked_page/LikedPage')
const LyricPage = () => import('@/components/middle_box/router_views/lyric_page/LyricPage')
const MyPage = () => import('@/components/middle_box/router_views/my_page/MyPage')
const LocalView = () => import('@/components/middle_box/router_views/my_page/local/LocalView')
const CloudView = () => import('@/components/middle_box/router_views/my_page/cloud/CloudView')
const MarkPage = () => import('@/components/middle_box/router_views/mark_page/MarkPage')
const SingerPage = () => import('@/components/middle_box/router_views/singer_page/SingerPage')
const AlbumPage = () => import('@/components/middle_box/router_views/album_page/AlbumPage')

const Appearance = () => import('@/components/setting/appearance/Appearance')
const Background = () => import('@/components/setting/appearance/background/Background')
const HighlightColor = () => import('@/components/setting/appearance/highlight_color/HighlightColor')
const Font = () => import('@/components/setting/appearance/font/Font')

const About = () => import('@/components/setting/about/About')
const AppInfo = () => import('@/components/setting/about/appinfo/AppInfo')
const CheckUpdate = () => import('@/components/setting/about/check_update/CheckUpdate')
const Development = () => import('@/components/setting/about/development/Development')

const routes = [
  {
    path: '/DiscoverPage',
    components: {
      nav: DiscoverPage
    }
  },
  {
    path: '/SearchPage',
    components: {
      nav: SearchPage
    }
  },
  {
    path: '/LikedPage',
    components: {
      nav: LikedPage
    }
  },
  {
    path: '/LyricPage',
    components: {
      nav: LyricPage
    }
  },
  {
    path: '/MyPage',
    components: {
      nav: MyPage
    },
    redirect:'/MyPage/Local',
    children: [
      {
        path: 'Local',
        components: {
          myView: LocalView
        }
      },
      {
        path: 'Cloud',
        components: {
          myView: CloudView
        }
      },
    ]
  },
  {
    path: '/MarkPage',
    components: {
      nav: MarkPage
    }
  },
  {
    path: '/SingerPage',
    components: {
      nav: SingerPage
    }
  },
  {
    path: '/AlbumPage',
    components: {
      nav: AlbumPage
    }
  },
  {
    path: '/Appearance',
    redirect:'/Appearance/Background',
    components: {
      settingView: Appearance
    },
    children: [
      {
        path: 'Background',
        components: {
          appearanceSettingView: Background
        }
      },
      {
        path: 'HighlightColor',
        components: {
          appearanceSettingView: HighlightColor
        }
      },
      {
        path: 'Font',
        components: {
          appearanceSettingView: Font
        }
      }
    ]
  },
  {
    path: '/About',
    redirect:'/About/AppInfo',
    components: {
      settingView: About
    },
    children: [
      {
        path: 'AppInfo',
        components: {
          aboutSettingView: AppInfo
        }
      },
      {
        path: 'CheckUpdate',
        components: {
          aboutSettingView: CheckUpdate
        }
      },
      {
        path: 'Development',
        components: {
          aboutSettingView: Development
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes,
})

export default router
