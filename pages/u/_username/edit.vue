<template>
  <v-card>
    <v-container>
      <v-card-title>Edit Profile</v-card-title>
      <v-card-text>
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
              <v-text-field
                v-model="firstName"
                label="First Name"
              ></v-text-field>
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
              <header>Birthdate</header>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="birthdate"
                persistent
                width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    v-model="birthdate"
                    v-on="on"
                    prepend-icon="mdi-cake-variant"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker v-model="birthdate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn @click="modal = false" text color="primary"
                    >Cancel</v-btn
                  >
                  <v-btn
                    @click="$refs.dialog.save(birthdate)"
                    text
                    color="primary"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <header>Occupation</header>
              <v-radio-group v-model="occupation" row>
                <v-radio label="Student" value="STUDENT" color="blue"></v-radio>
                <v-radio label="Developer" value="DEV" color="green"></v-radio>
                <v-radio
                  label="Entrepreneur"
                  value="ENTREPRENEUR"
                  color="yellow"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <template v-if="occupation === 'STUDENT' || occupation === null">
                <header>University</header>
                <v-select
                  :items="['ESPRIT', 'LaSalle']"
                  v-model="university"
                  prepend-icon="mdi-school"
                ></v-select>
              </template>
              <template v-else>
                <header>City</header>
                <v-select
                  v-model="city"
                  :items="['Tunis', 'Sousse']"
                  prepend-icon="mdi-map-marker"
                ></v-select>
              </template>
            </v-col>
          </v-row>
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
          <v-row dense>
            <v-spacer></v-spacer>
            <v-btn
              @click.prevent="onSubmit()"
              depressed
              color="primary"
              type="submit"
            >
              Update
            </v-btn>
          </v-row>
        </form>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import SocialMediaLink from '@/components/EditPageSocialMedia.vue'
export default {
  components: {
    SocialMediaLink
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      sex: null,
      birthdate: null,
      occupation: null,
      university: null,
      city: null,
      bio: null,
      modal: false,
      showUploadIcon: false,
      socialMediaLinks: [SocialMediaLink]
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
