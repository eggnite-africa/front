<template>
  <div>
    <template v-if="isLoggedIn && !$apollo.queries.user.loading">
      <v-row align="center">
        <v-col class="hidden-xs-only">
          <v-btn to="/post" nuxt color="yellow" outlined>
            <v-icon class="mr-1">mdi-plus</v-icon>post a product
          </v-btn>
        </v-col>
        <v-col class="d-flex">
          <menu-notification
            :notifications="user.notifications"
          ></menu-notification>
          <menu-account
            :username="user.username"
            :user-profile-picture="user.profile.profilePicture"
          ></menu-account>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-btn color="red" outlined class="mr-1 hidden-xs-only" nuxt to="/join"
        >join</v-btn
      >
      <v-dialog v-model="dialog" persistent max-width="300">
        <template #activator="{ on }">
          <v-btn v-on="on" color="primary" depressed>
            login
          </v-btn>
        </template>
        <login @close-dialog="dialog = false"></login>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import MenuNotification from '@/components/MenuNotification.vue'
import MenuAccount from '@/components/MenuAccount.vue'
import Login from '@/components/Login.vue'
export default {
  name: 'Menu',
  components: {
    MenuAccount,
    MenuNotification,
    Login
  },
  data() {
    return {
      dialog: false,
      user: {
        id: '',
        username: '',
        profile: {
          profilePicture: ''
        },
        notifications: [
          {
            id: '',
            vote: {
              id: '',
              productId: ''
            },
            comment: {
              id: '',
              productId: '',
              userId: ''
            }
          }
        ]
      }
    }
  },
  computed: {
    userId() {
      return this.$auth.user.id
    },
    isLoggedIn() {
      return this.$auth.loggedIn
    }
  },
  apollo: {
    user: {
      query: gql`
        query getLoggedInUserInfoForMenu($id: ID!, $seen: Boolean!) {
          user(id: $id) {
            id
            username
            profile {
              profilePicture
            }
            notifications(seen: $seen) {
              id
              vote {
                id
                productId
              }
              comment {
                id
                productId
                userId
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.userId,
          seen: false
        }
      },
      skip() {
        return !this.isLoggedIn
      },
      debounce: 0.0001,
      fetchPolicy: 'network-only'
    }
  }
}
</script>
