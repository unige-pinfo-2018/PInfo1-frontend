<!-- Author: @GiovannaTheo -->
<!-- This file controls the particuls that are on screen -->

<template>
  <div>
    <vue-particles
        color="#dedede"
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
  name: 'Particles'
}
</script>

<style>
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
