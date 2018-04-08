<!-- Author: @GiovannaTheo -->
<!-- This file controls the particuls that are on screen -->
<template>
  <section>
    <div id="posts">
      <v-layout id="post"
                column
                justify-center
                fill-height
                v-scroll:#scroll-target="onScroll">
        <v-container style="max-height: 450px"
                     class="scroll-y"
                     id="scroll-target">
          <v-flex xs12 sm8 md6>
            <v-card>
              <v-toolbar color="blue">
                <v-toolbar-title style="color: white;">Latest posts</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon disabled>
                  <v-icon color="white">search</v-icon>
                </v-btn>
              </v-toolbar>
              <v-list two-line>
                <template v-for="(item, index) in items">
                  <v-subheader
                    inset
                    :key="item.header"
                    v-if="item.header"
                  >
                    {{ item.header }}
                  </v-subheader>
                  <v-divider
                    v-else-if="item.divider"
                    inset
                    :key="index"
                  ></v-divider>
                  <v-list-tile
                    v-else
                    avatar
                    ripple
                    :key="item.title"
                  >
                    <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-container>
      </v-layout>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Posts',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  data () {
    return {
      items: [
        {
          header: 'Today'
        },
        { divider: true },
        {
          avatar: 'https://picsum.photos/250/300?image=660',
          title: 'Meeting @ Noon',
          subtitle:
            "<span class='text--primary'>Spike Lee</span> &mdash; I'll be in your neighborhood"
        },
        {
          avatar: 'https://picsum.photos/250/300?image=821',
          title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
          subtitle:
            "<span class='text--primary'>to Operations support</span> &mdash; Wish I could come."
        },
        {
          avatar: 'https://picsum.photos/250/300?image=783',
          title: 'Yes yes',
          subtitle:
            "<span class='text--primary'>Bella</span> &mdash; Do you have Paris recommendations"
        },
        {
          header: 'Yesterday'
        },
        { divider: true },
        {
          avatar: 'https://picsum.photos/250/300?image=1006',
          title: 'Dinner tonight?',
          subtitle:
            "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
        },
        {
          avatar: 'https://picsum.photos/250/300?image=146',
          title: 'So long',
          subtitle:
            "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
        },
        {
          header: 'Last Week'
        },
        { divider: true },
        {
          avatar: 'https://picsum.photos/250/300?image=1008',
          title: 'Breakfast?',
          subtitle:
            "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
        },
        {
          avatar: 'https://picsum.photos/250/300?image=839',
          title:
            'Winter Porridge <span class="grey--text text--lighten-1"></span>',
          subtitle:
            "<span class='text--primary'>cc: Daniel</span> &mdash; Tell me more..."
        },
        {
          avatar: 'https://picsum.photos/250/300?image=145',
          title: 'Oui oui',
          subtitle:
            "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
        }
      ]
    }
  }
}
</script>

<style>
  #posts #post #scroll-target{
    bottom: 23%;
    width: 100%;
    height: 60%;
    text-align: center;
    position: fixed;
    left: 45%;
  }

  #tags #tag{
    bottom: 23%;
    width: 100%;
    height: 60%;
    text-align: center;
    position: fixed;
    left: 0%;
  }
</style>
