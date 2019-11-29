import axios from 'axios'
import moment from 'moment'

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
    viewNews: state => {
      const n = []
      state.news.map((item, index) => {
        n.push({
          idx: index + 1,
          id: item._id,
          title: item.title,
          description: item.description,
          date: moment(item.date).format('LL'),
          image: item.imagePath,
          category: item.categoryId ? item.categoryId.title : null,
          categoryId: item.categoryId ? item.categoryId._id : null,
          username: item.userId ? item.userId.username : null,
          userId: item.userId ? item.userId._id : null
        })
      })
      console.log('n: ', n)
      return n
    }
  }
}
