export default {
  GET_NEWS_SUCCESS(state, payload) {
    state.news = payload
  },
  LOADING(state, payload) {
    state.loading = payload
  },
  GET_LATEST_NEWS_SUCCESS(state, payload) {
    state.latestNews = payload
    state.errors.getLatestNews = null
  },
  GET_LATEST_NEWS_ERROR(state, error) {
    state.errors.getLatestNews = error
  }
}
