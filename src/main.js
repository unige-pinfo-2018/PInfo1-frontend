// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/views/App.vue'
import Profile from '@/components/Profile.vue'
import Posts from '@/components/Posts.vue'
import SignUp from '@/components/SignUp.vue'
import Login from '@/components/Login.vue'
import Ask from '@/components/Ask.vue'
import Home from '@/components/Home.vue'
import ConfirmSignUp from '@/components/ConfirmSignUp.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'
import ChangePassword from '@/components/ChangePassword.vue'
import router from './router'
import VueParticles from 'vue-particles'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VueFormly from 'vue-formly'
import VueFormlyBuefy from 'vue-formly-buefy'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Buefy)
Vue.use(VueFormly)
Vue.use(VueFormlyBuefy)
Vue.use(VueParticles)
Vue.use(Vuex)
Vue.config.productionTip = false

// this sets axios properties so we can use it to do REST requests

window.axios = require('axios')

// Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application,
// with rules ensuring that the state can only be mutated in a predictable fashion.

const store = new Vuex.Store({
  state: {
    userIsLoggedIn: false,
    user: null,
    backgroundImagePath: require('./assets/bg.jpg')
  },
  mutations: { // possible transformations
    switch_background (state, image) {
      state.backgroundImagePath = image
    },
    setLoggedIn (state, isLoggedIn) {
      state.userIsLoggedIn = isLoggedIn
    },
    setUser (state, user) {
      state.user = user
    }
  }
})

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  components: {App, Posts, Profile, Login, SignUp, Home, Ask, ConfirmSignUp, ForgotPassword, ChangePassword},
  template: '<App/>'
})
