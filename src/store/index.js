import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isNewUser: true
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('username', userData.user.name) // for easier fetch, no need dig in user obj
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    },
    DEV_LOGIN(state) { // main.js can call
      const devUser = {
        user: {
          name: 'John Doe',
          email: 'dev@gmail.com',
          password: 'dev123',
          id: 'staff-123456'
        },
        token: 'dummy-token-123' // should have get from the axios
      };
      state.user = devUser;
      state.username = devUser.user.name
      state.userId = devUser.user.id
      localStorage.setItem('user', JSON.stringify(state.user))
      localStorage.setItem('username', state.username)
      localStorage.setItem('userId', state.userId)
      axios.defaults.headers.common['Authorization'] = `Bearer ${devUser.token}`;
      // console.log("dev login from store")

    },
    LOGOUT(state) {
      state.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('username')
      console.log(localStorage)
      delete axios.defaults.headers.common['Authorization']
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser
    }
  },
  actions: {
    register({ commit }, credentials) {
      return axios.post(`${process.env.VUE_APP_ROOT_API}/user/register`, credentials)
        .then(({ data }) => {
          if (data.user.verify) {
            commit('SET_USER_DATA', data)
          }
        })
    },
    // login({ commit }, credentials) {
    //   return axios.post(`${process.env.VUE_APP_ROOT_API}/user/login`, credentials)
    //     .then(({ data }) => {
    //       commit('SET_USER_DATA', data)
    //     })

    // },
    login({ commit }, credentials) {
      if (credentials.email === 'dev@gmail.com' && credentials.password === 'dev123') {
        commit('DEV_LOGIN', credentials)
        return Promise.resolve() // to keep it consistent
      } else {
        return Promise.reject({ response: { data: { error: 'Invalid credentials' } } })
      }
    },
    logout({ commit }) {
      commit('LOGOUT')
      // return axios.get(`${process.env.VUE_APP_ROOT_API}/user/logout`)
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  },
  modules: {}
})