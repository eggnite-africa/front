<template>
  <v-container>
    <v-row>
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
        <v-card :to="`/i/${pitch.id}`" nuxt max-width="350">
          <v-list-item>
            <v-tooltip top>
              <template #activator="{ on }">
                <v-list-item-avatar v-on="on" color="blue" size="42">
                  <v-img :src="pitch.user.profile.picture"></v-img>
                </v-list-item-avatar>
              </template>
              <span>{{ pitch.user.username }}</span>
            </v-tooltip>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ pitch.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                #COVID19
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="white--text c-text">
            <span class="font-weight-medium text-uppercase">
              Problem
            </span>
            <p>
              {{ pitch.problem }}
            </p>

            <span class="font-weight-medium text-uppercase">
              Needs
            </span>
            <p>
              {{ pitch.needs }}
            </p>
          </v-card-text>

          <v-card-actions>
            <div class="ml-auto d-flex space-between">
              <div class="mr-3 d-flex align-center">
                <v-btn icon> <v-icon tag="span">👏🏻</v-icon> </v-btn>
                <span>{{ pitch.votes.length }}</span>
              </div>
              <div class="mr-2">
                <v-btn icon>
                  <v-icon>mdi-comment</v-icon>
                </v-btn>
                <span>{{ pitch.comments.length }}</span>
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'IdeasIndex',
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
              title
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
