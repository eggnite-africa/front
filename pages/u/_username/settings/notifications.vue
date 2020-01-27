<template>
  <v-card>
    <v-card-title>Notifications</v-card-title>
    <v-card-text>
      <v-list flat>
        <v-list-item-group v-if="!$apollo.queries.user.loading">
          <template v-for="notification in user.notifications">
            <template v-if="notification.vote">
              <notification-item
                :key="notification.id"
                :notification-id="notification.id"
                :vote="notification.vote"
                notification-type="VOTE"
              ></notification-item>
            </template>
            <template v-else-if="notification.comment">
              <notification-item
                :key="notification.id"
                :notification-id="notification.id"
                :comment="notification.comment"
                notification-type="COMMENT"
              ></notification-item>
            </template>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import NotificationItem from '@/components/MenuNotificationItem'

export default {
  components: {
    NotificationItem
  },
  computed: {
    userId() {
      return this.$auth.user.id
    }
  },
  apollo: {
    user: {
      query: gql`
        query fetchAllUserNotifications($id: ID!) {
          user(id: $id) {
            id
            notifications {
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
          id: this.userId
        }
      }
    }
  },
  middleware: ['auth', 'isAccountOwner']
}
</script>
