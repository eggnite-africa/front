<template>
  <v-list-item
    @click="markNotificationAsSeen(notificationId)"
    :to="notificationLink"
  >
    <v-list-item-avatar>
      <v-icon>mdi-comment</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <strong v-if="productName" v-text="productName"></strong>
      <strong v-else v-text="ideaName"></strong>
      <span>
        <strong>@{{ username }}</strong>
        <span v-if="productName">
          {{ parentId ? 'replied to you!' : 'commented on your product!' }}
        </span>
        <span v-else>
          {{ parentId ? 'replied to you!' : 'commented on your idea!' }}
        </span>
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
    ideaName: {
      type: String,
      default: null
    },
    ideaId: {
      type: String,
      default: null
    },
    productName: {
      type: String,
      default: null
    },
    parentId: {
      type: [String, Number],
      default: null
    },
    username: {
      type: String,
      required: true
    }
  },
  computed: {
    notificationLink() {
      let link
      if (this.productName) {
        const productUrl = this.productName.replace(/ /gi, '-')
        link = `/p/${productUrl}`
      } else {
        link = `/i/${this.ideaId}`
      }
      return `${link}#comments`
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
