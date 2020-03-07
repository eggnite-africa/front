<template>
  <v-container>
    <v-card>
      <v-card-title>New Competition</v-card-title>
      <v-card-text>
        <competition-page-post
          @update-competition="addCompetition($event)"
          submit-label="Add Competition"
        ></competition-page-post>
      </v-card-text>
    </v-card>
    <snackbar-message
      :delay="delay"
      :display="display"
      :isErr="isErr"
      :message="message"
    ></snackbar-message>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { slugify } from '@/static/utils/slugify'
import CompetitionPagePost from '@/components/CompetitionsPagePost.vue'
import SnackbarMessage from '@/components/shared/SnackbarMessage.vue'
export default {
  name: 'CompetitionPageAdd',
  components: {
    CompetitionPagePost,
    SnackbarMessage
  },
  data() {
    return {
      delay: 3000,
      display: false,
      isErr: false,
      message: ''
    }
  },
  methods: {
    async addCompetition(newCompetition) {
      try {
        await this.$apollo
          .mutate({
            mutation: gql`
              mutation addCompetition($newCompetition: NewCompetitionInput!) {
                addCompetition(newCompetition: $newCompetition) {
                  id
                  name
                }
              }
            `,
            variables: {
              newCompetition
            }
          })
          .then(({ data: { addCompetition } }) => {
            const { name } = addCompetition
            this.$router.replace(`/c/${slugify(name)}`)
          })
      } catch (e) {
        this.message = 'There was an error adding the competition'
        this.isErr = this.display = true
        setTimeout(() => (this.display = !this.display), this.delay)
      }
    }
  }
}
</script>
