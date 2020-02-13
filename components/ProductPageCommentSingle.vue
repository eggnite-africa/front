<template>
  <v-card v-if="!$apollo.queries.user.loading" elevation="0">
    <v-list-item :to="`/u/${user.username}`" nuxt>
      <v-list-item-avatar size="56">
        <v-img :src="profilePicture"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ `${user.profile.firstName} ${user.profile.lastName}` }}
          <span class="font-weight-thin">{{ `(@${user.username})` }}</span>
        </v-list-item-title>
        <v-list-item-subtitle> {{ user.profile.bio }} </v-list-item-subtitle>
      </v-list-item-content>
      <span class="ml-auto overline hidden-xs-only"> {{ postedAt }} </span>
    </v-list-item>
    <v-card-text>
      {{ comment.content }}
    </v-card-text>
    <v-card-actions v-if="isOwner" class="mt-n5">
      <v-btn v-if="canReply" @click="reply = !reply" text>reply</v-btn>
      <v-btn @click="deleteComment()" text>delete</v-btn>
    </v-card-actions>
    <comment-reply
      v-if="reply"
      @add-reply="$emit('add-reply', $event)"
      :comment-id="commentId"
    ></comment-reply>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import CommentReply from '@/components/ProductPageCommentReply.vue'
export default {
  name: 'ProductPageCommentSingle',
  components: {
    CommentReply
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    canReply: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      reply: false
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
    },
    profilePicture() {
      const profilePicture = this.user.profile.profilePicture
      if (profilePicture) return profilePicture

      const gender = this.user.profile.gender
      if (gender === 'MALE') {
        return '/male_avatar.svg'
      } else return '/female_avatar.svg'
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
              gender
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
        .then(() => this.$emit('delete-comment', { commentId: this.commentId }))
    },
    navigateToUrl(url) {
      this.$router.push(url)
    }
  }
}
</script>
