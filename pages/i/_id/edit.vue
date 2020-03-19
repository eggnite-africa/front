<template>
  <v-container>
    <v-snackbar v-model="message.display">
      <v-icon :color="message.err ? 'red' : 'green'" left dense>
        {{ message.icon }}
      </v-icon>
      {{ message.text }}
      <v-btn @click.stop="message.display = false" text color="red">
        close
      </v-btn>
    </v-snackbar>
    <v-card v-if="!$apollo.loading">
      <v-card-name>Edit: {{ pitch.name }}</v-card-name>
      <v-card-text>
        <pitch-post-page
          :name="pitch.name"
          :problem="pitch.problem"
          :solution="pitch.solution"
          :skills="pitch.skills"
          :needs="pitch.needs"
          @update-pitch="updatePitch($event)"
          :onSubmit="updatePitch"
        >
          update
        </pitch-post-page>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import PitchPostPage from '@/components/PitchPostPage.vue'
export default {
  name: 'PitchEditPage',
  components: {
    PitchPostPage
  },
  data() {
    return {
      message: {
        display: false,
        err: false,
        text: '',
        icon: ''
      }
    }
  },
  asyncData() {
    return {
      pitch: {
        id: '',
        name: '',
        problem: '',
        solution: '',
        skills: '',
        needs: ''
      }
    }
  },
  apollo: {
    pitch: {
      query: gql`
        query fetchPitchForUpdate($id: ID!) {
          pitch(id: $id) {
            id
            name
            problem
            solution
            skills
            needs
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  },
  methods: {
    async updatePitch(updatedPitchPayload) {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation updatePitch($updatedPitch: UpdatedPitchInput!) {
              updatePitch(updatedPitch: $updatedPitch) {
                id
              }
            }
          `,
          variables: {
            updatedPitch: {
              id: this.pitch.id,
              ...updatedPitchPayload
            }
          }
        })
        this.message.err = false
        this.message.icon = 'mdi-check'
        this.message.text = 'The pitch was successfully updated!'
      } catch (e) {
        this.message.err = true
        this.message.icon = 'mdi-close'
        this.message.text = 'There was an error updating the pitch'
      } finally {
        this.message.display = true
      }
    }
  },
  head() {
    return {
      name: this.pitch.name
    }
  },
  middleware: ['auth', 'isPitchOwner']
}
</script>
