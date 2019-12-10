<template>
  <div>
    <template v-if="true">
      <v-btn class="mr-1 hidden-xs-only" nuxt color="yellow" outlined>
        <v-icon class="mr-1">mdi-plus</v-icon>post a product
      </v-btn>
      <menu-notifications></menu-notifications>
      <menu-account></menu-account>
    </template>
    <template v-else>
      <v-btn color="error" outlined class="mr-1">signup</v-btn>
      <v-btn color="primary">login</v-btn>
    </template>
  </div>
</template>

<script>
import MenuNotifications from '@/components/MenuNotifications.vue'
import MenuAccount from '@/components/MenuAccount.vue'
export default {
  name: 'Menu',
  components: {
    MenuNotifications,
    MenuAccount
  }
}
</script>
