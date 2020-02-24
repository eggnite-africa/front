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
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ProductPostPageLink',
  computed: {
    ...mapState({
      pwebsite: (state) => state.product.website,
      pgithub: (state) => state.product.github,
      pappStore: (state) => state.product.appStore,
      pplayStore: (state) => state.product.playStore
    }),
    website: {
      get() {
        return this.pwebsite
      },
      set(value) {
        this.updateField({ fieldName: 'website', value })
      }
    },
    github: {
      get() {
        return this.pgithub
      },
      set(value) {
        this.updateField({ fieldName: 'github', value })
      }
    },
    appStore: {
      get() {
        return this.pappStore
      },
      set(value) {
        this.updateField({ fieldName: 'appStore', value })
      }
    },
    playStore: {
      get() {
        return this.pplayStore
      },
      set(value) {
        this.updateField({ fieldName: 'playStore', value })
      }
    }
  },
  methods: {
    ...mapMutations({
      updateField: 'product/updateField'
    })
  }
}
</script>
