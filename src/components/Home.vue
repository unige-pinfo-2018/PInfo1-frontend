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
    <div id="searchbar" v-on:keyup.enter="switchColor($event)">
      <div class="field has-addons has-addons-centered">
        <p class="control is-expanded">
          <input id="question" class="input" type="text" placeholder="What can I do you for ?" style="height: 44px;">
        </p>
        <p class="control">
          <a class="button is-info"
             style="width: fit-content; height: 44px;"
             v-on:click="search">
            Search
          </a>
        </p>
      </div>
      <b-taginput class="myTags" style="border-radius: 25px; width: 100%; border: none"
                  v-model="tags" rounded
                  type='color'
                  maxtags = "5"
                  placeholder = "Tags"
                  v-on:remove="updateSearch"
                  v-on:add="updateSearch">
      </b-taginput>
    </div>
    <div v-if="isResultVisible" class="columns is-mobile">
      <div class="column" id="postsRes">
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
                  <button v-show="isAuth" class="button is-outlined"
                          style="color: #2196F3; border-color: #2196F3"
                          @click="isVisible = true; answer($event)">
                    Answer
                  </button>
                  <button v-show="!isAuth" class="button is-outlined"
                          style="color: #2196F3; border-color: #2196F3"
                          @click="isVisible = true; answer($event)">
                    Show
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
                    @click="loadmore"
                    v-if="isVisibleLoadMore">Load more</button>
          </footer>
        </article>
      </div>
    </div>
    <div id="answer" v-show="isVisible">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
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
              <article v-show="isAuth" class="media" id="commentBox">
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
import VueMarkdown from 'vue-markdown'
/* eslint-disable */
  export default {
  name: 'Home',
  components: {
    VueMarkdown
  },
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg.jpg'))
  },
  methods: {
    handleVote: async function (event) {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let tmp = this
      let action = event.target.parentElement.parentElement.getAttribute("id")
      let postID = event.target // Gets the id for the parent post
        .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id")
      let post = null
      for (let i=0; i<tmp.$data.posts.length; i++) {
        if (tmp.$data.posts[i].id == postID) { // look for the right post to inject in the answer window
          post = tmp.$data.posts[i]
        }
      }
      if (post == null) { // then we look for a comment
        for (let i = 0; i < tmp.$data.comments.length; i++) {
          if (tmp.$data.comments[i].id == postID) { // look for the right post to inject in the answer window
            post = tmp.$data.comments[i]
          }
        }
      }

      if (action == "upVote1" || action == "upVote2" || action == "upVote3") {
        if (post.colorUpVote == "#dddddd" && post.colorDownVote != "#ff9100" ) {
          axios.put('http://127.0.0.1:18080/post-service/rest/likes/addLike',
            {
              "userId": tmp.$data.user[0].id,
              "postId": postID
            })
            .then(function (response) {
              axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+tmp.$data.user[0].id, {
                "idPosts": [post.id]
              })
                .then(function (response) {
                  post.vote = response.data[0][0]
                  post.colorUpVote = "#ff9100"
                  return true
                })
                .catch(function (error) {
                  tmp.warning('Could not fetch posts. Database not reachable')
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
                "userId": tmp.$data.user[0].id,
                "postId": postID
              })
              .then(function (response) {
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+tmp.$data.user[0].id, {
                  "idPosts": [post.id]
                })
                  .then(function (response) {
                    post.vote = response.data[0][0]
                    post.colorUpVote = "#dddddd"
                    return true
                  })
                  .catch(function (error) {
                    tmp.warning('Could not fetch posts. Database not reachable')
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
              "userId": tmp.$data.user[0].id,
              "postId": postID
            })
            .then(function (response) {
              axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+tmp.$data.user[0].id, {
                "idPosts": [post.id]
              })
                .then(function (response) {
                  post.vote = response.data[0][0]
                  post.colorDownVote = "#ff9100"
                  return true
                })
                .catch(function (error) {
                  tmp.warning('Could not fetch posts. Database not reachable')
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
                "userId": tmp.$data.user[0].id,
                "postId": postID
              })
              .then(function (response) {
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+tmp.$data.user[0].id, {
                  "idPosts": [post.id]
                })
                  .then(function (response) {
                    post.vote = response.data[0][0]
                    post.colorDownVote = "#dddddd"
                    return true
                  })
                  .catch(function (error) {
                    tmp.warning('Could not fetch posts. Database not reachable')
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
    warning(text) {
      this.$dialog.alert({
        title: 'Error',
        message: text,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa'
      })
    },
    updateSearch: function () {
      let tmp = this
      let tags = ""
      /* First we construct a string that will be used in the request to the server */
      if (this.$data.tags.length !== 0) {
        this.$data.isVisibleLoadMore = false
        for (let i = 0; i<this.$data.tags.length; i++) {
          tags = tags + '&t=' + tmp.$data.tags[i]
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
              tmp.$data.isResultVisible = true
              tmp.$data.posts = [] // we remove existing posts
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
                  axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+tmp.$data.user[0].id, {
                    "idPosts": idPost
                  })
                    .then(function (response) {
                      console.log(response.data[1][0].like)
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
                        tmp.$data.posts.push(post) // pushing the data so they display
                      }
                      return true
                    })
                    .catch(function (error) {
                      tmp.warning('Could not fetch posts. Database not reachable')
                      console.log(error.response);
                      return false
                    });
                  return true
                })
                .catch(function (error) {
                  tmp.warning('Could not fetch posts. Database not reachable')
                  console.log(error.response);
                  return false
                });
            } else {
              tmp.warning('No results found')
            }
            return true
          })
          .catch(function (error) {
            tmp.warning('Could not connect to database')
            console.log(error.response);
            return false
          });
      } else { // if the tags that we provided do not match any post, we don't do anything
        this.$data.posts = []
        this.$data.isResultVisible = false
      }
    },
    answer: async function (event) {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let tmp = this
      let postID = event.target // Gets which post fired the answer function
        .parentElement.parentElement.parentElement.parentElement
        .parentElement.getAttribute("id")
      let postNumberID = postID.match(/\d/g).join("") // Gets just the number so we can construct an id and get the post

      let post
      for (let i=0; i<this.$data.posts.length; i++) {
        if (tmp.$data.posts[i].id == postNumberID) { // look for the right post to inject in the answer window
          post = tmp.$data.posts[i]
        }
      }
      this.$data.answerTo.push(post) // Pushes it to the answer window
      if (post.hasComments) {
        axios.get('http://127.0.0.1:18080/post-service/rest/posts/getCommentsForPost/'+postNumberID.toString())
          .then(function (response) {
            let p = response.data[0]
            let userIdsToQuery = [], postIdsToQuery = [], datePost = []
            for (let i=0; i<p.length; i++) {
              /* User ids that we will have to retrieve */
              userIdsToQuery.push(p[i].userId)
              postIdsToQuery.push(p[i].id)
              datePost.push(p[i].datePost)
            }
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
              axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+tmp.$data.user[0].id, {
                "idPosts": postIdsToQuery
              })
                .then(function (response) {
                  for (let i=0; i<response.data[0].length; i++) {
                    let date = new Date(datePost[i])
                    let comment = {
                      hasComments: false, // just so it displays the comment accordingly to the number of comments of a post
                      id: p[i].id,
                      text: p[i].content,
                      profilePicture: profilePictures[i],
                      numberOfComments: 0,
                      name: names[i],
                      username: "@"+usernames[i],
                      date: date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                      colorUpVote: response.data[1][i].like == false ? "#dddddd" : "#ff9100",
                      colorDownVote: response.data[1][i].dislike == false ? "#dddddd" : "#ff9100",
                      vote: response.data[0][i]
                    }
                    tmp.$data.comments.push(comment) // pushing the data so they display
                  }
                  return true
                })
                .catch(function (error) {
                  tmp.warning('Could not fetch posts. Database not reachable')
                  console.log(error.response);
                  return false
                });
              return true
            }).catch(function (error) {
              tmp.warning('Could not fetch posts. Database not reachable')
              console.log(error.response);
              return false
            });
          })
          .catch(function (error) {
            tmp.warning('Could not fetch posts. Database not reachable')
            console.log(error.response);
            return false
          });
      }
    },
    postComment: async function (event) {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      if (!this.empty(this.$data.model.message)) { // Checks that there's something in the text-field area
        let tmp = this
        let msg = this.$data.model.message // Gets the message
        let id = this.$data.comments.length + 1 // Creates an id
        let postID = event.target // Gets the id for the parent post
          .parentElement.parentElement.parentElement.parentElement
          .parentElement.firstChild.getAttribute("id")
        let postNumberID = postID.match(/\d/g).join("") // Gets the number
        let post
        for (let i=0; i<this.$data.posts.length; i++) {
          if (tmp.$data.posts[i].id == postNumberID) { // look for the right post to inject in the answer window
            post = tmp.$data.posts[i]
          }
        }
        if (post.hasComments == false) { // Now the post has comment
          post.hasComments = true
        }
        post.numberOfComments ++
        let comment = { // creating the comment
          hasComments: false, // a comment cannot have comments
          id: "comment"+(id).toString(),
          text: msg,
          profilePicture: tmp.$data.user[0].profilePicture,
          name: tmp.$data.user[0].name,
          username: "@"+tmp.$data.user[0].username,
          date: "now",
          colorUpVote: "#dddddd",
          colorDownVote: "#dddddd",
          vote: 0
        }
        this.$data.comments.push(comment) // pushing it so it displays
        this.$data.model = {} // reinit the comment box

        axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
          .then(function (response) {
            if (response.data[0] === false) {
              tmp.warning('You must be logged in to access this page')
              tmp.$router.push('/login')
            } else {
              axios.put('http://127.0.0.1:18080/post-service/rest/posts/addPost', {
                "userId": response.data[1].id,
                "content": msg,
                "parentId": postNumberID
              })
                .then(function (response) {
                  return true
                })
                .catch(function (error) {
                  tmp.warning('Could not fetch posts. Database not reachable')
                  console.log(error.response);
                  return false
                });
            }
            return true
          })
          .catch(function (error) {
            console.log(error.response);
            return false
          });
      }
    },
    deletePost: function () {
      this.$data.answerTo.splice(0,1) // removes the first (and unique) element of array answerTo
      this.$data.comments = []
    },
    empty: function (str) {
      if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "") {
        return true;
      } else {
        return false;
      }
    },
    switchColor: function (event) {
      let tmp = this
      if (event.target.parentElement.parentElement.parentElement.getAttribute("id") === "searchbar") {
        tmp.search()
      } else {
        if (tmp.$data.tags.length !== 0) {
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
      }
    },
    search: async function () {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let tmp = this
      let s = document.getElementById('question').value
      if (!tmp.empty(s)) {
        s = s.replace(/ /g,"+")
        let query = 'http://127.0.0.1:18080/post-service/rest/posts/searchPost?q='+s+'&n=100'

        for (let i=0; i<this.$data.tags.length; i++) {
          query = query + '&t=' + tmp.$data.tags[i]
        }

        /* We use these variables to store temporary data while doing the second request to the server */
        let idPost = [], textPost = [], datePost = [], nbComments = [], userIdsToQuery = []
        let names = [], usernames = [], profilePictures = []
        /* First, we retrieve the posts and their comments (to display the number of comments) of the posts that
         * match the tags */
        axios.get(query)
          .then(function (response) {
            if (response.data.length !== 0) { //then we have results
              tmp.$data.isResultVisible = true
              tmp.$data.posts = [] // we remove existing posts
              let query = "?id="+response.data[0]
              if (response.data.length > 1) {
                for (let i=1; i<response.data.length; i++) {
                  query = query + '&id='+response.data[i]
                }
              }
              console.log(query)
              axios.get('http://127.0.0.1:18080/post-service/rest/posts/posts_and_comments_by_ids/'+query)
                .then(function (response) {
                  for (let i=response.data[0].length - 1 ; i>=0; i--) {
                    nbComments.push(response.data[1][i].length)
                    idPost.push(response.data[0][i].id)
                    textPost.push(response.data[0][i].content)
                    datePost.push(new Date(response.data[0][i].datePost))
                    userIdsToQuery.push(response.data[0][i].userId)
                  }
                  axios.post('http://127.0.0.1:18080/users-service/rest/users/by_ids', {
                    "ids": userIdsToQuery
                  })
                    .then(function (response) {
                      for (let i=0; i<response.data.length; i++) {
                        profilePictures.push(response.data[i].pictureUrl)
                        names.push(response.data[i].name)
                        usernames.push(response.data[i].username)
                      }
                      axios.post('http://127.0.0.1:18080/post-service/rest/posts/nbUpvotes_by_ids/'+tmp.$data.user[0].id, {
                        "idPosts": idPost
                      })
                        .then(function (response) {
                          console.log(response.data[1][0].like)
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
                            tmp.$data.posts.push(post) // pushing the data so they display
                          }
                          return true
                        })
                        .catch(function (error) {
                          tmp.warning('Could not fetch posts. Database not reachable')
                          console.log(error.response);
                          return false
                        });
                      return true
                    })
                    .catch(function (error) {
                      tmp.warning('Could not fetch posts. Database not reachable')
                      console.log(error.response);
                      return false
                    });
                })
                .catch(function (error) {
                  tmp.warning('Could not fetch posts. Database not reachable')
                  console.log(error.response);
                  return false
                });
            } else {
              tmp.warning('No results found')
            }
            return true
          })
          .catch(function (error) {
            tmp.warning('No results match your query')
            console.log(error.response);
            return false
          });
        } else { // if the tags that we provided do not match any post, we don't do anything
          if (this.$data.tags.length !== 0) {
            //tmp.updateSearch()
          } else {
            tmp.$data.posts = []
            this.$data.isResultVisible = false
          }
        }
      },
    updateUserInfo: async function () {
      let tmp = this
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
              tmp.warning('You must be logged in to access this page')
              tmp.$router.push('/login')
            }
          })
          .catch(function (error) {
            console.log(error.response);
            return false
          });
      return b
    }
  },
  data() {
    return {
      isResultVisible: false,
      tags: [], // contains the tags
      colors: [ // all colors that the tags can recieve
        'is-info',
        'is-success',
        'is-warning',
        'is-danger'
      ],
      counter: 0, // used to assign colors to tags
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
      answerTo: [ // will contain the parent post that is displayed in the answer window
      ],
      posts: [ // contains all the post displayed on screen
      ],
      user: [ // information of the current user that's logged in
      ],
      comments: [ // will contain all comments relative to a post
      ],
      nbTotalPosts: 0, // total number of posts that are stored in the DB
      isVisibleLoadMore: false, // controls the visibility of the load more button
      isAuth: false
    }
  },
    beforeMount () {
      let tmp = this
      axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
        .then(function (response) {
          if (response.data[0] === true) {
            tmp.$data.isAuth = true
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
  #searchbar {
    width: 60%;
    left: 22%;
    top: 17%;
    position: fixed;
  }
  #postsRes {
    background-color: white;
    border-radius: 25px;
    width: 60%;
    left: 22%;
    top: 35%;
    max-height: 350px;
    position: fixed;
    overflow-y: scroll;
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
    width: 700px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    max-height: 400px;
    overflow-y: scroll;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
