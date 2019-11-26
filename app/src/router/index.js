import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'news',
    component: () => import('../views/News'),
    meta: { layout: 'news' }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth'),
    meta: { layout: 'empty' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin'),
    meta: { layout: 'admin' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
