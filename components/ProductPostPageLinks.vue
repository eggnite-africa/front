<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model.trim="website"
        :error-messages="websiteErrors"
        @input="updateLink()"
        @blur="updateLink()"
        prepend-icon="mdi-web"
        label="Website"
        outlined
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model.trim="github"
        :error-messages="githubErrors"
        @input="updateLink()"
        @blur="updateLink()"
        prepend-icon="mdi-github-circle"
        label="Github"
        color="white"
        outlined
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model.trim="appStore"
        :error-messages="appStoreErrors"
        @input="updateLink()"
        @blur="updateLink()"
        prepend-icon="mdi-apple"
        label="App Store"
        color="grey lighten-1"
        outlined
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model.trim="playStore"
        :error-messages="playStoreErrors"
        @input="updateLink()"
        @blur="updateLink()"
        prepend-icon="mdi-google-play"
        label="Google Play"
        color="green"
        outlined
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { url } from 'vuelidate/lib/validators'
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
  computed: {
    errorMessage() {
      return 'the url is not valid'
    },
    websiteErrors() {
      const errors = []
      if (!this.$v.website.$dirty) return errors
      !this.$v.website.url && errors.push(this.errorMessage)
      return errors
    },
    githubErrors() {
      const errors = []
      if (!this.$v.github.$dirty) return errors
      !this.$v.github.url && errors.push(this.errorMessage)
      return errors
    },
    playStoreErrors() {
      const errors = []
      if (!this.$v.playStore.$dirty) return errors
      !this.$v.playStore.url && errors.push(this.errorMessage)
      return errors
    },
    appStoreErrors() {
      const errors = []
      if (!this.$v.appStore.$dirty) return errors
      !this.$v.appStore.url && errors.push(this.errorMessage)
      return errors
    }
  },
  created() {
    const links = ['website', 'github', 'appStore', 'playStore']
    for (const link of links) {
      let v = ''
      if (this.productLinks !== null) v = this.productLinks[link]
      this[link] = v
    }
  },
  methods: {
    updateLink() {
      const links = {
        website: this.website,
        github: this.github,
        appStore: this.appStore,
        playStore: this.playStore
      }
      this.$v.$touch()
      const invalid = this.$v.$invalid
      this.$emit('update-links', { links, invalid })
    }
  },
  validations: {
    website: {
      url
    },
    github: {
      url
    },
    appStore: {
      url
    },
    playStore: {
      url
    }
  }
}
</script>
