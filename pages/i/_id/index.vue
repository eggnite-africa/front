<template>
  <v-container v-if="!$apollo.loading" fluid>
    <v-row dense no-gutters align-content="center">
      <v-col cols="12" sm="1">
        <pitch-page-action-buttons
          :hasClapped="hasClapped"
          :pitchId="pitchId"
          :totalClaps="totalClaps"
        ></pitch-page-action-buttons>
      </v-col>
      <v-col>
        <v-container>
          <v-row dense no-gutters>
            <v-col>
              <v-card>
                <v-card-title class="headline">
                  {{ pitch.name }}
                  <v-btn
                    v-if="isOwner"
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
                <v-card-text class="body-1 white--text">
                  <span class="text-uppercase font-weight-black font-title">
                    Problem
                  </span>
                  <p class="text-justify text-lowercase">
                    {{ pitch.problem }}
                  </p>
                  <span class="text-uppercase font-weight-black font-title">
                    Solution
                  </span>
                  <p class="text-justify text-lowercase">
                    {{ pitch.solution }}
                  </p>
                  <span class="text-uppercase font-weight-black font-title">
                    Qualifications
                  </span>
                  <p class="text-justify text-lowercase">
                    {{ pitch.skills }}
                  </p>
                  <span class="text-uppercase font-weight-black font-title">
                    Needs
                  </span>
                  <p class="text-justify text-lowercase">
                    {{ pitch.needs }}
                  </p>
                  <div class="body-2 text-uppercase">
                    --
                    <nuxt-link
                      :to="'/u/' + pitch.user.username"
                      target="_blank"
                      class="blue--text"
                      style="text-decoration: none;"
                    >
                      {{
                        pitch.user.profile.fullName +
                          ' (@' +
                          pitch.user.username +
                          ')'
                      }}
                    </nuxt-link>
                    , Posted in
                    <span class="red--text">
                      #COVID19
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-container>
                  <comment-section
                    :pitch-id="pitchId"
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
    pitchId() {
      const { id } = this.$route.params
      return id
    },
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
        name: '',
        problem: '',
        solution: '',
        skills: '',
        needs: '',
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
            name
            problem
            solution
            skills
            needs
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
          id: this.pitchId
        }
      },
      fetchPolicy: 'network-only'
    }
  },
  head() {
    return {
      title: this.pitch.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pitch.problem
        },
        {
          property: 'og:description',
          content: this.pitch.problem
        }
      ]
    }
  }
}
</script>
