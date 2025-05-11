import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// BootstrapVue
import { BootstrapVue, IconsPlugin, JumbotronPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Plugins
import Vuelidate from 'vuelidate'
// import VueQrcodeReader from 'vue-qrcode-reader'

// Global Styles
import '../main.css'

// Axios
import axios from 'axios'

// Config
Vue.config.productionTip = false

// Use Plugins
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(JumbotronPlugin)
Vue.use(Vuelidate)
// Vue.use(VueQrcodeReader)

// Axios Interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status
    if (status === 401) {
      localStorage.removeItem('user')
      localStorage.removeItem('username')
      store.dispatch('logout')
    }
    return Promise.reject(error)
  }
)

// Create Vue instance
new Vue({
  router,
  store,
  created() {
    const user = localStorage.getItem('user')
    if (user) {
      store.commit('SET_USER_DATA', JSON.parse(user))
    }
  },
  render: h => h(App)
}).$mount('#app')

