<template>
  <v-btn :to="`/u/${makerProfileLink}`" text nuxt>
    <v-avatar color="blue" size="36" left class="mr-2"></v-avatar>
    <span v-text="makerName"></span>
  </v-btn>
</template>

<script>
export default {
  name: 'ProductPageMakerAvatar',
  props: {
    makerName: {
      type: String,
      required: true
    },
    makerProfileLink: {
      type: String,
      required: true
    }
  }
}
</script>
