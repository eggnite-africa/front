<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title>
          Post Product
        </v-card-title>
        <v-card-subtitle
          >Make sure to read the
          <nuxt-link to="/guidelines#posting" class="white--text">
            guidelines
          </nuxt-link>
          before posting.
        </v-card-subtitle>
        <v-card-text>
          <product-post :on-submit="addProduct">
            Post
          </product-post>
        </v-card-text>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'
import ProductPost from '@/components/ProductPostPage.vue'
export default {
  name: 'PostPage',
  components: {
    ProductPost
  },
  computed: {
    ...mapState({
      name: (state) => state.product.name,
      tagline: (state) => state.product.tagline,
      description: (state) => state.product.description,
      logo: (state) => state.product.logo,
      pictures: (state) => state.product.pictures,
      makers: (state) => state.product.makers,
      website: (state) => state.product.website,
      github: (state) => state.product.github,
      appStore: (state) => state.product.appStore,
      playStore: (state) => state.product.playStore
    })
  },
  methods: {
    addProduct() {
      const newProduct = {
        name: this.name,
        tagline: this.tagline,
        description: this.description,
        media: {
          logo: this.logo,
          pictures: this.pictures
        },
        makers: this.makers,
        links: {
          website: this.website,
          github: this.github,
          appStore: this.appStore,
          playStore: this.playStore
        }
      }

      this.$apollo
        .mutate({
          query: gql`
            mutation addProduct($newProduct: NewProductInput!) {
              addProduct(newProduct: $newProduct) {
                id
                name
              }
            }
          `,
          variables: {
            newProduct
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
      title: '🔥 Post'
    }
  }
}
</script>
