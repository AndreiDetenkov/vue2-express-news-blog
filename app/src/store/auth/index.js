import axios from 'axios'
import router from '@/router'

export default {
  state: {},
  mutations: {
    LOGIN_SUCCESS(state, payload) {
      sessionStorage.setItem('token', payload.token)
      router.push({ path: '/admin' })
    },
    LOGOUT_SUCCESS() {
      sessionStorage.clear()
      router.push({ path: '/' })
    }
  },
  actions: {
    LOGIN({ commit, dispatch }, { username, password }) {
      return axios({
        method: 'POST',
        url: '/admin/login',
        data: { username, password }
      })
        .then(response => {
          commit('LOGIN_SUCCESS', response.data)
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
    }
  }
}
