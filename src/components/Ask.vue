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
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Ask',
  methods: {
    warning(text) {
      this.$dialog.alert({
        title: 'Error',
        message: text,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa'
      })
    }
  },
  beforeMount () {
    let tmp = this
    /* When the component is mounted, the functions below are triggered */
    axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
      .then(function (response) {
        if (response.data === false) {
          tmp.warning('You must be logged in to access this page')
          tmp.$router.push('/login')
        }
        return true
      })
      .catch(function (error) {
        console.log(error.response);
        return false
      });
  },
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  }
}
</script>
