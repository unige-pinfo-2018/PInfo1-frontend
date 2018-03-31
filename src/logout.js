import Vue from 'vue'
import Router from 'vue-router'
import App from '@/views/App.vue'
import Callback from '@/views/Callback.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    }
  ]
})

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if (to.name !== 'callback') { // check if "to"-route is "callback" and allow access
    next()
  } else if (!router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
    router.app.$auth.logout()
  }
})

export default router
