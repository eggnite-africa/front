<template>
  <v-card>
    <v-card-title>Product Name</v-card-title>
    <v-card-text>
      <product-edit :is-edit="true">
        <v-btn type="submit" color="primary" depressed>Update</v-btn>
      </product-edit>
    </v-card-text>
  </v-card>
</template>

<script>
import ProductEdit from '@/components/ProductPostPage.vue'

export default {
  components: {
    ProductEdit
  }
}
</script>
