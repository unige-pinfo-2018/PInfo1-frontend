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
    <div v-on:keyup.enter="confirmSignup" id="login">
      <figure class="avatar">
        <img src="../assets/logo.png" width="90" height="90">
      </figure>
      <formly-form :form="form" :model="model" :fields="fields" style="border: none"></formly-form>
      <br/>
      <div class="field is-grouped" style="max-width: 300px; margin-left: auto; margin-right: auto">
        <div class="control">
          <button class="button is-outlined" style="color: #2196F3; border-color: #2196F3" v-on:click="confirmSignup">Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: 'confirmSignUp',
  created: function () {
    this.$store.commit('switch_background', require('../assets/bg-black.jpg'))
  },
  methods: {
    confirmSignup: function () {
      let tmp = this
      if (this.form.$valid){ //check if fields are correctly filled
        axios.get('http://localhost:18080/users-service/rest/users/confirm?email='+this.$data.model.code)
          .then(function (response) {
            console.log(response)
            alert('Account confirmation successfull. You can now login')
            tmp.$router.push('/login')
            return true
          })
          .catch(function (error) {
            console.log(error.response);
            return false
          });
      } else {
        alert('Please correct your inputs !')
      }
    }
  },
  data () {
    return {
      form: {},
      model: {},
      fields: [
        {
          key: 'code',
          type: 'input-with-field',
          required: true,
          templateOptions: {
            properties: {
              'type': 'text',
              'placeholder': "Confirmation code"
            },
            wrapper: {
              properties: {
                'label': 'Confirmation code',
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
