<template>
  <v-row :hidden="hidden" class="blue mt-n3">
    <v-container>
      <v-col>
        <div class="d-flex">
          <header class="title">Welcome to Eggnite,</header>
          <v-btn @click.stop="hidden = true" icon class="ml-auto">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <p class="subtitle-1 mt-n2">
          Discover new products made by Tunisian student developers &
          entrepreneurs
        </p>
        <v-btn color="green" depressed nuxt to="/join">Join us</v-btn>
        and become part of an awesome community.
        <nuxt-link to="/about" class="white--text">Learn more</nuxt-link>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
export default {
  name: 'WelcomeBanner',
  computed: {
    hidden: {
      get() {
        return (
          this.$auth.loggedIn || this.$store.state.utils.welcomeBannerHidden
        )
      },
      set(value) {
        return this.$store.commit('utils/setState', {
          key: 'welcomeBannerHidden',
          value
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.homepage-link {
  text-decoration: none;
}
</style>
