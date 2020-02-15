<template>
  <div>
    <v-row v-if="!$apollo.loading" dense>
      <v-col>
        <v-card>
          <v-card-title>Products</v-card-title>
          <v-card-text class="display-1 white--text">
            {{ productsCount }}
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
    productsCount() {
      return this.products.length
    },
    usersCount() {
      return this.users.length
    }
  },
  asyncData() {
    return {
      products: [
        {
          id: ''
        }
      ],
      users: [
        {
          id: ''
        }
      ]
    }
  },
  apollo: {
    $fetchPolicy: 'network-only',
    products: {
      query: gql`
        query fetchProductsForCount {
          products {
            id
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
