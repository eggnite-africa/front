<template>
  <v-card>
    <v-card-title>Products</v-card-title>
    <v-card-text v-if="!$apollo.queries.user.loading">
      <product-item
        v-for="product in user.products"
        :product-id="product.id"
        :key="product.id"
        :is-in-settings="true"
        class="mb-4"
      >
      </product-item>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import ProductItem from '@/components/ProductItem.vue'

export default {
  name: 'SettingsProductPage',
  components: {
    ProductItem
  },
  computed: {
    userId() {
      return this.$auth.user.id
    }
  },
  apollo: {
    user: {
      query: gql`
        query fetchUserProductsFromSettings($id: ID!) {
          user(id: $id) {
            id
            products {
              id
            }
          }
        }
      `,
      variables() {
        return {
          id: this.userId
        }
      }
    }
  },
  middleware: ['auth', 'isAccountOwner']
}
</script>
