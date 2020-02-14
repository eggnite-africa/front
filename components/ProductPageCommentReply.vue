<template>
  <v-row dense>
    <v-col cols="2" sm="1">
      <v-icon right class="mt-2 ml-8">mdi-subdirectory-arrow-right</v-icon>
    </v-col>
    <v-col cols="10" sm="9">
      <v-textarea
        :disabled="!this.$auth.loggedIn"
        :placeholder="placeholder"
        v-model="content"
        @keydown.ctrl.enter="addReply()"
        dense
        outlined
        auto-grow
        rows="1"
      ></v-textarea>
    </v-col>
    <v-col cols="12" sm="2">
      <v-btn @click="addReply()" block color="orange" large>
        reply
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
    commentId: {
      type: String,
      required: true
    },
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
      if (this.$auth.loggedIn) return ''
      else return 'Please login or join us to add a comment'
    }
  },
  methods: {
    ...mapMutations({ openLoginDialog: 'utils/openLoginDialog' }),
    addReply() {
      if (!this.$auth.loggedIn) this.openLoginDialog()
      this.$apollo
        .mutate({
          mutation: gql`
            mutation addReply($reply: CommentInput!) {
              addReply: addComment(commentInput: $reply) {
                id
                content
                userId
                postedAt
                parentId
              }
            }
          `,
          variables: {
            reply: {
              content: this.content,
              parentId: this.commentId,
              productId: this.productId
            }
          }
        })
        .then(({ data: { addReply } }) => {
          this.$emit('add-reply', addReply)
        })
    }
  }
}
</script>
