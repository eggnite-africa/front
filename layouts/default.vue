<template>
  <v-app dark>
    <v-app-bar app>
      <nuxt-link to="/" class="homepage-link">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <Search />
      <div :class="this.$auth.loggedIn ? 'd-md-none ml-n4' : 'd-sm-none ml-n4'">
        <v-menu offset-y bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" small icon left>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list flat>
            <v-list-item v-for="item in items" :to="item.link" :key="item.name">
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div
        :class="this.$auth.loggedIn ? 'hidden-sm-and-down' : 'hidden-xs-only'"
      >
        <nuxt-link
          v-for="item in items"
          :to="item.link"
          :key="item.name"
          class="menu-link"
          >{{ item.name }}</nuxt-link
        >
      </div>
      <v-spacer />
      <Menu />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <client-only>
      <Feedback />
    </client-only>
    <v-footer fixed app>
      <v-row dense align="center">
        <v-col>
          <span>&copy; {{ $dateFns.getYear(new Date()) }}</span>
        </v-col>
        <v-col class="d-flex justify-center">
          <span class="overline">
            Made with
            <v-icon x-small color="red">mdi-heart</v-icon> in Tunis
          </span>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn icon small href="https://fb.me/eggniteco">
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
      title: '🚀 Eggnite',
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
  }
}
</script>

<style lang="scss" scoped>
.homepage-link {
  text-decoration: none;
  color: unset;
}
.menu-link {
  text-decoration: none;
  color: #bdbdbd;
  margin-right: 0.5rem;
  &:hover {
    color: #e0e0e0;
  }
}
</style>
