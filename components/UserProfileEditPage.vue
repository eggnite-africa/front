<template>
  <form>
    <v-row dense justify="center">
      <user-avatar
        :image-label="'your picture'"
        init-image="https://screenrant.com/wp-content/uploads/2017/07/Rick-and-Morty.jpg"
      ></user-avatar>
    </v-row>
    <v-row dense>
      <v-col>
        <validation-provider
          #default="{ errors, valid }"
          name="The first name"
          rules="required|min:3"
        >
          <v-text-field
            v-model="firstName"
            :error-messages="errors"
            :success="valid"
            label="First Name"
          ></v-text-field>
        </validation-provider>
      </v-col>
      <v-col>
        <validation-provider
          #default="{ errors, valid }"
          name="The last name"
          rules="required|min:3"
        >
          <v-text-field
            v-model="lastName"
            :error-messages="errors"
            :success="valid"
            label="Last Name"
          ></v-text-field>
        </validation-provider>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <header>Sex</header>
        <validation-provider
          #default="{ errors }"
          name="The sex"
          rules="required"
        >
          <v-radio-group v-model="sex" :error-messages="errors" row>
            <v-radio label="Male" value="MALE" color="white"></v-radio>
            <v-radio label="Female" value="FEMALE" color="white"></v-radio>
          </v-radio-group>
        </validation-provider>
      </v-col>
      <v-col>
        <birthdate-field></birthdate-field>
      </v-col>
    </v-row>
    <occupation-field></occupation-field>
    <v-row dense>
      <v-col>
        <v-textarea v-model="bio" label="Bio" outlined></v-textarea>
      </v-col>
    </v-row>
    <v-row dense no-gutters>
      <header>Social</header>
    </v-row>
    <v-row dense align="center" class="mb-n3">
      <v-col>
        <template v-for="(link, index) in socialMediaLinks">
          <social-media-link :is="link" :key="`link-${index}`">
            <div>
              <v-btn
                @click="removeSocialMediaLink(index)"
                v-if="false"
                rounded
                color="red"
                icon
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
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
import { ValidationProvider, extend } from 'vee-validate'
import { required, min } from 'vee-validate/dist/rules'
import UserAvatar from '@/components/shared/SingleImageUpload.vue'
import SocialMediaLink from '@/components/UserProfileEditPageSocialMedia.vue'
import OccupationField from '@/components/shared/OccupationField.vue'
import BirthdateField from '@/components/shared/BirthdateField.vue'

extend('required', required)
extend('min', min)

export default {
  name: 'UserProfileEditPage',
  components: {
    UserAvatar,
    SocialMediaLink,
    OccupationField,
    BirthdateField,
    ValidationProvider
  },
  data() {
    return {
      socialMediaLinks: [SocialMediaLink]
    }
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.user.firstName
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'firstName',
          value
        })
      }
    },
    lastName: {
      get() {
        return this.$store.state.user.lastName
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'lastName',
          value
        })
      }
    },
    sex: {
      get() {
        return this.$store.state.user.sex
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'sex',
          value
        })
      }
    },
    bio: {
      get() {
        return this.$store.state.user.bio
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'bio',
          value
        })
      }
    }
  },
  methods: {
    addSocialMediaLink() {
      this.socialMediaLinks.push(SocialMediaLink)
    },
    removeSocialMediaLink(pos) {
      this.socialMediaLinks = this.socialMediaLinks.filter(
        (e, index) => index !== pos
      )
    },
    onSubmit() {
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        sex: this.sex,
        birthdate: this.birthdate,
        occupation: this.occupation,
        university: this.university,
        city: this.city,
        bio: this.bio
      }
      // eslint-disable-next-line no-console
      console.log(payload)
    }
  }
}
</script>
