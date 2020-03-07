<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" sm="3">
        <v-card height="400" max-width="250" class="hidden-xs-only">
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  Manage
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense nav>
              <v-list-item
                v-for="link in links"
                :key="link.name"
                :to="link.link"
                nuxt
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ link.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <v-bottom-navigation grow shift color="blue" class="hidden-sm-and-up">
          <v-btn
            v-for="link in links"
            :key="link.name"
            :to="link.link"
            nuxt
            link
          >
            <span v-text="link.name"></span>
            <v-icon v-text="link.icon"> </v-icon>
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
  name: 'CompetitionManagePage',
  data() {
    return {
      links: [
        {
          name: 'Overview',
          icon: 'mdi-home',
          link: 'overview'
        },
        {
          name: 'Products',
          icon: 'mdi-lightbulb',
          link: 'products'
        },
        {
          name: 'Evaluation criteria',
          icon: 'mdi-checkbox-multiple-marked',
          link: 'rules'
        },
        {
          name: 'Danger zone',
          icon: 'mdi-alert',
          link: 'danger'
        }
      ]
    }
  }
}
</script>
