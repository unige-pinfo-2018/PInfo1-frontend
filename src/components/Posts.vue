<!-- Author: @GiovannaTheo -->
<!-- This file controls the particuls that are on screen -->
<template>
  <div>
    <vue-particles
        color="#0080FF"
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
</template>

<script>
export default {
  name: 'Posts',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  destroyed: function () {
    this.$store.commit('switch_background', require('../assets/bg.jpg'))
  }
}
</script>
