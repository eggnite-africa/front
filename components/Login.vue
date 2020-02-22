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
    <v-card-subtitle>
      Don't have an account?
      <v-btn @click.native="openJoinDialog()" x-small color="green" outlined>
        join us
      </v-btn>
    </v-card-subtitle>
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

        <div class="d-flex justify-end">
          <v-btn @click.prevent="onSubmit()" :color="color" type="submit">
            Sign in
          </v-btn>
        </div>
      </v-container>
    </form>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      username: null,
      password: null,
      color: 'primary'
    }
  },
  methods: {
    ...mapMutations({
      openJoinDialog: 'utils/openJoinDialog'
    }),
    ...mapActions({
      login: 'utils/login'
    }),
    async onSubmit() {
      const [username, password] = [this.username, this.password]
      if (username && password && password.length >= 8) {
        try {
          await this.login({ username, password })
        } catch (e) {
          this.color = 'red'
          setTimeout(() => (this.color = 'primary'), 1000)
        }
      }
    },
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>
