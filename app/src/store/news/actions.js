import axios from 'axios'

export default {
  GET_NEWS({ commit, dispatch }) {
    commit('LOADING', true)
    return axios({
      method: 'GET',
      url: '/news/list'
    })
      .then(response => {
        commit('GET_NEWS_SUCCESS', response.data)
        commit('LOADING', false)
      })
      .catch(error => {
        commit('LOADING', false)
        dispatch('NOTIFICATION', { open: true, color: 'error', text: error.response.data.message })
      })
  },
  CREATE_NEWS({ dispatch }, formData) {
    axios({
      method: 'POST',
      url: '/news/add',
      data: formData
    })
      .then(response => {
        dispatch('GET_NEWS')
        dispatch('NOTIFICATION', { open: true, color: 'success', text: response.data.message })
      })
      .catch(error => {
        dispatch('NOTIFICATION', { open: true, color: 'error', text: error.response.data.message })
      })
  },
  REMOVE_NEWS({ dispatch }, { id }) {
    return axios({
      method: 'DELETE',
      url: `/news/remove/${id}`
    })
      .then(response => {
        dispatch('GET_NEWS')
        dispatch('NOTIFICATION', { open: true, color: 'success', text: response.data.message })
      })
      .catch(error => {
        dispatch('NOTIFICATION', { open: true, color: 'error', text: error.response.data.message })
      })
  },
  EDIT_NEWS({ dispatch }, { formData, id }) {
    axios({
      method: 'PUT',
      url: `/news/update/${id}`,
      data: formData
    })
      .then(response => {
        dispatch('GET_NEWS')
        dispatch('NOTIFICATION', { open: true, color: 'success', text: response.data.message })
      })
      .catch(error => {
        dispatch('NOTIFICATION', { open: true, color: 'error', text: error.response.data.message })
      })
  },
  GET_LATEST_NEWS({ commit }) {
    axios({
      method: 'GET',
      url: '/news/latest'
    })
      .then(response => {
        commit('GET_LATEST_NEWS_SUCCESS', response.data)
      })
      .catch(error => {
        commit('GET_LATEST_NEWS_ERROR', error.response.data.message)
      })
  }
}
