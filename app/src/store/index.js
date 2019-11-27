import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import notification from './notification'
import categories from './categories'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    notification,
    categories,
    users
  }
})
