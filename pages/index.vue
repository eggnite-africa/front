<template>
  <div v-if="!$apollo.queries.products.loading">
    <v-row
      v-for="(product, index) in products"
      :key="index"
      justify="center"
      align="center"
    >
      <v-col>
        <product-item :product-id="product.id"></product-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ProductItem from '@/components/ProductItem.vue'

export default {
  components: {
    ProductItem
  },
  apollo: {
    products: {
      query: gql`
        query fetchAllProducts {
          products {
            id
          }
        }
      `
    }
  },
  head() {
    return {
      titleTemplate: null,
      title: '🚀 Eggnite'
    }
  }
}
</script>
