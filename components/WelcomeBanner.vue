<template>
  <v-row class="primary">
    <v-col>
      <header class="title">Welcome to Eggnite,</header>
      <p class="subtitle-1">
        Discover new products made by Tunisian student developers &
        entrepreneurs
      </p>
      <v-btn color="green" depressed nuxt to="/join">Join us</v-btn> and become
      part of an awesome community.
      <nuxt-link to="/about" class="white--text">Learn more</nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'WelcomeBanner'
}
</script>

<style lang="scss" scoped>
.homepage-link {
  text-decoration: none;
}
</style>
