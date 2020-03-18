<template>
  <v-container v-if="!$apollo.loading" fluid>
    <v-row dense no-gutters align-content="center">
      <v-col cols="12" sm="1">
        <pitch-page-action-buttons
          :hasClapped="hasClapped"
          :pitchId="pitch.id"
          :totalClaps="totalClaps"
        ></pitch-page-action-buttons>
      </v-col>
      <v-col>
        <v-container>
          <v-row dense no-gutters>
            <v-col>
              <v-card>
                <v-card-title class="headline">
                  {{ pitch.title }}
                  <v-btn
                    class="ml-auto"
                    color="indigo"
                    depressed
                    append
                    to="edit"
                    small
                  >
                    edit
                  </v-btn>
                </v-card-title>
                <!-- <v-card-subtitle class="subtitle-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore sint
        assumenda at ratione, nulla provident.
      </v-card-subtitle> -->
                <v-card-text>
                  <p class="text-justify body-1 white--text">
                    {{ pitch.content }}
                  </p>
                  <p class="body-2 text-uppercase">
                    --
                    <nuxt-link
                      :to="'/u/' + pitch.user.username"
                      target="_blank"
                      class="blue--text"
                      style="text-decoration: none;"
                    >
                      Karim (@kd)
                    </nuxt-link>
                    , Posted in
                    <span class="red--text">
                      #COVID19
                    </span>
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-container>
                  <comment-section
                    :pitch-id="pitch.id"
                    :comments="pitch.comments"
                  ></comment-section>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import CommentSection from '@/components/shared/CommentSection.vue'
import PitchPageActionButtons from '@/components/PitchPageActionButtons.vue'
export default {
  components: {
    CommentSection,
    PitchPageActionButtons
  },
  computed: {
    totalClaps() {
      return this.pitch.votes.length
    },
    hasClapped() {
      if (!this.$auth.loggedIn) return false
      const votersIds = this.pitch.votes.map((v) => +v.userId)
      const userId = this.$auth.user.id
      return votersIds.includes(userId)
    },
    isOwner() {
      if (!this.$auth.loggedIn) return false
      const id = +this.$route.params.id
      const user = this.$auth.user
      const userPitchs = user.pitch.map((p) => p.id)
      const isAdmin = user.type === 'ADMIN'
      const isOwner = isAdmin || userPitchs.includes(id)
      return isOwner
    }
  },
  asyncData() {
    return {
      pitch: {
        id: '',
        title: '',
        content: '',
        user: {
          username: '',
          profile: {
            fullName: ''
          }
        },
        comments: [],
        votes: []
      }
    }
  },
  apollo: {
    pitch: {
      query: gql`
        query fetchPitchById($id: ID!) {
          pitch(id: $id) {
            id
            title
            content
            user {
              username
              profile {
                fullName
              }
            }
            comments {
              id
              content
              userId
              pitchId
              postedAt
              replies {
                id
                pitchId
                parentId
                content
                userId
                postedAt
              }
            }
            votes {
              userId
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id
        }
      },
      fetchPolicy: 'network-only'
    }
  },
  head() {
    return {
      title: this.pitch.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pitch.content
        },
        {
          property: 'og:description',
          content: this.pitch.content
        }
      ]
    }
  }
}
</script>
