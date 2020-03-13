<template>
  <div>
    <v-btn @click.prevent="handleVote()" :outlined="!hasVote" color="orange">
      <v-icon left>mdi-arrow-up-bold</v-icon>
      <span v-text="votesLength"></span>
    </v-btn>
    <v-btn :to="commentsSection" nuxt outlined>
      <v-icon left>mdi-comment</v-icon>
      <span v-text="commentsCount"></span>
    </v-btn>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'
export default {
  name: 'ProductItemActionButtons',
  props: {
    votesCount: {
      type: Number,
      required: true
    },
    commentsSection: {
      type: String,
      required: true
    },
    commentsCount: {
      type: Number,
      required: true
    },
    hasVoted: {
      type: Boolean,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hasVote: this.hasVoted,
      votesLength: this.votesCount
    }
  },
  methods: {
    ...mapMutations({
      openLoginDialog: 'utils/openLoginDialog'
    }),
    async handleVote() {
      if (!this.$auth.loggedIn) {
        this.openLoginDialog()
        return
      }
      const productId = this.productId
      if (!this.hasVote) await this.upvote(productId)
      else await this.deleteVote(productId)
      this.hasVote = !this.hasVote
    },
    async upvote(productId) {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation upvote($voteInput: VoteInput!) {
              upvote(voteInput: $voteInput) {
                id
                userId
              }
            }
          `,
          variables: {
            voteInput: {
              productId
            }
          }
        })
        this.votesLength++
      } catch (e) {}
    },
    async deleteVote(productId) {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation unvote($voteInput: VoteInput!) {
              deleteVote(voteInput: $voteInput)
            }
          `,
          variables: {
            voteInput: {
              productId
            }
          }
        })
        this.votesLength--
      } catch (e) {}
    }
  }
}
</script>
