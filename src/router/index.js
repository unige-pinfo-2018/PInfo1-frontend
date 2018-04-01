import Vue from 'vue'
import Router from 'vue-router'
import Particles from '@/components/Particles'
import ParticlesBlack from '@/components/ParticlesBlack'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Particles
    },
    {
      path: '/black',
      name: 'HomePageBlack',
      component: ParticlesBlack
    }
  ]
})
