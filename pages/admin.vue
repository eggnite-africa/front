<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" sm="3">
        <v-navigation-drawer permanent class="hidden-xs-only">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Admin area
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item
              v-for="item in items"
              :key="item.name"
              :to="item.link"
              link
              nuxt
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-bottom-navigation
          grow
          shift
          color="primary"
          class="hidden-sm-and-up"
        >
          <v-btn
            v-for="setting in items"
            :key="setting.name"
            :to="setting.link"
            nuxt
            link
          >
            <span v-text="setting.name"></span>
            <v-icon v-text="setting.icon"> </v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
      <v-col>
        <nuxt-child></nuxt-child>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-home-analytics',
          name: 'Overview',
          link: '/admin/'
        },
        {
          icon: 'mdi-voice',
          name: 'Feedback',
          link: '/admin/feedback'
        },
        {
          icon: 'mdi-lightbulb',
          name: 'Products',
          link: '/admin/products'
        },
        {
          icon: 'mdi-account-box-multiple',
          name: 'Users',
          link: '/admin/users'
        }
      ]
    }
  },
  middleware: ['auth', 'isAdmin']
}
</script>
