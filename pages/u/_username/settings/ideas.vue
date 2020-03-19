<template>
  <v-card>
    <v-card-title>Ideas</v-card-title>
    <v-card-text v-if="!$apollo.loading">
      <pitch-item
        v-for="pitch in user.pitch"
        :key="pitch.id"
        :id="pitch.id"
        :name="pitch.name"
        :problem="pitch.problem"
        :needs="pitch.needs"
        :in-settings="true"
        class="mb-4"
      >
      </pitch-item>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import PitchItem from '@/components/PitchItem.vue'

export default {
  name: 'SettingsProductPage',
  components: {
    PitchItem
  },
  computed: {
    userId() {
      return this.$auth.user.id
    }
  },
  apollo: {
    user: {
      query: gql`
        query fetchUserPitchsForSettings($id: ID!) {
          user(id: $id) {
            id
            pitch {
              id
              name
              problem
              needs
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
  },
  middleware: ['auth', 'isAccountOwner'],
  head() {
    return {
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
