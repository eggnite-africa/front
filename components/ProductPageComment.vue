<template>
  <section>
    <add-comment></add-comment>
    <v-divider></v-divider>
    <v-row dense>
      <v-col cols="12">
        <single-comment></single-comment>
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
  }
}
</script>
