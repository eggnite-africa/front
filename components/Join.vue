<template>
  <v-card>
    <v-card-title>
      <span>
        Sign up
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
      <v-btn @click.native="openLoginDialog()" color="blue" outlined x-small
        >login</v-btn
      >
    </v-card-subtitle>
    <v-container>
      <form>
        <v-text-field
          v-model.trim="email"
          :error-messages="emailErrors"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          label="Email"
          type="email"
          outlined
        ></v-text-field>

        <v-text-field
          v-model.trim="username"
          :error-messages="usernameErrors"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
          label="Username"
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

        <!-- <v-text-field
          v-model="passwordConfirmation"
          :error-messages="confirmPasswordErrors"
          @input="$v.passwordConfirmation.$touch()"
          @blur="$v.passwordConfirmation.$touch()"
          label="Confirm password"
          type="password"
          outlined
        ></v-text-field> -->
      </form>
      <div class="d-flex justify-end">
        <v-btn @click="signUp()" depressed color="green">Join</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import { mapActions, mapMutations } from 'vuex'
import { required, minLength, alphaNum, email } from 'vuelidate/lib/validators'

export default {
  name: 'JoinUs',
  data() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      usernameExists: false,
      emailExists: false
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
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('email is required')
      !this.$v.email.email && errors.push('email is invalid')
      !this.$v.email.isUnique && errors.push('email is already in use')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('password is required')
      !this.$v.password.minLength &&
        errors.push('password should have a minimum length of 8 characters')
      return errors
    }
    // confirmPasswordErrors() {
    //   const errors = []
    //   if (!this.$v.passwordConfirmation.$dirty) return errors
    //   !this.$v.passwordConfirmation.required &&
    //     errors.push('password confirmation is required')
    //   !this.$v.passwordConfirmation.sameAsPassword &&
    //     errors.push('password does not match')
    //   return errors
    // }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    // passwordConfirmation: {
    //   required,
    //   sameAsPassword: sameAs('password')
    // },
    email: {
      required,
      email,
      isUnique(v) {
        if (v === '') return !this.emailExists
        return !this.emailExists
      }
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
    },
    emailExists: {
      query: gql`
        query checkEmailUniqueness($email: String!) {
          emailExists: checkEmailExistance(email: $email)
        }
      `,
      variables() {
        return {
          email: this.email
        }
      },
      skip() {
        return this.email.length < 5
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
      this.$v.$touch()
      if (this.$v.$invalid) return
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation userSignUp($NewUserInput: NewUserInput!) {
              signUp(newUser: $NewUserInput) {
                id
                username
              }
            }
          `,
          variables: {
            NewUserInput: {
              username: this.username,
              email: this.email,
              password: this.password
            }
          }
        })
        .then(async () => {
          await this.login()
          this.$router.replace('/welcome')
        })
    }
  }
}
</script>
