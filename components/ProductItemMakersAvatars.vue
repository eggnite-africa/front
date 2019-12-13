<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <v-btn :to="makerProfileLink" icon nuxt>
        <v-avatar v-on="on" color="green" size="28"></v-avatar>
      </v-btn>
    </template>
    <span v-text="makerName"></span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ProductMakersAvatars',
  props: {
    makerProfileLink: {
      type: String,
      required: true
    },
    makerName: {
      type: String,
      required: true
    }
  }
}
</script>
