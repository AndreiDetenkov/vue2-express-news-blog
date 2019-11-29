import axios from 'axios'

export default {
  state: {
    news: []
  },
  mutations: {
    GET_NEWS_SUCCESS(state, payload) {
      state.news = payload
    }
  },
  actions: {
    GET_NEWS({ commit, dispatch }) {
      return axios({
        method: 'GET',
        url: '/news/list'
      })
        .then(response => {
          commit('GET_NEWS_SUCCESS', response.data)
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
    getNews: state => {
      console.log('news: ', state.news)
      return state.news
    }
  }
}
