import Vue from 'vue'
import Router from 'vue-router'
import Particles from '@/components/Particles'
import Profile from '@/components/Profile'
import Posts from '@/components/Posts'
import Ask from '@/components/Ask'
import Logout from '@/components/Logout'
import Login from '@/components/Login'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Router)
Vue.use(Buefy)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Particles
    },
    {
      path: '/profile',
      name: 'MyProfile',
      component: Profile
    },
    {
      path: '/posts',
      name: 'LatestPosts',
      component: Posts
    },
    {
      path: '/ask',
      name: 'AskQuestion',
      component: Ask
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
