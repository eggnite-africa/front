<template>
  <v-container>
    <v-card>
      <v-card-title>Edit {{ competitionName }}</v-card-title>
      <v-card-text>
        <competition-page-post
          :init-logo="competition.logo"
          :init-name="competition.name"
          :init-description="competition.description"
          :init-jury="competition.jury"
          :init-mods="competition.moderators"
          @update-competition="updateCompetition($event)"
          submit-label="update"
        ></competition-page-post>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { unslugify } from '@/static/utils/slugify'
import CompetitionPagePost from '@/components/CompetitionsPagePost.vue'
export default {
  name: 'CompetitionEditPage',
  components: {
    CompetitionPagePost
  },
  computed: {
    competitionName() {
      const { name } = this.$route.params
      return unslugify(name)
    }
  },
  asyncData() {
    return {
      competition: {
        name: '',
        logo: '',
        description: '',
        jury: [
          { id: '', username: '', profile: { fullName: '', picture: '' } }
        ],
        moderators: [
          { id: '', username: '', profile: { fullName: '', picture: '' } }
        ]
      }
    }
  },
  apollo: {
    competition: {
      query: gql`
        query fetchCompetitionDetailsPage($name: String!) {
          competition(name: $name) {
            id
            logo
            name
            description
            jury {
              id
              username
              profile {
                fullName
                picture
              }
            }
            moderators {
              id
              username
              profile {
                fullName
                picture
              }
            }
          }
        }
      `,
      variables() {
        return {
          name: this.competitionName
        }
      }
    }
  },
  methods: {
    async updateCompetition(competition) {
      const { name, ...updatedCompetition } = competition
      const { id } = this.competition
      await this.$apollo.mutate({
        mutation: gql`
          mutation updateCompetitionById(
            $id: ID!
            $updatedCompetition: UpdatedCompetitionInput!
          ) {
            updateCompetition(
              id: $id
              updatedCompetition: $updatedCompetition
            ) {
              id
            }
          }
        `,
        variables: {
          id,
          updatedCompetition
        }
      })
    }
  }
}
</script>
