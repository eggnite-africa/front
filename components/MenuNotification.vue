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
          <template v-if="notification.vote">
            <menu-notification-item-upvote
              :key="notification.id"
              :notificationId="notification.id"
              :productName="notification.product.name"
              :username="notification.user.username"
            ></menu-notification-item-upvote>
          </template>
          <template v-else-if="notification.comment">
            <menu-notification-item-comment
              :key="notification.id"
              :notificationId="notification.id"
              :productName="notification.product.name"
              :username="notification.user.username"
              :parentId="notification.comment.parentId"
            ></menu-notification-item-comment>
          </template>
        </template>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import gql from 'graphql-tag'
import MenuNotificationItemUpvote from '@/components/MenuNotificationItemUpvote.vue'
import MenuNotificationItemComment from '@/components/MenuNotificationItemComment.vue'
export default {
  name: 'MenuNotification',
  components: {
    MenuNotificationItemUpvote,
    MenuNotificationItemComment
  },
  props: {
    userId: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    unreadCount() {
      return this.user.notifications.length
    }
  },
  asyncData() {
    return {
      user: {
        id: '',
        notifications: []
      }
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
                productId
                pitchId
              }
              comment {
                id
                productId
                pitchId
                userId
                parentId
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
