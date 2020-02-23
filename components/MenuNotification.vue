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
            <menu-notification-item
              :key="notification.id"
              :notification-id="notification.id"
              :vote="notification.vote"
              notification-type="VOTE"
            ></menu-notification-item>
          </template>
          <template v-else-if="notification.comment">
            <menu-notification-item
              :key="notification.id"
              :notification-id="notification.id"
              :comment="notification.comment"
              notification-type="COMMENT"
            ></menu-notification-item>
          </template>
        </template>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import gql from 'graphql-tag'
import MenuNotificationItem from '@/components/MenuNotificationItem.vue'
export default {
  name: 'MenuNotification',
  components: {
    MenuNotificationItem
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
              userId: '',
              parentId: ''
            }
          }
        ]
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
                productId
              }
              comment {
                id
                productId
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
        return !this.userId
      },
      debounce: 0.0001,
      pollInterval: process.client && 30000
    }
  }
}
</script>
