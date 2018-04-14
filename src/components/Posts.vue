<!-- Author: @GiovannaTheo -->
<!--This file contains the layout for the section last posts-->
<template>
  <section>
    <div id="posts">
      <div id="tags" v-on:keyup.enter="getColor">
        <h4 style="margin-top: 20px; color: #FFFFFF;">Search for tags</h4>
        <b-taginput class="myTags" style="border-radius: 25px; max-height: 430px; margin-left: 15px; margin-top: 15px; margin-right: 15px; margin-bottom: 52px"
                    v-model="tags" rounded
                    type='color'
                    maxtags = "20">
        </b-taginput>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'Posts',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  data() {
    return {
      tags: [],
      colors: [
        'is-info',
        'is-success',
        'is-warning',
        'is-danger'
      ],
      counter: 0
    }
  },
  methods: {
    getColor: function () {
        this.$data.counter = this.$data.tags.length
        console.log(this.$data.counter)
        let r = Math.floor(Math.random() * Math.floor(4))
        let color = this.$data.colors[r];
        document.getElementById("tags").getElementsByClassName("myTags")[0]
          .getElementsByClassName("taginput-container is-focusable")[0]
          .childNodes[this.$data.counter-1].className = "tag " + color + " is-rounded"
        console.log(this.$data.tags)
    }
  }
}
</script>

<style>
  #posts {
    bottom: 23%;
    width: 100%;
    height: 60%;
    text-align: center;
    position: fixed;
    left: 10%;
  }

  #tags {
    border-radius: 25px;
    border: 2px solid #FFFFFF;
    max-width: 400px;
    max-height: 430px;
    position: fixed;
    left: 5%;
    top: 25%;
  }
</style>
