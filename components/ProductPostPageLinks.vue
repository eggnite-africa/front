<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model.trim="website"
        icon="mdi-web"
        label="Website"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model.trim="github"
        icon="mdi-github-circle"
        label="Github"
        color="white"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model.trim="appStore"
        icon="mdi-apple"
        label="App Store"
        color="grey lighten-1"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model.trim="playStore"
        icon="mdi-google-play"
        label="Google Play"
        color="green"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProductPostPageLink',
  props: {
    productWebsite: {
      type: String,
      default: ''
    },
    productGithub: {
      type: String,
      default: ''
    },
    productAppStore: {
      type: String,
      default: ''
    },
    productPlayStore: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      website: this.productWebsite,
      github: this.productGithub,
      appStore: this.productAppStore,
      playStore: this.productPlayStore
    }
  }
}
</script>
