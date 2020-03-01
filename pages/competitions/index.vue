<template>
  <v-container>
    <v-row dense align="center" justify="end">
      <v-btn color="orange" nuxt to="/competitions/add" link>
        Add competition
      </v-btn>
    </v-row>
    <v-row v-if="!$apollo.loading" align="center">
      <v-col
        v-for="competition in competitionsList.competitions"
        :key="competition.name"
        cols="12"
        sm="6"
      >
        <competition-item
          :logo="competition.logo"
          :name="competition.name"
          :description="competition.description"
        ></competition-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import CompetitionItem from '@/components/CompetitionsPageSingleItem.vue'
export default {
  components: {
    CompetitionItem
  },
  asyncData() {
    return {
      competitionsList: {
        hasMore: null,
        competitions: [
          {
            name: '',
            logo: '',
            description: ''
          }
        ]
      }
    }
  },
  apollo: {
    competitionsList: {
      query: gql`
        query fetchAllCompetitions($page: Int!) {
          competitionsList(page: $page) {
            hasMore
            competitions {
              name
              logo
              description
            }
          }
        }
      `,
      variables: {
        page: 0
      },
      fetchPolicy: 'network-only'
    }
  }
}
</script>
