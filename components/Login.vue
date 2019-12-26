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
    <form>
      <v-container>
        <v-text-field
          v-model="username"
          label="Username"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          outlined
          type="password"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="submit" type="submit" text>Login</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    submit() {
      const [username, password] = [this.username, this.password]
      return this.$auth.loginWith('local', {
        data: {
          username,
          password
        }
      })
    },
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>
