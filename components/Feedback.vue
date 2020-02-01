<template>
  <v-dialog v-model="dialog" v-if="$auth.loggedIn" max-width="500" persistent>
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
      <v-card-title>
        Your voice matters!
      </v-card-title>
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

    <v-card color="teal" class="mt-5">
      <v-card-title>
        Your feedback
        <div class="ml-auto">
          <v-btn @click.stop="dialog = false" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-select
          :items="types"
          v-model="feedback.type"
          filled
          label="Type"
        ></v-select>
        <v-textarea v-model="feedback.content" filled auto-grow></v-textarea>
      </v-card-text>
      <v-card-actions>
        <div class="ml-auto mr-4">
          <v-btn icon>
            <v-icon dense>mdi-send</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
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
          firstName: ''
        }
      },
      types: ['Bug', 'Feature request', 'Other'],
      feedback: {
        type: '',
        content: ''
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
