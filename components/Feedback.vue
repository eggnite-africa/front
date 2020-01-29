<template>
  <v-dialog v-model="dialog" v-if="$auth.loggedIn" max-width="500">
    <template #activator="{ on }">
      <v-btn
        v-on="on"
        class="mb-10"
        elevation="3"
        fixed
        fab
        right
        bottom
        color="info"
      >
        <v-icon>mdi-voice</v-icon>
      </v-btn>
    </template>

    <v-card color="info">
      <v-card-title>Your voice matters!</v-card-title>
      <v-card-text>
        <p class="white--text">
          Hey {{ user.profile.firstName }},<br />
          <br />
          I want you to know that I <strong>really</strong> value your input, so
          if you have any ideas on how I can further improve your experience on
          the platform, don't hesitate!<br />
          <br />
          ~ Karim
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'Feedback',
  data() {
    return {
      dialog: false,
      user: {
        id: '',
        profile: {
          firstName: 'Rick'
        }
      }
    }
  },
  apollo: {
    user: {
      query: gql`
        query fetchUserFirstNameForFeedback($id: ID!) {
          user(id: $id) {
            id
            profile {
              firstName
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$auth.user.id
        }
      },
      skip() {
        return !this.$auth.loggedIn
      },
      debounce: 0.0001
    }
  }
}
</script>
