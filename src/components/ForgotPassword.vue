<!-- Author: @GiovannaTheo -->
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
    <div v-on:keyup.enter="resetPassword" id="forgot">
      <figure class="avatar">
        <img src="../assets/logo.png" width="90" height="90">
      </figure>
      <formly-form :form="form" :model="model" :fields="fields" style="border: none"></formly-form>
      <br/>
      <div class="field is-grouped" style="max-width: 300px; margin-left: auto; margin-right: auto">
        <div class="control">
          <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="resetPassword">Submit</button>
        </div>
        <div class="control">
          <router-link :to="{name: 'Login'}">
            <button class="button is-text">Already have an account?</button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: "ForgotPassword",
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
    resetPassword: function () {
      let tmp = this
      if (this.form.$valid){ //check if fields are correctly filled
        axios.get('http://localhost:18080/users-service/rest/users/request_password_reset?email='+this.$data.model.email)
          .then(function (response) {
            console.log(response)
            tmp.success('Please check your inbox')
            tmp.$router.push('/newpassword')
            return true
          })
          .catch(function (error) {
            tmp.warning('Email address not found in database')
            console.log(error.response);
            return false
          });
      } else {
        tmp.warning('Please correct your input')
      }
    }
  },
  data () {
    return {
      form: {},
      model: {},
      fields: [
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
                'label': 'Please enter your email address',
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
  #forgot {
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
