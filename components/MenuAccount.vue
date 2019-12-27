<template>
  <v-menu offset-y bottom>
    <template #activator="{ on }">
      <v-btn icon>
        <v-avatar v-on="on" color="primary" size="36"></v-avatar>
      </v-btn>
    </template>
    <v-list flat>
      <v-list-item :to="'/u/' + username" nuxt>
        <v-list-item-avatar>
          <v-icon>mdi-account-details</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Profile</v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-lightbulb</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Products</v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-thumb-up</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Upvotes</v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-comment</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Comments</v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-bell</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Notifications</v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-settings</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Settings</v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item class="mt-1">
        <v-btn @click="logout()" block outlined color="orange">logout</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'MenuAccount',
  computed: {
    username() {
      return this.$auth.user.username
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout('local')
    }
  }
}
</script>
