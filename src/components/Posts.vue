<!-- Author: @GiovannaTheo -->
<!--This file contains the layout for the section last posts-->
<template>
  <section>
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
    <div id="tags">
      <div id="tag" v-on:keyup.enter="switchColor">
        <!--<h4 style="margin-top: 20px; color: #000000;">Search for tags</h4>-->
        <b-taginput class="myTags" style="border-radius: 25px; max-height: 430px; margin-left: 15px; margin-top: 15px; margin-right: 15px; margin-bottom: 52px"
                    v-model="tags" rounded
                    type='color'
                    maxtags = "20"
                    placeholder="Search for tags..."
                    v-on:remove="updateSearch"
                    v-on:add="updateSearch">
        </b-taginput>
      </div>
    </div>
    <div id="posts" class="columns is-mobile">
      <div class="column" id="post">
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
              <div class="level-left">
                <a class="level-item">
                  <button class="button is-outlined"
                          style="color: #2196F3; border-color: #2196F3"
                          @click="isVisible = true; answer($event)">
                    Answer
                  </button>
                </a>
              </div>
            </nav>
          </div>
          <div class="media-right" style="text-align: center">
            <b-icon
              pack="fa"
              icon="comment"
              style="color: #44c784"
            >
            </b-icon>
            <p>{{post.numberOfComments}}</p>
          </div>
        </article>
        <article class="media" id="footer">
          <footer style="background-color: white; margin-right: auto; margin-left: auto">
            <button class="button is-outlined"
                    style="color: #2196F3; border-color: #2196F3"
                    v-if="this.$data.posts.length===0">No posts yet!</button>
          </footer>
        </article>
      </div>
    </div>
    <div id="answer" v-show="isVisible && updateUserInfo()">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container" v-on-clickaway="away">
              <article v-for="ans in answerTo" :key="ans.id" class="media" :id="ans.id">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img :src="ans.profilePicture" style="border-radius: 50%;">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ans.name}}</strong> <small>{{ans.username}}</small> <small>{{ans.date}}</small>
                      <br>
                    </p>
                    <vue-markdown> {{ans.text}} </vue-markdown>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-right">
                      <a id="upVote2" class="level-item" v-on:click="handleVote($event)">
                        <b-icon
                          v-bind:style="{color: ans.colorUpVote}"
                          id = 'votes'
                          icon="arrow-up"
                        >
                        </b-icon>
                      </a>
                      <a id="downVote2" class="level-item" v-on:click="handleVote($event)">
                        <b-icon
                          v-bind:style="{color: ans.colorDownVote}"
                          id = 'votes'
                          icon="arrow-down"
                        >
                        </b-icon>
                      </a>
                      <p>{{ans.vote}}</p>
                    </div>
                  </nav>
                  <article v-if="ans.hasComments" v-for="com in comments" :key="com.id" class="media" :id="com.id">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img :src="com.profilePicture" style="border-radius: 50%;">
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{{com.name}}</strong> <small>{{com.username}}</small> <small>{{com.date}}</small>
                          <br>
                        </p>
                        <vue-markdown> {{com.text}} </vue-markdown>
                      </div>
                      <nav class="level is-mobile">
                        <div class="level-right">
                          <a id="upVote3" class="level-item" v-on:click="handleVote($event)">
                            <b-icon
                              v-bind:style="{color: com.colorUpVote}"
                              id = 'votes'
                              icon="arrow-up"
                            >
                            </b-icon>
                          </a>
                          <a id="downVote3" class="level-item" v-on:click="handleVote($event)">
                            <b-icon
                              v-bind:style="{color: com.colorDownVote}"
                              id = 'votes'
                              icon="arrow-down"
                            >
                            </b-icon>
                          </a>
                          <p>{{com.vote}}</p>
                        </div>
                      </nav>
                    </div>
                  </article>
                </div>
              </article>
              <article class="media" id="commentBox">
                <figure class="media-left">
                  <p v-for="u in user" :key="u.id" class="image is-64x64">
                    <img :src="u.profilePicture" style="border-radius: 999px">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="field">
                    <p class="control">
                      <formly-form :form="form" :model="model" :fields="fields" style="border: none"></formly-form>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control">
                      <button class="button" v-on:click="postComment($event)">Post comment</button>
                      <b-upload v-model="files"
                                v-on:input="handleUpload">
                        <a class="button is-primary">
                          <b-icon icon="upload"></b-icon>
                          <span>Upload</span>
                        </a>
                      </b-upload>
                    </p>
                  </div>
                </div>
              </article>
              <article class="media" id="footerAnswer">
                <footer style="background-color: white; margin-right: auto; margin-left: auto">
                  <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="isVisible=false; deletePost()">Close</button>
                </footer>
              </article>
            </div>
          </div>
        </div>
      </transition>
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
  data() {
    return {
      files: [],
      model: {},
      form: {},
      fields: [
        {
          "key": "message",
          "type": "input-with-field",
          "templateOptions": {
            "properties": {
              "type": "textarea",
            },
            "wrapper": {
              "properties": {
                "label": "Message",
                "addons": false
              }
            }
          }
        }
      ],
      isVisible: false, // To show or not the answer window
      tags: [], // contains the tags
      colors: [ // all colors that the tags can recieve
        'is-info',
        'is-success',
        'is-warning',
        'is-danger'
      ],
      counter: 0, // used to assign colors to tags
      answerTo: [ // will contain the parent post that is displayed in the answer window
      ],
      posts: [ // contains all the post displayed on screen
      ],
      user: [ // information of the current user that's logged in
      ],
      comments: [ // will contain all comments relative to a post
      ]
    }
  },
  methods: {
    away: function() {
      let self = this
      if (this.$data.answerTo.length !== 0) {
        self.deletePost();
        self.$data.isVisible=false
      }
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
      for (let i=0; i<self.$data.posts.length; i++) {
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
        if (post.colorUpVote == "#dddddd" && post.colorDownVote != "#ff9100" ) {
          axios.put('http://127.0.0.1:18080/post-service/rest/likes/addLike',
            {
              "userId": self.$data.user[0].id,
              "postId": postID
            })
            .then(function (response) {
              axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+self.$data.user[0].id, {
                "idPosts": [post.id]
              })
                .then(function (response) {
                  post.vote = response.data[0][0]
                  post.colorUpVote = "#ff9100"
                  axios.get('http://127.0.0.1:18080/post-service/rest/posts/userId_by_id/'+postID)
                    .then(function (response) {
                      axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
                        "ids": [response.data]
                      }, {withCredentials: true})
                        .then(function (response) {
                          console.log(response)
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
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+self.$data.user[0].id, {
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
              axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+self.$data.user[0].id, {
                "idPosts": [post.id]
              })
                .then(function (response) {
                  post.vote = response.data[0][0]
                  post.colorDownVote = "#ff9100"
                  axios.get('http://127.0.0.1:18080/post-service/rest/posts/userId_by_id/'+postID)
                    .then(function (response) {
                      axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
                        "ids": [response.data]
                      }, {withCredentials: true})
                        .then(function (response) {
                          console.log(response)
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
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+self.$data.user[0].id, {
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
    handleUpload() {
      let self = this
      let promises = []
      let formData = new FormData();
      formData.append('image', self.$data.files[0])
      const config = {
        baseURL: 'https://api.imgur.com',
        headers: {
          'Authorization': 'Client-ID ' + '254c66d26ff90cc'
        }
      }
      promises.push(axios.post('/3/image', formData, config))
      axios.all(promises)
        .then((result) => {
          for (let i=0; i<result.length; i++) {
            self.$data.model.message += '![img]('+result[i].data.data.link+')'
          }
          self.$data.dropFiles = []
        })
        .catch((error) => {
          console.log(error)
        })
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

    /* Retrieves posts from the DB. This function is called as soon as the component is mounted */
    retrievePosts: async function () {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let self = this
      let idPost = [], textPost = [], datePost = [], userIdsToQuery = [], nbComments = []
      let profilePictures = [], names = [], usernames = []
      axios.get('http://127.0.0.1:18080/post-service/rest/posts/contents', { withCredentials: true })
        .then(function (response) {
          if (response.data != null && response.data.length > 0 && response.data[0].length !== 0) {
            for (let i=0; i<response.data[0].length; i++) {
              let date = new Date(response.data[0][i].datePost)
              datePost.push(date)
              idPost.push(response.data[0][i].id)
              textPost.push(response.data[0][i].content)
              userIdsToQuery.push(response.data[0][i].userId)
              nbComments.push(response.data[1][i].length)
            }

            axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
              "ids": userIdsToQuery
            }, {withCredentials: true})
              .then(function (response) {
                for (let i=0; i<response.data.length; i++) {
                  profilePictures.push(response.data[i].pictureUrl)
                  names.push(response.data[i].name)
                  usernames.push(response.data[i].username)
                }
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+self.$data.user[0].id, {
                  "idPosts": idPost
                }, { withCredentials: true })
                  .then(function (response) {
                    for (let i=0; i<response.data[0].length; i++) {
                      let post = {
                        hasComments: nbComments[i] > 0, // just so it displays the comment accordingly to the number of comments of a post
                        id: idPost[i],
                        text: textPost[i],
                        profilePicture: profilePictures[i],
                        numberOfComments: nbComments[i],
                        name: names[i],
                        username: "@"+usernames[i],
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

    /* When the button answer is clicked, it fires this function that retrieves the post
     * from which the button was clicked, and pushes it to the answer window in order to display it */
    answer: async function (event) {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let self = this
      let postID = event.target // Gets which post fired the answer function
        .parentElement.parentElement.parentElement.parentElement
        .parentElement.getAttribute("id")
      let postNumberID = postID.match(/\d/g).join("") // Gets just the number so we can construct an id and get the post
      let post
      for (let i=0; i<self.$data.posts.length; i++) {
        if (self.$data.posts[i].id == postNumberID) { // look for the right post to inject in the answer window
          post = self.$data.posts[i]
        }
      }
      self.$data.answerTo.push(post) //Pushes it to the answer window
      if (post.hasComments) {
        axios.get('http://127.0.0.1:18080/post-service/rest/posts/getCommentsForPost/'+postNumberID.toString())
          .then(function (response) {
            let p = response.data[0]
            let userIdsToQuery = [], postIdsToQuery = [], datePost = []
            for (let i=p.length-1; i>=0; i--) {
              /* User ids that we will have to retrieve */
              userIdsToQuery.push(p[i].userId)
              postIdsToQuery.push(p[i].id)
              datePost.push(new Date(p[i].datePost))
            }
            datePost.reverse()
            let profilePictures = [], names = [], usernames = []
            /* Now we retrieve the information of the users that commented and we display the posts */
            axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
              "ids": userIdsToQuery
            }).then(function (response) {
              for (let i=response.data.length-1; i>=0; i--) {
                profilePictures.push(response.data[i].pictureUrl)
                names.push(response.data[i].name)
                usernames.push(response.data[i].username)
              }
              axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+self.$data.user[0].id, {
                "idPosts": postIdsToQuery
              })
                .then(function (response) {
                  for (let i=response.data[0].length-1; i>=0; i--) {
                    let comment = {
                      hasComments: false, // just so it displays the comment accordingly to the number of comments of a post
                      id: p[i].id,
                      text: p[i].content,
                      profilePicture: profilePictures[i],
                      numberOfComments: 0,
                      name: names[i],
                      username: "@"+usernames[i],
                      date: datePost[i].getDay() + '/' + datePost[i].getMonth() + '/' + datePost[i].getFullYear() + ' - ' + datePost[i].getHours() + ':' + datePost[i].getMinutes() + ':' + datePost[i].getSeconds(),
                      colorUpVote: response.data[1][i].like == false ? "#dddddd" : "#ff9100",
                      colorDownVote: response.data[1][i].dislike == false ? "#dddddd" : "#ff9100",
                      vote: response.data[0][i]
                    }
                    self.$data.comments.push(comment) // pushing the data so they display
                  }
                  return true
                })
                .catch(function (error) {
                  self.warning('Could not fetch posts. Database not reachable')
                  console.log(error.response);
                  return false
                });
              return true
            }).catch(function (error) {
              self.warning('Could not fetch posts. Database not reachable')
              console.log(error.response);
              return false
            });
          })
          .catch(function (error) {
            self.warning('Could not fetch posts. Database not reachable')
            console.log(error.response);
            return false
          });
      }
    },

    /* Simply re-initialize the answer window post and the comments */
    deletePost: function () {
      this.$data.answerTo.splice(0,1) // removes the first (and unique) element of array answerTo
      this.$data.comments = []
    },

    /* Checks if a string is empty or undefined or only contains white spaces */
    empty: function (str) {
      if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "") {
        return true;
      } else {
        return false;
      }
    },

    /* This function is triggered when a user answers an existing post */
    postComment: async function (event) {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      if (!this.empty(this.$data.model.message)) { // Checks that there's something in the text-field area
        let self = this
        let msg = this.$data.model.message // Gets the message
        let id = this.$data.comments.length + 1 // Creates an id
        let postID = event.target // Gets the id for the parent post
          .parentElement.parentElement.parentElement.parentElement
          .parentElement.firstChild.getAttribute("id")
        let postNumberID = postID.match(/\d/g).join("") // Gets the number
        let post
        for (let i=0; i<this.$data.posts.length; i++) {
          if (self.$data.posts[i].id == postNumberID) { // look for the right post to inject in the answer window
            post = self.$data.posts[i]
          }
        }
        if (post.hasComments == false) { // Now the post has comment
          post.hasComments = true
        }
        console.log(postID)
        post.numberOfComments ++
        axios.put('http://127.0.0.1:18080/post-service/rest/posts/addPost', {
          "userId": self.$data.user[0].id,
          "content": msg,
          "parentId": postNumberID
        })
          .then(function (response) {
            let comment = { // creating the comment
              hasComments: false, // a comment cannot have comments
              id: response.data,
              text: msg,
              profilePicture: self.$data.user[0].profilePicture,
              name: self.$data.user[0].name,
              username: "@"+self.$data.user[0].username,
              date: "now",
              colorUpVote: "#dddddd",
              colorDownVote: "#dddddd",
              vote: 0
            }
            self.$data.comments.push(comment) // pushing it so it displays
            self.$data.model = {} // reinit the comment box
            axios.get('http://127.0.0.1:18080/post-service/rest/posts/userId_by_id/'+postID)
              .then(function (response) {
                axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
                  "ids": [response.data]
                }, {withCredentials: true})
                  .then(function (response) {
                    console.log(response)
                    self.sendNotification(response.data[0].username, 'New comment on your post')
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
      }
    },

    /* This function is used to change the tags color and retrieve posts that have the tag*/
    switchColor: function () {
      let self = this
      if (self.$data.tags.length !== 0) {
          /* Makes sure we never have too much tags */
          self.$data.counter = self.$data.tags.length
          /* Picks a random number */
          let r = Math.floor(Math.random() * Math.floor(4))
          /* Picks a random color */
          let color = self.$data.colors[r];
          /* Changes the color of the tag */
          document.getElementById("tags").getElementsByClassName("myTags")[0]
            .getElementsByClassName("taginput-container is-focusable")[0]
            .childNodes[self.$data.counter-1].className = "tag " + color + " is-rounded"
      }
    },

    /* This function is triggered when a user input tags when looking at all posts */
    updateSearch: async function () {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let self = this
      let tags = ""
      /* First we construct a string that will be used in the request to the server */
      if (this.$data.tags.length !== 0) {
        this.$data.isVisibleLoadMore = false
        for (let i = 0; i<this.$data.tags.length; i++) {
          tags = tags + '&t=' + self.$data.tags[i]
        }
        let query = 'http://127.0.0.1:18080/post-service/rest/posts/posts_and_comments_by_tags?n=100'+tags
        /* We use these variables to store temporary data while doing the second request to the server */
        let idPost = [], textPost = [], datePost = [], nbComments = [], userIdsToQuery = []
        let names = [], usernames = [], profilePictures = []
        /* First, we retrieve the posts and their comments (to display the number of comments) of the posts that
         * match the tags */
        axios.get(query)
          .then(function (response) {
            if (response.data.length !== 0) { //then we have results
              self.$data.posts = [] // we remove existing posts
              for (let i=0; i<response.data[1].length; i++) {
                nbComments.push(response.data[1][i].length) // we save the number of comments of each post
              }
              /* We store temporarily the contents of the posts */
              for (let i=response.data[0].length-1; i>=0; i--) {
                datePost.push(new Date(response.data[0][i].datePost))
                idPost.push(response.data[0][i].id)
                textPost.push(response.data[0][i].content)
                userIdsToQuery.push(response.data[0][i].userId)
              }
              /* Now we query the informations of the users that created the posts */
              axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
                "ids": userIdsToQuery
              })
                .then(function (response) {
                  for (let i=0; i<response.data.length; i++) {
                    profilePictures.push(response.data[i].pictureUrl)
                    names.push(response.data[i].name)
                    usernames.push(response.data[i].username)
                  }
                  axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+self.$data.user[0].id, {
                    "idPosts": idPost
                  })
                    .then(function (response) {
                      for (let i=0; i<response.data[0].length; i++) {
                        let post = {
                          hasComments: nbComments[i] > 0 ? true : false, // just so it displays the comment accordingly to the number of comments of a post
                          id: idPost[i],
                          text: textPost[i],
                          profilePicture: profilePictures[i],
                          numberOfComments: nbComments[i],
                          name: names[i],
                          username: "@"+usernames[i],
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
                  console.log(error.response);
                  return false
                });
            } else {
              self.warning('No results found')
            }
            return true
          })
          .catch(function (error) {
            self.warning('Could not connect to database')
            console.log(error.response);
            return false
          });
      } else { // if the tags that we provided do not match any post, we don't do anything
        this.$data.posts = []
        this.$data.isResultVisible = false
        this.retrievePosts()
      }
    },
    updateUserInfo: async function () {
      let self = this
      let b = []
      await
      axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
        .then(function (response) {
          if (response.data[0] === true) {
            b =  {
              id: response.data[1].id,
              username: response.data[1].username,
              name: response.data[1].name,
              profilePicture: response.data[1].pictureUrl
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
  #tags {
    bottom: 23%;
    width: 80%;
    height: 60%;
    text-align: center;
    position: fixed;
    overflow-y: scroll;
    left: 10%;
  }

  #tag {
    background-color: transparent;
    color: black;
    border-radius: 25px;
    border: transparent;
    width: 80%;
    height: 10%;
    position: fixed;
    margin-left: auto;
    margin-right: auto;
    overflow-y: scroll;
    top: 12%;
  }

  #posts {
    background-color: white;
    border-radius: 25px;
    width: 80%;
    text-align: center;
    top: 25%;
    height: 50%;
    position: fixed;
    overflow-y: scroll;
    margin-left: 8%;
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
    max-width: 85%;
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

</style>
