<template>
  <div>
    <template v-if="this.$auth.loggedIn">
      <v-btn
        to="/post"
        nuxt
        class="mr-1 hidden-xs-only"
        color="yellow"
        outlined
      >
        <v-icon class="mr-1">mdi-plus</v-icon>post a product
      </v-btn>
      <menu-notifications></menu-notifications>
      <menu-account></menu-account>
    </template>
    <template v-else>
      <v-btn color="error" outlined class="mr-1">signup</v-btn>
      <v-dialog v-model="dialog" persistent max-width="300">
        <template #activator="{ on }">
          <v-btn v-on="on" color="primary" depressed>login</v-btn>
        </template>
        <login @close-dialog="dialog = false"></login>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import MenuNotifications from '@/components/MenuNotifications.vue'
import MenuAccount from '@/components/MenuAccount.vue'
import Login from '@/components/Login.vue'
export default {
  name: 'Menu',
  components: {
    MenuNotifications,
    MenuAccount,
    Login
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>
