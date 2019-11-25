import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const theme = {
  themes: {
    light: {
      accent: '#039BE5',
      secondary: '#e0e0e0'
    }
  },
  icons: {
    iconfont: 'mdi'
  }
}

export default new Vuetify({
  theme
})
