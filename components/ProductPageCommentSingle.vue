<template>
  <v-card v-if="!$apollo.queries.user.loading" elevation="0">
    <v-list-item :to="`/u/${user.username}`" nuxt>
      <v-list-item-avatar size="56">
        <v-img :src="user.profile.profilePicture"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ `${user.profile.firstName} ${user.profile.lastName}` }}
          <span class="font-weight-thin">{{ `(@${user.username})` }}</span>
        </v-list-item-title>
        <v-list-item-subtitle> {{ user.profile.bio }} </v-list-item-subtitle>
      </v-list-item-content>
      <span class="ml-auto overline"> {{ postedAt }} </span>
    </v-list-item>
    <v-card-text>
      {{ comment.content }}
    </v-card-text>
    <v-card-actions v-if="isOwner" class="mt-n5">
      <v-btn @click="deleteComment()" text>delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'ProductPageCommentSingle',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    userId() {
      return this.comment.userId
    },
    commentId() {
      return this.comment.id
    },
    isOwner() {
      return this.$auth.loggedIn && +this.userId === this.$auth.user.id
    },
    userUrl() {
      return `/u/${this.user.username}`
    },
    postedAt() {
      const date = this.$dateFns.parseISO(this.comment.postedAt)
      const formattedDate = this.$dateFns.format(date, 'd MMMM yyy')
      return formattedDate
    }
  },
  apollo: {
    user: {
      query: gql`
        query fetchCommentUser($id: ID) {
          user(id: $id) {
            id
            username
            profile {
              profilePicture
              firstName
              lastName
              bio
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
  methods: {
    deleteComment() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteComment($commentId: ID!) {
              deleteComment(commentId: $commentId)
            }
          `,
          variables: {
            commentId: this.commentId
          }
        })
        .then(() => this.$emit('update-comments'))
    },
    navigateToUrl(url) {
      this.$router.push(url)
    }
  }
}
</script>
