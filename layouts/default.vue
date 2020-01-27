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

    <v-footer fixed app>
      <client-only>
        <v-dialog v-model="dialog" v-if="$auth.loggedIn" max-width="500">
          <template #activator="{ on }">
            <v-btn v-on="on" class="mb-8" fixed fab right bottom color="info">
              <v-icon>mdi-voice</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>Your voice matters!</v-card-title>
            <v-card-text
              >Your feedback is more than welcome... If you'd like to be part of
              the larger community and give your feedback...</v-card-text
            >
          </v-card>
        </v-dialog>
      </client-only>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Search from '@/components/MenuSearch.vue'
import Menu from '@/components/Menu.vue'

export default {
  components: {
    Search,
    Menu
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
      ],
      dialog: false
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
