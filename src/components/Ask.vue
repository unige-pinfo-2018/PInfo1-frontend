<!-- Author: @GiovannaTheo -->
<!-- This file controls the particuls that are on screen -->

<template>
  <section>
    <div>
      <vue-particles
        color="#80ff00"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <!--<button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="checkLoggin">Check</button>-->
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Ask',
  methods: {
    checkLoggin () {
      /*axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn')
        .then(function (response) {
          console.log(response.data)
          return true
        })
        .catch(function (error) {
          console.log(error.response);
          return false
        });*/
    }
  },
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  }
}
</script>
