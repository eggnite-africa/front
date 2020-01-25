<template>
  <v-menu offset-y bottom>
    <template #activator="{ on }">
      <v-btn icon>
        <v-avatar v-on="on" color="primary" size="36">
          <client-only>
            <v-img :src="userProfilePicture"></v-img>
          </client-only>
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

      <v-divider></v-divider>
      <v-list-item class="mt-1">
        <v-btn @click="logout()" block outlined color="orange">logout</v-btn>
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
          icon: 'mdi-account-details',
          name: 'Profile',
          link: this.userProfileLink
        },
        {
          icon: 'mdi-settings',
          name: 'Settings',
          link: `${this.userProfileLink}/settings/account`
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      logout: 'utils/logout'
    })
  }
}
</script>
