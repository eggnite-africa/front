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
                v-model="user.email"
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
                type="password"
                label="New password"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="passwordConfirmation"
                :disabled="!correctPassword"
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

export default {
  name: 'SettingsAccount',
  computed: {
    userId() {
      return this.$auth.user.id
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
      this.correctPassword = await this.$axios.$post('auth/check-password', {
        password
      })
    },
    async changeUserEmail(email) {
      await this.$axios
        .$post('auth/change-email', { email })
        .then(() => this.$apollo.queries.user.refresh())
    },
    async changeUserPassword(password) {
      await this.$axios.$post('auth/change-password', { password })
    },
    async onSubmit() {
      const email = this.user.email
      const newPassword = this.newPassword
      try {
        await this.changeUserEmail(email)
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
      const userId = this.userId
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteUserAccount($userId: ID!) {
              deleteUser(userId: $userId)
            }
          `,
          variables: {
            userId
          }
        })
        .then(async () => {
          this.dialog = false
          await this.logout()
        })
    }
  }
}
</script>
