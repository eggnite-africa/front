<template>
  <v-card @click="navigateToProductPage()" nuxt>
    <v-container>
      <v-row dense align="center">
        <v-col cols="3" sm="1">
          <v-avatar size="72">
            <client-only>
              <v-img :src="product.media.logo" contain></v-img>
            </client-only>
          </v-avatar>
        </v-col>
        <v-col justify-self="start">
          <v-card-title v-text="product.name"></v-card-title>
          <v-card-subtitle v-text="product.tagline"></v-card-subtitle>
          <v-card-text class="ml-n1">
            <span v-for="(maker, i) in product.makers" :key="i">
              <product-maker-avatar
                :maker-username="maker.username"
                :maker-name="
                  `${maker.profile.firstName} ${maker.profile.lastName}`
                "
                :maker-picture="maker.profile.profilePicture"
              ></product-maker-avatar>
            </span>
          </v-card-text>
        </v-col>

        <v-col cols="3" sm="2">
          <v-card-actions>
            <v-row dense>
              <v-col cols="12">
                <template v-if="!isInSettings">
                  <v-btn
                    :disabled="!this.$auth.loggedIn"
                    @click.stop="upvote()"
                    :outlined="!hasVoted"
                    color="orange"
                    block
                    height="50"
                  >
                    <div class="flex-md-column">
                      <v-icon>mdi-arrow-up-thick</v-icon>
                      <div v-text="product.votes.length"></div>
                    </div>
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                    :to="productEditLink"
                    link
                    color="indigo"
                    block
                    depressed
                    nuxt
                    >Edit</v-btn
                  >
                </template>
              </v-col>
              <v-col cols="12">
                <template v-if="!isInSettings">
                  <v-btn :to="commentsSection" nuxt outlined block>
                    <v-icon left>mdi-comment</v-icon>
                    <span v-text="product.comments.length"></span>
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn @click.stop="dialog = true" color="red" depressed block
                    >Delete</v-btn
                  >
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline"
                        >Delete {{ product.name }}</v-card-title
                      >

                      <v-card-text>
                        Are you sure you want to do this?
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn @click="dialog = false" text>
                          No
                        </v-btn>

                        <v-btn
                          @click.stop="deleteProduct(product.id)"
                          color="red darken-1"
                          text
                        >
                          Yes
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import ProductMakerAvatar from '@/components/ProductItemMakerAvatar.vue'
export default {
  name: 'ProductItem',
  components: {
    ProductMakerAvatar
  },
  props: {
    productId: {
      type: String,
      required: true
    },
    isInSettings: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      product: {
        media: {
          logo: ''
        },
        name: '',
        tagline: '',
        makers: [],
        votes: [],
        comments: []
      }
    }
  },
  apollo: {
    product: {
      query: gql`
        query fetchProductItemById($id: ID!) {
          product(id: $id) {
            id
            media {
              logo
            }
            name
            tagline
            makers {
              username
              profile {
                profilePicture
                firstName
                lastName
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
      `,
      variables() {
        return {
          id: this.productId
        }
      },
      prefetch: true
    }
  },
  computed: {
    productLink() {
      const productUrl = this.product.name.replace(/ /gi, '-')
      return `/p/${productUrl}`
    },
    votersIds() {
      return this.product.votes.map((v) => v.userId)
    },
    hasVoted() {
      if (this.$auth.loggedIn) {
        const userId = this.$auth.user.id.toString()
        return this.votersIds.includes(userId)
      } else {
        return false
      }
    },
    commentsSection() {
      return `${this.productLink}#comments`
    },
    productEditLink() {
      return this.productLink + '/edit'
    }
  },
  methods: {
    navigateToProductPage() {
      this.$router.push({ path: this.productLink })
    },
    upvote() {
      if (this.hasVoted) {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation unvote($voteInput: VoteInput!) {
                deleteVote(voteInput: $voteInput)
              }
            `,
            variables: {
              voteInput: {
                productId: this.productId
              }
            }
          })
          .then(() => this.$apollo.queries.product.refetch())
      } else {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation upvote($voteInput: VoteInput!) {
                upvote(voteInput: $voteInput) {
                  userId
                  productId
                }
              }
            `,
            variables: {
              voteInput: {
                productId: this.productId
              }
            }
          })
          .then(() => this.$apollo.queries.product.refetch())
      }
    },
    async deleteProduct(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation deleteProduct($id: ID!) {
            deleteProduct(id: $id)
          }
        `,
        variables: {
          id
        }
      })
    }
  }
}
</script>
