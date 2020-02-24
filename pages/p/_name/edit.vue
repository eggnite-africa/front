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
      <v-card-text>
        <product-edit :on-submit="onSubmit">
          Update
        </product-edit>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'
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
      }
    }
  },
  computed: {
    productName() {
      return this.$route.params.name.replace(/-/g, ' ')
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
    ...mapMutations({
      updateField: 'product/updateField'
    }),
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
    populateStore(product) {
      function _normalizeData(product) {
        const normalizedProduct = {}
        let keys = Object.keys(product)
        keys = keys.filter(
          (k) => k !== 'makers' && k !== 'links' && k !== 'media'
        )
        for (const key of keys) {
          normalizedProduct[key] = product[key]
        }
        const links = Object.entries(product.links)
        for (const [link, value] of links) {
          normalizedProduct[link] = value
        }
        for (const key of ['logo', 'pictures']) {
          normalizedProduct[key] = product.media[key]
        }
        const makers = product.makers.map(({ id }) => id)
        normalizedProduct.makers = makers
        return normalizedProduct
      }

      const normalizedProduct = _normalizeData(this.product)
      const keys = Object.keys(normalizedProduct)
      for (const key of keys) {
        this.updateField({ fieldName: key, value: normalizedProduct[key] })
      }
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
  created() {
    this.populateStore(this.product)
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
