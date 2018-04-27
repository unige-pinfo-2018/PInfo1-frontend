<template>
  <section>

    <b-collapse :open="false">
      <div id="notification-center">
        <div class="content">
          <h3 id="notification-center-header">Inbox</h3>
          <hr>
          <p class="notification">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p class="notification">
            Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.

          </p>
          <p class="notification">
            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
          </p>
          <p class="notification">
            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
          </p>
          <p class="notification">
            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
          </p>
          <p class="notification">
            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
          </p>
        </div>
      </div>
      <b-icon id="notifications" v-bind:icon="getNotificationIcon()" slot="trigger" size="is-medium"></b-icon>
    </b-collapse>

  </section>
</template>

<script>
import Vue from 'vue'
import VueWebsocket from 'vue-websocket'

function getNbrNotifications () {
  return 3
}

export default {
  name: 'NotificationCenter',
  methods: {
    getNotificationIcon () {
      let nbrNotifs = getNbrNotifications()
      if (nbrNotifs > 9) { return 'numeric-9-plus-box' }
      return 'numeric-' + nbrNotifs + '-box'
    }
  },
  created: function () {
    if (this.$store.state.userIsLoggedIn) {
      console.log(this.$store.state.user.username)
      Vue.use(VueWebsocket, 'ws://127.0.0.1:18080/notifications/' + this.$store.state.user.username, {
        reconnection: false
      })
    }
  }
}
</script>

<style scoped>
  #notifications {
    position: absolute;
    background-color: orangered;
    color: whitesmoke;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    bottom: 30px;
    left: 30px;
    width: 60px;
    height: 60px;
    cursor: pointer;
  }

  #notification-center {
    position: absolute;
    bottom: 98px;
    left: 30px;
    max-height: 300px;
    overflow: scroll;
    visibility: visible;
    background-color: white;
    z-index: 9999;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 2px;
    padding: 10px;
    max-width: 40%;
  }

  #notification-center .content hr {
    margin: 8px 0 10px;
    width: 100%;
    background: darkgray;
  }

  #notification-center-header {
    text-align: left;
    font-weight: 900;
    color: dimgray;
    font-size: 1.2em;
    margin-bottom: 0;
  }

  .notification {
    border-bottom: 1px solid gray;
    margin-bottom: 5px !important;
  }
</style>
