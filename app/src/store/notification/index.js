export default {
  state: {
    open: false,
    text: '',
    color: ''
  },
  mutations: {
    NOTIFICATION(state, data) {
      state.open = data
    },
    NOTIFICATION_INFO(state, data) {
      state.text = data.text
      state.color = data.color
    }
  },
  actions: {
    NOTIFICATION({ commit }, data) {
      commit('NOTIFICATION', data.open)
      commit('NOTIFICATION_INFO', {
        text: data.text,
        color: data.color
      })
    }
  }
}
