<template>
  <section v-bind:style="{ background: 'url(' + this.$store.state.backgroundImagePath + ') no-repeat center center fixed' }"
           id="main-section" class="hero is-fullheight has-background">
    <div id="app" class="hero-body">
      <div class="container">
        <ul>
          <li class="one"><router-link to='/'>Search</router-link></li><!--
       --><li class="two"><router-link to='profile'>My profile</router-link></li><!--
       --><li class="three"><router-link to='posts'>Latest posts</router-link></li><!--
       --><li class="four"><router-link to='ask'>Ask a question</router-link></li><!--
       --><li class="five"><router-link to='logout'>Logout</router-link></li>
        <hr />
        </ul>
        <router-view/>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'App'
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
  width: 20%;
  padding: .50rem 0;
  margin: 0;
  text-decoration: none;
  color: #FFFFFF;
}

hr {
  height: .25rem;
  width: 20%;
  margin-left: 0%;
  background: #65B0FF;
  /*background: #FFFFFF;*/
  border: none;
}

a:hover {
  color: #FFFFFF;
}

.two:hover ~ hr {
  margin-left: 20%;
}

.three:hover ~ hr {
  margin-left: 40%;
}

.four:hover ~ hr {
  margin-left: 60%;
}

.five:hover ~ hr {
  margin-left: 80%;
}

</style>
