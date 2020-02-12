<template>
  <v-container>
    <v-card v-if="!$apollo.queries.user.loading">
      <v-container>
        <v-row justify="center">
          <v-col cols="3" sm="2" class="mr-md-n10">
            <v-avatar color="blue" size="96">
              <client-only>
                <v-img :src="profilePicture"></v-img>
              </client-only>
            </v-avatar>
          </v-col>
          <v-col cols="9" sm="10" class="ml-sm-n6 ml-md-n5 mt-n4">
            <v-card-text class="ml-3 ml-sm-0 mt-n2">
              <v-row class="mb-n5" justify="start">
                <v-col cols="9">
                  <h2
                    v-text="
                      `${user.profile.firstName} ${user.profile.lastName}`
                    "
                  ></h2>
                  <span v-show="user.profile.university">
                    <v-icon dense>mdi-school</v-icon>
                    <span v-text="user.profile.university"></span>
                  </span>
                </v-col>
                <v-col v-if="isOwner()" cols="3">
                  <div style="float: right">
                    <v-btn depressed nuxt to="edit" append color="indigo"
                      >Edit</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p v-text="user.profile.bio" class="text-justify"></p>
                </v-col>
              </v-row>
              <v-row dense no-gutters class="ml-n1 mt-n1">
                <v-col>
                  <user-social :links="user.profile.socialLinks"></user-social>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-tabs fixed-tabs>
            <v-tab href="#products">
              products
            </v-tab>
            <v-tab href="#upvotes">
              upvotes
            </v-tab>
            <v-tab href="#comments">
              comments
            </v-tab>

            <v-tab-item value="products">
              <v-container>
                <template v-for="(product, i) in user.products">
                  <product-item
                    :key="i"
                    :product-id="product.id"
                    class="my-products"
                  ></product-item>
                </template>
              </v-container>
            </v-tab-item>

            <v-tab-item value="upvotes">
              <v-container>
                <template v-for="(upvote, i) in user.votes">
                  <product-item
                    :key="i"
                    :product-id="upvote.productId"
                    class="my-products"
                  ></product-item>
                </template>
              </v-container>
            </v-tab-item>

            <v-tab-item value="comments">
              <v-container>
                <template v-for="(comment, i) in user.comments">
                  <user-comment :key="i" :comment="comment"></user-comment>
                </template>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import UserSocial from '@/components/UserProfileSocialMediaLinks.vue'
import ProductItem from '@/components/ProductItem.vue'
import UserComment from '@/components/UserProfileComment.vue'

export default {
  components: {
    UserSocial,
    ProductItem,
    UserComment
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    isAdmin() {
      return this.$auth.user.type === 'ADMIN'
    },
    profilePicture() {
      const profilePicture = this.user.profile.profilePicture
      if (profilePicture) return profilePicture

      const gender = this.user.profile.gender
      if (gender === 'MALE') {
        return '/male_avatar.svg'
      } else return '/female_avatar.svg'
    }
  },
  asyncData() {
    return {
      user: {
        profile: {
          profilePicture: '',
          firstName: '',
          lastName: '',
          gender: '',
          university: '',
          bio: '',
          socialLinks: ['']
        },
        products: [{ id: '' }],
        votes: [{ productId: '' }],
        comments: [
          {
            id: '',
            content: '',
            productId: ''
          }
        ]
      }
    }
  },
  apollo: {
    user: {
      query: gql`
        query getUser($username: String!) {
          user(username: $username) {
            id
            profile {
              profilePicture
              firstName
              lastName
              gender
              university
              bio
              socialLinks
            }
            products {
              id
            }
            votes {
              productId
            }
            comments {
              id
              content
              productId
            }
          }
        }
      `,
      variables() {
        return {
          username: this.username
        }
      },
      fetchPolicy: 'network-only'
    }
  },
  methods: {
    isOwner() {
      if (this.$auth.loggedIn) {
        const currentUser = this.$auth.user.username
        const currentUserProfile = this.username
        return this.isAdmin || currentUser === currentUserProfile
      } else {
        return false
      }
    }
  },
  head() {
    return {
      title: '@' + this.username,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.user.profile.bio
        },
        {
          property: 'og:type',
          content: 'profile'
        },
        {
          property: 'profile:first_name',
          content: this.user.profile.firstName
        },
        {
          property: 'profile:last_name',
          content: this.user.profile.lastName
        },
        {
          property: 'profile:username',
          content: this.username
        },
        {
          property: 'profile:gender',
          content: this.user.profile.gender
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.my-products {
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
