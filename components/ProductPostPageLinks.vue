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
    productLinks: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      website: null,
      github: null,
      appStore: null,
      playStore: null
    }
  },
  created() {
    const links = ['website', 'github', 'appStore', 'playStore']
    for (const link of links) {
      let v = ''
      if (this.productLinks !== null) v = this.productLinks[link]
      this[link] = v
    }
  }
}
</script>
