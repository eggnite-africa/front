<template>
  <v-menu offset-y bottom>
    <template #activator="{ on }">
      <v-btn icon>
        <v-avatar v-on="on" size="36">
          <v-img :src="userProfilePicture" eager></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-list flat dense nav>
      <v-list-item
        v-for="link in userLinks"
        :to="link.link"
        :key="link.name"
        link
      >
        <v-list-item-avatar>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>{{ link.name }}</v-list-item-content>
      </v-list-item>

      <v-list-item v-if="isAdmin" to="/admin">
        <v-list-item-avatar>
          <v-icon>mdi-shield-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Admin</v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item class="mt-1">
        <v-btn @click="logout()" block outlined color="primary">logout</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MenuAccount',
  props: {
    userProfilePicture: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  computed: {
    userProfileLink() {
      return `/u/${this.username}`
    },
    userLinks() {
      return [
        {
          icon: 'mdi-account-circle',
          name: 'Profile',
          link: this.userProfileLink
        },
        {
          icon: 'mdi-settings',
          name: 'Settings',
          link: `${this.userProfileLink}/settings/account`
        }
      ]
    },
    isAdmin() {
      return this.$auth.user.type === 'ADMIN'
    }
  },
  methods: {
    ...mapActions({
      logout: 'utils/logout'
    })
  }
}
</script>
