<!-- Author: @GiovannaTheo -->
<!-- Home screen -->

<template>
  <section>
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
    <div id="searchbar" v-on:keyup.enter="getColor">
      <div class="field is-grouped has-addons has-addons-centered">
        <!--<p class="control">
          <b-taginput class="myTags" style="border-radius: 25px; width: 200px; border: none"
                      v-model="tags" rounded
                      type='color'
                      maxtags = "5"
                      placeholder = "Tags">
          </b-taginput>
        </p>-->
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="What can I do you for ?" style="height: 44px;">
        </p>
        <p class="control">
          <a class="button is-info" style="width: fit-content; height: 44px; border-radius: 25px">
            Search
          </a>
        </p>
      </div>
      <b-taginput class="myTags" style="border-radius: 25px; width: 89%; border: none"
                  v-model="tags" rounded
                  type='color'
                  maxtags = "5"
                  placeholder = "Tags">
      </b-taginput>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
  export default {
  name: 'Home',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg.jpg'))
  },
  methods: {
    /* This function is used to change the tags color */
    getColor: function () {
      /* Makes sure we never have too much tags */
      this.$data.counter = this.$data.tags.length
      /* Picks a random number */
      let r = Math.floor(Math.random() * Math.floor(4))
      /* Picks a random color */
      let color = this.$data.colors[r];
      /* Changes the color of the tag */
      document.getElementById("searchbar").getElementsByClassName("myTags")[0]
        .getElementsByClassName("taginput-container is-focusable")[0]
        .childNodes[this.$data.counter-1].className = "tag " + color + " is-rounded"
    }
  },
  data() {
    return {
      tags: [], // contains the tags
      colors: [ // all colors that the tags can recieve
        'is-info',
        'is-success',
        'is-warning',
        'is-danger'
      ],
      counter: 0, // used to assign colors to tags
    }
  }
}
</script>

<style>
  #searchbar {
    width: 60%;
    left: 22%;
    top: 10%;
    position: absolute;
  }
</style>
