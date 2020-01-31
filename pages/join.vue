<template>
  <v-card>
    <v-card-title>Join us</v-card-title>

    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1"
          >Account Information</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="currentStep > 2" step="2"
          >User Profile</v-stepper-step
        >
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card-text>
            <form>
              <v-text-field
                v-model.trim="email"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                label="Email"
                type="email"
              ></v-text-field>

              <v-text-field
                v-model.trim="username"
                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
                label="Username"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                label="Password"
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="passwordConfirmation"
                :error-messages="confirmPasswordErrors"
                @input="$v.passwordConfirmation.$touch()"
                @blur="$v.passwordConfirmation.$touch()"
                label="Confirm password"
                type="password"
              ></v-text-field>
            </form>
          </v-card-text>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card-text>
            <user-profile-edit
              ref="userProfile"
              :profilePicture="profilePicture"
              :firstName="firstName"
              :lastName="lastName"
              :sex="sex"
              :birthDate="birthDate"
              :occupation="occupation"
              :university="university"
              :bio="bio"
              :socialLinks="socialLinks"
            ></user-profile-edit>
          </v-card-text>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="previousStep()" v-show="currentStep > 1" text>back</v-btn>
      <v-btn
        ref="continueButton"
        @click="nextStep()"
        v-show="currentStep !== 2"
        :color="$v.$anyError ? 'red' : 'blue'"
        depressed
        >Continue</v-btn
      >
      <v-btn @click="signUp()" v-if="currentStep === 2" depressed color="green"
        >Join</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'
import { email, required, sameAs, minLength } from 'vuelidate/lib/validators'
import UserProfileEdit from '@/components/UserProfileEditPage.vue'

export default {
  name: 'JoinUsPage',
  components: { UserProfileEdit },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('email is invalid')
      !this.$v.email.isUnique && errors.push('email is already in use')
      !this.$v.email.required && errors.push('email is required')
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('username is required')
      !this.$v.username.minLength &&
        errors.push('username should be at least 2 charcters long')
      !this.$v.username.isUnique && errors.push('username is already in use')
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
  asyncData() {
    return {
      currentStep: 1,
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      profilePicture: '',
      firstName: '',
      lastName: '',
      sex: '',
      birthDate: '',
      occupation: '',
      university: '',
      bio: '',
      socialLinks: [''],
      usernameExists: false,
      emailExists: false
    }
  },
  validations: {
    email: {
      email,
      required,
      isUnique(v) {
        if (v === '') return !this.emailExists
        return !this.emailExists
      }
    },
    password: {
      required,
      minLength: minLength(8)
    },
    passwordConfirmation: {
      required,
      sameAsPassword: sameAs('password')
    },
    username: {
      required,
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
        return this.email.length < 4
      },
      fetchPolicy: 'network-only'
    }
  },
  methods: {
    ...mapActions({
      signIn: 'utils/login'
    }),
    nextStep() {
      this.$v.$touch()
      if (!this.$v.$invalid) this.currentStep++
    },
    previousStep() {
      this.currentStep--
    },
    async login() {
      const [username, password] = [this.username, this.password]
      await this.signIn({ username, password })
    },
    async signUp() {
      const userProfile = this.$refs.userProfile
      const userProfileIsValid = userProfile.isValid()
      if ((this.$v.$touch() && this.$v.$invalid) || !userProfileIsValid) return

      const {
        profilePicture,
        firstName,
        lastName,
        sex,
        birthDate,
        occupation,
        university,
        bio,
        socialLinks
      } = userProfile.getProfileInfo()

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
                profilePicture,
                firstName,
                lastName,
                sex,
                birthDate,
                occupation,
                bio,
                university,
                socialLinks
              }
            }
          }
        })
        .then(async () => {
          await this.login()
          this.$router.push({
            name: 'index',
            params: { welcome: true, firstName }
          })
        })
    }
  },
  head() {
    return {
      title: '🌍 Join'
    }
  }
}
</script>
