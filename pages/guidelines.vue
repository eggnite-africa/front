<template>
  <v-container>
    <v-row id="posting" tag="section" dense>
      <v-col cols="12">
        <v-img src="/checklist.svg" max-width="500" class="mx-auto"></v-img>
      </v-col>
      <v-col cols="12">
        <header class="headline">Posting guidelines*</header>
        <p class="subtitle-1 grey--text">
          Eggnite is for new or unknown products
        </p>
        <ul>
          <li>
            Product can be an app, a website, an open-source project, or a
            hardware-based one
          </li>
          <li>
            If product is hardware-based, a website has to be provided and at
            least one picture should be included
          </li>
          <li>Product has to be in a <strong>useable</strong> state</li>
        </ul>
        <v-subheader class="overline font-weight-light text-lowercase">
          *Disrespect of the guidelines may result in removal of the product
        </v-subheader>
      </v-col>
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
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
