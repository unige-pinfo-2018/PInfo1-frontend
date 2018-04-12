<!-- Author: @GiovannaTheo -->
<!--This file contains the layout for the section last posts-->
<template>
  <section>
    <div id="posts">
      <div id="tags">
        <p style="color: white">Search for tags</p>
      </div>
    </div>
  </section>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
export default {
  components: {
    VueTagsInput
  },
  name: 'Posts',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  data () {
    return {
      tag: '',
      tags: []
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
    width: 400px;
    height: 430px;
    position: fixed;
    left: 5%;
    bottom: 23%;
  }
</style>
