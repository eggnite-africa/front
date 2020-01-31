<template>
  <div>
    <v-row id="posting" tag="section">
      <v-col cols="12">
        <v-img src="/checklist.svg" max-width="500" class="mx-auto"></v-img>
      </v-col>
      <v-col cols="12">
        <header class="headline">Posting guidelines *</header>
        <p class="subtitle-1 grey--text">
          Eggnite is for new or unknown products
        </p>
        <ul>
          <li>
            Product has to be either an app, a website, an open-source project
            or hardware-based
          </li>
          <li>
            If product is a hardware-based, a website has to be provided and
            pictures should be included
          </li>
          <li>Product has to be either in production or in a 'ready' state</li>
        </ul>
        <v-subheader class="overline"
          >*Disrespect of the guidelines may result in removal of the
          product</v-subheader
        >
      </v-col>
      <v-col cols="12"> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '🧭 Guidelines',
      meta: [
        {
          property: 'robots',
          content: 'noindex,nofollow'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$space: 0.5rem;
li {
  margin-bottom: $space;
}
</style>
