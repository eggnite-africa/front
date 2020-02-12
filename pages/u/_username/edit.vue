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
      <v-card-text>
        <user-profile-edit
          ref="profileEdit"
          v-if="!$apollo.queries.user.loading"
          :profilePicture="user.profile.profilePicture"
          :firstName="user.profile.firstName"
          :lastName="user.profile.lastName"
          :gender="user.profile.gender"
          :birthDate="user.profile.birthDate"
          :occupation="user.profile.occupation"
          :university="user.profile.university"
          :bio="user.profile.bio"
          :social-links="user.profile.socialLinks"
        ></user-profile-edit>
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
import UserProfileEdit from '@/components/UserProfileEditPage.vue'
export default {
  components: {
    UserProfileEdit
  },
  computed: {
    username() {
      return this.$route.params.username
    }
  },
  asyncData() {
    return {
      message: {
        display: false,
        text: '',
        icon: '',
        error: false
      },
      user: {
        id: '',
        profile: {
          profilePicture: '',
          firstName: '',
          lastName: '',
          gender: '',
          birthDate: '',
          occupation: '',
          university: '',
          bio: '',
          socialLinks: ['']
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
              profilePicture
              firstName
              lastName
              gender
              birthDate
              occupation
              university
              bio
              socialLinks
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
        const userId = this.user.id
        await this.$refs.profileEdit.updateUserProfile(userId)
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
