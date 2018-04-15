<!-- Author: @GiovannaTheo -->
<!-- This file controls the signup module -->

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
    <div id="signup">
      <figure class="avatar">
        <img src="../assets/logo.png" width="90" height="90">
      </figure>
      <div v-on:keyup.enter="signup" class="columns">
        <div class="column is-6">
          <formly-form :form="form1" :model="model1" :fields="fields1" style="border: none"></formly-form>
        </div>
        <div class="column is-6">
          <formly-form :form="form2" :model="model2" :fields="fields2" style="border: none"></formly-form>
          <br/><br/>
          <div class="field is-grouped" style="max-width: 300px; margin-left: auto; margin-right: auto">
            <div class="control">
              <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="signup">Submit</button>
            </div>
            <div class="control">
              <router-link :to="{name: 'Login'}">
                <button class="button is-text">Already have an account?</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */

import confirmSignUp from '@/components/ConfirmSignUp.vue'

 export default {
    name: 'SignUp',
    created: function () {
      this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
    },
    methods: {
      signup: function () {
        let tmp = this  //if this is not declared here, using it in the block below
                        //doesn't reference the correct instance of vue, so $router
                        //can't be used.
        if (this.form1.$valid && this.form2.$valid){ //check if fields are correctly filled
          axios.put('http://127.0.0.1:18080/users-service/rest/users/add', {
            "username": this.$data.model2.username,
            "email": this.$data.model1.email,
            "role": "USER", //by default a new user is just a user
            "password": this.$data.model1.password
          })
            .then(function (response) {
              console.log(response);
              alert('Signup successfull. Check your inbox')
              tmp.$router.push('/confirmSignUp')
            })
            .catch(function (error) {
              console.log(error.response);
            });
        } else {
          alert('Please correct your inputs !')
        }
      }
    },
    data () {
      return {
        form1: {},
        model1: {},
        fields1: [
          {
            key: 'email',
            type: 'input-with-field',
            required: true,
            templateOptions: {
              properties: {
                'type': 'email',
                'maxlength': 40,
                'placeholder': "email@university.com"
              },
              wrapper: {
                properties: {
                  'label': 'Email',
                  'addons': false,
                  'style': "max-width: 300px; margin-left: auto; margin-right: auto"
                }
              }
            },
            validators: {
              format: {
                expression(field, model, next) {
                  next(/^[\w.\-]+@(unige.ch|etu.unige.ch|epfl.ch|ethz.ch|uzh.ch|unil.ch)$/.test(model[field.key]))
                },
                message: 'Email doesn\'t match any university'
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
          },
          {
            key: 'password_repeat',
            type: 'input-with-field',
            required: true,
            templateOptions: {
              properties: {
                'password-reveal': true,
                'type': 'password',
                'placeholder': "Repeat password"
              },
              wrapper: {
                properties: {
                  'addons': false,
                  'label': 'Repeat password',
                  'style': "max-width: 300px; margin-left: auto; margin-right: auto"
                },
              }
            },
            validators: {
              reliability: {
                expression: 'model[ field.key ] == model.password',
                message: 'Password must match'
              }
            }
          }
        ],
        form2: {},
        model2: {},
        fields2: [
          {
            key: 'username',
            type: 'input-with-field',
            required: true,
            templateOptions: {
              properties: {
                'type': 'text',
                'maxlength': 30,
                'placeholder': "Username"
              },
              wrapper: {
                properties: {
                  'addons': false,
                  'label': 'Username',
                  'style': "max-width: 300px; margin-left: auto; margin-right: auto"
                },
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
            key: "cursus",
            type: "select-with-field",
            required: true,
            templateOptions: {
              options: [
                {
                  label: "Cursus",
                  options: [
                    {
                      "text": "Bachelor",
                      "value": "bachelor"
                    },
                    {
                      "text": "Master",
                      "value": "master"
                    },
                    {
                      "text": "Doctorate",
                      "value": "phd"
                    },
                    {
                      "text": "Assistant",
                      "value": "assitant"
                    },
                    {
                      "text": "Professor",
                      "value": "professor"
                    }
                  ]
                },
              ],
              properties: {
                "icon": "school",
                "placeholder": "Select...",
                "required": true
              },
              wrapper: {
                properties: {
                  "addons": false,
                  "label": "Cursus",
                  'style': "max-width: 300px; margin-left: auto; margin-right: auto"
                }
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
  #signup {
    background-color: white;
    border-radius: 25px;
    border: 2px solid #FFFFFF;
    width: 750px;
    height: 410px;
    position: fixed;
    left: 24%;
    bottom: 25%;
  }
</style>
