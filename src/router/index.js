import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Posts from '@/components/Posts'
import Ask from '@/components/Ask'
import SignUp from '@/components/SignUp'
import ConfirmSignUp from '@/components/ConfirmSignUp'
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'
import ChangePassword from '@/components/ChangePassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Home
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
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/confirmSignUp',
      name: 'ConfirmSignUp',
      component: ConfirmSignUp
    },
    {
      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/newpassword',
      name: 'NewPassword',
      component: ChangePassword
    }
  ]
})
