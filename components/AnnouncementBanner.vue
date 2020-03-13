<template>
  <div v-if="content">
    <client-only>
      <v-alert text type="info" dismissible>
        {{ content }}
        <v-btn :href="link" text target="_blank" small>learn more</v-btn>
      </v-alert>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    }
  }
}
</script>
