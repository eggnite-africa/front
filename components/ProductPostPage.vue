<template>
  <form @submit.prevent="onSubmit" v-if="!$apollo.queries.product.loading">
    <v-row v-if="!isEdit">
      <v-col cols="12">
        <v-text-field
          v-model="product.name"
          loader-height="2px"
          label="Name"
          outlined
          hint="Make sure to choose a good, unique name as you won't be able to change it later!"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="product.tagline"
          label="Tagline"
          outlined
          rows="1"
          counter="80"
          hint="A catchy tagline can generate more leads, so don't underestimate it!"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="product.description"
          label="Description"
          outlined
          auto-grow
          counter="280"
        ></v-textarea>
      </v-col>
    </v-row>
    <header>Media</header>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="3">
        <logo-uploader
          :image-label="'product logo'"
          class="mx-auto"
        ></logo-uploader>
      </v-col>
      <v-col cols="12" sm="9">
        <images-uploader></images-uploader>
      </v-col>
    </v-row>
    <header>Links</header>
    <v-row>
      <v-col cols="12">
        <product-link
          ref="productWebsite"
          :p-link="product.links.website"
          icon="mdi-web"
          label="Website"
        ></product-link>
      </v-col>
      <v-col cols="12">
        <product-link
          ref="productRepo"
          :p-link="product.links.github"
          icon="mdi-github-circle"
          label="Github"
          color="white"
        ></product-link>
      </v-col>
      <v-col cols="12">
        <product-link
          ref="productAppStore"
          :p-link="product.links.appStore"
          icon="mdi-apple"
          label="App Store"
          field-name="appStore"
          color="grey lighten-1"
        ></product-link>
      </v-col>
      <v-col cols="12">
        <product-link
          ref="productPlayStore"
          :p-link="product.links.playStore"
          icon="mdi-google-play"
          label="Google Play"
          field-name="playStore"
          color="green"
        ></product-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <product-makers
          ref="productMakers"
          :p-id="product.id"
          :p-makers="product.makers"
          :is-edit="isEdit"
        ></product-makers>
      </v-col>
    </v-row>
    <v-row dense>
      <v-spacer></v-spacer>
      <v-btn type="submit" color="primary" depressed><slot></slot></v-btn>
    </v-row>
  </form>
</template>

<script>
import gql from 'graphql-tag'
import ImagesUploader from '@/components/ProductPostPageImagesUpload.vue'
import LogoUploader from '@/components/shared/SingleImageUpload.vue'
import ProductLink from '@/components/ProductPostPageLink.vue'
import ProductMakers from '@/components/ProductPostPageProductMakers.vue'

export default {
  name: 'ProductPostPage',
  components: {
    ImagesUploader,
    LogoUploader,
    ProductLink,
    ProductMakers
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      product: {
        id: '',
        name: '',
        tagline: '',
        media: {
          logo: ''
        },
        description: '',
        links: {
          website: '',
          github: '',
          appStore: '',
          playStore: ''
        },
        makers: []
      }
    }
  },
  apollo: {
    product: {
      query() {
        if (this.isEdit) {
          return gql`
            query fetchProduct($name: String!) {
              product(name: $name) {
                # The id has to be included: https://stackoverflow.com/a/56402056
                id
                tagline
                description
                media {
                  logo
                }
                links {
                  website
                  github
                  appStore
                  playStore
                }
                makers {
                  id
                }
              }
            }
          `
        }
      },
      variables() {
        const name = this.$route.params.name.replace('-', ' ')
        return {
          name
        }
      },
      skip() {
        return !this.isEdit
      }
    }
  },
  methods: {
    getProductData() {
      const [
        id,
        name,
        tagline,
        logo,
        description,
        website,
        github,
        appStore,
        playStore,
        makers
      ] = [
        this.product.id,
        this.product.name,
        this.product.tagline,
        this.product.media.logo,
        this.product.description,
        this.$refs.productWebsite.link,
        this.$refs.productRepo.link,
        this.$refs.productAppStore.link,
        this.$refs.productPlayStore.link,
        this.$refs.productMakers.makers
      ]

      return {
        id,
        name,
        tagline,
        logo,
        description,
        website,
        github,
        appStore,
        playStore,
        makers
      }
    },
    async addProduct() {
      const {
        name,
        tagline,
        logo,
        description,
        website,
        github,
        appStore,
        playStore,
        makers
      } = this.getProductData()

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation addNewProduct($newProduct: NewProductInput!) {
              addProduct(newProduct: $newProduct) {
                id
                name
              }
            }
          `,
          variables: {
            newProduct: {
              name,
              tagline,
              description,
              media: {
                logo
              },
              links: {
                website,
                github,
                appStore,
                playStore
              },
              makersIds: makers
            }
          }
        })
        .then(() => {
          const productUrl = `/p/${name.replace(' ', '-')}`
          this.$router.replace(productUrl)
        })
    },
    async updateProduct() {
      const {
        id,
        tagline,
        description,
        website,
        github,
        appStore,
        playStore
      } = this.getProductData()

      await this.$apollo.mutate({
        mutation: gql`
          mutation updateProduct($updatedProduct: UpdatedProductInput!) {
            updateProduct(updatedProduct: $updatedProduct) {
              id
              name
            }
          }
        `,
        variables: {
          updatedProduct: {
            id,
            tagline,
            description,
            links: {
              website,
              github,
              appStore,
              playStore
            }
          }
        }
      })
    }
  }
}
</script>
