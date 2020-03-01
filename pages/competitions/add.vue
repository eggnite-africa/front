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
// import gql from 'graphql-tag'
import CompetitionPagePost from '@/components/CompetitionsPagePost.vue'
export default {
  name: 'CompetitionPageAdd',
  components: {
    CompetitionPagePost
  },
  methods: {
    addCompetition(newCompetition) {
      console.log(newCompetition)
      // await this.$apollo.mutate({
      //   mutation: gql`mutation addCompetition(newCompetition: NewCompetitionInput!) {
      //     addCompetition(newCompetition: $newCompetition) {
      //       id
      //     }
      //   }`,
      //   variables: {
      //     newCompetition
      //   }
      // })
    }
  }
}
</script>
