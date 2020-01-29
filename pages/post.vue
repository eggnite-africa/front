<template>
  <v-card>
    <v-container>
      <v-card-title>
        Post Product
      </v-card-title>
      <v-card-subtitle
        >Make sure to read the
        <nuxt-link to="/guidelines#posting" class="white--text"
          >guidelines</nuxt-link
        >
        before posting.</v-card-subtitle
      >
      <v-card-text>
        <product-post ref="productPost" :on-submit="onSubmit"
          >Post</product-post
        >
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import ProductPost from '@/components/ProductPostPage.vue'
export default {
  components: {
    ProductPost
  },
  methods: {
    onSubmit() {
      this.$refs.productPost.addProduct()
    }
  },
  middleware: 'auth',
  head() {
    return {
      title: '🔥 Post'
    }
  }
}
</script>
