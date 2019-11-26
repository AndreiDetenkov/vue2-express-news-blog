import axios from 'axios'
export default {
  state: {
    categories: []
  },
  mutations: {
    GET_CATEGORIES_SUCCESS(state, payload) {
      state.categories = payload
    }
  },
  actions: {
    GET_CATEGORIES({ commit, dispatch }) {
      return axios({
        method: 'GET',
        url: '/categories/list'
      })
        .then(response => {
          commit('GET_CATEGORIES_SUCCESS', response.data)
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
    viewCategories: state => {
      const array = []
      state.categories.map((item, index) => {
        array.push({
          idx: index + 1,
          id: item._id,
          title: item.title,
          parent: item.parentId ? item.parentId.title : null
        })
      })
      return array
    }
  }
}
