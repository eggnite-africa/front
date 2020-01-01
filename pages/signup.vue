<template>
  <v-card>
    <v-card-title>Sign up</v-card-title>
    <v-card-subtitle>Already have an account ? Sign in.</v-card-subtitle>

    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1"
          >Account Information</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="currentStep > 2" step="2"
          >User Profile</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step step="3">Done</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card-text>
            <form>
              <v-text-field label="Email" type="email"></v-text-field>
              <v-text-field label="Username"></v-text-field>
              <v-text-field label="Password" type="password"></v-text-field>
              <v-text-field
                label="Confirm password"
                type="password"
              ></v-text-field>
            </form>
          </v-card-text>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card-text>
            <user-profile></user-profile>
          </v-card-text>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card-text>
            All set
          </v-card-text>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="previousStep()" v-show="currentStep > 1" text>back</v-btn>
      <v-btn
        @click="nextStep()"
        v-show="currentStep !== 3"
        depressed
        color="blue"
        >Continue</v-btn
      >
      <v-btn v-show="currentStep === 3" depressed color="green">Sign up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserProfile from '@/components/Profile.vue'
export default {
  name: 'SignUpPage',
  components: { UserProfile },
  data() {
    return {
      currentStep: 1
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep === 3) this.currentStep = 0
      this.currentStep++
    },
    previousStep() {
      this.currentStep--
    }
  }
}
</script>
