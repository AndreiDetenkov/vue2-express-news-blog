import axios from 'axios'
import router from '../router/index'

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
          router.push({ path: '/login' })
          break
        case 500:
          alert('Error on server.')
          break
      }
      return Promise.reject(error)
    }
  )
}
