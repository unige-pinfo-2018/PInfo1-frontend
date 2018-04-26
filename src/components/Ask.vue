<!-- Author: @GiovannaTheo -->
<!-- This file controls the particuls that are on screen -->

<template>
  <section>
    <div>
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
      <div id="ask">
        <div id="askBox" v-on:keyup.enter="switchColor">
          <div class="columns">
            <div class="column" style="max-width: 100px">
              <b-taginput class="myTags" style="border-radius: 25px; width: fit-content; border: none; max-height: 400px; top: 14%"
                          v-model="tags" rounded
                          type='color'
                          maxtags = "5"
                          placeholder = "Tags">
              </b-taginput>
            </div>
            <div class="column">
              <b-field horizontal>
                <formly-form :form="form" :model="model" :fields="fields" style="border: none"></formly-form>
              </b-field>
            </div>
          </div>

          <b-field horizontal><!-- Label left empty for spacing -->
            <p class="control">
              <button v-on:click="isVisible=true; renderMessage()" class="button is-outlined" style="color: #2196F3; border-color: #2196F3">
                Preview
              </button>
            </p>
          </b-field>
        </div>
      </div>
      <div id="question" v-show="isVisible">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <article v-for="u in user" :key="u.id" class="media">
                  <figure class="media-left">
                    <p class="image is-64x64">
                      <img :src="u.profilePicture" style="border-radius: 50%;">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{{u.name}}</strong> <small>{{u.username}}</small> <small>now</small>
                        <br>
                      </p>
                      <vue-markdown :source="source"></vue-markdown>
                    </div>
                  </div>
                </article>
                <article class="media" id="footerAnswer">
                  <footer style="background-color: white; margin-right: auto; margin-left: auto">
                    <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="isVisible=false">Close</button>
                    <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="isVisible=false; postMessage()">Post message</button>
                  </footer>
                </article>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import VueMarkdown from 'vue-markdown'
export default {
  name: 'Ask',
  components: {
    VueMarkdown
  },
  data() {
    return {
      user: [ // information of the current user that's logged in
        {
          id : this.$store.state.userID,
          username: this.$store.state.userUSR,
          name: this.$store.state.userNAME,
          profilePicture: this.$store.state.userPic
        }
      ],
      model: {},
      form: {},
      fields: [
        {
          key: 'subject',
          type: 'input-with-field',
          required: true,
          templateOptions: {
            properties: {
              'type': 'text',
              'placeholder': "Subject"
            },
            wrapper: {
              properties: {
                'label': 'Subject',
                'addons': false,
              }
            }
          },
          validators: {
            reliability: {
              expression: 'model[field.key].length > 0',
              message: 'Cannot be empty'
            }
          }
        },
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
          },
          validators: {
            reliability: {
              expression: 'model[field.key].length > 0',
              message: 'Cannot be empty'
            }
          }
        }
      ],
      isVisible: false,
      source: "",
      tags: [],
      colors: [ // all colors that the tags can recieve
        'is-info',
        'is-success',
        'is-warning',
        'is-danger'
      ],
      counter: 0
    }
  },
  methods: {
    success(text) {
      this.$dialog.alert({
        title: 'Success',
        message: text,
        type: 'is-success',
        hasIcon: true,
        icon: 'check-circle',
        iconPack: 'fa'
      })
    },
    empty: function (str) {
      if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "") {
        return true;
      } else {
        return false;
      }
    },
    postMessage: function () {
      if (this.form.$valid) { // Checks that there's something in the text-field area
        let tmp = this
        let msg = this.$data.model.message // Gets the message
        axios.put('http://127.0.0.1:18080/post-service/rest/posts/addPost', {
          "userId": tmp.$data.user[0].id,
          "content": msg
        })
          .then(function (response) {
            tmp.success('Message successfully created')
            let id = response.data
            if (tmp.$data.tags.length !== 0) {
              let query = 'http://127.0.0.1:18080:18080/post-service/rest/tags/addTags?postId=' + id
              for (let i = 0; i < tmp.$data.tags.length; i++) {
                query = query + '&names=' + tmp.$data.tags[i]
              }
              axios.put(query)
                .then(function (response) {
                  return true
                })
                .catch(function (error) {
                  tmp.warning('Could not connect to database')
                  console.log(error.response);
                  return false
                });
            }
            tmp.$data.model.message = ""
            return true
          })
          .catch(function (error) {
            tmp.warning('Could not connect to database')
            console.log(error.response);
            return false
          });
      } else {
        tmp.warning('Please correct your entries')
      }
    },
    renderMessage() {
      let tmp = this
      axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
        .then(function (response) {
          if (response.data[0] === false) {
            tmp.warning('You must be logged in to access this page')
            tmp.$router.push('/login')
          } else {
            tmp.$store.commit('switch_id', response.data[1].id)
            tmp.$store.commit('switch_name', response.data[1].name)
            tmp.$store.commit('switch_usr', '@'+response.data[1].username)
            tmp.$store.commit('switch_pic', response.data[1].pictureUrl)
            tmp.$data.source = tmp.$data.model.message
          }
          return true
        })
        .catch(function (error) {
          console.log(error.response);
          return false
        });
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
    switchColor: function () {
      let tmp = this
      if (tmp.$data.tags.length !== 0) {
        /* Makes sure we never have too much tags */
        tmp.$data.counter = tmp.$data.tags.length
        /* Picks a random number */
        let r = Math.floor(Math.random() * Math.floor(4))
        /* Picks a random color */
        let color = tmp.$data.colors[r];
        /* Changes the color of the tag */
        document.getElementById("askBox").getElementsByClassName("myTags")[0]
          .getElementsByClassName("taginput-container is-focusable")[0]
          .childNodes[tmp.$data.counter - 1].className = "tag " + color + " is-rounded"
      }
    }
  },
  beforeMount() {
    let tmp = this
    /* When the component is mounted, the functions below are triggered */
    axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
      .then(function (response) {
        if (response.data[0] === false) {
          tmp.warning('You must be logged in to access this page')
          tmp.$router.push('/login')
        } else {
          tmp.$store.commit('switch_id', response.data[1].id)
          tmp.$store.commit('switch_name', response.data[1].name)
          tmp.$store.commit('switch_usr', '@'+response.data[1].username)
          tmp.$store.commit('switch_pic', response.data[1].pictureUrl)
        }
        return true
      })
      .catch(function (error) {
        console.log(error.response);
        return false
      });
  },
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  }
}
</script>

<style>
  #ask {
    background-color: white;
    border-radius: 25px;
    width: 900px;
    left: 25%;
    top: 25%;
    height: 400px;
    position: fixed;
    overflow-y: scroll;
  }
  #askBox {
    margin-top: 7%;
    margin-left: 7%;
    max-width: 700px;
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
