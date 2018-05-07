<template>
  <section>

    <b-collapse :open="false">
      <div id="notification-center">
        <div class="content">
          <h3 id="notification-center-header">Inbox</h3>
          <hr>
          <p class="notification" v-bind:key="notification.id"
             v-for="notification in userNotifications">
            {{ notification.content }}
            <br>
            <span style="font-size: 0.8rem;">Created: {{ notification.dateCreated }}</span>
          </p>
          <p  id="load-more" ref="loadButton" v-on:click="loadMore">
            <b-icon
              v-if="loading"
              pack="fa"
              icon="refresh"
              custom-class="fa-spin">
            </b-icon>
            <span v-if="!loading">{{ loadMoreStr }}</span>
          </p>
        </div>
      </div>
      <b-icon id="notifications" @click.native="markAllAsRead" v-bind:icon="getNotificationIcon()" slot="trigger"
              size="is-medium" v-bind:class="{ unread : getUnreadNotificationsCount() > 0 }"></b-icon>
    </b-collapse>

  </section>
</template>

<script>
/* eslint-disable */
 import * as axios from 'axios'

function getWebsocketSessionId (callback) {
  axios.get('http://127.0.0.1:18080/notifications-service/rest/authenticator/getSessionId', {
    withCredentials: true
  }).then(function (response) {
    let wsSessionId = response.data
    console.log(wsSessionId)
    callback(wsSessionId)
  })
}

export default {
  name: 'NotificationCenter',
  data () {
    return {
      userNotifications: [],
      notificationSocket: null,
      read: false,
      lastNotificationIndex: 0,
      loadMoreStr: 'Load more..',
      loading: false
    }
  },
  methods: {
    loadMore () {
      this.$data.loading = true
      let startIndex = this.$data.lastNotificationIndex + 1
      let endIndex = startIndex + 5
      let socket = this.$data.notificationSocket
      let self = this
      socket.send(JSON.stringify({
        messageType: 'GET',
        body: 'range ' + startIndex + '-' + endIndex
      }))
      socket.onmessage = function (event) {
        if (event.data != null && JSON.parse(event.data).length > 0) {
          let newNotifications = JSON.parse(event.data)
          self.$data.lastNotificationIndex += newNotifications.length
          self.$data.userNotifications = self.$data.userNotifications.concat(newNotifications)
        } else {
          self.$refs.loadButton.style.cursor = 'default'
          self.$data.loadMoreStr = 'No more notifications to show'
        }
        self.$data.loading = false
      }
    },
    getLastNotifications (socket) {
      let self = this
      socket.send(JSON.stringify({
        messageType: 'GET',
        body: 'last'
      }))
      socket.onmessage = function (event) {
        self.$data.userNotifications = JSON.parse(event.data)
        self.$data.lastNotificationIndex = self.$data.userNotifications.length - 1
      }
    },
    getUnreadNotificationsCount () {
      let nbrUnreadNotifications = 0
      let notifications = this.$data.userNotifications
      for (let i = 0; i < notifications.length; i++) {
        if (!notifications[i].isRead) {
          nbrUnreadNotifications++
        }
      }
      return nbrUnreadNotifications
    },
    getNotificationIcon () {
      let nbrUnreadNotifications = this.getUnreadNotificationsCount()
      if (nbrUnreadNotifications > 9) { return 'numeric-9-plus-box' }
      return 'numeric-' + nbrUnreadNotifications + '-box'
    },
    markAllAsRead: function (event) {
      if (!this.$data.read) {
        let notificationSocket = this.$data.notificationSocket
        if (this.$store.state.userIsLoggedIn && (notificationSocket != null) &&
          (notificationSocket.readyState === notificationSocket.OPEN)) {
          notificationSocket.send(JSON.stringify({
            messageType: 'UPDATE',
            body: 'read'
          }))
        }
        this.$data.read = true
        this.getLastNotifications(notificationSocket)
      }
    }
  },
  created: function () {
    let self = this
     if (this.$store.state.userIsLoggedIn && this.$store.state.user != null) {
      getWebsocketSessionId((sessionId) => {
        const notificationSocket = new WebSocket('ws://127.0.0.1:18080/notifications-service/notifications/' +
          self.$store.state.user.username + '/' + sessionId)
        notificationSocket.onopen = function (event) {
          console.log('sending message')
          notificationSocket.send(JSON.stringify({
            //messageType: 'GET',
            //body: 'last'
            messageType: 'CREATE',
            body: JSON.stringify({
              recipient: 'theogio',
              content: 'Hello there'
            })
          }))
        }
        notificationSocket.onmessage = function (event) {
          console.log('receiving message')
          console.log(event.data)
        }
      })
    }
    if (this.$store.state.userIsLoggedIn && this.$store.state.user != null) {
      self.$data.notificationSocket = new WebSocket('ws://127.0.0.1:18080/notifications-service/notifications/' +
        self.$store.state.user.username + '/dooedke')
      let notificationSocket = self.$data.notificationSocket
      notificationSocket.onopen = function (event) {
        self.getLastNotifications(notificationSocket)
      }
    }
  }
}
</script>

<style scoped>
  #notifications {
    position: absolute;
    background-color: gray;
    color: whitesmoke;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    bottom: 30px;
    left: 30px;
    width: 60px;
    height: 60px;
    cursor: pointer;
    z-index: 9999;
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
    max-width: 60%;
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

  #load-more {
    text-align: center;
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .notification {
    border-bottom: 1px solid gray;
    margin-bottom: 5px !important;
  }

  .unread {
    background-color: orangered !important;
  }
</style>
