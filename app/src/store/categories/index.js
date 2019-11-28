import axios from 'axios'
export default {
  state: {
    categories: [],
    parentCategories: [],
    loading: false
  },
  mutations: {
    GET_CATEGORIES_SUCCESS(state, payload) {
      state.categories = payload
    },
    GET_PARENT_CATEGORIES_SUCCESS(state, payload) {
      state.parentCategories = payload
    },
    LOADING(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    GET_CATEGORIES({ commit, dispatch }) {
      commit('LOADING', true)
      return axios({
        method: 'GET',
        url: '/categories/list'
      })
        .then(response => {
          commit('GET_CATEGORIES_SUCCESS', response.data)
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
    GET_PARENT_CATEGORIES({ commit, dispatch }) {
      return axios({
        method: 'GET',
        url: '/categories/parent/list'
      })
        .then(response => {
          commit('GET_PARENT_CATEGORIES_SUCCESS', response.data)
        })
        .catch(error => {
          dispatch('NOTIFICATION', {
            open: true,
            color: 'error',
            text: error.response.data.message
          })
        })
    },
    CREATE_CATEGORY({ dispatch }, { title, parentId }) {
      return axios({
        method: 'POST',
        url: '/categories/add',
        data: { title, parentId }
      })
        .then(response => {
          dispatch('GET_CATEGORIES')
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
    REMOVE_CATEGORY({ dispatch }, { id }) {
      return axios({
        method: 'DELETE',
        url: `/categories/remove/${id}`
      })
        .then(response => {
          dispatch('GET_CATEGORIES')
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
    EDIT_CATEGORY({ dispatch }, { id, title, parentId }) {
      return axios({
        method: 'PUT',
        url: `/categories/update/${id}`,
        data: { title, parentId }
      })
        .then(response => {
          dispatch('GET_CATEGORIES')
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
    viewCategories: state => {
      const array = []
      state.categories.map((item, index) => {
        array.push({
          idx: index + 1,
          id: item._id,
          title: item.title,
          parent: item.parentId ? item.parentId.title : null,
          parentId: item.parentId ? item.parentId._id : null
        })
      })
      return array
    },
    viewParentCategories: state => {
      const array = []
      state.parentCategories.map(item => {
        array.push({ id: item._id, title: item.title })
      })
      array.unshift({ id: null, title: 'none' })
      return array
    }
  }
}
