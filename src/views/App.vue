<template>
  <section v-bind:style="{ background: 'url(' + this.$store.state.backgroundImagePath + ') no-repeat center center fixed' }"
           id="main-section" class="hero is-fullheight has-background">
    <div id="app" class="hero-body">
      <div class="container">
        <ul>
          <li class="one"><router-link to='/'>Search</router-link></li><!--
       --><li class="two"><router-link to='posts'>Latest posts</router-link></li><!--
       --><li class="three"><router-link to='ask'>Ask a question</router-link></li><!--
       --><li v-if="isAuthenticated()" v-on:click="logout" class="four"><router-link to='/'>Logout</router-link></li><!--
       --><li v-if="!isAuthenticated()" class="four"><router-link to='/login'>Login</router-link></li>
        <hr/>
        </ul>
        <router-view/>
      </div>
    </div>
    <quick-menu v-show="isAuthenticated()" :menu-count=getCount :icon-class=icons :menu-url-list=list :background-color=backgroundColor :color=color :position=position :is-open-new-tab=getIsOpenNewTab></quick-menu>

    <div id="social" class="text-xs-center">
      <button class="button is-outlined is-large is-focused"
              style="border-color: #2196F3; background-color: transparent; color: white; border-radius: 9999px"
              onclick="window.location.href = 'https://github.com/unige-pinfo-2018/PInfo1-frontend' ">
        <b-icon
          pack="fa"
          icon="facebook"
        >
        </b-icon>
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button class="button is-outlined is-large is-focused"
              style="border-color: #2196F3; background-color: transparent; color: white; border-radius: 9999px"
              onclick="window.location.href = 'https://twitter.com/' ">
        <b-icon
          pack="fa"
          icon="twitter"
        >
        </b-icon>
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button class="button is-outlined is-large is-focused"
              style="border-color: #2196F3; background-color: transparent; color: white; border-radius: 9999px"
              onclick="window.location.href = 'https://linkedin.com/' ">
        <b-icon
          pack="fa"
          icon="linkedin"
        >
        </b-icon>
      </button>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import quickMenu from 'vue-quick-menu'
Vue.component(quickMenu.name, quickMenu)
export default {
  name: 'App',
  data () {
    return {
      count: 4,
      icons: ['fa fa-user', 'fa fa-comment', 'fa fa-envelope', 'fa fa-question'],
      list: ['/#/profile', '/#/posts', '/#/', '/#/ask'],
      backgroundColor: '#2196F3',
      color: '#ffffff',
      position: 'bottom-right',
      isOpenNewTab: false,
      isAuth: false
    }
  },
  computed: {
    getCount () {
      return Number(this.count)
    },
    getIsOpenNewTab () {
      return Boolean(this.isOpenNewTab)
    }
  },
  methods: {
    success(text) {
      this.$dialog.alert({
        title: 'Success',
        message: text,
        type: 'is-success',
        hasIcon: true,
        icon: 'check-circle',
        iconPack: 'fa'
      })
    },
    logout () {
      let tmp = this
      axios.get('http://127.0.0.1:18080/users-service/rest/users/logout', {withCredentials: true})
        .then(function (response) {
          tmp.$data.isAuth = false
          tmp.$router.push('/')
          location.reload();
          return true
        })
        .catch(function (error) {
          tmp.$data.isAuth = false
          tmp.$router.push('/')
          location.reload();
          return false
        });
    },
    isAuthenticated () {
      return this.$data.isAuth
    }
  },
  beforeUpdate () {
    let tmp = this
    axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
      .then(function (response) {
        if (response.data === true) {
          tmp.$data.isAuth = true
        } else {
          tmp.$data.isAuth = false
        }
        return true
      })
      .catch(function (error) {
        console.log(error.response);
        return false
      });
  },
  beforeMount () {
    let tmp = this
    axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
      .then(function (response) {
        if (response.data === true) {
          tmp.$data.isAuth = true
        } else {
          tmp.$data.isAuth = false
        }
        return true
      })
      .catch(function (error) {
        console.log(error.response);
        return false
      });
  }
}

</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* CSS used for the social media links */

#social {
  bottom: 10%;
  width: 100%;
  text-align: center;
  position: fixed;
}

/* CSS used for the navigation bar */

.has-background {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

* {
  box-sizing: border-box;
}

body {
  font: 300 100% 'Helvetica Neue', Helvetica, Arial;
}

.container {
  width: 100%;
  margin: 0;
}

ul {
  position: fixed;
  top: 20px;
  width: 100%;
  left: 0;
}

ul li {
  display: inline;
  text-align: center;
}

a {
  display: inline-block;
  width: 25%;
  margin: 0;
  text-decoration: none;
  color: #FFFFFF;
}

hr {
  height: .25rem;
  width: 25%;
  margin-left: 0%;
  background: #2196F3;
  border: none;
  transition: .5s ease-in-out;
}

a:hover {
  color: #FFFFFF;
}

.two:hover ~ hr {
  margin-left: 25%;
}

.three:hover ~ hr {
  margin-left: 50%;
}

.four:hover ~ hr {
  margin-left: 75%;
}
</style>
