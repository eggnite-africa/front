<template>
  <div>
    <v-container>
      <div v-if="!$apollo.loading">
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
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn v-if="productsList.hasMore" @click="showMore()">
              See more
            </v-btn>
            <v-btn
              v-else
              @click.stop="openLoginDialog()"
              color="secondary"
              depressed
              nuxt
              to="/post"
            >
              add your product
            </v-btn>
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
    </v-container>
    <mugen-scroll :handler="showMore" :should-handle="!loading"> </mugen-scroll>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'
import MugenScroll from 'vue-mugen-scroll'
import ProductItem from '@/components/ProductItem.vue'

export default {
  components: {
    ProductItem,
    MugenScroll
  },
  data() {
    return {
      page: 0,
      loading: false
    }
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
            makers: [
              {
                username: '',
                profile: {
                  fullName: '',
                  picture: ''
                }
              }
            ],
            votes: [
              {
                userId: ''
              }
            ],
            comments: [
              {
                id: '',
                replies: [
                  {
                    id: ''
                  }
                ]
              }
            ]
          }
        ],
        hasMore: ''
      }
    }
  },
  apollo: {
    productsList: {
      query: gql`
        query fetchAllProducts($page: Int!) {
          productsList(page: $page) {
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
            hasMore
          }
        }
      `,
      variables: {
        page: 0
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
    ...mapMutations({ openLoginDialog: 'utils/openLoginDialog' }),
    showMore() {
      if (!this.productsList.hasMore) return
      this.loading = true
      this.page++
      // Fetch more data and transform the original result
      this.$apollo.queries.productsList.fetchMore({
        // New variables
        variables: {
          page: this.page
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.productsList.products
          const hasMore = fetchMoreResult.productsList.hasMore
          this.loading = false
          return {
            productsList: {
              __typename: previousResult.productsList.__typename,
              // Merging the tag list
              products: [
                ...previousResult.productsList.products,
                ...newProducts
              ],
              hasMore
            }
          }
        }
      })
    }
  }
}
</script>
