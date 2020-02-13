<template>
  <v-container>
    <v-dialog v-model="congrats" persistent max-width="500">
      <v-card>
        <v-card-title>🎉🎊 Congratulation</v-card-title>
        <v-card-text>
          <p>
            Creating a product, is no small feat, no matter what the product is;
            To create, it not only takes technical know-how but also creativity.
            And if only for this, you deserve to be applauded 👏🏼 <br />
            <br />
            However, as I'm sure you already know, the real thing™ starts now.
            It is time for you to share your creation with whomever listens.<br />
            <br />
            In practical terms what does it mean?
          </p>
          <ol>
            <li>Post it here ✅</li>
            <li>Solicitate the community's feedback</li>
            <li>Share it: on social media, irl etc...</li>
            <li>Listen. Listen. Listen.</li>
          </ol>
          <br />
          <v-img
            max-width="300"
            class="mx-auto"
            src="https://media.giphy.com/media/l41JU9pUyosHzWyuQ/giphy.gif"
          />
          <br />
        </v-card-text>
        <v-card-actions>
          <v-btn @click.stop="congrats = false" text icon class="ml-auto">
            <v-icon tag="span">💪🏼</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!$apollo.queries.product.loading">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <v-row align="center" dense tag="section">
                <v-col cols="3" sm="2" md="1">
                  <v-avatar size="72">
                    <client-only>
                      <v-img :src="product.media.logo" contain></v-img>
                    </client-only>
                  </v-avatar>
                </v-col>
                <v-col class="ml-md-n2 ml-sm-n10">
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-subtitle>{{ product.tagline }}</v-card-subtitle>
                </v-col>

                <v-col cols="3" sm="2" md="1">
                  <v-btn
                    v-if="isOwner"
                    :to="`${productUrl}/edit`"
                    color="indigo"
                    depressed
                    nuxt
                    >Edit</v-btn
                  >
                </v-col>
              </v-row>

              <v-row dense tag="section">
                <v-col>
                  <product-images
                    :pictures="product.media.pictures"
                  ></product-images>
                </v-col>
              </v-row>

              <v-row align="start" tag="section">
                <v-col cols="12" sm="8">
                  <v-row dense>
                    <v-col>
                      <header class="title">Description</header>
                      <p class="body-1">
                        {{ product.description }}
                      </p>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <v-col cols="12">
                      <header class="title">
                        {{ product.makers.length > 1 ? 'Makers' : 'Maker' }}
                      </header>
                    </v-col>
                    <v-row>
                      <v-col
                        v-for="(maker, i) in product.makers"
                        :key="i"
                        cols="12"
                        sm="6"
                      >
                        <maker-avatar
                          :class="i > 2 ? 'mt-3 mt-sm-0' : ''"
                          :maker-username="maker.username"
                          :maker-name="
                            `${maker.profile.firstName} ${maker.profile.lastName}`
                          "
                          :maker-picture="makerAvatar(i)"
                        ></maker-avatar>
                      </v-col>
                    </v-row>
                  </v-row>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-btn
                    :outlined="!hasVoted"
                    @click.stop="upvote()"
                    block
                    color="orange"
                    class="my-1"
                  >
                    <v-icon left>mdi-arrow-up-thick</v-icon>upvote
                  </v-btn>
                  <action-buttons :links="product.links"></action-buttons>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <comment-section
                :product-id="product.id"
                :comments="product.comments"
              ></comment-section>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'
import MakerAvatar from '@/components/ProductPageMakerAvatar.vue'
import ActionButtons from '@/components/ProductPageActionButtons.vue'
import ProductImages from '@/components/ProductPageCarousel.vue'
import CommentSection from '@/components/ProductPageComment.vue'
export default {
  components: {
    MakerAvatar,
    ActionButtons,
    ProductImages,
    CommentSection
  },
  data() {
    return {
      congrats: this.$route.params.congrats || false
    }
  },
  computed: {
    productUrl() {
      return this.$route.params.name
    },
    productName() {
      const productName = this.productUrl.replace(/-/g, ' ')
      return productName
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
    productMakers() {
      return this.product.makers.map(({ username }) => username)
    },
    isAdmin() {
      return this.$auth.user.type === 'ADMIN'
    },
    isOwner() {
      return (
        this.$auth.loggedIn &&
        (this.isAdmin || this.productMakers.includes(this.$auth.user.username))
      )
    }
  },
  asyncData() {
    return {
      product: {
        id: '',
        name: '',
        tagline: '',
        media: {
          logo: '',
          pictures: ['']
        },
        description: '',
        makers: [
          {
            username: '',
            profile: {
              profilePicture: '',
              firstName: '',
              lastName: '',
              gender: ''
            }
          }
        ],
        links: {
          website: '',
          github: '',
          appStore: '',
          playStore: ''
        },
        comments: [
          {
            id: '',
            content: '',
            userId: '',
            postedAt: ''
          }
        ],
        votes: [
          {
            userId: ''
          }
        ]
      }
    }
  },
  apollo: {
    product: {
      query: gql`
        query fetchProductByName($productName: String) {
          product(name: $productName) {
            id
            name
            tagline
            media {
              logo
              pictures
            }
            description
            makers {
              username
              profile {
                profilePicture
                firstName
                lastName
                gender
              }
            }
            links {
              website
              github
              appStore
              playStore
            }
            comments {
              id
              content
              userId
              postedAt
              replies {
                id
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
          productName: this.productName
        }
      }
    }
  },
  methods: {
    ...mapMutations({ openLoginDialog: 'utils/openLoginDialog' }),
    upvote() {
      if (this.$auth.loggedIn) {
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
                  productId: this.product.id
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
                  productId: this.product.id
                }
              }
            })
            .then(() => this.$apollo.queries.product.refetch())
        }
      } else this.openLoginDialog()
    },
    makerAvatar(index) {
      const maker = this.product.makers[index]
      const profilePicture = maker.profile.profilePicture
      if (profilePicture) return profilePicture

      const gender = maker.profile.gender
      if (gender === 'MALE') {
        return '/male_avatar.svg'
      } else return '/female_avatar.svg'
    }
  },
  head() {
    return {
      title: this.product.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product.tagline
        },
        {
          property: 'og:title',
          content: this.product.name
        },
        {
          property: 'og:url',
          content: this.$route.fullPath
        },
        {
          property: 'og:image',
          content: '/sm_card.png'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:description',
          content: this.product.tagline
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  }
}
</script>
