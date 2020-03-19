<template>
  <v-list-item @click="markAsSeen(notificationId)" :to="notificationLink">
    <v-list-item-avatar>
      <v-icon tag="span">👍🏻</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <strong>{{ productName }}</strong>
      <span>
        <strong> @{{ username }} </strong> upvoted your product!
      </span>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'MenuNotificationItemUpvote',
  props: {
    notificationId: {
      type: [String, Number],
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  computed: {
    notificationLink() {
      const productUrl = this.productName.replace(/ /gi, '-')
      const productLink = `/p/${productUrl}`
      return productLink
    }
  },
  methods: {
    async markAsSeen(id) {
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
