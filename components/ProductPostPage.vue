<template>
  <div>
    <form @submit.prevent="beforeSubmit()">
      <v-row v-if="!id">
        <v-col cols="12">
          <v-text-field
            v-model.trim="name"
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
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
            v-model="tagline"
            :error-messages="taglineErrors"
            @input="$v.tagline.$touch()"
            @blur="$v.tagline.$touch()"
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
            v-model="description"
            :error-messages="descriptionErrors"
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
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
            :init-image="logo"
            @update-image="updateLogo($event)"
            class="d-flex flex-column justify-center align-center"
          ></logo-uploader>
        </v-col>
        <v-col cols="12" sm="9">
          <images-uploader
            :image-label="'product pictures'"
            :init-images="pictures"
            @update-images="updatePictures($event)"
          ></images-uploader>
        </v-col>
      </v-row>
      <header>Links</header>
      <product-links
        @update-links="updateLinks($event)"
        :product-links="links"
      ></product-links>
      <v-row>
        <v-col cols="12">
          <product-makers-field
            ref="makersField"
            :product-id="id"
            :product-makers="makers"
            @update-makers="updateMakers($event)"
            @is-invalid="makersFieldInvalid = $event"
          ></product-makers-field>
        </v-col>
      </v-row>
      <v-row dense>
        <v-spacer></v-spacer>
        <v-btn color="secondary" type="submit" depressed><slot></slot></v-btn>
      </v-row>
    </form>
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
import ProductLinks from '@/components/ProductPostPageLinks.vue'
import ProductMakersField from '@/components/ProductPostPageProductMakers.vue'

export default {
  name: 'ProductPostPage',
  components: {
    ImagesUploader,
    LogoUploader,
    ProductLinks,
    ProductMakersField
  },
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    productId: {
      type: String,
      default: ''
    },
    productName: {
      type: String,
      default: ''
    },
    productTagline: {
      type: String,
      default: ''
    },
    productDescription: {
      type: String,
      default: ''
    },
    productLogo: {
      type: String,
      default: ''
    },
    productPictures: {
      type: Array,
      default: () => []
    },
    productMakers: {
      type: Array,
      default: () => []
    },
    productLinks: {
      type: Object,
      default: null
    }
  },
  validations: {
    name: {
      required: requiredIf(function() {
        return !this.id
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
  },
  data() {
    return {
      makersFieldInvalid: null,
      linksFieldInvalid: null,
      id: this.productId,
      name: this.productName,
      tagline: this.productTagline,
      description: this.productDescription,
      logo: this.productLogo,
      pictures: this.productPictures,
      links: this.productLinks,
      makers: this.productMakers
    }
  },
  computed: {
    taglineErrors() {
      const errors = []
      if (!this.$v.tagline.$dirty) return errors
      !this.$v.tagline.required && errors.push('the tagline is required')
      !this.$v.tagline.maxLength &&
        errors.push(
          'the tagline should not exceed 80 characters, it should be short and succinct'
        )
      !this.$v.tagline.minLength &&
        errors.push(
          "while it may be true that size don't matter, here, it does."
        )
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required &&
        errors.push('the description is required')
      !this.$v.description.maxLength &&
        errors.push(
          'the description should not exceed 280 characters, it should fit in a tweet'
        )
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('should I call captain obvious?')
      !this.$v.name.isUnique &&
        errors.push('a product with the same name already exists')
      return errors
    }
  },
  methods: {
    updateLogo(value) {
      this.logo = value
    },
    updatePictures(value) {
      this.pictures = value
    },
    updateMakers(value) {
      this.makers = value
    },
    updateLinks({ links, invalid }) {
      this.links = { ...links }
      this.linksFieldInvalid = invalid
    },
    beforeSubmit() {
      // Unfortunately, for now the simplest solution is to use refs
      // to trigger the validate method every time [this] method is called
      this.$refs.makersField.validate()
      this.$v.$touch()
      if (this.$v.$invalid || this.makersFieldInvalid || this.linksFieldInvalid)
        return
      const packagedProduct = {
        id: this.id,
        name: this.name,
        tagline: this.tagline,
        description: this.description,
        media: {
          logo: this.logo,
          pictures: [...this.pictures]
        },
        links: { ...this.links },
        makersIds: [...this.makers]
      }
      this.$emit('update-product', packagedProduct)
      this.onSubmit()
    }
  },
  apollo: {
    productExists: {
      query: gql`
        query checkProductExistance($name: String!) {
          productExists: checkProductExistance(productName: $name)
        }
      `,
      variables() {
        return {
          name: this.name
        }
      },
      skip() {
        return this.id || this.name === ''
      },
      fetchPolicy: 'network-only'
    }
  }
}
</script>
