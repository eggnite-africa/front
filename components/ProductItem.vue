<template>
  <v-card :to="productLink" nuxt link>
    <v-container>
      <v-row dense align="center">
        <v-col cols="3" sm="1" class="mr-sm-8 mr-md-0">
          <v-avatar size="80">
            <v-img :src="logo" contain eager></v-img>
          </v-avatar>
        </v-col>
        <v-col justify-self="start">
          <v-card-title v-text="name"></v-card-title>
          <v-card-subtitle v-text="tagline"></v-card-subtitle>
          <v-card-text class="ml-n1">
            <span v-for="(maker, i) in makers" :key="i">
              <product-maker-avatar
                :maker-username="maker.username"
                :maker-name="maker.profile.fullName"
                :maker-picture="makerAvatar(i)"
              ></product-maker-avatar>
            </span>
          </v-card-text>
        </v-col>

        <v-col cols="5" sm="2" class="hidden-xs-only">
          <v-card-actions>
            <v-row dense>
              <v-col cols="12">
                <template v-if="!isInSettings">
                  <v-btn
                    @click.prevent="upvote()"
                    :outlined="!hasVoted"
                    color="orange"
                    block
                    height="50"
                  >
                    <div class="flex-md-column">
                      <v-icon>mdi-arrow-up-thick</v-icon>
                      <div v-text="votes.length"></div>
                    </div>
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                    :to="productEditLink"
                    color="indigo"
                    block
                    depressed
                    nuxt
                  >
                    Edit
                  </v-btn>
                </template>
              </v-col>
              <v-col cols="12">
                <template v-if="!isInSettings">
                  <v-btn :to="commentsSection" nuxt outlined block>
                    <v-icon left>mdi-comment</v-icon>
                    <span v-text="commentsLength"></span>
                  </v-btn>
                </template>
                <template v-else>
                  <v-btn
                    @click.stop="dialog = true"
                    color="red"
                    depressed
                    block
                  >
                    Delete
                  </v-btn>
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline"
                        >Delete {{ name }}</v-card-title
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
                          @click.stop="deleteProduct(id)"
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
import { mapMutations } from 'vuex'
import ProductMakerAvatar from '@/components/ProductItemMakerAvatar.vue'
export default {
  name: 'ProductItem',
  components: {
    ProductMakerAvatar
  },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    tagline: {
      type: String,
      required: true
    },
    makers: {
      type: Array,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    votes: {
      type: Array,
      required: true
    },
    comments: {
      type: Array,
      required: true
    },
    isInSettings: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    productLink() {
      const productUrl = this.name.replace(/ /gi, '-')
      return `/p/${productUrl}`
    },
    votersIds() {
      return this.votes.map((v) => v.userId)
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
    },
    commentsLength() {
      let total = 0
      const comments = this.comments
      total += comments.length
      comments.forEach((c) => (total += c.replies.length))
      return total
    }
  },
  methods: {
    ...mapMutations({
      openLoginDialog: 'utils/openLoginDialog'
    }),
    navigateToProductPage() {
      this.$router.push({ path: this.productLink })
    },
    upvote() {
      if (this.$auth.loggedIn) {
        if (this.hasVoted) {
          this.$apollo.mutate({
            mutation: gql`
              mutation unvote($voteInput: VoteInput!) {
                deleteVote(voteInput: $voteInput)
              }
            `,
            variables: {
              voteInput: {
                id: this.id
              }
            }
          })
        } else {
          this.$apollo.mutate({
            mutation: gql`
              mutation upvote($voteInput: VoteInput!) {
                upvote(voteInput: $voteInput) {
                  userId
                  id
                }
              }
            `,
            variables: {
              voteInput: {
                productId: this.id
              }
            }
          })
        }
      } else this.openLoginDialog()
    },
    async deleteProduct(id) {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteProduct($id: ID!) {
              deleteProduct(id: $id)
            }
          `,
          variables: {
            id
          }
        })
        .then(() => {
          this.dialog = false
          this.$router.go(0)
        })
    },
    makerAvatar(index) {
      const maker = this.makers[index]
      const { picture } = maker.profile
      return picture
    }
  }
}
</script>
