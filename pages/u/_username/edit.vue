<template>
  <v-card>
    <v-card-title>Edit Profile</v-card-title>
    <v-card-text>
      <user-profile-edit></user-profile-edit>
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
import UserProfileEdit from '@/components/UserProfileEditPage.vue'
export default {
  components: {
    UserProfileEdit
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line no-console
      console.log('Update user profile')
    }
  }
}
</script>
