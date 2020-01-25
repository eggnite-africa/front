<template>
  <v-btn :to="makerProfileLink" text nuxt>
    <v-avatar size="36" left class="mr-2">
      <client-only>
        <v-img :src="makerPicture"></v-img>
      </client-only>
    </v-avatar>
    <span v-text="makerName"></span>
  </v-btn>
</template>

<script>
export default {
  name: 'ProductPageMakerAvatar',
  props: {
    makerPicture: {
      type: String,
      required: true
    },
    makerName: {
      type: String,
      required: true
    },
    makerUsername: {
      type: String,
      required: true
    }
  },
  computed: {
    makerProfileLink() {
      return `/u/${this.makerUsername}`
    }
  }
}
</script>
