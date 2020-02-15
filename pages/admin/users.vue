<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-database-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="users" :search="search">
      <template #item.profile.country="{ item }">
        <span :class="`flag-icons ${item.profile.country}`"></span>
        {{ item.profile.country }}
      </template>
      <template #item.profile="{item}">
        {{ item.profile.firstName + ' ' + item.profile.lastName }}
      </template>
      <template #item.products="{ item }">
        {{ item.products.map(({ id }) => +id) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import '@/assets/flag-icons.scss'

export default {
  name: 'AdminUsersList',
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Country', value: 'profile.country' },
        { text: 'Username', value: 'username' },
        { text: 'Name', value: 'profile' },
        { text: 'Occupation', value: 'profile.occupation' },
        { text: 'Type', value: 'type' },
        { text: 'Products', value: 'products' }
      ]
    }
  },
  asyncData() {
    return {
      users: [
        {
          id: '',
          username: '',
          profile: {
            firstName: '',
            lastName: '',
            country: '',
            occupation: ''
          },
          type: '',
          products: [{ id: '' }]
        }
      ]
    }
  },
  apollo: {
    users: {
      query: gql`
        query fetchAllUsersForAdmin {
          users {
            id
            username
            profile {
              firstName
              lastName
              country
              occupation
            }
            type
            products {
              id
            }
          }
        }
      `
    }
  }
}
</script>
