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
  },
  GET_NEWS_ITEM_SUCCESS(state, payload) {
    state.newsItem = payload
    state.errors.getNewsItem = null
  },
  GET_NEWS_ITEM_ERROR(state, error) {
    state.errors.getNewsItem = error
  }
}
