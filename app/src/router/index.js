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
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
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
