import axios from 'axios'
import router from '@/router'

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    LOGOUT_SUCCESS(state) {
      sessionStorage.clear()
      router.push({ path: '/' })
      state.userinfo = {}
    },
    GET_USER_INFO_SUCCESS(state, payload) {
      state.userInfo = payload[0]
    }
  },
  actions: {
    LOGIN({ dispatch }, { username, password }) {
      return axios({
        method: 'POST',
        url: '/admin/login',
        data: { username, password }
      })
        .then(async response => {
          sessionStorage.setItem('token', response.data.token)
          await dispatch('GET_USER_INFO')
          router.push({ path: '/admin' })
        })
        .catch(error => {
          dispatch('NOTIFICATION', {
            open: true,
            color: 'error',
            text: error.response.data.message
          })
        })
    },
    LOGOUT({ commit, dispatch }) {
      axios({
        method: 'DELETE',
        url: '/admin/logout'
      })
        .then(response => {
          commit('LOGOUT_SUCCESS')
          dispatch('NOTIFICATION', { open: true, color: 'success', text: response.data.message })
        })
        .catch(error => {
          dispatch('NOTIFICATION', {
            open: true,
            color: 'error',
            text: error.response.data.message
          })
        })
    },
    SIGNUP({ dispatch }, { username, password, password2, role }) {
      return axios({
        method: 'POST',
        url: '/users/create',
        data: { username, password, password2, role }
      })
        .then(response => {
          dispatch('NOTIFICATION', { open: true, color: 'success', text: response.data.message })
        })
        .catch(error => {
          dispatch('NOTIFICATION', {
            open: true,
            color: 'error',
            text: error.response.data.message
          })
        })
    },
    GET_USER_INFO({ commit, dispatch }) {
      return axios({
        method: 'GET',
        url: '/users/get-info'
      })
        .then(response => {
          commit('GET_USER_INFO_SUCCESS', response.data)
        })
        .catch(error => {
          dispatch('NOTIFICATION', {
            open: true,
            color: 'error',
            text: error.response.data.message
          })
        })
    }
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo
    },
    getMenu: state => {
      let result
      const items = [
        { icon: 'dashboard', title: 'Dashboard', link: '/admin', exact: true, role: 'user' },
        { icon: 'view_list', title: 'News', link: '/admin/news', role: 'user' },
        { icon: 'category', title: 'Categories', link: '/admin/categories' },
        { icon: 'supervisor_account', title: 'Users', link: '/admin/users' }
      ]

      state.userInfo.role === 'user' ? (result = items.filter(el => el.role === 'user')) : (result = items)
      return result
    }
  }
}
