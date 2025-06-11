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
import VueQrcodeReader from 'vue-qrcode-reader'

// Global Styles
import '../main.scss'

// Axios
import axios from 'axios'

// Config
Vue.config.productionTip = false

// Use Plugins
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(JumbotronPlugin)
Vue.use(Vuelidate)
Vue.use(VueQrcodeReader)


if (process.env.NODE_ENV == 'development') {
  console.log("ok commit dev login")
  store.commit('DEV_LOGIN');
}
else { // Restore user session from localStorage if exists
  const userString = localStorage.getItem('user');
  if (userString) {
    const userData = JSON.parse(userString);
    store.commit('SET_USER_DATA', userData)
  }
}

// if using vuex injection option
// if (process.env.NODE_ENV === 'development') {
//   store.commit('DEV_LOGIN');
// }

// Axios interceptor for handling 401 (unauthorised API call) responses
axios.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status
    if (status === 401) {
      localStorage.removeItem('user')
      localStorage.removeItem('username')
      store.dispatch('logout') //Triggers LOGOUT mutation and optionally routing
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
    console.log("see if created", user)
    if (user) {
      store.commit('SET_USER_DATA', JSON.parse(user))
    }
  },
  render: h => h(App)
}).$mount('#app')

