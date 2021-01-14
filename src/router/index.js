import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const SearchPage = () => import('@/components/middle_box/router_views/search_page/SearchPage')
const DiscoverPage = () => import('@/components/middle_box/router_views/discover_page/DiscoverPage')
const LikedPage = () => import('@/components/middle_box/router_views/liked_page/LikedPage')
const LyricPage = () => import('@/components/middle_box/router_views/lyric_page/LyricPage')
const MarkPage = () => import('@/components/middle_box/router_views/mark_page/MarkPage')

const routes = [
  {
    path: '/DiscoverPage',
    component: DiscoverPage,
  },
  {
    path: '/SearchPage',
    component: SearchPage
  },
  {
    path: '/LikedPage',
    component: LikedPage
  },
  {
    path: '/LyricPage',
    component: LyricPage
  },
  {
    path: '/MarkPage',
    component: MarkPage
  }
]

const router = new VueRouter({
  routes,
})

export default router
