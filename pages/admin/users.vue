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
      <template #item.products="{ item }">
        {{ item.products.map(({ id }) => +id) }}
      </template>
      <template #item.actions="{ item }">
        <v-btn @click.stop="getUserInfo(item.id)" icon>
          <v-icon>mdi-information</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="showUserInfo" max-width="500">
      <v-card max-width="500">
        <v-card-title>
          {{ user.profile.fullName }}
        </v-card-title>
        <v-card-subtitle>
          {{ '@' + user.username }}
        </v-card-subtitle>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <p class="title">Details</p>
              <p>
                Email: {{ user.email }}
                <v-btn :href="`mailto:${user.email}`" icon
                  ><v-icon>mdi-email</v-icon></v-btn
                >
              </p>
            </v-col>
            <v-col v-show="user.products.length" cols="12">
              <p class="title">Products</p>
              <p
                v-for="product in user.products"
                :key="product.id"
                v-text="product.name"
              ></p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
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
        { text: 'Name', value: 'profile.fullName' },
        { text: 'Occupation', value: 'profile.occupation' },
        { text: 'Type', value: 'type' },
        { text: 'Products', value: 'products.length' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      user: {
        profile: {},
        products: [{}]
      },
      showUserInfo: false
    }
  },
  asyncData() {
    return {
      users: [
        {
          id: '',
          username: '',
          email: '',
          profile: {
            fullName: '',
            country: '',
            occupation: ''
          },
          type: '',
          products: [{ id: '', name: '' }]
        }
      ]
    }
  },
  methods: {
    getUserInfo(id) {
      this.user = this.users.filter((u) => +u.id === +id)[0]
      this.showUserInfo = true
    }
  },
  apollo: {
    users: {
      query: gql`
        query fetchAllUsersForAdmin {
          users {
            id
            username
            email
            profile {
              fullName
              country
              occupation
            }
            type
            products {
              id
              name
            }
          }
        }
      `
    }
  }
}
</script>
