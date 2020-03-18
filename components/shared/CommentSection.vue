<template>
  <section id="comments">
    <add-comment
      @add-comment="addComment($event)"
      :product-id="productId"
      :pitch-id="pitchId"
    ></add-comment>
    <v-row v-for="(comment, i) in $_comments" :key="i" dense>
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
import SingleComment from '@/components/CommentSectionSingle.vue'
import AddComment from '@/components/CommentSectionAdd.vue'
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
      default: null
    },
    pitchId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      $_comments: this.comments
    }
  },
  methods: {
    addComment(comment) {
      this.$_comments.unshift(comment)
    },
    deleteComment({ commentId: id }) {
      this.$_comments = this.$_comments.filter((c) => +c.id !== +id)
    },
    addReply(reply) {
      const parentId = reply.parentId
      const index = this.$_comments.findIndex((c) => +c.id === +parentId)
      this.$_comments[index].replies.unshift(reply)
    },
    deleteReply(payload) {
      const parentId = payload.parentId
      const replyId = payload.commentId
      const index = this.$_comments.findIndex((c) => +c.id === +parentId)
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.$_comments[index].replies = this.$_comments[index].replies.filter(
        (r) => +r.id !== +replyId
      )
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
