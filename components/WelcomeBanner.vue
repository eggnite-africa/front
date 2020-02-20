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
          {{ rotateMessages() + '!' }}
        </p>
        <v-btn to="/about" nuxt color="green" class="mr-2">What is this?</v-btn>
        <v-btn class="amber darken-2" nuxt to="/join">Join us</v-btn>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
export default {
  name: 'WelcomeBanner',
  data() {
    return {
      messages: [
        'Discover new products made by African makers',
        'Share your product with a community of African makers'
      ]
    }
  },
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
  },
  methods: {
    rotateMessages() {
      const i = Math.floor(Math.random() * this.messages.length)
      return this.messages[i]
    }
  }
}
</script>

<style lang="scss" scoped>
.homepage-link {
  text-decoration: none;
}
</style>
