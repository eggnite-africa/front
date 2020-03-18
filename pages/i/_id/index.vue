<template>
  <v-container v-if="!$apollo.loading">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title v-text="pitch.title" class="headline">
            Pitch title
          </v-card-title>
          <!-- <v-card-subtitle class="subtitle-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore sint
        assumenda at ratione, nulla provident.
      </v-card-subtitle> -->
          <v-card-text>
            <p v-text="pitch.content" class="text-justify body-1 white--text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
              doloremque eos recusandae veniam, adipisci distinctio delectus sed
              cupiditate corporis molestiae debitis et fuga quisquam architecto
              minima ipsam similique voluptatibus aperiam! Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Corporis perferendis, culpa
              impedit aperiam eum doloribus fugiat alias pariatur aspernatur
              praesentium, cupiditate quisquam nulla? Dolor quae ipsum ab
              aliquam quasi reiciendis? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Ut et inventore tenetur quas cupiditate ipsum
              voluptatibus quis expedita nisi adipisci dolorum sit placeat,
              tempora quo ipsam qui porro quibusdam at? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. At rerum fugiat nostrum
              repellendus fuga, sed non quis assumenda omnis repudiandae veniam
              enim? Temporibus aliquid, ullam magnam quibusdam in repudiandae
              perferendis?
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
          <v-card-actions class="d-flex justify-center">
            <v-btn color="secondary">
              <v-icon tag="span" left>👏🏻</v-icon> 42
            </v-btn>
            <v-btn color="primary">
              <v-icon left>mdi-facebook</v-icon> share
            </v-btn>
            <v-btn color="blue">
              <v-icon left>mdi-twitter</v-icon> share
            </v-btn>
          </v-card-actions>
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
</template>

<script>
import gql from 'graphql-tag'
import CommentSection from '@/components/shared/CommentSection.vue'
export default {
  components: {
    CommentSection
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
