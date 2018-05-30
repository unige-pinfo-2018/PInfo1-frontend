<!-- Author: @GiovannaTheo -->
<!-- This file controls the particuls that are on screen -->
<template>
  <section id="app">
    <vue-particles
      color="#FFFFFF"
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
    <div id="profile" class="container">
      <div class="notification is-white">
        <div id="pierre" class="columns">
          <!-- The first column of the profile container, with the profile picture, and the personnal infos -->
          <div class="column is-4">
            <div v-for="u in user" :key="u.id" class="tile is-ancestor is-vertical">
              <div class="tile is-parent">
                <!-- Tile of the profil picture -->
                <article class="tile is-child notification box is-white">
                  <figure class="image is-4by3">
                    <img id="profile-picture" :src="u.profilePicture">
                  </figure>
                </article>
              </div>
              <div class="tile is-parent is-vertical">
                <!-- Tile of the personal infos -->
                <article class="tile is-child notification box is-white">
                  <div id="personal-infos" class="content">
                    <p><i class="fa fa-bookmark"></i>&ensp;{{u.name}}</p>
                    <p><i class="fa fa-user"></i>&ensp;@{{u.username}}</p>
                  </div>
                </article>
                <br>
                <div class="tile is-child">
                  <a id="edit-button" class="button is-rounded" @click="launch">Edit my profile</a>
                </div>
              </div>
            </div>
          </div>
          <!-- The second column of the profile container, with the activities card, the contact logos and the edit button -->
          <div id="profile-column-right" class="column is-7">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <div id="container-activities" class="container">
                  <!-- The activities card -->
                  <div id="card-activities" class="card">
                    <div class="card-header">
                      <p class="card-header-title">
                        My recent activities
                      </p>
                    </div>

                    <div id="card-activities-content" class="card-content">
                      <article v-for="post in posts" :key="post.id" class="media" :id="post.id">
                        <figure class="media-left">
                          <p class="image is-64x64">
                            <img :src="post.profilePicture" style="border-radius: 50%;">
                          </p>
                        </figure>
                        <div class="media-content">
                          <div class="content">
                            <p>
                              <strong>{{post.name}}</strong> <small>{{post.username}}</small> <small>{{post.date}}</small>
                              <br>
                            </p>
                            <vue-markdown> {{post.text}} </vue-markdown>
                          </div>
                          <nav class="level is-mobile">
                            <div class="level-right">
                              <a id="upVote1" class="level-item" v-on:click="handleVote($event)">
                                <b-icon
                                  v-bind:style="{color: post.colorUpVote}"
                                  id = 'votes'
                                  icon="arrow-up"
                                >
                                </b-icon>
                              </a>
                              <a id="downVote1" class="level-item" v-on:click="handleVote($event)">
                                <b-icon
                                  v-bind:style="{color: post.colorDownVote}"
                                  id = 'votes'
                                  icon="arrow-down"
                                >
                                </b-icon>
                              </a>
                              <p>{{post.vote}}</p>
                            </div>
                          </nav>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- The modal to edit profile informations -->
    <div class="modal" v-bind:class="{'is-active':isActive}">
      <div class="modal-background" width="auto"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Profile Edition</p>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column">
              <formly-form :form="form" :model="model" :fields="fields" style="border: none"></formly-form>
              <label class="label">Profile picture</label>
              <b-upload v-model="dropFiles"
                        v-on:input="handleUpload">
                <a class="button" style="background-color: #65B0FF">
                  <b-icon icon="upload" style="color:white"></b-icon>
                  <span style="color:white">Upload</span>
                </a>
              </b-upload>
              <div class="files">
                <span class="tag is-outlined is-small"
                style="color: #2196F3">
                  {{this.$data.temp_ProfilePicture[1]}}
                  <button class="delete is-small"
                      type="button"
                      @click="deleteDropFile()">
                  </button>
                </span>
              </div>
            </div>
          </div>
        </section>
        <article class="media" id="footer">
          <footer class="modal-card-foot">
            <div class="field is-grouped is-grouped-right">
              <button class="button" @click="saveChanges" style="background-color: #65B0FF; color:white">Save changes</button>
              <button class="button" type="button" @click="close">Cancel</button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import VueMarkdown from 'vue-markdown'
import { directive as onClickaway } from 'vue-clickaway';
import * as axios from 'axios'

function getWebsocketSessionId (callback) {
  axios.get('http://127.0.0.1:18080/notifications-service/rest/authenticator/getSessionId', {
    withCredentials: true
  }).then(function (response) {
    let wsSessionId = response.data
    callback(wsSessionId)
  })
}

export default {
  directives: {
    onClickaway: onClickaway,
  },
  /* eslint-disable */
  name: 'Posts',
  components: {
    VueMarkdown
  },
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  data () {
    return {
      isSwitched: false,
      isSwitchedCustom: 'Contact informations not sharded',
      isActive: false,
      isVisible: false, // To show or not the answer window

      form: {},
      model: {
        name:""
      },
      fields: [
        {
          key: 'name',
          type: 'input-with-field',
          required: true,
          templateOptions: {
            properties: {
              'type': 'text',
              'maxlength': 30,
              'placeholder': "Name"
            },
            wrapper: {
              properties: {
                'addons': false,
                'label': 'Name',
                'style': "max-width: 300px; margin-left: auto; margin-right: auto"
              }
            }
          }
        }
      ],

      dropFiles: [],
      temp_ProfilePicture:[],
      posts: [ // contains all the post displayed on screen
      ],
      user: [ // information of the current user that's logged in
      ],
      comments: [ // will contain all comments relative to a post
      ]
    }
  },
  methods: {
    checkStringNotEmpty: function (string) {
      this.string != ''
    },
    launch: function () {
      this.isActive = true
    },
    close: function () {
      this.isActive = false
    },

    saveChanges: async function () {
      let self = this  //if this is not declared here, using it in the block below
      //doesn't reference the correct instance of vue, so $router
      //can't be used.

      if (self.$data.dropFiles.length != 0 && self.$data.temp_ProfilePicture.length == 0) {
        self.warning("Please wait for the upload to finish.")
      } else {
        if (self.form.$valid && self.$data.temp_ProfilePicture.length != 0) {
          axios.post('http://127.0.0.1:18080/users-service/rest/users/update_user', {
              "confirmed": self.$data.user[0].confirmed,
              "curriculum": self.$data.user[0].curriculum,
              "email": self.$data.user[0].email,
              "id": self.$data.user[0].id,
              "name": self.$data.model.name,
              "pictureUrl": self.$data.temp_ProfilePicture[0],
              "password": self.$data.user[0].password,
              "role": self.$data.user[0].role,
              "username": self.$data.user[0].username
            }
            , {withCredentials: true})
          window.location.reload(true)
        } else if (self.form.$valid && self.$data.temp_ProfilePicture.length == 0) {
          axios.post('http://127.0.0.1:18080/users-service/rest/users/update_user', {
              "confirmed": self.$data.user[0].confirmed,
              "curriculum": self.$data.user[0].curriculum,
              "email": self.$data.user[0].email,
              "id": self.$data.user[0].id,
              "name": self.$data.model.name,
              "pictureUrl": self.$data.user[0].profilePicture,
              "password": self.$data.user[0].password,
              "role": self.$data.user[0].role,
              "username": self.$data.user[0].username
            }
            , {withCredentials: true})
          window.location.reload(true)
        } else if (!self.form.$valid && self.$data.temp_ProfilePicture.length != 0) {
          axios.post('http://127.0.0.1:18080/users-service/rest/users/update_user', {
              "confirmed": self.$data.user[0].confirmed,
              "curriculum": self.$data.user[0].curriculum,
              "email": self.$data.user[0].email,
              "id": self.$data.user[0].id,
              "name": self.$data.user[0].name,
              "pictureUrl": self.$data.temp_ProfilePicture[0],
              "password": self.$data.user[0].password,
              "role": self.$data.user[0].role,
              "username": self.$data.user[0].username
            }
            , {withCredentials: true})
          window.location.reload(true)
        } else {
          self.warning('Please correct your inputs.')
        }
      }
    },

    handleUpload() {
      let self = this
      let files = this.$data.dropFiles;
      let promises = []
      let temp = []
      if (files.length !== 0) {
        if (files.length <= 1) {
          self.success('Upload in progress.... Links will automatically appear under the button when it is uploaded')
          for (let i = 0; i < self.$data.dropFiles.length; i++) {
            let formData = new FormData();
            formData.append('image', self.$data.dropFiles[i])
            const config = {
              baseURL: 'https://api.imgur.com',
              headers: {
                'Authorization': 'Client-ID ' + '254c66d26ff90cc'
              }
            }
            promises.push(axios.post('/3/image', formData, config))
          }
          axios.all(promises)
            .then((result) => {
              for (let i = 0; i < result.length; i++) {
                temp.push(result[i].data.data.link)
                self.$data.temp_ProfilePicture.push(temp[0], self.$data.dropFiles[i].name)
              }
            })
            .catch((error) => {
              console.log('image post error')
              console.log(error)
            })
        } else {
          self.warning('Cannot upload more than 1 profile picture at a time')
        }
      }
    },

    deleteDropFile() {
      this.dropFiles.splice(0, 1),
        this.$data.temp_ProfilePicture = []
    },

    handleVote: async function (event) {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let self = this
      let action = event.target.parentElement.parentElement.getAttribute("id")
      let postID = event.target // Gets the id for the parent post
        .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id")
      let post = null
      for (let i = 0; i < self.$data.posts.length; i++) {
        if (self.$data.posts[i].id == postID) { // look for the right post to inject in the answer window
          post = self.$data.posts[i]
        }
      }
      if (post == null) { // then we look for a comment
        for (let i = 0; i < self.$data.comments.length; i++) {
          if (self.$data.comments[i].id == postID) { // look for the right post to inject in the answer window
            post = self.$data.comments[i]
          }
        }
      }

      if (action == "upVote1" || action == "upVote2" || action == "upVote3") {
        if (post.colorUpVote == "#dddddd" && post.colorDownVote != "#ff9100") {
          axios.put('http://127.0.0.1:18080/post-service/rest/likes/addLike',
            {
              "userId": self.$data.user[0].id,
              "postId": postID
            })
            .then(function (response) {
              axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/' + self.$data.user[0].id, {
                "idPosts": [post.id]
              })
                .then(function (response) {
                  post.vote = response.data[0][0]
                  post.colorUpVote = "#ff9100"
                  axios.get('http://127.0.0.1:18080/post-service/rest/posts/userId_by_id/' + postID)
                    .then(function (response) {
                      axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
                        "ids": [response.data]
                      }, {withCredentials: true})
                        .then(function (response) {
                          self.sendNotification(response.data[0].username, 'New upvote on your post')
                          return true
                        })
                        .catch(function (error) {
                          self.warning('Error while trying to reach database')
                          console.log(error.response);
                          return false
                        });
                      return true
                    })
                    .catch(function (error) {
                      self.warning('Error while trying to reach database')
                      console.log(error.response);
                      return false
                    });
                  return true
                })
                .catch(function (error) {
                  self.warning('Could not fetch posts. Database not reachable')
                  console.log(error.response);
                  return false
                });
              return true
            })
            .catch(function (error) {
              console.log(error.response);
              return false
            });
        } else {
          if (post.colorDownVote != "#ff9100") {
            axios.put('http://127.0.0.1:18080/post-service/rest/likes/addLike',
              {
                "userId": self.$data.user[0].id,
                "postId": postID
              })
              .then(function (response) {
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/' + self.$data.user[0].id, {
                  "idPosts": [post.id]
                })
                  .then(function (response) {
                    post.vote = response.data[0][0]
                    post.colorUpVote = "#dddddd"
                    return true
                  })
                  .catch(function (error) {
                    self.warning('Could not fetch posts. Database not reachable')
                    console.log(error.response);
                    return false
                  });
                return true
              })
              .catch(function (error) {
                console.log(error.response);
                return false
              });
          }
        }
      }

      if (action == "downVote1" || action == "downVote2" || action == "downVote3") {
        if (post.colorDownVote == "#dddddd" && post.colorUpVote != "#ff9100") {
          axios.put('http://127.0.0.1:18080/post-service/rest/dislikes/addDislike',
            {
              "userId": self.$data.user[0].id,
              "postId": postID
            })
            .then(function (response) {
              axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/' + self.$data.user[0].id, {
                "idPosts": [post.id]
              })
                .then(function (response) {
                  post.vote = response.data[0][0]
                  post.colorDownVote = "#ff9100"
                  axios.get('http://127.0.0.1:18080/post-service/rest/posts/userId_by_id/' + postID)
                    .then(function (response) {
                      axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
                        "ids": [response.data]
                      }, {withCredentials: true})
                        .then(function (response) {
                          self.sendNotification(response.data[0].username, 'New downvote on your post')
                          return true
                        })
                        .catch(function (error) {
                          self.warning('Error while trying to reach database')
                          console.log(error.response);
                          return false
                        });
                      return true
                    })
                    .catch(function (error) {
                      self.warning('Error while trying to reach database')
                      console.log(error.response);
                      return false
                    });
                  return true
                })
                .catch(function (error) {
                  self.warning('Could not fetch posts. Database not reachable')
                  console.log(error.response);
                  return false
                });
              return true
            })
            .catch(function (error) {
              console.log(error.response);
              return false
            });
        } else {
          if (post.colorUpVote != "#ff9100") {
            axios.put('http://127.0.0.1:18080/post-service/rest/dislikes/addDislike',
              {
                "userId": self.$data.user[0].id,
                "postId": postID
              })
              .then(function (response) {
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/' + self.$data.user[0].id, {
                  "idPosts": [post.id]
                })
                  .then(function (response) {
                    post.vote = response.data[0][0]
                    post.colorDownVote = "#dddddd"
                    return true
                  })
                  .catch(function (error) {
                    self.warning('Could not fetch posts. Database not reachable')
                    console.log(error.response);
                    return false
                  });
                return true
              })
              .catch(function (error) {
                console.log(error.response);
                return false
              });
          }
        }
      }
    },

    success(text) {
      this.$snackbar.open({
        duration: 5000,
        message: text,
        type: 'is-info',
        position: 'is-top',
        actionText: 'OK',
        queue: false
      })
    },
    /* Function used to popup a warning with a custom message */
    warning(text) {
      this.$snackbar.open({
        duration: 5000,
        message: text,
        type: 'is-info',
        position: 'is-top',
        actionText: 'OK',
        queue: false
      })
    },
    retrievePosts: async function () {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let self = this
      let idPost = [], textPost = [], datePost = [], userIdsToQuery = []
      let profilePictures = [], names = [], usernames = []
      await axios.get('http://127.0.0.1:18080/post-service/rest/posts/getPostsOfUser/' + self.$data.user[0].id, {withCredentials: true})
        .then(function (response) {
          if (response.data != null && response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              let date = new Date(response.data[i].datePost)
              datePost.push(date)
              idPost.push(response.data[i].id)
              textPost.push(response.data[i].content)
              userIdsToQuery.push(response.data[i].userId)
            }

            axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
              "ids": userIdsToQuery
            }, {withCredentials: true})
              .then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                  profilePictures.push(response.data[i].pictureUrl)
                  names.push(response.data[i].name)
                  usernames.push(response.data[i].username)
                }
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/' + self.$data.user[0].id, {
                  "idPosts": idPost
                }, {withCredentials: true})
                  .then(function (response) {
                    for (let i = response.data[0].length - 1; i >= 0; i--) {
                      let post = {
                        id: idPost[i],
                        text: textPost[i],
                        profilePicture: profilePictures[i],
                        name: names[i],
                        username: "@" + usernames[i],
                        date: datePost[i].getDay() + '/' + datePost[i].getMonth() + '/' + datePost[i].getFullYear() + ' - ' + datePost[i].getHours() + ':' + datePost[i].getMinutes() + ':' + datePost[i].getSeconds(),
                        colorUpVote: response.data[1][i].like == false ? "#dddddd" : "#ff9100",
                        colorDownVote: response.data[1][i].dislike == false ? "#dddddd" : "#ff9100",
                        vote: response.data[0][i]
                      }
                      self.$data.posts.push(post) // pushing the data so they display
                    }
                    return true
                  })
                  .catch(function (error) {
                    self.warning('Could not fetch posts. Database not reachable')
                    console.log(error.response);
                    return false
                  });
                return true
              })
              .catch(function (error) {
                self.warning('Could not fetch posts. Database not reachable')
                console.log(error)
                return false
              });

          } else {
            self.warning("No more posts to fetch")
          }
          return true
        })
        .catch(function (error) {
          self.warning('Could not connect to database')
          console.log(error);
          return false
        });
    },

    /* Checks if a string is empty or undefined or only contains white spaces */
    empty: function (str) {
      if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "") {
        return true;
      } else {
        return false;
      }
    },
    sendNotification: function (dest, notif) {
      let self = this
      if (this.$store.state.userIsLoggedIn && this.$store.state.user != null) {
        getWebsocketSessionId((sessionId) => {
          const notificationSocket = new WebSocket('wss://127.0.0.1:18080/notifications-service/notifications/' +
            self.$store.state.user.username + '/' + sessionId)
          notificationSocket.onopen = function (ignored) {
            notificationSocket.send(JSON.stringify({
              messageType: 'CREATE',
              body: JSON.stringify({
                recipient: dest,
                content: notif
              })
            }))
          }
        })
      }
    },
    updateUserInfo: async function () {
      let self = this
      let b = []
      await
        axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
          .then(function (response) {
            if (response.data[0] === true) {
              b = {
                confirmed: response.data[1].confirmed,
                curriculum: response.data[1].curriculum,
                email: response.data[1].email,
                id: response.data[1].id,
                username: response.data[1].username,
                name: response.data[1].name,
                profilePicture: response.data[1].pictureUrl,
                password: response.data[1].password,
                role: response.data[1].role
              }
            } else {
              self.warning('You must be logged in to access this page')
              self.$router.push('/login')
            }
          })
          .catch(function (error) {
            console.log(error.response);
            return false
          });
      return b
    }
  },
  beforeMount(){
    let self = this
    /* When the component is mounted, the functions below are triggered */
    axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
      .then(function (response) {
        if (response.data[0] === true) {
          self.retrievePosts()
        } else {
          self.warning('You must be logged in to access this page')
          self.$router.push('/login')
        }
        return true
      })
      .catch(function (error) {
        console.log(error.response);
        return false
      });
  }
}
</script>

<style>
#activity_1 {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 1rem;
  margin-bottom: 0;
  padding-top: 1rem;
}

#activity_2 {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 1rem;
  margin-bottom: 0;
  padding-top: 1rem;
}

#activity_3 {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 1rem;
  margin-bottom: 0;
  padding-top: 1rem;
}

#activity_4 {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 1rem;
  margin-bottom: 0;
  padding-top: 1rem;
}

#app {
  width: 100%;
  max-width: none;
  position: fixed;
  top: 60px;
  bottom: 90px;
  text-align: center;
}

#card-activities {
  height: 400px;
  width: auto;
  overflow-y: auto;
}

#card-activities-content {
  overflow-y: auto;
  height: auto;
  padding: 16px;
}

#contact-logos {
  padding-top: 0;
}

#container-activities {
  height: 400px;
  width: auto;
}

#edit-button {
  width: auto;
  background-color: #65B0FF;
  color: white;
}

#edit-columns {
  margin-left: 0;
  margin-right: 0;
}

#edit-column-left {
  padding-top: 0;
  padding-bottom: 0;
}

#edit-column-right {
  padding-top: 0;
  padding-bottom: 0;
}

#personal-infos {
  text-align: left;
}

#profile {
  width: 850px;
  height: 465px;
  min-width: 850px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#profile-column-right {
  position: absolute;
  right: 20px;
}

#profile-picture {
  width: auto;
  height: 100%;
  margin: auto;
  max-width: 100%;
}

#switch {
  margin-top: 50px;
}

.columns {
  width: 100%;
  height: 100%;
  margin: 1px 0;
  column-gap: 0.75rem;
}

.modal {
  z-index: 1000;
}

.modal-card {
  height: 65%;
  width: 60%;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  width: 700px;
}

.modal-container {
  width: 85%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  max-height: 85%;
  overflow-y: scroll;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.notification {
  width: 100%;
  height: 100%;
  padding: 1.25rem 1.5rem 1.25rem 1.5rem;
  border-radius: 15px;
}
</style>
