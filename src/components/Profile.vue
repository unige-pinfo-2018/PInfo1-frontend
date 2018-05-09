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
            <div class="tile is-ancestor is-vertical">
              <div class="tile is-parent">
                <!-- Tile of the profil picture -->
                <article class="tile is-child notification box is-white">
                  <figure class="image is-4by3">
                    <img id="profile-picture" src="http://freevectorsite.com/wp-content/uploads/2013/08/Mustache-and-glasses-Vector-Graphic.jpg">
                  </figure>
                </article>
              </div>
              <div class="tile is-parent">
                <!-- Tile of the personal infos -->
                <article v-for="u in user" :key="u.id" class="tile is-child notification box is-white">
                  <div id="personal-infos" class="content">
                    <p><i class="fa fa-bookmark"></i>&ensp;{{u.name}}</p>
                    <p><i class="fa fa-user"></i>&ensp;{{u.username}}</p>
                    <p><i class="fa fa-university"></i>&ensp;{{u.university}}</p>
                    <p><i class="fa fa-desktop"></i>&ensp;{{u.field}}</p>
                    <p><i class="fa fa-graduation-cap"></i>&ensp;{{u.cursus}}</p>
                    <!--<p><i class="fa fa-bookmark"></i>&ensp;Steve Hostettler</p>
                    <p><i class="fa fa-user"></i>&ensp;Best_Prof_ever</p>
                    <p><i class="fa fa-university"></i>&ensp;University of Geneva</p>
                    <p><i class="fa fa-desktop"></i>&ensp;Computer Science</p>
                    <p><i class="fa fa-graduation-cap"></i>&ensp;Professor</p>-->
                  </div>
                </article>
              </div>
            </div>
          </div>
          <!-- The second column of the profile container, with the activities card, the contact logos and the edit button -->
          <div id="profile-column-right" class="column is-7">
            <div class="tile is-ancestor is-vertical">
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

                      <article class="media">
                      <figure class="media-left">
                        <p class="image is-48x48">
                          <img src="https://lh5.ggpht.com/jaxy6yyOOhXRQOyHpmeccsP0fuvSZxe0ezRDZ_hWiSh3XPM32T9-t9Bj-gJ_u-tp-Sc=w170" style="border-radius: 50%;">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>Title of a post about biology.</strong>
                            <br />
                            <small>A sneak peek of the post...</small>
                          </p>
                        </div>
                      </div>
                      <div class="level-left">
                        <a class="level-item">
                            <button class="button is-outlined"
                                    style="color: #2196F3; border-color: #2196F3"
                                    @click="isVisible = true; answer($event)">
                              View
                            </button>
                          </a>
                      </div>
                    </article>
                    <article id="activity_1" class="media">
                      <figure class="media-left">
                        <p class="image is-48x48">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/480px-Python-logo-notext.svg.png" style="border-radius: 50%;">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>Title of a post about python.</strong>
                            <br />
                            <small>A sneak peek of the post...</small>
                          </p>
                        </div>
                      </div>
                      <div class="level-left">
                        <a class="level-item">
                            <button class="button is-outlined"
                                    style="color: #2196F3; border-color: #2196F3"
                                    @click="isVisible = true; answer($event)">
                              View
                            </button>
                          </a>
                      </div>
                    </article>
                    <article id="activity_2" class="media">
                      <figure class="media-left">
                        <p class="image is-48x48">
                          <img src="https://physics.uconn.edu/wp-content/uploads/sites/1363/2015/08/physics.png" style="border-radius: 50%;">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>Title of a post about physics.</strong>
                            <br />
                            <small>A sneak peek of the post...</small>
                          </p>
                        </div>
                      </div>
                      <div class="level-left">
                        <a class="level-item">
                            <button class="button is-outlined"
                                    style="color: #2196F3; border-color: #2196F3"
                                    @click="isVisible = true; answer($event)">
                              View
                            </button>
                          </a>
                      </div>
                    </article>
                    <article id="activity_3" class="media">
                      <figure class="media-left">
                        <p class="image is-48x48">
                          <img src="https://lh5.ggpht.com/jaxy6yyOOhXRQOyHpmeccsP0fuvSZxe0ezRDZ_hWiSh3XPM32T9-t9Bj-gJ_u-tp-Sc=w170" style="border-radius: 50%;">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>Title of a post about something.</strong>
                            <br />
                            <small>A sneak peek of the post...</small>
                          </p>
                        </div>
                      </div>
                      <div class="level-left">
                        <a class="level-item">
                            <button class="button is-outlined"
                                    style="color: #2196F3; border-color: #2196F3"
                                    @click="isVisible = true; answer($event)">
                              View
                            </button>
                          </a>
                      </div>
                    </article>
                    <article id="activity_4" class="media">
                      <figure class="media-left">
                        <p class="image is-48x48">
                          <img src="https://lh5.ggpht.com/jaxy6yyOOhXRQOyHpmeccsP0fuvSZxe0ezRDZ_hWiSh3XPM32T9-t9Bj-gJ_u-tp-Sc=w170" style="border-radius: 50%;">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>Title of a post about something else</strong>
                            <br />
                            <small>A sneak peek of the post...</small>
                          </p>
                        </div>
                      </div>
                      <div class="level-left">
                        <a class="level-item">
                            <button class="button is-outlined"
                                    style="color: #2196F3; border-color: #2196F3"
                                    @click="isVisible = true; answer($event)">
                              View
                            </button>
                          </a>
                      </div>
                    </article>

                      <!-- <article v-for="post in posts" :key="post.id" class="media" :id="post.id">
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
                      </article> -->
                      <article class="media" id="footer">
                        <footer style="background-color: white; margin-right: auto; margin-left: auto">
                          <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3">Load more</button>
                        </footer>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
              <!-- The edit button and contact logos-->
              <div id="contact-logos" class="tile is-parent ">
                <div class="columns">
                  <div class="column">
                    <i class="fa fa-facebook-square"></i>
                    <i class="fa fa-twitter-square"></i>
                    <i class="fa fa-linkedin"></i>
                    <i class="fa fa-instagram"></i>
                  </div>
                  <div class="column">
                    <!-- <a id="edit-button" class="button is-rounded" @click="launch">Edit my profile</a> -->
                    <a id="edit-button" class="button is-rounded">Edit my profile</a>
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
          <button class="delete" aria-label="close" @click="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <div id="edit-columns" class="columns is-variable is-5">
              <div id="edit-column-left" class="column is-half">
                <!-- Name -->
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input class="input" type="text" value="Steve Hostettler">
                  </div>
                  <p class="help">This name won't be displayed on the website.</p>
                </div>
                <!-- Email -->
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input is-static" type="email" value="Steve.Hostettler@unige.ch" readonly>
                  </div>
                </div>
                <!-- Faculty -->
                <div class="field">
                  <label class="label">Faculty</label>
                  <div class="control">
                    <input class="input" type="text" value="Computer Science">
                  </div>
                </div>
                <!-- Contact box -->
                <div class="field">
                  <label class="label">Contact</label>
                  <div class="control">
                    <textarea class="textarea" placeholder="Text area"></textarea>
                  </div>
                </div>
              </div>
              <div id="edit-column-right" class="column is-half">
                <!-- Username -->
                <div class="field">
                  <label class="label">Username</label>
                  <div class="control has-icons-left has-icons-right">
                    <input class="input is-success" type="text" value="Best_Prof_ever">
                    <span class="icon is-small is-left">
                                              <i class="fa fa-user"></i>
                                            </span>
                    <span class="icon is-small is-right">
                                              <i class="fa fa-check"></i>
                                            </span>
                  </div>
                  <p class="help is-success">This username is available</p>
                </div>
                <!-- School -->
                <div class="field">
                  <label class="label">School</label>
                  <div class="control">
                    <input class="input is-static" type="email" value="University of Geneva" readonly>
                  </div>
                </div>
                <!-- Degree -->
                <div class="field">
                  <label class="label">Degree</label>
                  <div class="control">
                    <div class="select">
                      <select>
                                            <option>Options</option>
                                            <option>Bachelor</option>
                                            <option>Master</option>
                                            <option>PhD</option>
                                            <option>Assistant</option>
                                            <option>Professor</option>
                                          </select>
                    </div>
                  </div>
                </div>
                <!-- Profile picture -->
                <div class=" field">
                  <label class="label">Profile picture</label>
                  <div class="file">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume">
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fa fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose a profile picture...
                            </span>
                        </span>
                    </label>
                  </div>
                </div>
                <!-- Switch -->
                <div id="switch" class="field">
                  <b-switch type="is-info" v-model="isSwitchedCustom" true-value="Contact informations sharded" false-value="Contact informations not sharded">
                    {{ isSwitchedCustom }}
                  </b-switch>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="field is-grouped-right">
            <button class="button is-info">Save changes</button>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Profile',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg.jpg'))
  },
  data () {
    return {
      user: [
        {
          name: "Kilian Ruchti",
          username: "@Kiki",
          university: "Geneva",
          cursus: "Bachelor",
          field: "Computer Science"
        }
      ],
      isSwitched: false,
      isSwitchedCustom: 'Contact informations not sharded',
      isActive: false
    }
  },
  methods: {
    launch: function () {
      this.isActive = true
    },
    close: function () {
      this.isActive = false
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
    }
  },
  beforeMount () {
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
        console.log(error.response)
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
  height: 350px;
  overflow-y: auto;
}

#card-activities-content {
  overflow-y: auto;
  height: 87%;
  padding: 16px;
}

#contact-logos {
  padding-top: 0;
}

#container-activities {
  height: 350px;
  width: 500px;
}

#edit-button {
  position: absolute;
  right: 30px;
  bottom: 3px;
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
  height: 85%;
  width: 60%;
}

.notification {
  width: 100%;
  height: 100%;
  padding: 1.25rem 1.5rem 1.25rem 1.5rem;
  border-radius: 15px;
}
</style>
