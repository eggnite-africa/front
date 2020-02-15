<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-database-search"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :search="search" :items="products">
      <template #item.makers="{ item }">
        {{ item.makers.map(({ id }) => +id) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'ProductsAdmin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Tagline', value: 'tagline', width: 200 },
        { text: 'Votes', value: 'votes.length' },
        { text: 'Comments', value: 'comments.length' },
        { text: 'Makers', value: 'makers' }
      ]
    }
  },
  asyncData() {
    return {
      products: [
        {
          id: '',
          name: '',
          tagline: '',
          votes: [{ id: '' }],
          comments: [{ id: '' }],
          makers: [{ id: '' }]
        }
      ]
    }
  },
  apollo: {
    products: {
      query: gql`
        query fetchAllProductsForAdmin {
          products {
            id
            name
            tagline
            votes {
              id
            }
            comments {
              id
            }
            makers {
              id
              username
              profile {
                firstName
                lastName
              }
            }
          }
        }
      `
    }
  }
}
</script>
