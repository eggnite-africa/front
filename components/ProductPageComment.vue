<template>
  <section id="comments">
    <add-comment
      @add-comment="addComment($event)"
      :product-id="productId"
    ></add-comment>
    <v-row v-for="(comment, i) in productComments" :key="i" dense>
      <v-col tag="section" cols="12">
        <single-comment :comment="comment"></single-comment>
        <v-divider></v-divider>
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
      this.productComments.push(comment)
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
