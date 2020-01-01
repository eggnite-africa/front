<template>
  <v-card>
    <v-card-title>Edit Profile</v-card-title>
    <v-card-text>
      <user-profile></user-profile>
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
</template>

<script>
import UserProfile from '@/components/Profile.vue'
export default {
  components: {
    UserProfile
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line no-console
      console.log('Update user profile')
    }
  }
}
</script>
