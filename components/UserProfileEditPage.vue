<template>
  <form>
    <v-row dense justify="center">
      <user-avatar
        ref="userAvatar"
        :image-label="'your picture'"
        :init-image="profilePicture"
      ></user-avatar>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field
          v-model.trim="userFirstName"
          :error-messages="userFirstNameErrors"
          @input="$v.userFirstName.$touch()"
          @blur="$v.userFirstName.$touch()"
          label="First Name"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model.trim="userLastName"
          :error-messages="userLastNameErrors"
          @input="$v.userLastName.$touch()"
          @blur="$v.userLastName.$touch()"
          label="Last Name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <header>Gender</header>

        <v-radio-group
          v-model="userGender"
          :error-messages="userGenderErrors"
          @input="$v.userGender.$touch()"
          @blur="$v.userGender.$touch()"
          row
        >
          <v-radio label="Male" value="MALE" color="white"></v-radio>
          <v-radio label="Female" value="FEMALE" color="white"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col>
        <birthdate-field
          ref="userBirthDateField"
          :birthDate="birthDate"
        ></birthdate-field>
      </v-col>
      <v-col>
        <header>Country</header>
        <v-autocomplete
          v-model="userCountry"
          :items="africanCountries"
          prepend-icon="mdi-map"
          item-text="name"
          item-value="code"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-textarea
          v-model="userBio"
          label="Bio"
          outlined
          rows="2"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row dense no-gutters>
      <header>Social</header>
    </v-row>
    <v-row dense align="center" class="mb-n3">
      <v-col>
        <template v-for="(link, index) in socialMediaLinks">
          <social-media-link
            :ref="`smLink-${index}`"
            :is="link"
            :key="index"
            :social-link="userSocialLinks[index]"
            :social-networks="socialNetworks"
          >
            <div>
              <v-btn
                @click="addSocialMediaLink(index)"
                color="primary"
                icon
                rounded
                large
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </social-media-link>
        </template>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import gql from 'graphql-tag'
import { required, minLength } from 'vuelidate/lib/validators'
import { countries } from 'countries-list'
import UserAvatar from '@/components/shared/SingleImageUpload.vue'
import SocialMediaLink from '@/components/UserProfileEditPageSocialMedia.vue'
import BirthdateField from '@/components/UserProfileEditPageBirthdateField.vue'

export default {
  name: 'UserProfileEditPage',
  components: {
    UserAvatar,
    SocialMediaLink,
    BirthdateField
  },
  props: {
    profilePicture: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    birthDate: {
      type: null,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    occupation: {
      type: String,
      required: true
    },
    university: {
      type: String,
      default: null,
      required: false
    },
    company: {
      type: String,
      default: null,
      required: false
    },
    socialLinks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      userProfilePicture: this.profilePicture,
      userFirstName: this.firstName,
      userLastName: this.lastName,
      userGender: this.gender,
      userCountry: this.country,
      userBio: this.bio,
      userSocialLinks: this.socialLinks.filter((link) => link !== 'null'),
      socialMediaLinks: [],
      socialNetworks: [
        { value: 'Facebook', icon: 'facebook-box' },
        { value: 'Twitter', icon: 'twitter-box' },
        { value: 'Instagram', icon: 'instagram' },
        { value: 'LinkedIn', icon: 'linkedin-box' },
        { value: 'Medium', icon: 'medium' },
        { value: 'YouTube', icon: 'youtube' },
        { value: 'Website', icon: 'web' }
      ],
      africanCountries: [
        {
          code: '',
          name: ''
        }
      ]
    }
  },
  computed: {
    userFirstNameErrors() {
      const errors = []
      if (!this.$v.userFirstName.$dirty) return errors
      !this.$v.userFirstName.required && errors.push('first name is required')
      !this.$v.userFirstName.minLength &&
        errors.push('first name should be at least 3 characters long')
      return errors
    },
    userLastNameErrors() {
      const errors = []
      if (!this.$v.userLastName.$dirty) return errors
      !this.$v.userLastName.required && errors.push('last name is required')
      !this.$v.userLastName.minLength &&
        errors.push('last name should be at least 3 characters long')
      return errors
    },
    userGenderErrors() {
      const errors = []
      if (!this.$v.userGender.$dirty) return errors
      !this.$v.userGender.required && errors.push('gender is required... 🍆🍑')
      return errors
    },
    userCountryErrors() {
      const errors = []
      if (!this.$v.userGender.$dirty) return errors
      !this.$v.userGender.required && errors.push('So... Where are you from?')
      return errors
    }
  },
  validations: {
    userFirstName: {
      required,
      minLength: minLength(3)
    },
    userLastName: {
      required,
      minLength: minLength(3)
    },
    userGender: {
      required
    },
    userCountry: {
      required
    }
  },
  created() {
    if (!this.userSocialLinks.length) {
      this.userSocialLinks = ['']
    }
    this.userSocialLinks.forEach((link) => this.addSocialMediaLink())
    const africanCountries = Object.entries(countries).filter(
      (c) => c[1].continent === 'AF'
    )
    const africanCountriesFinal = []
    africanCountries.forEach((c) => {
      const country = {
        code: c[0],
        name: c[1].name
      }
      africanCountriesFinal.push(country)
    })
    this.africanCountries = africanCountriesFinal
  },
  methods: {
    isValid() {
      this.$v.$touch()
      const occupationFieldIsValid = this.$refs.userOccupationField.isValid()
      return !this.$v.$invalid && occupationFieldIsValid
    },
    addSocialMediaLink(i) {
      this.userSocialLinks.push('')
      this.socialMediaLinks.push(SocialMediaLink)
      if (i >= 0) {
        const link = this.$refs[`smLink-${i}`][0].getSocialMediaLink()
        if (link === null) return
        const is = (value) => link.includes(value)
        const filter = (value) =>
          this.socialNetworks.filter((network) => network.value !== value)
        this.socialNetworks.forEach((n) => {
          if (is(n.value)) {
            this.socialNetworks = filter(n.value)
          }
        })
      }
    },
    getProfileInfo() {
      const [
        firstName,
        lastName,
        gender,
        birthDate,
        occupation,
        university,
        company,
        bio,
        country
      ] = [
        this.userFirstName,
        this.userLastName,
        this.userGender,
        this.$refs.userBirthDateField.userBirthDate,
        this.$refs.userOccupationField.userOccupation,
        this.$refs.userOccupationField.userUniversity,
        this.$refs.userOccupationField.userCompany,
        this.userBio,
        this.userCountry
      ]

      const socialLinks = []

      for (let i = 0; i < this.socialMediaLinks.length; i++) {
        const link = this.$refs[`smLink-${i}`][0].getSocialMediaLink()
        if (link !== null) socialLinks.push(link)
      }

      const profilePicture = this.$refs.userAvatar.getProfilePicture()

      return {
        profilePicture,
        firstName,
        lastName,
        gender,
        birthDate,
        occupation,
        university,
        company,
        bio,
        socialLinks,
        country
      }
    },
    async updateUserProfile(userId) {
      if (!this.isValid()) throw Error

      const {
        profilePicture,
        firstName,
        lastName,
        gender,
        birthDate,
        occupation,
        university,
        company,
        bio,
        socialLinks,
        country
      } = this.getProfileInfo()

      await this.$apollo.mutate({
        mutation: gql`
          mutation updateUserProfile(
            $userId: ID!
            $updatedProfile: UpdateProfileInput!
          ) {
            updateProfile(userId: $userId, updatedProfile: $updatedProfile) {
              profilePicture
              firstName
              lastName
              gender
              birthDate
              occupation
              company
              university
              bio
              country
            }
          }
        `,
        variables: {
          userId,
          updatedProfile: {
            profilePicture,
            firstName,
            lastName,
            gender,
            birthDate,
            occupation,
            university,
            company,
            bio,
            socialLinks,
            country
          }
        }
      })
    }
  }
}
</script>
