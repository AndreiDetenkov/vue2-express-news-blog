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
    LOGIN({ commit }, { username, password }) {
      return axios({
        method: 'POST',
        url: '/admin/login',
        data: { username, password }
      })
        .then(response => {
          commit('LOGIN_SUCCESS', response.data)
        })
        .catch(error => {
          console.log(error)
          commit('LOGIN_ERROR', error.response.data.error)
        })
    },
    LOGOUT({ commit }) {
      axios({
        method: 'DELETE',
        url: '/admin/logout'
      })
        .then(response => {
          commit('LOGOUT_SUCCESS', response.data)
        })
        .catch(error => {
          console.log(error)
          commit('LOGOUT_ERROR', error.response.data.error)
        })
    }
  },
  getters: {}
}
