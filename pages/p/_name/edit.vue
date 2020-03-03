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
      <v-card-title v-text="productName"></v-card-title>
      <v-card-text v-if="!$apollo.loading">
        <product-edit
          :product-id="product.id"
          :product-name="product.name"
          :product-tagline="product.tagline"
          :product-description="product.description"
          :product-logo="product.media.logo"
          :product-pictures="product.media.pictures"
          :product-links="product.links"
          :product-makers="product.makers"
          :on-submit="onSubmit"
          @update-product="getProduct($event)"
        >
          Update
        </product-edit>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { unslugify } from '@/static/utils/slugify'
import ProductEdit from '@/components/ProductPostPage.vue'
export default {
  components: {
    ProductEdit
  },
  data() {
    return {
      message: {
        display: false,
        err: false,
        text: '',
        icon: ''
      },
      updatedProduct: {}
    }
  },
  computed: {
    productName() {
      const { name } = this.$route.params
      return unslugify(name)
    }
  },
  asyncData() {
    return {
      product: {
        id: '',
        name: '',
        tagline: '',
        description: '',
        media: {
          logo: '',
          pictures: ['']
        },
        makers: [{ id: '' }],
        links: {
          website: '',
          github: '',
          appStore: '',
          playStore: ''
        }
      }
    }
  },
  methods: {
    getProduct(payload) {
      const { name, makersIds, ...updatedProduct } = payload
      this.updatedProduct = updatedProduct
    },
    async onSubmit() {
      try {
        await this.updateProduct()
        this.message.err = false
        this.message.icon = 'mdi-check'
        this.message.text = 'The product was successfully updated!'
      } catch (e) {
        this.message.err = true
        this.message.icon = 'mdi-close'
        this.message.text = 'There was an error updating the product'
      } finally {
        this.message.display = true
      }
    },
    async updateProduct() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation updateProduct($updatedProduct: UpdatedProductInput!) {
            updateProduct(updatedProduct: $updatedProduct) {
              id
            }
          }
        `,
        variables: {
          updatedProduct: this.updatedProduct
        }
      })
    }
  },
  apollo: {
    product: {
      query: gql`
        query fetchProductForUpdate($name: String!) {
          product(name: $name) {
            id
            name
            tagline
            description
            media {
              logo
              pictures
            }
            makers {
              id
            }
            links {
              website
              github
              appStore
              playStore
            }
          }
        }
      `,
      variables() {
        return {
          name: this.productName
        }
      }
    }
  },
  middleware: ['auth', 'isProductOwner'],
  head() {
    return {
      title: 'Edit ' + this.productName,
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
