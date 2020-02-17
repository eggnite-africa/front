<template>
  <div>
    <v-row v-if="!$apollo.loading" dense>
      <v-col>
        <v-card>
          <v-card-title>Products</v-card-title>
          <v-card-text class="display-1 white--text">
            {{ productsList.totalCount }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Users</v-card-title>
          <v-card-text class="display-1 white--text">
            {{ usersCount }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'AdminArea',
  middleware: ['auth', 'isAdmin'],
  computed: {
    usersCount() {
      return this.users.length
    }
  },
  asyncData() {
    return {
      productsList: {
        totalCount: ''
      },
      users: [
        {
          id: ''
        }
      ]
    }
  },
  apollo: {
    $fetchPolicy: 'network-only',
    productsList: {
      query: gql`
        query fetchProductsTotalCount {
          productsList {
            totalCount
          }
        }
      `
    },
    users: {
      query: gql`
        query fetchUsersForCount {
          users {
            id
          }
        }
      `
    }
  }
}
</script>
