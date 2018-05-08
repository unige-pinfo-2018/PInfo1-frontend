<!-- Author: @GiovannaTheo -->
<!-- This file contains the box used to log in -->
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
    <div v-on:keyup.enter="login" id="login">
      <figure class="avatar">
        <img src="../assets/logo.png" width="90" height="90">
      </figure>
      <formly-form :form="form" :model="model" :fields="fields" style="border: none"></formly-form>
      <br/>
      <div class="field is-grouped" style="max-width: 300px; margin-left: auto; margin-right: auto">
        <div class="control">
          <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="login">Submit</button>
        </div>
        <div class="control">
          <router-link :to="{name: 'SignUp'}">
            <button class="button is-text">Sign Up</button>
          </router-link>
        </div>
        <div class="control">
          <router-link :to="{name: 'ForgotPassword'}">
            <button class="button is-text">Forgot your password?</button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'login',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  methods: {
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
    login: function () {
      let tmp = this  //if this is not declared here, using it in the block below
                      //doesn't reference the correct instance of vue, so $router
                      //can't be used.
      if (this.form.$valid){ //check if fields are correctly filled
        axios.post('http://127.0.0.1:18080/users-service/rest/users/login', {
          "username": this.$data.model.username,
          "password": this.$data.model.password
        }, {withCredentials: true})
          .then(function (ignored) {
            axios.post('http://127.0.0.1:18080/notifications-service/rest/authenticator/login', {
              "username": tmp.$data.model.username,
              "password": tmp.$data.model.password
            }, {withCredentials: true})
              .then(function (ignored) {
                axios.post('http://127.0.0.1:18080/post-service/rest/posts/login', {
                  "username": tmp.$data.model.username,
                  "password": tmp.$data.model.password
                }, {withCredentials: true})
                  .then(function (ignored) {
                    tmp.$data.isAuth = true
                    tmp.$router.push('/')
                    return true
                  })
                  .catch(function (error) {
                    tmp.warning('Please check your credentials')
                    console.log(error.response);
                    return false
                  });
                return true
              })
              .catch(function (error) {
                tmp.warning('Please check your credentials')
                console.log(error.response);
                return false
              });
            return true
          })
          .catch(function (error) {
            tmp.warning('Please check your credentials')
            console.log(error.response);
            return false
          });
      } else {
        tmp.warning('Please correct your inputs')
      }
    }
  },
  data () {
    return {
      form: {},
      model: {},
      fields: [
        {
          key: 'username',
          type: 'input-with-field',
          required: true,
          templateOptions: {
            properties: {
              'type': 'text',
              'maxlength': 30,
              'placeholder': "JohnDoe"
            },
            wrapper: {
              properties: {
                'label': 'Username',
                'addons': false,
                'style': "max-width: 300px; margin-left: auto; margin-right: auto"
              }
            }
          },
          validators: {
            length: {
              expression: "model[field.key].length > 0",
              message: "This field is mandatory"
            }
          }
        },
        {
          key: 'password',
          type: 'input-with-field',
          required: true,
          templateOptions: {
            properties: {
              'password-reveal': true,
              'type': 'password',
              'placeholder': "Password"
            },
            wrapper: {
              properties: {
                'addons': false,
                'label': 'Password',
                'style': "max-width: 300px; margin-left: auto; margin-right: auto"
              },
            }
          },
          validators: {
            reliability: {
              expression: 'model[field.key].length > 8',
              message: 'Password is too short'
            }
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  /*
   * Override Bulma rules to properly display a non-standard field.
   */
  .field.is-addons-ordered {
    flex-wrap: wrap;
    position: relative;
    // Set validation message position
    & > {
      .label {
        width: 100%;
      }
      // Only for a field with .control > .help
      // In other case set .help { width: 100% }
      .help {
        position: absolute;
        bottom: 0;
      }
    }
    // Override border-radius of controls
    div.control:first-of-type .button,
    div.control:first-of-type .input,
    div.control:first-of-type .select select {
      border-radius: 3px 0 0 3px;
    }
    div.control:last-of-type .button,
    div.control:last-of-type .input,
    div.control:last-of-type .select select {
      border-radius: 0 3px 3px 0;
    }
    // Override margin of controls
    div.control:not(:first-of-type),
    div.control:not(:last-of-type) {
      margin: 0;
    }
    // Remove borders
    .is-left-border-none {
      border-left: none;
    }
    .is-right-border-none {
      border-right: none;
    }
  }
</style>

<style>
  #login {
    background-color: white;
    border-radius: 25px;
    border: 2px solid #FFFFFF;
    width: 550px;
    height: 380px;
    position: fixed;
    left: 31%;
    bottom: 27%;
  }
</style>
