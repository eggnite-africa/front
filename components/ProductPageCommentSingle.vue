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
          <v-icon :class="country" dense></v-icon>
        </v-list-item-title>
        <v-list-item-subtitle> {{ user.profile.bio }} </v-list-item-subtitle>
      </v-list-item-content>
      <span class="ml-auto overline hidden-xs-only"> {{ postedAt }} </span>
    </v-list-item>
    <v-card-text>
      {{ comment.content }}
    </v-card-text>
    <v-card-actions class="mt-n5">
      <v-btn v-if="canReply" @click="reply = !reply" text>reply</v-btn>
      <v-btn v-if="isOwner" @click="deleteComment()" text>delete</v-btn>
    </v-card-actions>
    <comment-reply
      v-if="reply"
      @add-reply="addReply($event)"
      :comment-id="commentId"
      :product-id="productId"
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
    commentUserId() {
      return this.comment.commentUserId
    },
    commentId() {
      return this.comment.id
    },
    productId() {
      return this.comment.productId
    },
    parentId() {
      return this.comment.parentId
    },
    isReply() {
      return !!this.parentId
    },
    isOwner() {
      return this.$auth.loggedIn && +this.commentUserId === this.$auth.user.id
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
    },
    country() {
      return `flag-icons square ${this.user.profile.country}`
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
              country
            }
          }
        }
      `,
      variables() {
        return {
          id: this.commentUserId
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
        .then(() => {
          const comment = {
            commentId: +this.commentId
          }
          if (!this.isReply) this.$emit('delete-comment', { ...comment })
          else
            this.$emit('delete-reply', { ...comment, parentId: +this.parentId })
        })
    },
    navigateToUrl(url) {
      this.$router.push(url)
    },
    addReply(reply) {
      this.$emit('add-reply', reply)
      this.reply = !this.reply
    }
  }
}
</script>
