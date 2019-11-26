import axios from 'axios'
import router from '../router/index'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : '/'

export default function setup() {
  axios.interceptors.request.use(
    function(config) {
      let token = sessionStorage.getItem('token')
      if (token) config.headers['token'] = `${token}`
      return config
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      switch (error.response.status) {
        case 401:
          sessionStorage.removeItem('token')
          router.push({ path: '/auth' })
          break
        case 500:
          alert('Error on server.')
          break
      }
      return Promise.reject(error)
    }
  )
}
