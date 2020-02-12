<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <v-btn :to="makerProfileLink" icon nuxt>
        <v-avatar v-on="on" size="28">
          <client-only>
            <v-img :src="makerPicture"></v-img>
          </client-only>
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
