<template>
  <div>
    <v-snackbar v-model="message.display">
      <v-icon :color="message.err ? 'red' : 'green'" left dense>{{
        message.icon
      }}</v-icon>
      {{ message.text }}
      <v-btn @click.stop="message.display = false" text color="red"
        >close</v-btn
      >
    </v-snackbar>
    <v-card>
      <v-card-title>Account</v-card-title>
      <form v-if="!$apollo.queries.user.loading">
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model.trim="user.email"
                :error-messages="emailErrors"
                @input="$v.user.email.$touch()"
                @blur="$v.user.email.$touch()"
                type="email"
                label="Email"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-subheader>Password</v-subheader>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :success="correctPassword"
                type="password"
                label="Old password"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newPassword"
                :disabled="!correctPassword"
                :error-messages="passwordErrors"
                @input="$v.newPassword.$touch()"
                @blur="$v.newPassword.$touch()"
                type="password"
                label="New password"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="passwordConfirmation"
                :disabled="!correctPassword"
                :error-messages="confirmPasswordErrors"
                @input="$v.passwordConfirmation.$touch()"
                @blur="$v.passwordConfirmation.$touch()"
                type="password"
                label="Confirm password"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click.stop="dialog = true" outlined color="red">
            Delete my account
          </v-btn>

          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">Account deletion</v-card-title>

              <v-card-text>
                Are you sure you want to do this?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click="dialog = false" text>
                  No
                </v-btn>

                <v-btn
                  @click.prevent="deleteAccount()"
                  color="red darken-1"
                  text
                >
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
            @click.prevent="onSubmit()"
            class="ml-auto"
            depressed
            color="primary"
            type="submit"
            >Update</v-btn
          >
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'
import {
  email,
  required,
  requiredIf,
  sameAs,
  minLength
} from 'vuelidate/lib/validators'
export default {
  name: 'SettingsAccount',
  computed: {
    userId() {
      return this.$auth.user.id
    },
    emailErrors() {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email.email && errors.push('email is invalid')
      !this.$v.user.email.isUnique && errors.push('email is already in use')
      !this.$v.user.email.required && errors.push('email is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.newPassword.$dirty) return errors
      !this.$v.newPassword.required && errors.push('password is required')
      !this.$v.newPassword.minLength &&
        errors.push('password should have a minimum length of 8 characters')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.passwordConfirmation.$dirty) return errors
      !this.$v.passwordConfirmation.required &&
        errors.push('password confirmation is required')
      !this.$v.passwordConfirmation.sameAsNewPassword &&
        errors.push('password does not match')
      return errors
    }
  },
  validations: {
    user: {
      email: {
        email,
        required,
        isUnique(v) {
          if (v === '') return !this.emailExists
          return !this.emailExists
        }
      }
    },
    newPassword: {
      required: requiredIf(function() {
        return this.correctPassword && this.newPassword
      }),
      minLength: minLength(8)
    },
    passwordConfirmation: {
      required: requiredIf(function() {
        return this.correctPassword && this.newPassword
      }),
      sameAsNewPassword: sameAs('newPassword')
    }
  },
  watch: {
    password(newValue, oldValue) {
      if (newValue.length >= 8) this.checkPassword(newValue)
    }
  },
  asyncData() {
    return {
      user: {
        email: ''
      },
      password: '',
      newPassword: '',
      passwordConfirmation: '',
      correctPassword: false,
      dialog: false,
      message: {
        icon: '',
        text: '',
        display: false,
        err: false
      }
    }
  },
  apollo: {
    user: {
      query: gql`
        query fetchUserEmail($userId: ID!) {
          user(id: $userId) {
            id
            email
          }
        }
      `,
      variables() {
        return {
          userId: this.userId
        }
      }
    }
  },
  methods: {
    ...mapActions({
      logout: 'utils/logout'
    }),
    async checkPassword(password) {
      const userId = this.userId
      this.correctPassword = await this.$axios.$post('auth/check-password', {
        userId,
        password
      })
    },
    async changeUserEmail(email) {
      const userId = this.userId
      await this.$axios
        .$post('auth/change-email', { userId, email })
        .then(() => this.$apollo.queries.user.refresh())
    },
    async changeUserPassword(password) {
      const userId = this.userId
      await this.$axios.$post('auth/change-password', {
        userId,
        password
      })
    },
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      const email = this.user.email
      const newPassword = this.newPassword
      try {
        if (email && email !== this.$auth.user.email)
          await this.changeUserEmail(email)
        if (newPassword && this.correctPassword)
          await this.changeUserPassword(newPassword)
        this.message.err = false
        this.message.icon = 'mdi-check'
        this.message.text = 'Your account settings were successfully updated! '
      } catch (e) {
        this.message.err = true
        this.message.icon = 'mdi-close'
        this.message.text = 'There was an error updating your account settings'
      } finally {
        this.message.display = true
      }
    },
    async deleteAccount() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteUserAccount($userId: ID!) {
              deleteUser(userId: $userId)
            }
          `,
          variables: {
            userId: this.userId
          }
        })
        .then(async () => {
          this.dialog = false
          await this.logout()
        })
    }
  },
  middleware: ['auth', 'isAccountOwner']
}
</script>
