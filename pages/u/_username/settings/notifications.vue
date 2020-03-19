<template>
  <v-card>
    <v-card-title>Notifications</v-card-title>
    <v-card-text>
      <v-list flat>
        <v-list-item-group v-if="!$apollo.queries.user.loading">
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
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import MenuNotificationItemUpvote from '@/components/MenuNotificationItemUpvote.vue'
import MenuNotificationItemComment from '@/components/MenuNotificationItemComment.vue'
import MenuNotificationItemClap from '@/components/MenuNotificationItemClap.vue'

export default {
  components: {
    MenuNotificationItemUpvote,
    MenuNotificationItemComment,
    MenuNotificationItemClap
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
                product {
                  id
                  name
                }
                user {
                  username
                }
                pitch {
                  id
                  name
                }
              }
              comment {
                id
                parentId
                product {
                  id
                  name
                }
                user {
                  username
                }
                pitch {
                  id
                  name
                }
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
  middleware: ['auth', 'isAccountOwner'],
  head() {
    return {
      meta: [
        {
          name: 'robots',
          content: 'noindex,nofollow'
        }
      ]
    }
  }
}
</script>
