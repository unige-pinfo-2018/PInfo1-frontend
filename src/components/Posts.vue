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
                      <textarea class="textarea" placeholder="Add a comment..."></textarea>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control">
                      <button class="button">Post comment</button>
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
      isVisible: false,
      tags: [],
      colors: [
        'is-info',
        'is-success',
        'is-warning',
        'is-danger'
      ],
      counter: 0,
      answerTo: [
      ],
      posts: [
        {
          id: "post0",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
          profilePicture: "http://acevasupportservices.com/wp-content/uploads/2014/11/profile-pic-round-300x295.jpg",
          numberOfComments: "6",
          name: "Taha Ponce",
          username: "@tahaponce",
          date: "3y"
        },
        {
          id: "post1",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
          profilePicture: "http://www.abbieterpening.com/wp-content/uploads/2013/10/profile-pic-round-200px.png",
          numberOfComments: "4",
          name: "Meera Mcconnell",
          username: "@mcconnell",
          date: "2d"
        }
      ],
      user: [
        {
          username: "@admin",
          name: "Ranters",
          profilePicture: "https://t4.ftcdn.net/jpg/00/68/77/03/160_F_68770340_LuNbpob370ftmWxS0FzYQiIwkEY5iEVt.jpg"
        }
      ]
    }
  },
  methods: {

    // TODO: Write a method for the post comment button that auto-inject a new post in the current thread
    // TODO: Send the new post to the database
    // TODO: Allow users to upload pictures with Imgur API
    // TODO: Allow users to user markdown when writting posts
    // TODO: connect to the database to retrieve the true profile picture (link) of the user logged in
    // TODO: retrieve comments from the database and append them to the original post if they exist

    answer: function(event) {
      let postID = event.target
        .parentElement.parentElement.parentElement.parentElement
        .parentElement.getAttribute("id")
      let postNumberID = postID.match(/\d/g).join("")
      let post = this.$data.posts[postNumberID]
      post.id = "answer"+ postNumberID
      this.$data.answerTo.push(post)
    },
    deletePost: function () {
      this.$data.answerTo.splice(0,1)
    },
    loadmore: function () {
      let id = this.$data.posts.length
      this.$data.posts.push(
        {
          id: "post"+(id).toString(),
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
          profilePicture: "https://media.creativemornings.com/uploads/user/avatar/167913/Adam_LR_Round_Profile_Pic.jpg",
          numberOfComments: "2",
          name: "John Smith",
          username: "@johnsmith",
          date: "4w"
        }
      )
    },
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
    max-width: 700px;
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
