<template>
  <v-list-item
    @click="markNotificationAsSeen(notificationId)"
    :to="notificationLink"
  >
    <v-list-item-avatar>
      <v-icon v-if="notificationType === 'VOTE'">mdi-thumb-up</v-icon>
      <v-icon v-else>mdi-comment</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <strong v-text="product.name"></strong>
      <span v-if="notificationType === 'VOTE'">Your product was upvoted!</span>
      <span v-else
        ><strong>@{{ user.username }}</strong>
        {{ productId ? 'commented on your product!' : 'replied to you!' }}</span
      >
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'MenuNotificationItem',
  props: {
    vote: {
      type: Object,
      default: () => null
    },
    comment: {
      type: Object,
      default: () => null
    },
    notificationType: {
      type: String,
      required: true
    },
    notificationId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: {
        id: '',
        name: ''
      },
      user: {
        id: '',
        username: ''
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
    notificationLink() {
      const productUrl = this.product.name.replace(/ /gi, '-')
      const productLink = `/p/${productUrl}`
      if (this.vote) return productLink
      else {
        // const commentId = this.comment.id
        return `${productLink}#comments`
      }
    },
    productId() {
      if (this.vote) return this.vote.productId
      else return this.comment.productId
    },
    userId() {
      return this.comment.userId
    }
  },
  apollo: {
    product: {
      query: gql`
        query fetchProductNameForNotification($id: ID!) {
          product(id: $id) {
            id
            name
          }
        }
      `,
      variables() {
        return {
          id: this.productId
        }
      },
      skip() {
        return !this.isLoggedIn
      },
      fetchPolicy: 'network-only'
    },
    user: {
      query: gql`
        query fetchCommenterUsernameForNotification($id: ID!) {
          user(id: $id) {
            id
            username
          }
        }
      `,
      variables() {
        return {
          id: this.userId
        }
      },
      skip() {
        return !this.isLoggedIn || !this.comment
      },
      fetchPolicy: 'network-only'
    }
  },
  methods: {
    async markNotificationAsSeen(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation markNotificationAsSeen($id: ID!) {
            markNotificationAsSeen(id: $id) {
              id
            }
          }
        `,
        variables: {
          id
        }
      })
    }
  }
}
</script>
