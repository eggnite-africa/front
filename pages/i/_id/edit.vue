<template>
  <v-container>
    <v-card v-if="!$apollo.loading">
      <v-card-title>Edit: {{ pitch.title }}</v-card-title>
      <v-card-text>
        <pitch-post-page
          :title="pitch.title"
          :content="pitch.content"
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
        title: '',
        content: ''
      }
    }
  },
  apollo: {
    pitch: {
      query: gql`
        query fetchPitchForUpdate($id: ID!) {
          pitch(id: $id) {
            id
            title
            content
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
    async updatePitch(payload) {
      const { title, ...updatedPitchPayload } = payload
      await this.$apollo.mutate({
        mutation: gql`
          mutation updatePitch($updatedPitch: UpdatedPitchInput!) {
            updatePitch(updatedPitch: $updatedPitch) {
              id
              content
            }
          }
        `,
        variables: {
          updatedPitch: {
            userId: this.$auth.user.id,
            id: this.pitch.id,
            ...updatedPitchPayload
          }
        }
      })
    }
  },
  head() {
    return {
      title: this.pitch.title
    }
  },
  middleware: ['auth', 'isPitchOwner']
}
</script>
