<template>
  <v-row dense>
    <v-col cols="12" md="10">
      <v-textarea
        :disabled="!this.$auth.loggedIn"
        :placeholder="placeholder"
        v-model.trim="content"
        @keydown.ctrl.enter="addComment()"
        dense
        outlined
        auto-grow
        rows="1"
      ></v-textarea>
    </v-col>
    <v-col>
      <v-btn
        @click="addComment()"
        block
        color="orange"
        large
        class="mt-n5 mt-md-0"
      >
        comment
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'
export default {
  name: 'ProductPageCommentAdd',
  props: {
    productId: {
      type: [String, Number],
      default: null
    },
    pitchId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    placeholder() {
      if (this.$auth.loggedIn) return ''
      else return 'Please login or join us to add a comment'
    }
  },
  methods: {
    ...mapMutations({ openLoginDialog: 'utils/openLoginDialog' }),
    addComment() {
      if (!this.$auth.loggedIn) this.openLoginDialog()
      if (this.content === '') return
      this.$apollo
        .mutate({
          mutation: gql`
            mutation addComment($commentInput: CommentInput!) {
              addComment(commentInput: $commentInput) {
                id
                userId
                content
                postedAt
                productId
                pitchId
              }
            }
          `,
          variables: {
            commentInput: {
              productId: this.productId,
              pitchId: this.pitchId,
              content: this.content
            }
          }
        })
        .then(({ data: { addComment } }) => {
          this.$emit('add-comment', addComment)
          this.content = ''
        })
    }
  }
}
</script>
