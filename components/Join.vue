<template>
  <v-card>
    <v-card-title>
      <span>
        Join us
      </span>
      <v-spacer></v-spacer>
      <v-btn @click="closeDialog()" icon rounded>
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      Already have an account?
      <v-btn @click.native="openLoginDialog()" color="white" outlined x-small
        >login</v-btn
      >
    </v-card-subtitle>
    <v-container>
      <form>
        <v-text-field
          v-model.trim="username"
          :error-messages="usernameErrors"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
          label="Username"
          outlined
        ></v-text-field>

        <v-text-field
          v-model.trim="fullName"
          :error-messages="fullNameErrors"
          @input="$v.fullName.$touch()"
          @blur="$v.fullName.$touch()"
          label="Full name"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          label="Password"
          type="password"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="passwordConfirmation"
          :error-messages="confirmPasswordErrors"
          @input="$v.passwordConfirmation.$touch()"
          @blur="$v.passwordConfirmation.$touch()"
          label="Confirm password"
          type="password"
          outlined
        ></v-text-field>
      </form>
      <div class="d-flex justify-end">
        <v-btn @click="signUp()" depressed color="primary">Continue</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import { mapActions, mapMutations } from 'vuex'
import { required, sameAs, minLength, alphaNum } from 'vuelidate/lib/validators'

export default {
  name: 'JoinUs',
  data() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      fullName: '',
      firstName: '',
      lastName: '',
      usernameExists: false
    }
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('username is required')
      !this.$v.username.minLength &&
        errors.push('username should be at least 2 characters long')
      !this.$v.username.isUnique && errors.push('username is already in use')
      !this.$v.username.alphaNum &&
        errors.push('username contains invalids characters')
      return errors
    },
    fullNameErrors() {
      const errors = []
      if (!this.$v.fullName.$dirty) return errors
      !this.$v.fullName.required && errors.push('full name is required')
      !this.$v.fullName.minLength &&
        errors.push('full name should be at least 3 characters long')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('password is required')
      !this.$v.password.minLength &&
        errors.push('password should have a minimum length of 8 characters')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.passwordConfirmation.$dirty) return errors
      !this.$v.passwordConfirmation.required &&
        errors.push('password confirmation is required')
      !this.$v.passwordConfirmation.sameAsPassword &&
        errors.push('password does not match')
      return errors
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs('password')
    },
    fullName: {
      required,
      minLength: minLength(3)
    },
    username: {
      required,
      alphaNum,
      minLength: minLength(2),
      isUnique(v) {
        if (v === '') return !this.usernameExists
        return !this.usernameExists
      }
    }
  },
  apollo: {
    usernameExists: {
      query: gql`
        query checkUsernameUniquness($username: String!) {
          usernameExists: checkUsernameExistance(username: $username)
        }
      `,
      variables() {
        return {
          username: this.username
        }
      },
      skip() {
        return this.username.length < 2
      },
      fetchPolicy: 'network-only'
    }
  },
  methods: {
    ...mapMutations({
      openLoginDialog: 'utils/openLoginDialog'
    }),
    ...mapActions({
      signIn: 'utils/login'
    }),
    closeDialog() {
      this.$emit('close-dialog')
    },
    async login() {
      const [username, password] = [this.username, this.password]
      await this.signIn({ username, password })
    },
    async signUp() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation userSignUp($userInput: UserInput!) {
              signUp(UserInput: $userInput) {
                id
                username
              }
            }
          `,
          variables: {
            userInput: {
              username: this.username,
              email: this.email,
              password: this.password,
              profile: {
                firstName: this.firstName,
                lastName: this.lastName
              }
            }
          }
        })
        .then(async () => {
          await this.login()
          this.$router.push({
            name: 'index',
            params: { welcome: true, firstName: this.firstName }
          })
        })
    }
  }
}
</script>