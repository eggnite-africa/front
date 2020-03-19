<template>
  <v-menu offset-y bottom>
    <template #activator="{ on }">
      <v-btn v-on="on" icon small>
        <v-badge :value="unreadCount" overlap class="ml-1 mr-2" color="red">
          <template #badge>{{ unreadCount }}</template>
          <v-icon color="blue">{{
            unreadCount ? 'mdi-bell' : 'mdi-bell-outline'
          }}</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list flat>
      <v-list-item-group>
        <template v-for="notification in user.notifications">
          <menu-notification-item-upvote
            v-if="notification.vote && notification.vote.product"
            :key="notification.id"
            :notification-id="notification.id"
            :product-name="notification.vote.product.name"
            :username="notification.vote.user.username"
          ></menu-notification-item-upvote>

          <menu-notification-item-clap
            v-else-if="notification.vote && notification.vote.pitch"
            :key="notification.id"
            :notification-id="notification.id"
            :idea-id="notification.vote.pitch.id"
            :idea-name="notification.vote.pitch.name"
            :username="notification.vote.user.username"
          ></menu-notification-item-clap>

          <menu-notification-item-comment
            v-else-if="notification.comment && notification.comment.product"
            :key="notification.id"
            :notification-id="notification.id"
            :product-name="notification.comment.product.name"
            :username="notification.comment.user.username"
            :parent-id="notification.comment.parentId"
          ></menu-notification-item-comment>

          <menu-notification-item-comment
            v-else-if="notification.comment && notification.comment.pitch"
            :key="notification.id"
            :notification-id="notification.id"
            :idea-name="notification.comment.pitch.name"
            :idea-id="notification.comment.pitch.id"
            :username="notification.comment.user.username"
            :parent-id="notification.comment.parentId"
          ></menu-notification-item-comment>
        </template>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import gql from 'graphql-tag'
import MenuNotificationItemUpvote from '@/components/MenuNotificationItemUpvote.vue'
import MenuNotificationItemComment from '@/components/MenuNotificationItemComment.vue'
import MenuNotificationItemClap from '@/components/MenuNotificationItemClap.vue'
export default {
  name: 'MenuNotification',
  components: {
    MenuNotificationItemUpvote,
    MenuNotificationItemComment,
    MenuNotificationItemClap
  },
  props: {
    userId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      user: {
        id: '',
        notifications: []
      }
    }
  },
  computed: {
    unreadCount() {
      return this.user.notifications.length
    }
  },
  apollo: {
    user: {
      query: gql`
        query getLoggedInUserInfoForMenu($id: ID!, $seen: Boolean!) {
          user(id: $id) {
            id
            notifications(seen: $seen) {
              id
              vote {
                id
                product {
                  id
                  name
                }
                pitch {
                  id
                  name
                }
                user {
                  username
                }
              }
              comment {
                id
                parentId
                product {
                  id
                  name
                }
                pitch {
                  id
                  name
                }
                user {
                  username
                }
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
        return !this.$auth.loggedIn || !this.userId
      },
      debounce: 0.0001,
      pollInterval: process.client && 30000
    }
  }
}
</script>
