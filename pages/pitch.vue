<template>
  <v-container>
    <v-card>
      <v-card-title>Add Idea</v-card-title>
      <v-card-text>
        <pitch-post-page
          @update-pitch="updateData($event)"
          :onSubmit="addPitch"
        >
          add
        </pitch-post-page>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import PitchPostPage from '@/components/PitchPostPage.vue'
export default {
  name: 'PitchPage',
  components: {
    PitchPostPage
  },
  data() {
    return {
      newPitch: {}
    }
  },
  methods: {
    updateData(data) {
      this.newPitch = data
    },
    async addPitch(newPitch) {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation addPitch($newPitch: NewPitchInput!) {
              addPitch(newPitch: $newPitch) {
                id
              }
            }
          `,
          variables: {
            newPitch: this.newPitch
          }
        })
        .then(({ data: { addPitch } }) => {
          const { id } = addPitch
          this.$router.replace({
            name: 'p-id',
            params: {
              id
            }
          })
        })
    }
  }
}
</script>
