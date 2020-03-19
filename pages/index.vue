<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <div class="d-sm-flex">
            <div class="d-block">
              <v-card-title class="headline">Ideas</v-card-title>
              <v-card-subtitle>
                Discover the community's ideas!
              </v-card-subtitle>
            </div>
            <v-card-actions class="ml-auto justify-center">
              <v-btn color="blue" nuxt to="ideas">
                explore
              </v-btn>
              <v-btn
                @click.stop="openLoginDialog()"
                color="secondary"
                depressed
                nuxt
                to="/pitch"
              >
                pitch your idea
              </v-btn>
            </v-card-actions>
          </div>
          <v-card-text>
            <div v-if="!$apollo.queries.pitchList.loading">
              <v-row>
                <v-col v-for="pitch in pitchList.pitchs" :key="pitch.id">
                  <pitch-item
                    :id="pitch.id"
                    :name="pitch.name"
                    :problem="pitch.problem"
                    :needs="pitch.needs"
                    :user="pitch.user"
                    :votesCount="pitch.votes.length"
                    :commentsCount="pitch.comments.length"
                  ></pitch-item>
                </v-col>
              </v-row>
            </div>
            <div v-else class="d-flex justify-center">
              <v-progress-circular
                :size="70"
                :width="7"
                color="yellow"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <div class="d-sm-flex">
            <div class="d-block">
              <v-card-title class="headline">Products</v-card-title>
              <v-card-subtitle>
                Discover products created by the community!
              </v-card-subtitle>
            </div>
            <v-card-actions class="ml-auto justify-center">
              <v-btn color="blue" nuxt to="products">
                discover
              </v-btn>
              <v-btn
                @click.stop="openLoginDialog()"
                color="secondary"
                depressed
                nuxt
                to="/post"
              >
                add your product
              </v-btn>
            </v-card-actions>
          </div>
          <v-card-text>
            <div v-if="!$apollo.queries.productsList.loading">
              <v-row
                v-for="product in productsList.products"
                :key="product.id"
                justify="center"
                align="center"
              >
                <v-col>
                  <product-item
                    :id="product.id"
                    :logo="product.media.logo"
                    :name="product.name"
                    :tagline="product.tagline"
                    :makers="product.makers"
                    :votes="product.votes"
                    :comments="product.comments"
                  ></product-item>
                </v-col>
              </v-row>
            </div>
            <div v-else class="d-flex justify-center">
              <v-progress-circular
                :size="70"
                :width="7"
                color="yellow"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'
import ProductItem from '@/components/ProductItem.vue'
import PitchItem from '@/components/PitchItem.vue'

export default {
  components: {
    ProductItem,
    PitchItem
  },
  asyncData() {
    return {
      productsList: {
        products: [
          {
            id: '',
            name: '',
            tagline: '',
            media: {
              logo: ''
            },
            makers: [],
            votes: [],
            comments: []
          }
        ]
      },
      pitchList: {
        pitchs: [
          {
            id: '',
            name: '',
            problem: '',
            needs: '',
            user: {},
            comments: [],
            votes: []
          }
        ]
      }
    }
  },
  apollo: {
    productsList: {
      query: gql`
        query fetchAllProducts($page: Int!, $pageSize: Int!) {
          productsList(page: $page, pageSize: $pageSize) {
            products {
              id
              name
              tagline
              media {
                logo
              }
              makers {
                username
                profile {
                  fullName
                  picture
                }
              }
              votes {
                userId
              }
              comments {
                id
                replies {
                  id
                }
              }
            }
          }
        }
      `,
      variables: {
        page: 0,
        pageSize: 4
      },
      fetchPolicy: 'network-only'
    },
    pitchList: {
      query: gql`
        query fetchAllPitchs($page: Int!, $pageSize: Int!) {
          pitchList(page: $page, pageSize: $pageSize) {
            pitchs {
              id
              name
              problem
              needs
              user {
                id
                username
                profile {
                  picture
                  fullName
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
        pageSize: 3
      },
      fetchPolicy: 'network-only'
    }
  },
  head() {
    return {
      titleTemplate: null,
      title: 'Eggnite: Discover a new product everyday'
    }
  },
  methods: {
    ...mapMutations({ openLoginDialog: 'utils/openLoginDialog' })
  }
}
</script>
