<template>
  <validation-observer #default="{ handleSubmit, invalid }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <v-row v-if="!isEdit">
        <v-col cols="12">
          <validation-provider
            #default="{ errors, valid }"
            name="the product name"
            rules="required|min:3"
          >
            <v-text-field
              :error-messages="errors[0]"
              :success="valid"
              v-model="name"
              loader-height="2px"
              label="Name"
              outlined
              hint="Make sure to choose a good, unique name as you won't be able to change it later!"
            ></v-text-field>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <validation-provider
            #default="{ errors, valid }"
            name="The tagline"
            rules="required|min:3|max:80"
          >
            <v-textarea
              v-model="tagline"
              :error-messages="errors[0]"
              :success="valid"
              label="Tagline"
              outlined
              rows="1"
              counter="80"
              hint="A catchy tagline can generate more leads, so don't underestimate it!"
            ></v-textarea>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <validation-provider
            #default="{ errors, valid }"
            name="The description"
            rules="required|min:140|max:280"
          >
            <v-textarea
              v-model="description"
              :error-messages="errors[0]"
              :success="valid"
              label="Description"
              outlined
              auto-grow
              counter="280"
            ></v-textarea>
          </validation-provider>
        </v-col>
      </v-row>
      <header>Media</header>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="3">
          <logo-uploader
            :imageType="'product logo'"
            v-model="logo"
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
          <product-link icon="mdi-web" label="Website"></product-link>
        </v-col>
        <v-col cols="12">
          <product-link
            icon="mdi-github-circle"
            label="Github"
            color="white"
            rules="isValidLink:https://github.com/"
          ></product-link>
        </v-col>
        <v-col cols="12">
          <product-link
            icon="mdi-apple"
            label="App Store"
            field-name="appStore"
            color="grey lighten-1"
            rules="isValidLink:https://apps.apple.com/"
          ></product-link>
        </v-col>
        <v-col cols="12">
          <product-link
            icon="mdi-google-play"
            label="Google Play"
            field-name="googlePlay"
            color="green"
            rules="isValidLink:https://play.google.com/store/apps/"
          ></product-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="makers"
            label="Makers"
            outlined
            chips
            append-icon=""
            hide-no-data
            deletable-chips
            hint="Type in their username(s)"
            height="25px"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row dense>
        <v-spacer></v-spacer>
        <v-btn :disabled="invalid" type="submit" color="primary" depressed
          ><slot></slot
        ></v-btn>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { required, min, max } from 'vee-validate/dist/rules'
import ImagesUploader from '@/components/ProductPostPageImagesUpload.vue'
import LogoUploader from '@/components/shared/SingleImageUpload.vue'
import ProductLink from '@/components/ProductPostPageLink.vue'

extend('required', required)
extend('min', min)
extend('max', max)
extend('isValidLink', {
  params: ['url'],
  validate: (value, { url }) => value.includes(url),
  message: (fieldName, { url }) =>
    `The ${fieldName} link should look like this: ${url}xyz`
})

export default {
  name: 'ProductPostPage',
  components: {
    ImagesUploader,
    LogoUploader,
    ProductLink,
    ValidationProvider,
    ValidationObserver
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
  computed: {
    name: {
      get() {
        return this.$store.state.product.name
      },
      set(value) {
        this.$store.commit('product/updateField', {
          field: 'name',
          value
        })
      }
    },
    tagline: {
      get() {
        return this.$store.state.product.tagline
      },
      set(value) {
        this.$store.commit('product/updateField', {
          field: 'tagline',
          value
        })
      }
    },
    description: {
      get() {
        return this.$store.state.product.description
      },
      set(value) {
        this.$store.commit('product/updateField', {
          field: 'description',
          value
        })
      }
    },
    logo: {
      get() {
        return this.$store.state.product.logo
      },
      set(value) {
        this.$store.commit('product/updateField', {
          field: 'logo',
          value
        })
      }
    },
    images: {
      get() {
        return this.$store.state.product.images
      },
      set(value) {
        this.$store.commit('product/updateField', {
          field: 'images',
          value
        })
      }
    },
    makers: {
      get() {
        return this.$store.state.product.makers
      },
      set(value) {
        this.$store.commit('product/updateField', {
          field: 'makers',
          value
        })
      }
    }
  }
}
</script>
