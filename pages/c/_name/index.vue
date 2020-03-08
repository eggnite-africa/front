<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" order="1" order-sm="0">
        <v-card v-if="!$apollo.loading">
          <v-card-title>
            {{ competitionName }}

            <div class="ml-auto">
              <v-btn
                :to="managePage"
                color="indigo"
                nuxt
                depressed
                outlined
                small
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
            </div>
          </v-card-title>
          <v-container>
            <client-only>
              <product-item
                v-for="product in competition.products"
                :key="product.id"
                :id="product.id"
                :name="product.name"
                :logo="product.media.logo"
                :tagline="product.tagline"
                :makers="product.makers"
                :comments="product.comments"
                :votes="product.votes"
              ></product-item>
            </client-only>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title>Description</v-card-title>
          <v-card-subtitle>
            {{ prettyDate(competition.startDate) }} -
            {{ prettyDate(competition.endDate) }}
          </v-card-subtitle>
          <v-card-text v-text="competition.description"> </v-card-text>
        </v-card>

        <v-card class="mt-3">
          <v-card-title>Organized by</v-card-title>
          <v-card-text>
            <v-btn
              v-for="organizer in competition.organizers"
              :key="organizer.name"
              :href="organizer.website"
              target="_blank"
              text
              class="ml-n3"
            >
              <v-avatar size="36" left class="mr-2">
                <v-img :src="organizer.logo" eager></v-img>
              </v-avatar>
              <span v-text="organizer.name"></span>
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
              <v-avatar size="36" left class="mr-2">
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
import ProductItem from '@/components/ProductItem.vue'
import { unslugify } from '@/static/utils/slugify'
export default {
  components: {
    ProductItem
  },
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
      return name + '/manage/overview'
    }
  },
  asyncData() {
    return {
      competition: {
        name: '',
        description: '',
        jury: [],
        products: [],
        organizers: []
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
            startDate
            endDate
            jury {
              id
              username
              profile {
                fullName
                picture
              }
            }
            organizers {
              name
              logo
              website
            }
            products {
              id
              name
              tagline
              media {
                logo
              }
              makers {
                id
                username
                profile {
                  fullName
                  picture
                }
              }
              comments {
                id
                replies {
                  id
                }
              }
              votes {
                userId
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
    },
    prettyDate(date) {
      return this.$dateFns.format(date, 'MMMM, do yyyy')
    }
  }
}
</script>
