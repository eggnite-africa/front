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
      <v-card-actions></v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { slugify } from '@/static/utils/slugify'
import CompetitionPagePost from '@/components/CompetitionsPagePost.vue'
export default {
  name: 'CompetitionPageAdd',
  components: {
    CompetitionPagePost
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
      } catch (e) {}
    }
  }
}
</script>
