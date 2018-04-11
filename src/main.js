// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/views/App.vue'
import Profile from '@/components/Profile.vue'
import Posts from '@/components/Posts.vue'
import SignUp from '@/components/SignUp.vue'
import Login from '@/components/Login.vue'
import router from './router'
import VueParticles from 'vue-particles'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VueFormly from 'vue-formly'
import VueFormlyBuefy from 'vue-formly-buefy'

Vue.use(Buefy)
Vue.use(VueFormly)
Vue.use(VueFormlyBuefy)
Vue.use(VueParticles)
Vue.use(Vuex)
Vue.config.productionTip = false

// Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application,
// with rules ensuring that the state can only be mutated in a predictable fashion.

const store = new Vuex.Store({
  state: {
    backgroundImagePath: require('./assets/bg.jpg')
  },
  mutations: { // possible transformations
    switch_background (state, image) {
      state.backgroundImagePath = image
    }
  }
})

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  components: { App, Posts, Profile, Login, SignUp },
  template: '<App/>'
})
