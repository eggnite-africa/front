<template>
  <v-container>
    <v-row dense>
      <v-col>
        <div class="d-flex justify-center">
          <v-btn color="secondary" large nuxt to="/pitch">
            Pitch your idea
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="!$apollo.loading">
      <v-col v-for="pitch in pitchList.pitchs" :key="pitch.id" cols="12" sm="4">
        <pitch-item
          :id="pitch.id"
          :user="pitch.user"
          :name="pitch.name"
          :problem="pitch.problem"
          :needs="pitch.needs"
          :votesCount="pitch.votes.length"
          :commentsCount="pitch.comments.length"
        ></pitch-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import PitchItem from '@/components/PitchItem.vue'
export default {
  name: 'IdeasIndex',
  components: {
    PitchItem
  },
  asyncData() {
    return {
      pitchList: {
        pitchs: []
      }
    }
  },
  apollo: {
    pitchList: {
      query: gql`
        query fetchAllIdeas($page: Int!, $pageSize: Int!) {
          pitchList(page: $page, pageSize: $pageSize) {
            pitchs {
              id
              name
              problem
              needs
              user {
                username
                profile {
                  picture
                }
              }
              votes {
                userId
              }
              comments {
                id
              }
            }
          }
        }
      `,
      variables: {
        page: 0,
        pageSize: 999
      }
    }
  },
  head() {
    return {
      title: '💡🧠 IDEAS'
    }
  }
}
</script>

<style lang="scss" scoped>
.c-text p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-justify: auto;
}
</style>
