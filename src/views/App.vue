<template>
  <section v-bind:style="{ background: 'url(' + this.$store.state.backgroundImagePath + ') no-repeat center center fixed' }"
           id="main-section" class="hero is-fullheight has-background">
    <div id="app" class="hero-body">
      <div class="container">
        <nav>
          <router-link to="/">Search</router-link>
          <router-link to="profile">My profile</router-link>
          <router-link to="posts">Latest posts</router-link>
          <router-link to="ask">Ask a question</router-link>
        </nav>
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

nav{
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%;
  left: 0;
  background-color:#FBFBFB;
}

nav a{
  display:inline-block;
  padding: 18px 30px;
  color:#868686 !important;
  /*color:#000000 !important;*/
  font-weight:bold;
  font-size:16px;
  text-decoration:none !important;
  line-height:1;
  text-transform: uppercase;
  background-color:transparent;
  -webkit-transition:background-color 0.25s;
  -moz-transition:background-color 0.25s;
  transition:background-color 0.25s;
}

nav a:hover {
  background-color: #65B0FF;
  color: black;
  /*border-radius:30px;*/
}
</style>
