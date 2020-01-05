<template>
  <form>
    <v-row v-if="!isEdit">
      <v-col cols="12">
        <v-text-field label="Name" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea label="Tagline" outlined rows="1" counter="80"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea label="Description" outlined auto-grow></v-textarea>
      </v-col>
    </v-row>
    <header>Media</header>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="3">
        <logo-uploader
          :imageType="'product logo'"
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
        <v-text-field label="Website" prepend-icon="mdi-web"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Github"
          prepend-icon="mdi-github-circle"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field label="App Store" prepend-icon="mdi-apple"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Google Play"
          prepend-icon="mdi-google-play"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          label="Makers"
          outlined
          chips
          append-icon=""
          hide-no-data
          deletable-chips
          hint="Type in the maker's username"
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

export default {
  name: 'ProductPostPage',
  components: {
    ImagesUploader,
    LogoUploader
  },
  props: {
    isEdit: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>
