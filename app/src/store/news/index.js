import axios from 'axios'
import moment from 'moment'

export default {
  state: {
    news: [],
    loading: false
  },
  mutations: {
    GET_NEWS_SUCCESS(state, payload) {
      state.news = payload
    },
    LOADING(state, payload) {
      state.loading = payload
    }
  },
  actions: {
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
          dispatch('NOTIFICATION', {
            open: true,
            color: 'error',
            text: error.response.data.message
          })
        })
    },
    CREATE_NEWS({ dispatch }, formData) {
      return axios({
        method: 'POST',
        url: '/news/add',
        data: formData
      })
        .then(response => {
          dispatch('GET_NEWS')
          dispatch('NOTIFICATION', {
            open: true,
            color: 'success',
            text: response.data.message
          })
        })
        .catch(error => {
          dispatch('NOTIFICATION', {
            open: true,
            color: 'error',
            text: error.response.data.message
          })
        })
    },
    REMOVE_NEWS({ dispatch }, { id }) {
      console.log(id)
      return axios({
        method: 'DELETE',
        url: `/news/remove/${id}`
      })
        .then(response => {
          dispatch('GET_NEWS')
          dispatch('NOTIFICATION', {
            open: true,
            color: 'success',
            text: response.data.message
          })
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
    viewNews: state => {
      const n = []
      state.news.map((item, index) => {
        n.push({
          idx: index + 1,
          id: item._id,
          title: item.title,
          description: item.description,
          date: moment(item.date).format('LL'),
          image: item.imageName,
          category: item.categoryId ? item.categoryId.title : null,
          categoryId: item.categoryId ? item.categoryId._id : null,
          username: item.userId ? item.userId.username : null,
          userId: item.userId ? item.userId._id : null
        })
      })
      return n
    },
    getNewsLoading: state => state.loading
  }
}
