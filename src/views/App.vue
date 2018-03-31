<template>
  <div id="App">
    <!-- Calling our components -->
    <SignUp/>
    <Particles/>
  </div>
</template>

<script>
import SignUp from '../components/SignUp'
import Particles from '../components/Particles'
export default {
  name: 'App',
  components: {
    SignUp,
    Particles
  }
}
</script>

<style>
#App{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: right;
  /*margin-left: 800px;*/
  color: #2c3e50;
  margin-top: 10px;
}

/*The lines below allow the background image to fill the screen entirely,
for all browsers*/

html {
  background: url(../assets/bg.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
