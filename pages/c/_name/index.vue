<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" order="1" order-sm="0">
        <v-card>
          <v-card-title>
            {{ competitionName }}

            <v-btn
              :to="managePage"
              color="indigo"
              nuxt
              depressed
              outlined
              small
              class="ml-auto"
            >
              Manage
            </v-btn>
            <v-btn
              :to="editPage"
              color="indigo"
              nuxt
              depressed
              small
              class="ml-1"
            >
              Edit
            </v-btn>
          </v-card-title>
          <v-container>
            products here... Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Placeat, fugiat, repellat animi rerum ullam molestias quam
            culpa delectus molestiae exercitationem veritatis explicabo modi
            fugit! Ut molestiae temporibus qui velit quas!
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title>Description</v-card-title>
          <v-card-subtitle>Start - End</v-card-subtitle>
          <v-card-text v-text="competition.description"> </v-card-text>
        </v-card>

        <v-card class="mt-3">
          <v-card-title>Organized by</v-card-title>
          <v-card-text>
            <v-btn to="/" text nuxt class="ml-n3">
              <v-avatar size="36" left class="mr-2" color="blue">
                <v-img src="" eager></v-img>
              </v-avatar>
              <span>Collège LaSalle</span>
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card class="mt-3">
          <v-card-title>Jury</v-card-title>
          <v-card-text>
            <v-btn
              v-for="(jury, i) in competition.jury"
              :key="i"
              :to="userProfileLink(jury.username)"
              text
              nuxt
              class="ml-n3 mb-2"
              target="_blank"
            >
              <v-avatar size="36" left class="mr-2" color="blue">
                <v-img :src="jury.profile.picture" eager></v-img>
              </v-avatar>
              <span v-text="jury.profile.fullName">John Doe</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { unslugify } from '@/static/utils/slugify'
export default {
  computed: {
    competitionName() {
      const { name } = this.$route.params
      return unslugify(name)
    },
    editPage() {
      const { name } = this.$route.params
      return name + '/edit'
    },
    managePage() {
      const { name } = this.$route.params
      return name + '/manage'
    }
  },
  asyncData() {
    return {
      competition: {
        name: '',
        description: '',
        jury: [
          {
            id: '',
            username: '',
            profile: {
              fullName: '',
              picture: ''
            }
          }
        ]
      }
    }
  },
  apollo: {
    competition: {
      query: gql`
        query fetchCompetitionInfo($name: String!) {
          competition(name: $name) {
            name
            description
            jury {
              id
              username
              profile {
                fullName
                picture
              }
            }
          }
        }
      `,
      variables() {
        return {
          name: this.competitionName
        }
      }
    }
  },
  methods: {
    userProfileLink(username) {
      return `/u/${username}`
    }
  }
}
</script>
