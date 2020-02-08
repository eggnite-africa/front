<template>
  <div>
    <form @submit.prevent="onSubmit" v-if="!$apollo.queries.product.loading">
      <v-row v-if="!isEdit">
        <v-col cols="12">
          <v-text-field
            v-model="product.name"
            :error-messages="nameErrors"
            @input="$v.product.name.$touch()"
            @blur="$v.product.name.$touch()"
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
            :error-messages="taglineErrors"
            @input="$v.product.tagline.$touch()"
            @blur="$v.product.tagline.$touch()"
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
            :error-messages="descriptionErrors"
            @input="$v.product.description.$touch()"
            @blur="$v.product.description.$touch()"
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
            ref="productLogo"
            :image-label="'product logo'"
            :init-image="product.media.logo"
            class="mx-auto"
          ></logo-uploader>
        </v-col>
        <v-col cols="12" sm="9">
          <images-uploader
            ref="productPictures"
            :image-label="'product pictures'"
            :init-images="product.media.pictures"
            :is-edit="isEdit"
          ></images-uploader>
        </v-col>
      </v-row>
      <header>Links</header>
      <v-row>
        <v-col cols="12">
          <product-link
            ref="productWebsite"
            :p-link="product.links.website"
            :is-required="requireWebsite"
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
        <v-btn color="primary" type="submit" depressed><slot></slot></v-btn>
      </v-row>
    </form>

    <v-snackbar v-model="invalidForm">
      <v-icon color="yellow" left>mdi-alert</v-icon>
      <span class="mr-auto">
        There's an error somewhere
      </span>
    </v-snackbar>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import {
  maxLength,
  required,
  requiredIf,
  minLength
} from 'vuelidate/lib/validators'
import ImagesUploader from '@/components/shared/MultipleImageUploader.vue'
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
          logo: '',
          pictures: ['']
        },
        description: '',
        links: {
          website: '',
          github: '',
          appStore: '',
          playStore: ''
        },
        makers: []
      },
      productExists: this.isEdit,
      requireWebsite: false,
      invalidForm: false
    }
  },
  validations: {
    product: {
      name: {
        required: requiredIf(function() {
          return !this.isEdit
        }),
        isUnique(v) {
          if (v === '') return true
          return !this.productExists
        }
      },
      tagline: {
        required,
        maxLength: maxLength(80),
        minLength: minLength(3)
      },
      description: {
        required,
        maxLength: maxLength(280)
      }
    }
  },
  computed: {
    taglineErrors() {
      const errors = []
      if (!this.$v.product.tagline.$dirty) return errors
      !this.$v.product.tagline.required &&
        errors.push('the tagline is required')
      !this.$v.product.tagline.maxLength &&
        errors.push(
          'the tagline should not exceed 80 characters, it should be short and succint'
        )
      !this.$v.product.tagline.minLength &&
        errors.push(
          "while it may be true that size don't matter, here, it does."
        )
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.product.description.$dirty) return errors
      !this.$v.product.description.required &&
        errors.push('the description is required')
      !this.$v.product.description.maxLength &&
        errors.push(
          'the description should not exceed 280 characters, it should fit in a tweet'
        )
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.product.name.$dirty) return errors
      !this.$v.product.name.required &&
        errors.push('should I call captain obvious?')
      !this.$v.product.name.isUnique &&
        errors.push('a product with the same name already exists')
      return errors
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
                  pictures
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
        const name = this.$route.params.name.replace(/-/g, ' ')
        return {
          name
        }
      },
      skip() {
        return !this.isEdit
      }
    },
    productExists: {
      query: gql`
        query checkProductExistance($name: String!) {
          productExists: checkProductExistance(productName: $name)
        }
      `,
      variables() {
        return {
          name: this.product.name
        }
      },
      skip() {
        return this.isEdit || this.product.name === ''
      },
      fetchPolicy: 'network-only'
    }
  },
  methods: {
    getProductData() {
      const [
        id,
        name,
        tagline,
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
        this.product.description,
        this.$refs.productWebsite.link,
        this.$refs.productRepo.link,
        this.$refs.productAppStore.link,
        this.$refs.productPlayStore.link,
        this.$refs.productMakers.makers
      ]
      const logo = this.$refs.productLogo.getProductLogo()
      const pictures = this.$refs.productPictures.getProductPictures()

      return {
        id,
        name,
        tagline,
        logo,
        pictures,
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
        pictures,
        description,
        website,
        github,
        appStore,
        playStore,
        makers
      } = this.getProductData()
      const productLogo = this.$refs.productLogo
      const productPictures = this.$refs.productPictures
      const productWebsite = this.$refs.productWebsite
      const productMakers = this.$refs.productMakers
      let linksAreValid = true

      this.$v.$touch()
      productMakers.$v.$touch()
      productLogo.$v.$touch()
      productPictures.$v.$touch()

      if (!website && !github && !appStore && !playStore) {
        linksAreValid = false
        this.requireWebsite = true
        productWebsite.$v.$touch()
      }

      if (
        this.$v.$invalid ||
        productMakers.$v.$invalid ||
        !linksAreValid ||
        productLogo.$v.$invalid ||
        productPictures.$v.$invalid
      ) {
        this.invalidForm = true
        return
      }

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
                logo,
                pictures
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
        .then(async () => {
          const productName = name.replace(/ /gi, '-')
          const congrats = this.$auth.user.products.length === 0
          await this.$auth.fetchUser()
          this.$router.replace({
            name: 'p-name',
            params: { name: productName, congrats }
          })
        })
    },
    async updateProduct() {
      const {
        id,
        tagline,
        description,
        logo,
        pictures,
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
            }
          }
        `,
        variables: {
          updatedProduct: {
            id,
            tagline,
            description,
            media: {
              logo,
              pictures
            },
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
