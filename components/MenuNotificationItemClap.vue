<template>
  <v-list-item @click="markAsSeen(notificationId)" :to="'/i/' + ideaId">
    <v-list-item-avatar>
      <v-icon tag="span">🙌🏻</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <strong>{{ ideaName }}</strong>
      <span>
        <strong> @{{ username }} </strong> clapped your idea!
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
    ideaName: {
      type: String,
      required: true
    },
    ideaId: {
      type: [Number, String],
      required: true
    },
    username: {
      type: String,
      required: true
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
