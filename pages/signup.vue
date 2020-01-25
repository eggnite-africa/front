<template>
  <v-card>
    <v-card-title>Sign up</v-card-title>

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
                v-model="email"
                label="Email"
                type="email"
              ></v-text-field>

              <v-text-field v-model="username" label="Username"></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                hint="Minimum length: 8"
              ></v-text-field>

              <v-text-field
                v-model="passwordConfirmation"
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
        depressed
        color="blue"
        >Continue</v-btn
      >
      <v-btn @click="signUp()" v-if="currentStep === 2" depressed color="green"
        >Sign up</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'
import UserProfileEdit from '@/components/UserProfileEditPage.vue'

export default {
  name: 'SignUpPage',
  components: { UserProfileEdit },
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
      birthDate: '1999',
      occupation: '',
      university: '',
      bio: '',
      socialLinks: ['']
    }
  },
  methods: {
    ...mapActions({
      signIn: 'utils/login'
    }),
    nextStep() {
      this.currentStep++
    },
    previousStep() {
      this.currentStep--
    },
    async login() {
      const [username, password] = [this.username, this.password]
      await this.signIn({ username, password })
    },
    async signUp() {
      let { profilePicture } = this.$refs.userProfile.getProfileInfo()
      const {
        firstName,
        lastName,
        sex,
        birthDate,
        occupation,
        university,
        bio,
        socialLinks
      } = this.$refs.userProfile.getProfileInfo()

      if (!profilePicture) {
        if (sex === 'MALE') {
          profilePicture =
            'https://upload.wikimedia.org/wikipedia/en/d/dc/Pocket_Mortys.png'
        } else {
          profilePicture =
            'https://vignette1.wikia.nocookie.net/rickandmorty/images/f/fc/S1e8_confused_summer.png/revision/latest?cb=20160917205129'
        }
      }

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
        })
    }
  }
}
</script>
