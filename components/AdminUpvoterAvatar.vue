<template>
  <v-btn
    :href="upvoterProfile()"
    v-if="!$apollo.loading"
    target="_blank"
    text
    nuxt
  >
    <v-avatar size="36" left class="mx-2 my-3">
      <v-img :src="upvoterPicture()"></v-img>
    </v-avatar>
    <span v-text="user.profile.fullName"></span>
  </v-btn>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'AdminUpvoterAvatar',
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  asyncData() {
    return {
      user: {
        id: '',
        username: '',
        profile: {
          profilePicture: '',
          fullName: ''
        }
      }
    }
  },
  methods: {
    upvoterPicture() {
      const { profile } = this.user
      return profile.profilePicture
    },
    upvoterProfile() {
      const { username } = this.user
      return `/u/${username}`
    }
  },
  apollo: {
    user: {
      query: gql`
        query fetchUpvoter($id: ID!) {
          user(id: $id) {
            id
            username
            profile {
              profilePicture
              fullName
            }
          }
        }
      `,
      variables() {
        return {
          id: this.userId
        }
      }
    }
  }
}
</script>
