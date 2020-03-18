<template>
  <v-container v-if="!$apollo.loading" fluid>
    <v-row dense no-gutters align-content="center">
      <v-col cols="12" sm="1">
        <aside
          class="mx-auto d-flex justify-center mx-sm-0 mx-md-12 d-sm-block"
        >
          <v-btn
            fab
            large
            color="secondary"
            outlined
            class="my-3 mx-auto mx-sm-0"
          >
            <div class="d-flex flex-column my-2">
              <v-icon tag="span">👏🏻</v-icon>
              <span class="mt-1">
                {{ totalClaps }}
              </span>
            </div>
          </v-btn>
          <v-btn fab large color="primary" class="my-3 mx-auto mx-sm-0">
            <div class="d-flex flex-column my-2">
              <v-icon class="mx-auto" x-large>mdi-facebook</v-icon>
            </div>
          </v-btn>
          <v-btn fab large color="blue" class="my-3 mx-auto mx-sm-0">
            <div class="d-flex flex-column my-2">
              <v-icon class="mx-auto" x-large>mdi-twitter</v-icon>
            </div>
          </v-btn>
        </aside>
      </v-col>
      <v-col>
        <v-container>
          <v-row dense no-gutters>
            <v-col>
              <v-card>
                <v-card-title class="headline">
                  {{ pitch.title }}
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
export default {
  components: {
    CommentSection
  },
  computed: {
    totalClaps() {
      return this.pitch.votes.length
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
  }
}
</script>
