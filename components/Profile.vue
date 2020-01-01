<template>
  <form>
    <v-row dense justify="center">
      <v-badge bottom overlap>
        <template #badge v-if="showUploadIcon">
          <v-icon x-small>mdi-camera</v-icon>
        </template>
        <v-avatar
          @mouseover="showUploadIcon = true"
          @mouseout="showUploadIcon = false"
          color="primary"
          size="128"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
          ></v-img>
        </v-avatar>
      </v-badge>
    </v-row>
    <v-row dense>
      <v-col>
        <v-text-field v-model="firstName" label="First Name"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="lastName" label="Last Name"></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <header>Sex</header>
        <v-radio-group v-model="sex" row>
          <v-radio label="Male" value="MALE" color="white"></v-radio>
          <v-radio label="Female" value="FEMALE" color="white"></v-radio>
        </v-radio-group>
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
import SocialMediaLink from '@/components/EditPageSocialMedia.vue'
import OccupationField from '@/components/shared/OccupationField.vue'
import BirthdateField from '@/components/shared/BirthdateField.vue'
export default {
  name: 'UserProfile',
  components: {
    SocialMediaLink,
    OccupationField,
    BirthdateField
  },
  data() {
    return {
      showUploadIcon: false,
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
