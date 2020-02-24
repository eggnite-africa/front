<template>
  <div>
    <form @submit.prevent="onSubmit" v-if="!$apollo.loading">
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
      <product-links
        :product-website="product.links.website"
        :product-github="product.links.github"
        :product-playstore="product.links.playStore"
        :product-appstore="product.links.appStore"
      ></product-links>
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
// import gql from 'graphql-tag'
import {
  maxLength,
  required,
  requiredIf,
  minLength
} from 'vuelidate/lib/validators'
import ImagesUploader from '@/components/shared/MultipleImageUploader.vue'
import LogoUploader from '@/components/shared/SingleImageUpload.vue'
import ProductLinks from '@/components/ProductPostPageLinks.vue'
import ProductMakers from '@/components/ProductPostPageProductMakers.vue'

export default {
  name: 'ProductPostPage',
  components: {
    ImagesUploader,
    LogoUploader,
    ProductLinks,
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
  data() {
    return {
      product: {
        name: '',
        tagline: '',
        description: '',
        media: {
          logo: '',
          pictures: ''
        },
        links: {
          website: '',
          github: '',
          appStore: '',
          playStore: ''
        },
        makers: [
          {
            id: ''
          }
        ]
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
    // productExists: {
    //   query: gql`
    //     query checkProductExistance($name: String!) {
    //       productExists: checkProductExistance(productName: $name)
    //     }
    //   `,
    //   variables() {
    //     return {
    //       name: this.product.name
    //     }
    //   },
    //   skip() {
    //     return this.isEdit || this.product.name === ''
    //   },
    //   fetchPolicy: 'network-only'
    // }
  }
}
</script>
