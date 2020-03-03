<template>
  <v-card>
    <v-card-title>Products</v-card-title>
    <v-card-text v-if="!$apollo.loading">
      <client-only>
        <product-item
          v-for="product in user.products"
          :key="product.id"
          :is-in-settings="true"
          :id="product.id"
          :logo="product.media.logo"
          :name="product.name"
          class="mb-4"
        >
        </product-item>
      </client-only>
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
              name
              media {
                logo
              }
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
  middleware: ['auth', 'isAccountOwner'],
  head() {
    return {
      meta: [
        {
          name: 'robots',
          content: 'noindex,nofollow'
        }
      ]
    }
  }
}
</script>
