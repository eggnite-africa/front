<template>
  <div>
    <MenuLoggedIn v-if="isLoggedIn" :user-id="userId" />
    <template v-else>
      <v-dialog v-model="loginDialog" persistent max-width="300">
        <template #activator="{ on }">
          <v-btn v-on="on" color="blue" outlined depressed>
            login
          </v-btn>
        </template>
        <Login @close-dialog="loginDialog = false" />
      </v-dialog>
      <span class="hidden-xs-only">
        <v-dialog v-model="joinDialog" persistent max-width="300">
          <template #activator="{ on }">
            <v-btn v-on="on" color="green" depressed>
              join
            </v-btn>
          </template>
          <Join @close-dialog="joinDialog = false" />
        </v-dialog>
      </span>
    </template>
  </div>
</template>

<script>
import MenuLoggedIn from '@/components/MenuLoggedIn.vue'
import Login from '@/components/Login.vue'
import Join from '@/components/Join.vue'
export default {
  name: 'Menu',
  components: {
    MenuLoggedIn,
    Login,
    Join
  },
  computed: {
    userId() {
      return this.$auth.user.id
    },
    isLoggedIn() {
      return this.$auth.loggedIn
    },
    loginDialog: {
      get() {
        return this.$store.state.utils.loginDialog
      },
      set(value) {
        this.$store.commit('utils/setState', {
          key: 'loginDialog',
          value
        })
      }
    },
    joinDialog: {
      get() {
        return this.$store.state.utils.joinDialog
      },
      set(value) {
        this.$store.commit('utils/setState', {
          key: 'joinDialog',
          value
        })
      }
    }
  }
}
</script>
