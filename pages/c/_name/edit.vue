<template>
  <v-container>
    <v-card>
      <snackbar-message
        :display="display"
        :message="message"
        :isErr="isErr"
        :delay="delay"
      ></snackbar-message>
      <v-card-title>Edit {{ competitionName }}</v-card-title>
      <v-card-text>
        <competition-page-post
          :init-logo="competition.logo"
          :init-name="competition.name"
          :init-description="competition.description"
          :init-jury="competition.jury"
          :init-mods="competition.moderators"
          @update-competition="handleCompetition($event)"
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
import SnackbarMessage from '@/components/shared/SnackbarMessage.vue'
export default {
  name: 'CompetitionEditPage',
  components: {
    CompetitionPagePost,
    SnackbarMessage
  },
  data() {
    return {
      display: false,
      message: '',
      isErr: false,
      delay: 0
    }
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
    },
    async handleCompetition(competition) {
      try {
        await this.updateCompetition(competition)
        this.message = 'The competition was updated'
        this.isErr = false
      } catch (e) {
        this.message = 'There was a problem updating the competition'
        this.isErr = true
      } finally {
        this.delay = 3000
        this.display = true
        setTimeout(() => (this.display = false), this.delay)
      }
    }
  }
}
</script>
