<template>
  <v-row v-if="!$apollo.loading" align="center">
    <v-col class="hidden-xs-only">
      <v-btn
        v-if="$device.isDesktop"
        to="/post"
        nuxt
        color="secondary"
        class="mr-n4"
      >
        add product
      </v-btn>
      <v-btn v-else to="/post" nuxt color="secondary" icon class="mr-n6">
        <v-icon dense>mdi-plus-circle</v-icon>
      </v-btn>
    </v-col>
    <v-col class="d-flex align-center">
      <menu-notification :user-id="userId"></menu-notification>
      <menu-account
        :username="user.username"
        :user-profile-picture="user.profile.picture"
      ></menu-account>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import MenuNotification from '@/components/MenuNotification.vue'
import MenuAccount from '@/components/MenuAccount.vue'
export default {
  components: {
    MenuNotification,
    MenuAccount
  },
  props: {
    userId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      user: {
        id: '',
        username: '',
        profile: {
          picture: ''
        }
      }
    }
  },
  apollo: {
    user: {
      query: gql`
        query getLoggedInUserInfoForMenu($id: ID!) {
          user(id: $id) {
            id
            username
            profile {
              picture
            }
          }
        }
      `,
      variables() {
        return {
          id: this.userId
        }
      },
      skip() {
        return !this.userId
      },
      debounce: 0.0001
    }
  }
}
</script>
