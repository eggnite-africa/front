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
          <v-btn @click.stop="sendFeedback()" :loading="loading" icon>
            <v-icon v-text="icon" dense></v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="sent">
      Sent
    </v-snackbar>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'Feedback',
  data() {
    return {
      dialog: false,
      sent: false,
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
      },
      loading: false,
      icon: 'mdi-send'
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
  },
  methods: {
    async sendFeedback() {
      const feedback = { ...this.feedback }
      if (!feedback.type || !feedback.content) return
      feedback.type = feedback.type.split(' ')[0].toUpperCase()
      this.loading = true
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation sendFeedback($feedback: NewFeedbackInput!) {
              addFeedback(feedback: $feedback) {
                id
              }
            }
          `,
          variables: {
            feedback
          }
        })
        this.loading = false
        this.icon = 'mdi-checkbox-marked-circle-outline'
        setTimeout(() => {
          this.feedback.type = ''
          this.feedback.content = ''
          this.icon = 'mdi-send'
        }, 3000)
      } catch (err) {
        this.loading = false
        this.icon = 'mdi-alert-circle-outline'
      }
    }
  }
}
</script>
