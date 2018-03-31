<!-- Author: @GiovannaTheo -->
<!-- This file contains the relevant functions and forms for the registration (sign up button) form -->
<template>
  <div>
    <v-btn outline color="indigo" v-on:click.native="loginToUniHub">Login</v-btn>
    <v-btn outline color="indigo" href="https://unihub.eu.auth0.com/v2/logout?returnTo=http://localhost:8080/">Logout</v-btn>
  </div>
</template>

<script>
import Vue from 'vue'
import App from '@/views/App.vue'
import router from '@/router'
export default {
  methods: {
    loginToUniHub () {
      var loginBox = new Vue({
        router,
        render: h => h(App)
      }).$mount('#app')
      loginBox.$destroy(true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
