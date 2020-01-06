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
        <v-divider></v-divider>
        <v-stepper-step step="3">Done</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card-text>
            <validation-observer ref="accountInfo" slim>
              <form>
                <validation-provider
                  #default="{ errors, valid }"
                  name="The email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    :success="valid"
                    label="Email"
                    type="email"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  #default="{ errors, valid }"
                  name="The username"
                  rules="required|alphaNum|min:2"
                >
                  <v-text-field
                    v-model="username"
                    :error-messages="errors"
                    :success="valid"
                    label="Username"
                  ></v-text-field>
                </validation-provider>

                <validation-observer>
                  <validation-provider
                    #default="{ errors, valid }"
                    name="The password"
                    rules="required|confirmed:confirmation|min:8"
                  >
                    <v-text-field
                      v-model="password"
                      :error-messages="errors"
                      :success="valid"
                      label="Password"
                      type="password"
                      hint="Minimum length: 8"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    #default="{ errors, valid }"
                    vid="confirmation"
                    rules="required"
                    name="The field"
                  >
                    <v-text-field
                      v-model="passwordConfirmation"
                      :error-messages="errors"
                      :success="valid"
                      @change="invalid = false"
                      label="Confirm password"
                      type="password"
                    ></v-text-field>
                  </validation-provider>
                </validation-observer>
              </form>
            </validation-observer>
          </v-card-text>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card-text>
            <validation-observer ref="userProfile" slim>
              <user-profile-edit @next-step="nextStep()"></user-profile-edit>
            </validation-observer>
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
        ref="continueButton"
        @click="nextStep()"
        v-show="currentStep !== 3"
        :disabled="invalid"
        depressed
        color="blue"
        >Continue</v-btn
      >
      <v-btn v-show="currentStep === 3" depressed color="green">Sign up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import {
  required,
  email,
  alpha_num as alphaNum,
  confirmed,
  min
} from 'vee-validate/dist/rules'
import UserProfileEdit from '@/components/UserProfileEditPage.vue'

extend('required', required)
extend('email', email)
extend('alphaNum', alphaNum)
extend('confirmed', confirmed)
extend('min', {
  ...min,
  message: (fieldName, { length }) =>
    `${fieldName} should have a minimum length of ${length}`
})
export default {
  name: 'SignUpPage',
  components: { UserProfileEdit, ValidationProvider, ValidationObserver },
  data() {
    return {
      currentStep: 1,
      passwordConfirmation: '',
      invalid: true
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.state.user.email
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'email',
          value
        })
      }
    },
    username: {
      get() {
        return this.$store.state.user.username
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'username',
          value
        })
      }
    },
    password: {
      get() {
        return this.$store.state.user.password
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'password',
          value
        })
      }
    }
  },
  methods: {
    nextStep() {
      let step
      if (this.currentStep === 1) {
        step = this.$refs.accountInfo
      } else if (this.currentStep === 2) {
        step = this.$refs.userProfile
      }
      step.validate().then((success) => {
        if (!success) {
          this.invalid = true
        } else {
          this.invalid = false
          this.currentStep++
        }
      })
    },
    previousStep() {
      this.currentStep--
    }
  }
}
</script>
