<template>
  <v-app dark>
    <v-app-bar app>
      <nuxt-link to="/" class="homepage-link">
        <v-img
          class="mr-1 mr-sm-2"
          src="/Logo.png"
          contain
          max-width="42"
        ></v-img>
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <Search />
      <div class="hidden-xs-only">
        <nuxt-link
          v-for="item in items"
          :to="item.link"
          :key="item.name"
          class="menu-link overline"
        >
          {{ item.name }}
        </nuxt-link>
      </div>
      <v-spacer />
      <Menu />
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <client-only>
      <Feedback v-if="displayFeedback" />
    </client-only>
    <v-footer absolute app>
      <v-row dense align="center">
        <v-col>
          <span>&copy; {{ $dateFns.getYear(new Date()) }}</span>
        </v-col>
        <v-col class="d-flex justify-center text-center">
          <span class="overline">
            Made with
            <v-icon x-small color="red">mdi-heart</v-icon> in Tunisia
          </span>
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <nuxt-link to="/about" class="menu-link overline">About</nuxt-link>
          <v-btn icon small href="https://fb.me/eggniteco" target="_blank">
            <v-icon>mdi-facebook-box</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Search from '@/components/MenuSearch.vue'
import Feedback from '@/components/Feedback.vue'

export default {
  components: {
    Menu,
    Search,
    Feedback
  },
  data() {
    return {
      title: 'Eggnite',
      items: [
        {
          name: 'About',
          link: '/about'
        },
        {
          name: 'Guidelines',
          link: '/guidelines'
        }
      ]
    }
  },
  computed: {
    displayFeedback() {
      return this.$auth.loggedIn && this.$auth.user.type !== 'ADMIN'
    }
  }
}
</script>

<style lang="scss" scoped>
.homepage-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: unset;
}
.menu-link {
  text-decoration: none;
  color: #e0e0e0;
  &:first-child {
    margin-left: 0.5rem;
  }
  margin-right: 0.5rem;
  &:hover {
    color: #fff;
  }
}
</style>
