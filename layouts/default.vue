<template>
  <v-app dark>
    <v-app-bar app>
      <nuxt-link to="/" class="homepage-link">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
      <Menu />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer fixed app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  components: {
    Menu
  },
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: '🚀 Eggnite'
    }
  }
}
</script>

<style lang="scss" scoped>
.homepage-link {
  text-decoration: none;
  color: unset;
}
</style>
