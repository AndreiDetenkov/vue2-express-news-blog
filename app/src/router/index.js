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
