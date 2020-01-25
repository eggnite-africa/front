<template>
  <v-card v-if="!$apollo.queries.user.loading" elevation="0">
    <v-row dense align="baseline" class="mb-n5">
      <v-col cols="2" sm="1" class="mr-md-n6">
        <v-avatar
          @click="navigateToUrl(userUrl)"
          left
          color="blue"
          size="56"
          class="mt-4"
        >
          <client-only>
            <v-img :src="user.profile.profilePicture"></v-img>
          </client-only>
        </v-avatar>
      </v-col>
      <v-col>
        <v-card-title @click="navigateToUrl(userUrl)">
          <div class="mr-auto">
            {{ `${user.profile.firstName} ${user.profile.lastName}` }}
            <span class="subtitle-1 font-weight-thin">
              {{ `(@${user.username})` }}</span
            >
          </div>
          <div class="ml-auto overline">
            <!-- comment (creation) date should go here -->
          </div>
        </v-card-title>
        <v-card-subtitle class="text-justify">
          {{ user.profile.bio }}
        </v-card-subtitle>
      </v-col>
    </v-row>
    <v-card-text class="text-justify">
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
