<template>
  <v-card>
    <v-container>
      <v-card-title>
        Post Product
      </v-card-title>
      <v-card-text>
        <product-post>
          <v-btn type="submit" color="primary" depressed>Post</v-btn>
        </product-post>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import ProductPost from '@/components/ProductPostPage.vue'
export default {
  components: {
    ProductPost
  }
}
</script>
