<template>
  <form>
    <v-row dense justify="center">
      <user-avatar :image-label="'your picture'"></user-avatar>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field v-model="userFirstName" label="First Name"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="userLastName" label="Last Name"></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <header>Sex</header>

        <v-radio-group v-model="userSex" row>
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
    </v-row>
    <occupation-field
      ref="userOccupationField"
      :occupation="occupation"
      :university="university"
    ></occupation-field>
    <v-row dense>
      <v-col>
        <v-textarea v-model="userBio" label="Bio" outlined></v-textarea>
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
          >
            <div>
              <v-btn
                @click="addSocialMediaLink()"
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
import UserAvatar from '@/components/shared/SingleImageUpload.vue'
import SocialMediaLink from '@/components/UserProfileEditPageSocialMedia.vue'
import OccupationField from '@/components/shared/OccupationField.vue'
import BirthdateField from '@/components/shared/BirthdateField.vue'

export default {
  name: 'UserProfileEditPage',
  components: {
    UserAvatar,
    SocialMediaLink,
    OccupationField,
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
      type: String,
      required: true
    },
    sex: {
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
      userSex: this.sex,
      userBio: this.bio,
      userSocialLinks: this.socialLinks.filter((link) => link !== 'null'),
      socialMediaLinks: []
    }
  },
  created() {
    if (!this.userSocialLinks.length) {
      this.userSocialLinks = ['']
    }
    this.userSocialLinks.forEach((link) => this.addSocialMediaLink())
  },
  methods: {
    addSocialMediaLink() {
      this.userSocialLinks.push('')
      this.socialMediaLinks.push(SocialMediaLink)
    },
    getProfileInfo() {
      const [
        profilePicture,
        firstName,
        lastName,
        sex,
        birthDate,
        occupation,
        university,
        bio
      ] = [
        this.userProfilePicture,
        this.userFirstName,
        this.userLastName,
        this.userSex,
        this.$refs.userBirthDateField.userBirthDate,
        this.$refs.userOccupationField.userOccupation,
        this.$refs.userOccupationField.userUniversity,
        this.userBio
      ]

      const socialLinks = []

      for (let i = 0; i < this.socialMediaLinks.length; i++) {
        const link = this.$refs[`smLink-${i}`][0].getSocialMediaLink()
        if (link !== null) socialLinks.push(link)
      }

      return {
        profilePicture,
        firstName,
        lastName,
        sex,
        birthDate,
        occupation,
        university,
        bio,
        socialLinks
      }
    },
    async updateUserProfile() {
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
      } = this.getProfileInfo()

      await this.$apollo.mutate({
        mutation: gql`
          mutation updateUserProfile($updatedProfile: UpdateProfileInput!) {
            updateProfile(updatedProfile: $updatedProfile) {
              profilePicture
              firstName
              lastName
              sex
              birthDate
              occupation
              university
              bio
            }
          }
        `,
        variables: {
          updatedProfile: {
            profilePicture,
            firstName,
            lastName,
            sex,
            birthDate,
            occupation,
            university,
            bio,
            socialLinks
          }
        }
      })
    }
  }
}
</script>
