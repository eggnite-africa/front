<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" sm="3">
        <v-card height="400" max-width="250" class="hidden-xs-only">
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  Settings
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-item
                v-for="setting in userSettings"
                :key="setting.name"
                :to="setting.link"
                nuxt
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ setting.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ setting.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <v-bottom-navigation grow shift color="teal" class="hidden-sm-and-up">
          <v-btn
            v-for="setting in userSettings"
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
  asyncData() {
    return {
      append: true,
      userSettings: [
        {
          icon: 'mdi-account',
          name: 'Account',
          link: 'account'
        },
        {
          icon: 'mdi-lightbulb',
          name: 'Products',
          link: 'products'
        },
        {
          icon: 'mdi-bell',
          name: 'Notifications',
          link: 'notifications'
        }
      ]
    }
  },
  head() {
    return {
      title: '⚙ Settings',
      meta: [
        {
          name: 'robots',
          content: 'noindex,nofollow'
        }
      ]
    }
  }
}
</script>
