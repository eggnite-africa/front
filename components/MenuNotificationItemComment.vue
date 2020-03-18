<template>
  <v-list-item
    @click="markNotificationAsSeen(notificationId)"
    :to="notificationLink"
  >
    <v-list-item-avatar>
      <v-icon>mdi-comment</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <strong v-text="product.name"></strong>
      <span>
        <strong>@{{ username }}</strong>
        {{ parentId ? 'replied to you!' : 'commented on your product!' }}
      </span>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'MenuNotificationItemComment',
  props: {
    notificationId: {
      type: [String, Number],
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    parentId: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    notificationLink() {
      const productUrl = this.productName.replace(/ /gi, '-')
      const productLink = `/p/${productUrl}`
      return `${productLink}#comments`
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
