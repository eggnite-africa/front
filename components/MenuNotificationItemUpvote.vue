<template>
  <v-list-item
    @click="markNotificationAsSeen(notificationId)"
    :to="notificationLink"
  >
    <v-list-item-avatar>
      <v-icon>mdi-thumb-up</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <strong>{{ productName }}</strong>
      <strong> @{{ username }} </strong> upvoted your product!
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
