<template>
  <v-container>
    <v-snackbar v-model="message.display">
      <v-icon :color="message.err ? 'red' : 'green'" left dense>
        {{ message.icon }}
      </v-icon>
      {{ message.text }}
      <v-btn @click.stop="message.display = false" text color="red">
        close
      </v-btn>
    </v-snackbar>
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
            :on-submit="onSubmit"
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
      message: {
        display: false,
        err: false,
        text: '',
        icon: ''
      },
      newProduct: {}
    }
  },
  methods: {
    getProduct(payload) {
      const { id, ...newProduct } = payload
      this.newProduct = newProduct
    },
    async addProduct() {
      await this.$apollo
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
    },
    async onSubmit() {
      try {
        await this.addProduct()
      } catch (e) {
        this.message.err = true
        this.message.icon = 'mdi-close'
        this.message.text =
          'There was an error adding the product, please check your input'
      }
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
