<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <v-btn :to="makerProfileLink" icon nuxt>
        <v-avatar v-on="on" size="28">
          <v-img :src="makerPicture" eager></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <span v-text="makerName"></span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ProductMakerAvatar',
  props: {
    makerUsername: {
      type: String,
      required: true
    },
    makerName: {
      type: String,
      required: true
    },
    makerPicture: {
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
