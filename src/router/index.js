import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const SearchListPage = () => import('@/components/middle_box/router_views/search_list_page/SearchListPage')
const Top100Page = () => import('@/components/middle_box/router_views/top100_page/Top100Page')
const MarkedListPage = () => import('@/components/middle_box/router_views/marked_list_page/MarkedListPage')

const routes = [
  {
    path: '',
    redirect: '/Top100Page'
  },
  {
    path: '/SearchListPage',
    component: SearchListPage
  },
  {
    path: '/Top100Page',
    component: Top100Page
  },
  {
    path: '/MarkedListPage',
    component: MarkedListPage
  }
]

const router = new VueRouter({
  routes
})

export default router
