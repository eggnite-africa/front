<template>
  <v-container>
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
