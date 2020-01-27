<template>
  <v-row dense>
    <v-col cols="12" md="10">
      <v-textarea
        :disabled="!this.$auth.loggedIn"
        :placeholder="placeholder"
        v-model="content"
        @keydown.ctrl.enter="addComment()"
        dense
        outlined
        auto-grow
        rows="1"
      ></v-textarea>
    </v-col>
    <v-col>
      <v-btn
        :disabled="!this.$auth.loggedIn"
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
export default {
  name: 'ProductPageCommentAdd',
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    placeholder() {
      const isLoggedIn = this.$auth.loggedIn
      if (isLoggedIn) return ''
      else return 'Please login or join us to add a comment'
    }
  },
  methods: {
    addComment() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation addComment($commentInput: CommentInput!) {
              addComment(commentInput: $commentInput) {
                content
              }
            }
          `,
          variables: {
            commentInput: {
              productId: this.productId,
              content: this.content
            }
          }
        })
        .then(() => this.$emit('update-comments'))
    }
  }
}
</script>
