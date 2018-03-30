<!-- Author: @GiovannaTheo -->
<!-- This file contains the relevant functions and forms for the registration (sign up button) form -->

<template>
  <v-dialog v-model="dialog" ref="form" persistent max-width="500px">
      <v-btn outline color="indigo" right="false" slot="activator">Sign up</v-btn>
      <!-- set background color so the box isn't see-through -->
      <v-card style="background-color: white">
        <v-card-title>
          <span class="headline">Registration</span>
        </v-card-title>
        <v-card-text>
        <!-- Creating a grid so we can put our elements -->
          <v-container grid-list-md>
            <v-layout wrap>
            <!-- For sizes and disposition, refer to the doc. about the grids in vuetify -->
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Name"
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="15"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Last Name"
                  v-model="lastName"
                  :error-messages="nameErrors"
                  :counter="15"
                  @input="$v.lastName.$touch()"
                  @blur="$v.lastName.$touch()"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="E-mail"
                  v-model="email"
                  :error-messages="emailErrors"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Password"
                  v-model="password"
                  @input="$v.pswd.$touch()"
                  @blur="$v.pswd.$touch()"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Buttons and actions on press -->
          <v-btn color="indigo" outline @click.native="dialog = false; clear();">Close</v-btn>
          <v-btn color="indigo" outline @click.native="dialog = false; clear();">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<!-- Define the constraints for the email format etc, and the functions allowing to send and clear data -->

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(15) },
    email: { required, email },
    select: { required },
    checkbox: { required }
  },

  data: () => ({
    dialog: false,
    name: '',
    email: '',
    select: null
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 15 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },

  methods: {
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.lastName = ''
      this.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
