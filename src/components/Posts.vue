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
      <div id="tag" v-on:keyup.enter="getColor">
        <h4 style="margin-top: 20px; color: #000000;">Search for tags</h4>
        <b-taginput class="myTags" style="border-radius: 25px; max-height: 430px; margin-left: 15px; margin-top: 15px; margin-right: 15px; margin-bottom: 52px"
                    v-model="tags" rounded
                    type='color'
                    maxtags = "20">
        </b-taginput>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column" id="posts">
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
              <p>
                {{post.text}}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-right">
                <a class="level-item">
                  <b-icon
                    pack="fa"
                    icon="heart"
                    style="color: orangered;"
                  >
                  </b-icon>
                </a>
                <a class="level-item">
                  <b-icon
                    pack="fa"
                    icon="thumbs-down"
                    style="color: #000"
                  >
                  </b-icon>
                </a>
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
                    @click="loadmore">Load more</button>
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
                    <p>
                      {{ans.text}}
                    </p>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-right">
                      <a class="level-item">
                        <b-icon
                          pack="fa"
                          icon="heart"
                          style="color: orangered;"
                        >
                        </b-icon>
                      </a>
                      <a class="level-item">
                        <b-icon
                          pack="fa"
                          icon="thumbs-down"
                          style="color: #000"
                        >
                        </b-icon>
                      </a>
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
                        <p>
                          {{com.text}}
                        </p>
                      </div>
                      <nav class="level is-mobile">
                        <div class="level-right">
                          <a class="level-item">
                            <b-icon
                              pack="fa"
                              icon="heart"
                              style="color: orangered;"
                            >
                            </b-icon>
                          </a>
                          <a class="level-item">
                            <b-icon
                              pack="fa"
                              icon="thumbs-down"
                              style="color: #000"
                            >
                            </b-icon>
                          </a>
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
export default {
  /* eslint-disable */
  name: 'Posts',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  data() {
    return {
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
        {
          id : "1",
          username: "@theogio",
          name: "Théo Giovanna",
          profilePicture: "http://foundrysocial.com/wp-content/uploads/2016/12/Anonymous-Icon-Round-01.png"
        }
      ],
      userPost: [
        {
          "id": 0,
          "username": "",
          "name": "",
          "pictureUrl": "https://cdn5.vectorstock.com/i/thumb-large/72/44/bodybuilder-logo-icon-on-white-background-vector-18167244.jpg"
        }
      ],
      comments: [ // will contain all comments relative to a post
      ],
      nbTotalPosts: 0, // total number of posts that are stored in the DB
      from: 1, // where it starts fetching posts
      to: 5 // where it stops fetching posts
    }
  },
  methods: {

    // TODO: Allow users to upload pictures with Imgur API
    // TODO: Allow users to user markdown when writting posts
    // TODO: connect to the database to retrieve the true profile picture (link) of the user logged in

    /* Function used to popup a warning with a custom message */
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

    /* Retrieves posts from the DB. This function is called as soon as the component is mounted */
    retrievePosts: function () {
      let tmp = this
      /* First we retrieve how many posts we have in the DB */
      axios.get('http://127.0.0.1:18080/post-service/rest/posts/nbPosts/')
        .then(function (response) {
          tmp.$data.nbTotalPosts = response.data.nbPosts // sets number of posts that are in the DB
          return true
        })
        .catch(function (error) {
          tmp.warning('Could not connect to database')
          console.log(error.response);
          return false
        });

      let idPost = [], textPost = [], datePost = []
      /* Now we retrieve a fixed amount of post by default */
      axios.get('http://127.0.0.1:18080/post-service/rest/posts/content_by_ids?from='+this.$data.from.toString()+'&to='+this.$data.to.toString())
        .then(function (response) {
          let p = response.data
          let promises = [] // Requests that will have to be queried
          for (let i=0; i<p.length; i++) {
            /* Gets the info related to the post */
            if (p[i].entity.parentId == null) { // Then it is a post, so we can display it
              idPost.push(p[i].entity.id)
              textPost.push(p[i].entity.content)
              datePost.push(p[i].entity.datePost)
              promises.push(axios.get('http://127.0.0.1:18080/users-service/rest/users/by_id/'+p[i].entity.userId.toString()))
            }
          }
          /* To retrieve the comments */
          promises.push(axios.get('http://127.0.0.1:18080/post-service/rest/posts/getCommentsForPosts?from='+tmp.$data.from.toString()+'&to='+tmp.$data.to.toString()))
          /* Makes the call to get user info + comments in a synchronized way */
          axios.all(promises).then(function(results) {
            for (let i=0; i<results.length-1; i++) {
              let com = false
              if (results[tmp.$data.to-tmp.$data.from+1].data[""+(i+1).toString()+""].length !== 0) { // post has comment or not
                com = true
              }
              let date = new Date(datePost[i])
              let post = {
                hasComments: com, // just so it displays the comment accordingly to the number of comments of a post
                id: idPost[i],
                text: textPost[i],
                profilePicture: results[i].data.pictureUrl,
                numberOfComments: results[tmp.$data.to-tmp.$data.from+1].data[""+(i+1).toString()+""].length, // retrieved later
                name: results[i].data.name,
                username: "@"+results[i].data.username,
                date: date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
              }
              tmp.$data.posts.push(post)
            }
          });
        })
        .catch(function (error) {
          tmp.warning('Could not connect to database')
          console.log(error.response);
          return false
        });
    },

    /* When the button answer is clicked, it fires this function that retrieves the post
     * from which the button was clicked, and pushes it to the answer window in order to display it */
    answer: function (event) {
      let postID = event.target // Gets which post fired the answer function
        .parentElement.parentElement.parentElement.parentElement
        .parentElement.getAttribute("id")
      let postNumberID = postID.match(/\d/g).join("") // Gets just the number so we can construct an id and get the post
      let post = this.$data.posts[postNumberID-1] // Gets the post
      post.id = "answer"+ postNumberID // Construct a unique id
      this.$data.answerTo.push(post) // Pushes it to the answer window
      let tmp = this
      if (this.$data.posts[postNumberID-1].hasComments) {
        axios.get('http://127.0.0.1:18080/post-service/rest/posts/getCommentsForPost/'+postNumberID.toString())
          .then(function (response) {
            let p = response.data
            let promises = []
            for (let i=0; i<p.length; i++) {
              /* Queries to retrive user informations for the comments */
              promises.push(axios.get('http://127.0.0.1:18080/users-service/rest/users/by_id/' + (p[i].entity.userId).toString()))
            }
            axios.all(promises).then(function(results) {
              for (let i=0; i<results.length; i++) {
                let date = new Date(p[i].entity.datePost)
                let comment = {
                  hasComments: false, // because its a comment
                  id: p[i].entity.id,
                  text: p[i].entity.content,
                  profilePicture: results[i].data.pictureUrl,
                  numberOfComments: 0, // because its a comment
                  name: results[i].data.name,
                  username: "@"+results[i].data.username,
                  date: date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                }
                tmp.$data.comments.push(comment)
              }
            });
          })
          .catch(function (error) {
            tmp.warning('Could not fetch posts. Database not reachable')
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

    /* This function is triggered by a user wishing to load more post. It will fetch posts that are yet not
     * displayed in the database and push them onto the screen */
    loadmore: function () {
      let tmp = this
      this.$data.from += 5 // By default we want to display 5 more posts
      let diff = this.$data.nbTotalPosts - this.$data.from + 1 // Checks how many posts remaining can be displayed
      if (diff >= 5){ // Then we can fetch 5 posts
        tmp.$data.to += 5
      } else if (diff > 0) { // We can only fetch whats left
        tmp.$data.to += diff
      } else {
        tmp.warning("No more posts to load") // No more posts in the databse
      }
      if ((diff>0)){ // Then we can call the database
        let idPost = [], textPost = [], datePost = []
        axios.get('http://127.0.0.1:18080/post-service/rest/posts/content_by_ids?from='+this.$data.from.toString()+'&to='+this.$data.to.toString())
          .then(function (response) {
            let p = response.data
            let promises = []
            for (let i = 0; i < p.length; i++) {
              /* Gets the info related to the post */
              if (p[i].entity.parentId == null) { // Then it is a post, so we can display it
                idPost.push(p[i].entity.id)
                textPost.push(p[i].entity.content)
                datePost.push(p[i].entity.datePost)
                promises.push(axios.get('http://127.0.0.1:18080/users-service/rest/users/by_id/' + p[i].entity.userId.toString()))
              }
            }
            /* Makes the call to get user info in a synchronized way */
            axios.all(promises).then(function (results) {
              for (let i = 0; i < results.length; i++) {
                let date = new Date(datePost[i])
                let post = {
                  hasComments: false,
                  id: idPost[i],
                  text: textPost[i],
                  profilePicture: results[i].data.pictureUrl,
                  numberOfComments: 0, // retrieved later
                  name: results[i].data.name,
                  username: "@" + results[i].data.username,
                  date: date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                }
                tmp.$data.posts.push(post)
              }
            });
          }).catch(function (error) {
          tmp.warning('Could not fetch posts. Database not reachable')
          console.log(error.response);
          return false
        });
      }
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
    postComment: function (event) {
      if (!this.empty(this.$data.model.message)) { // Checks that there's something in the text-field area
        let tmp = this
        let msg = this.$data.model.message // Gets the message
        let id = this.$data.comments.length + 1 // Creates an id
        let postID = event.target // Gets the id for the parent post
          .parentElement.parentElement.parentElement.parentElement
          .parentElement.firstChild.getAttribute("id")
        let postNumberID = postID.match(/\d/g).join("") // Gets the number
        if (this.$data.posts[postNumberID-1].hasComments == false) { // Now the post has comment
          this.$data.posts[postNumberID-1].hasComments = true
        }
        this.$data.posts[postNumberID-1].numberOfComments ++
        let comment = { // creating the comment
          hasComments: false, // a comment cannot have comments
          id: "comment"+(id).toString(),
          text: msg,
          profilePicture: tmp.$data.user[0].profilePicture,
          name: tmp.$data.user[0].name,
          username: tmp.$data.user[0].username,
          date: "1min"
        }
        this.$data.comments.push(comment) // pushing it so it displays
        this.$data.model = {} // reinit the comment box

        axios.put('http://127.0.0.1:18080/post-service/rest/posts/addPost', {
          "userId": tmp.$data.user[0].id,
          "content": msg,
          "parentId": postNumberID
        })
          .then(function (response) {
            console.log(response)
            return true
          })
          .catch(function (error) {
            tmp.warning('Could not fetch posts. Database not reachable')
            console.log(error.response);
            return false
          });

      }
    },

    /* This function is used to change the tags color */
    getColor: function () {
      /* Makes sure we never have too much tags */
      this.$data.counter = this.$data.tags.length
      /* Picks a random number */
      let r = Math.floor(Math.random() * Math.floor(4))
      /* Picks a random color */
      let color = this.$data.colors[r];
      /* Changes the color of the tag */
      document.getElementById("tags").getElementsByClassName("myTags")[0]
        .getElementsByClassName("taginput-container is-focusable")[0]
        .childNodes[this.$data.counter-1].className = "tag " + color + " is-rounded"
    }
  },
  beforeMount(){
    /* When the component is mounted, the functions below are triggered */
    this.retrievePosts()
  }
}
</script>

<style>
  #tags {
    bottom: 23%;
    width: 100%;
    height: 60%;
    text-align: center;
    position: fixed;
    left: 10%;
  }

  #tag {
    background-color: white;
    color: black;
    border-radius: 25px;
    border: 2px solid #FFFFFF;
    max-width: 400px;
    max-height: 400px;
    position: fixed;
    left: 5%;
    top: 25%;
  }

  #posts {
    background-color: white;
    border-radius: 25px;
    width: 700px;
    left: 40%;
    top: 25%;
    max-height: 400px;
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
