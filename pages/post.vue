<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title>
          Post Product
        </v-card-title>
        <v-card-subtitle>
          Make sure to read the
          <nuxt-link to="/guidelines#posting" class="white--text">
            guidelines
          </nuxt-link>
          before posting.
        </v-card-subtitle>
        <v-card-text>
          <product-post
            @update-product="getProduct($event)"
            :on-submit="addProduct"
          >
            Post
          </product-post>
        </v-card-text>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import ProductPost from '@/components/ProductPostPage.vue'
export default {
  name: 'PostPage',
  components: {
    ProductPost
  },
  data() {
    return {
      newProduct: {}
    }
  },
  methods: {
    getProduct(payload) {
      this.newProduct = { ...payload }
    },
    addProduct() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation addProduct($newProduct: NewProductInput!) {
              addProduct(newProduct: $newProduct) {
                id
                name
              }
            }
          `,
          variables: {
            newProduct: this.newProduct
          }
        })
        .then(({ data: { addProduct } }) => {
          const { name } = addProduct
          const productName = name.replace(/ /gi, '-')
          const congrats = this.$auth.user.products.length === 0
          this.$router.replace({
            name: 'p-name',
            params: { name: productName, congrats }
          })
        })
    }
  },
  middleware: 'auth',
  head() {
    return {
      title: '⚡ Add Product'
    }
  }
}
</script>
