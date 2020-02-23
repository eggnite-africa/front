<template>
  <v-container>
    <v-card v-if="!$apollo.queries.user.loading">
      <v-container>
        <v-row justify="center">
          <v-col cols="3" sm="2" class="mr-md-n10">
            <v-avatar size="96">
              <v-img :src="user.profile.picture" eager></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="9" sm="10" class="ml-sm-n6 ml-md-n5 mt-n4">
            <v-card-text class="ml-3 ml-sm-0 mt-n2">
              <v-row class="mb-n5" justify="start">
                <v-col cols="8" sm="9">
                  <h2>
                    {{ user.profile.fullName }}
                    <v-icon
                      :class="`flag-icons square ${user.profile.country}`"
                      dense
                    ></v-icon>
                  </h2>
                  <span
                    v-show="user.profile.university || user.profile.company"
                  >
                    <v-icon dense>{{
                      user.profile.university !== ''
                        ? 'mdi-school'
                        : 'mdi-briefcase'
                    }}</v-icon>
                    <span>
                      {{
                        user.profile.university !== ''
                          ? user.profile.university
                          : user.profile.company
                      }}
                    </span>
                  </span>
                </v-col>
                <v-col
                  v-if="isOwner()"
                  cols="4"
                  sm="3"
                  class="d-flex justify-end"
                >
                  <v-btn depressed nuxt to="edit" append color="indigo">
                    <span class="hidden-xs-only">Edit</span>
                    <v-icon small class="hidden-sm-and-up">mdi-wrench</v-icon>
                  </v-btn>
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
import '@/assets/flag-icons.scss'

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
    }
  },
  asyncData() {
    return {
      user: {
        profile: {
          picture: '',
          fullName: '',
          gender: '',
          university: '',
          company: '',
          bio: '',
          socialLinks: [''],
          country: ''
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
              picture
              fullName
              gender
              university
              company
              bio
              socialLinks
              country
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
          content: this.user.profile.fullName.split(' ')[0]
        },
        {
          property: 'profile:last_name',
          content: this.user.profile.fullName.split(' ')[1]
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
