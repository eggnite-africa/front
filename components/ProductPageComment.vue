<template>
  <section id="comments">
    <add-comment
      @add-comment="addComment($event)"
      :product-id="productId"
    ></add-comment>
    <v-row v-for="(comment, i) in productComments" :key="i" dense>
      <v-col tag="section" cols="12">
        <single-comment
          @delete-comment="deleteComment($event)"
          @add-reply="addReply($event)"
          :comment="comment"
        ></single-comment>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <v-row v-for="(reply, j) in comment.replies" :key="j" dense>
          <v-col cols="11" offset="1">
            <single-comment
              @delete-comment="deleteComment($event)"
              @add-reply="addReply($event)"
              @delete-reply="deleteReply($event)"
              :comment="reply"
              :can-reply="false"
            ></single-comment>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import SingleComment from '@/components/ProductPageCommentSingle.vue'
import AddComment from '@/components/ProductPageCommentAdd.vue'
export default {
  name: 'ProductPageComment',
  components: {
    AddComment,
    SingleComment
  },
  props: {
    comments: {
      type: Array,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      productComments: this.comments
    }
  },
  methods: {
    addComment(comment) {
      this.productComments.unshift(comment)
    },
    deleteComment({ commentId: id }) {
      this.productComments = this.productComments.filter((c) => +c.id !== +id)
    },
    addReply(reply) {
      const parentId = reply.parentId
      const index = this.productComments.findIndex((c) => +c.id === +parentId)
      this.productComments[index].replies.unshift(reply)
    },
    deleteReply(payload) {
      const parentId = payload.parentId
      const replyId = payload.commentId
      const index = this.productComments.findIndex((c) => +c.id === +parentId)
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.productComments[index].replies = this.productComments[
        index
      ].replies.filter((r) => +r.id !== +replyId)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-divider {
  &:last-child {
    display: none;
  }
}
</style>
