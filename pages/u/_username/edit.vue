<template>
  <v-container>
    <v-snackbar v-model="message.display">
      <v-icon :color="message.err ? 'red' : 'green'" left dense>{{
        message.icon
      }}</v-icon>
      {{ message.text }}
      <v-btn @click.stop="message.display = false" text color="red"
        >close</v-btn
      >
    </v-snackbar>
    <v-card>
      <v-card-title>Edit Profile</v-card-title>
      <v-card-text v-if="!$apollo.loading">
        <form>
          <v-row justify="center">
            <user-avatar
              :image-label="'your picture'"
              :init-image="user.profile.picture"
              @update-image="updateField('picture', $event)"
            ></user-avatar>
          </v-row>
          <v-row align="center">
            <v-col>
              <v-text-field
                @input="$v.user.profile.fullName.$touch()"
                @blur="$v.user.profile.fullName.$touch()"
                :error-messages="fullNameErrors"
                v-model="user.profile.fullName"
                label="Full name"
              ></v-text-field>
            </v-col>
            <v-col>
              <user-country
                :user-country="user.profile.country"
                @update-country="updateField('country', $event)"
              ></user-country>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col>
              <v-radio-group v-model="user.profile.gender" label="Gender" row>
                <v-radio
                  label="Female"
                  value="FEMALE"
                  class="my-2 my-sm-0"
                ></v-radio>
                <v-radio label="Male" value="MALE"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <user-birthdate-field
                :birthDate="user.profile.birthDate"
                @update-birthdate="updateField('birthDate', $event)"
              ></user-birthdate-field>
            </v-col>
          </v-row>
          <template>
            <user-occupation-field
              :user-occupation="user.profile.occupation"
              @update-occupation="updateField('occupation', $event)"
              :user-university="user.profile.university"
              @update-university="updateField('university', $event)"
              :user-company="user.profile.company"
              @update-company="updateField('company', $event)"
            ></user-occupation-field>
          </template>
          <v-row>
            <v-col>
              <v-textarea
                v-model.trim="user.profile.bio"
                label="Bio"
                outlined
                rows="3"
              ></v-textarea>
            </v-col>
          </v-row>
          <header>Social</header>
          <user-social
            :user-social-links="user.profile.socialLinks"
            @update-social="updateField('socialLinks', $event)"
          ></user-social>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click.prevent="onSubmit()"
          depressed
          color="primary"
          type="submit"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { required, minLength } from 'vuelidate/lib/validators'
import UserBirthdateField from '@/components/UserProfileEditPageBirthdateField.vue'
import UserOccupationField from '@/components/UserProfileEditPageOccupationField.vue'
import UserSocial from '@/components/UserProfileEditPageSocial.vue'
import UserAvatar from '@/components/shared/SingleImageUpload.vue'
import UserCountry from '@/components/UserProfileEditPageCountry.vue'

export default {
  components: {
    UserBirthdateField,
    UserOccupationField,
    UserSocial,
    UserAvatar,
    UserCountry
  },
  validations: {
    user: {
      profile: {
        fullName: {
          required,
          minLength: minLength(3)
        }
      }
    }
  },
  data() {
    return {
      // countryIsValid: ''
      message: {
        display: false,
        text: '',
        icon: '',
        error: false
      }
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    fullNameErrors() {
      const errors = []
      if (!this.$v.user.profile.fullName.$dirty) return errors
      !this.$v.user.profile.fullName.required &&
        errors.push('full name is required')
      !this.$v.user.profile.fullName.minLength &&
        errors.push('full name should be at least 3 characters long')
      return errors
    }
  },
  asyncData() {
    return {
      user: {
        id: '',
        profile: {
          picture: '',
          fullName: '',
          gender: '',
          birthDate: '',
          occupation: '',
          university: '',
          bio: '',
          socialLinks: [''],
          country: '',
          company: ''
        }
      }
    }
  },
  apollo: {
    user: {
      query: gql`
        query getUserProfile($username: String!) {
          user(username: $username) {
            id
            profile {
              picture
              fullName
              gender
              birthDate
              occupation
              university
              bio
              socialLinks
              country
              company
            }
          }
        }
      `,
      variables() {
        return {
          username: this.username
        }
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.updateUserProfile()
        this.message.err = false
        this.message.icon = 'mdi-check'
        this.message.text = 'Your profile was successfully updated!'
      } catch (e) {
        this.message.err = true
        this.message.icon = 'mdi-close'
        this.message.text = 'An error occured'
      } finally {
        this.message.display = true
      }
    },
    updateField(fieldName, newValue) {
      this.user.profile[fieldName] = newValue
    },
    async updateUserProfile() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      const userId = this.user.id
      // eslint-disable-next-line no-unused-vars
      const { __typename, ...updatedProfile } = { ...this.user.profile }
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation updateUserProfile(
              $userId: ID!
              $updatedProfile: UpdateProfileInput!
            ) {
              updateProfile(userId: $userId, updatedProfile: $updatedProfile) {
                picture
                fullName
                gender
                birthDate
                occupation
                company
                university
                bio
                country
                socialLinks
              }
            }
          `,
          variables: {
            userId,
            updatedProfile
          }
        })
        .then(
          ({ data: { updateProfile } }) =>
            (this.user.profile = { ...updateProfile })
        )
    }
  },
  middleware: ['auth', 'isAccountOwner'],
  head() {
    return {
      title: '🎨 Edit Profile',
      meta: [
        {
          name: 'robots',
          content: 'noindex,nofollow'
        }
      ]
    }
  }
}
</script>
