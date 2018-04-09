<!-- Author: @GiovannaTheo -->
<!--This file contains the layout for the section last posts-->
<template>
  <section>
    <div id="posts">
      <v-layout>
        <v-container style="max-height: 450px">
          <v-flex xs6 sm4 md4>
            <v-layout column>
              <v-flex>
                <v-card class="black--text" color="white" tile>
                  <v-card-title primary class="title justify-center">Search for tags...</v-card-title>
                </v-card>
              </v-flex>
              <v-flex d-flex style="max-height: 450px">
                <v-card class="black--text" color="white" tile>
                  <v-card-title primary-title>
                    <h3 class="headline mb-0">University</h3>
                    <div>
                      here will go the future tags that a user picks
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn icon ripple>
                      <v-icon color="blue">add</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-container>
      </v-layout>

      <v-layout id="post"
                column
                justify-center
                fill-height
                v-scroll:#scroll-target="onScroll">
        <v-container style="max-height: 450px"
                     class="scroll-y"
                     id="scroll-target">
          <v-layout row wrap>
            <v-flex d-flex xs6 sm4 md6 offset-xs0 offset-lg5>
              <v-layout row wrap>
                <v-flex d-flex>
                  <v-card>
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
                          <v-list-tile-action>
                            <v-btn icon ripple>
                              <v-icon color="blue">open_in_new</v-icon>
                            </v-btn>
                          </v-list-tile-action>
                        </v-list-tile>
                      </template>
                    </v-list>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
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
      ],
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
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
    left: 10%;
  }
</style>
