<template>
  <section id="comments">
    <add-comment
      @update-comments="$emit('update-comments')"
      :product-id="productId"
    ></add-comment>
    <v-row v-for="(comment, i) in comments" :key="i" dense>
      <v-col tag="section" cols="12">
        <single-comment
          @update-comments="$emit('update-comments')"
          :comment="comment"
        ></single-comment>
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
