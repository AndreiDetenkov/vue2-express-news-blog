import moment from 'moment'

export default {
  viewNews: state => {
    const n = []
    state.news.map((item, index) => {
      n.push({
        idx: index + 1,
        id: item._id,
        title: item.title,
        description: item.description,
        date: moment(item.date).format('LL'),
        noFormatDate: item.date,
        image: item.imageName,
        category: item.categoryId ? item.categoryId.title : null,
        categoryId: item.categoryId ? item.categoryId._id : null,
        username: item.userId ? item.userId.username : null,
        userId: item.userId ? item.userId._id : null
      })
    })
    return n
  },
  getNewsLoading: state => state.loading,
  getLatestNews: state => {
    const n = []
    state.latestNews.map(item => {
      n.push({
        id: item._id,
        title: item.title,
        description: item.description,
        date: moment(item.date).format('LL'),
        image: item.imageName,
        category: item.categoryId ? item.categoryId.title : null,
        username: item.userId ? item.userId.username : null
      })
    })
    return n
  },
  getNewsByCategories: state => category => {
    return state.news.filter(item => item.categoryId.title === category).splice(0, 3)
  }
}
