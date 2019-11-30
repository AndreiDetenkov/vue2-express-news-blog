import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main'),
    meta: { layout: 'main' }
  },
  {
    path: '/news/:id',
    name: 'news-page',
    component: () => import('@/views/NewsPage'),
    props: true,
    meta: { layout: 'main' }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/Auth'),
    meta: { layout: 'empty' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin'),
    meta: { layout: 'admin' },
    beforeEnter: AuthGuard
  },
  {
    path: '/admin/news',
    name: 'news',
    component: () => import('@/views/News'),
    meta: { layout: 'admin' },
    beforeEnter: AuthGuard
  },
  {
    path: '/admin/categories',
    name: 'categories',
    component: () => import('@/views/Categories'),
    meta: { layout: 'admin' },
    beforeEnter: AuthGuard
  },
  {
    path: '/admin/users',
    name: 'users',
    component: () => import('@/views/Users'),
    meta: { layout: 'admin' },
    beforeEnter: AuthGuard
  }
]

function AuthGuard(to, from, next) {
  let token = sessionStorage.getItem('token')
  if (token) next()
  else next('/')
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
