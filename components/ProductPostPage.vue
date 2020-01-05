<template>
  <form>
    <v-row v-if="!isEdit">
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Name"
          outlined
          hint="Make sure to choose a good name as you won't be able to change it later!"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="tagline"
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
        ></product-link>
      </v-col>
      <v-col cols="12">
        <product-link
          icon="mdi-apple"
          label="App Store"
          field-name="appStore"
          color="grey lighten-1"
        ></product-link>
      </v-col>
      <v-col cols="12">
        <product-link
          icon="mdi-google-play"
          label="Google Play"
          field-name="googlePlay"
          color="green"
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
      <slot></slot>
    </v-row>
  </form>
</template>

<script>
import ImagesUploader from '@/components/ProductPostPageImagesUpload.vue'
import LogoUploader from '@/components/shared/SingleImageUpload.vue'
import ProductLink from '@/components/ProductPostPageLink.vue'

export default {
  name: 'ProductPostPage',
  components: {
    ImagesUploader,
    LogoUploader,
    ProductLink
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
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
