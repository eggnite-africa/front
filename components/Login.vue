<template>
  <v-card>
    <v-card-title>
      <span>
        Login
      </span>
      <v-spacer></v-spacer>
      <v-btn @click="closeDialog()" icon rounded>
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle class="hidden-sm-and-up"
      >Don't have an account?
      <nuxt-link @click.native="closeDialog()" to="/signup">join us</nuxt-link
      >!</v-card-subtitle
    >
    <form>
      <v-container>
        <v-text-field
          v-model="username"
          @keypress.enter.native.prevent="onSubmit()"
          label="Username"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="password"
          @keypress.enter.native.prevent="onSubmit()"
          label="Password"
          outlined
          type="password"
        ></v-text-field>
      </v-container>
    </form>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    ...mapActions({
      login: 'utils/login'
    }),
    async onSubmit() {
      const [username, password] = [this.username, this.password]
      if (username && password.length >= 8)
        await this.login({ username, password })
    },
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>
