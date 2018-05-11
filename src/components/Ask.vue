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
        <div id="askBox" v-on:keyup.enter="switchColor($event)">
          <div class="columns">
            <div id="askTags" class="column" style="max-width: 100px">
              <b-taginput class="myTags" style="border-radius: 25px; width: fit-content; border: none; max-height: 400px; top: 14%"
                          v-model="tags" rounded
                          type='color'
                          maxtags = "5"
                          placeholder = "Tags">
              </b-taginput>
            </div>
            <div class="column">
              <b-field horizontal>
                <formly-form :form="form" :model="model" :fields="fields" style="border: none; width: 550px; margin-left: 15%;"></formly-form>
              </b-field>
            </div>
            <div class="column">
              <section>
                <b-field>
                  <b-upload v-model="dropFiles"
                            multiple
                            drag-drop
                            style="margin-left: 30%"
                            v-on:input="handleUpload">
                    <section class="section">
                      <div class="content has-text-centered">
                        <p>
                          <b-icon
                            icon="upload"
                            size="is-large">
                          </b-icon>
                        </p>
                        <p>Drop your files here or click to upload</p>
                      </div>
                    </section>
                  </b-upload>
                </b-field>
                <div class="files">
                  <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary"
                  style="margin-left: 30%">
                {{file.name}}
                    <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                    </button>
                  </span>
                </div>
              </section>
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
      dropFiles: [],
      user: [ // information of the current user that's logged in
        {
          id: '1',
          username: '@theogio',
          name: 'Théo Giovanna',
          profilePicture: 'http://foundrysocial.com/wp-content/uploads/2016/12/Anonymous-Icon-Round-01.png'
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
    handleUpload() {
      let self = this
      let files = this.$data.dropFiles;
      let promises = []
      if (files.length !== 0) {
        if (files.length <= 5) {
          self.success('Upload in progress.... Links will automatically appear in your post when it is uploaded')
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
              for (let i=0; i<result.length; i++) {
                self.$data.model.message += '![img]('+result[i].data.data.link+')'
              }
              self.$data.dropFiles = []
            })
            .catch((error) => {
              console.log('image post error')
              console.log(error)
            })
        } else {
          self.warning('Cannot upload more than 5 files at a time')
        }
      }
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
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
      let self = this
      if (this.form.$valid) { // Checks that there's something in the text-field area
        let msg = this.$data.model.message // Gets the message
        axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
          .then(function (response) {
            axios.put('http://127.0.0.1:18080/post-service/rest/posts/addPost', {
              "userId": response.data[1].id,
              "content": msg
            })
              .then(function (response) {
                self.success('Message successfully created')
                let id = response.data
                if (self.$data.tags.length !== 0) {
                  let query = 'http://127.0.0.1:18080/post-service/rest/tags/addTags?postId=' + id
                  for (let i = 0; i < self.$data.tags.length; i++) {
                    query = query + '&names=' + self.$data.tags[i]
                  }
                  axios.put(query)
                    .then(function (response) {
                      return true
                    })
                    .catch(function (error) {
                      self.warning('Could not connect to database')
                      console.log(error.response);
                      return false
                    });
                }
                self.$data.model.message = ""
                return true
              })
              .catch(function (error) {
                self.warning('Could not connect to database')
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
        self.warning('Please correct your entries')
      }
    },
    renderMessage: async function () {
      let userLoggedIn = await this.updateUserInfo()
      this.$data.user = []
      this.$data.user.push(userLoggedIn)
      let self = this
      axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
        .then(function (response) {
          if (response.data[0] === false) {
            self.warning('You must be logged in to access this page')
            self.$router.push('/login')
          } else {
            self.$data.source = self.$data.model.message
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
    switchColor: function (event) {
      if (event.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id") === "askTags") {
        let self = this
        if (self.$data.tags.length !== 0) {
          /* Makes sure we never have too much tags */
          self.$data.counter = self.$data.tags.length
          /* Picks a random number */
          let r = Math.floor(Math.random() * Math.floor(4))
          /* Picks a random color */
          let color = self.$data.colors[r];
          /* Changes the color of the tag */
          document.getElementById("askBox").getElementsByClassName("myTags")[0]
            .getElementsByClassName("taginput-container is-focusable")[0]
            .childNodes[self.$data.counter - 1].className = "tag " + color + " is-rounded"
        }
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
    }
  },
  beforeMount() {
    let self = this
    /* When the component is mounted, the functions below are triggered */
    axios.get('http://127.0.0.1:18080/users-service/rest/users/isLoggedIn', {withCredentials: true})
      .then(function (response) {
        if (response.data[0] === false) {
          self.warning('You must be logged in to access this page')
          self.$router.push('/login')
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
    width: 1200px;
    left: 10%;
    top: 25%;
    height: 400px;
    position: fixed;
    overflow-y: scroll;
  }
  #askBox {
    margin-top: 7%;
    margin-left: 7%;
    max-width: 1000px;
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
