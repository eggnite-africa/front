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
        <validation-provider
          #default="{ errors }"
          name="The username"
          rules="required|aplhaNum"
        >
          <v-text-field
            v-model="username"
            :error-messages="errors"
            label="Username"
            outlined
          ></v-text-field>
        </validation-provider>
        <validation-provider
          #default="{ errors }"
          name="The password"
          rules="required|min:8"
        >
          <v-text-field
            v-model="password"
            :error-messages="errors"
            label="Password"
            outlined
            type="password"
          ></v-text-field>
        </validation-provider>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="submit" type="submit" text>Login</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required, alpha_num as alphaNum, min } from 'vee-validate/dist/rules'

extend('required', required)
extend('alphaNum', alphaNum)
extend('min', min)

export default {
  components: {
    ValidationProvider
  },
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
