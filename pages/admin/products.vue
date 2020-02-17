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
    <v-data-table
      :headers="headers"
      :search="search"
      :page.sync="page"
      :items="productsList.products"
      :server-items-length="productsList.totalCount"
      :items-per-page="pageSize"
      @update:page="fetchMore($event)"
      @update:items-per-page="fetchMore(_, $event)"
    >
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
      ],
      page: 0,
      pageSize: 7
    }
  },
  asyncData() {
    return {
      productsList: {
        totalCount: 0,
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
    }
  },
  apollo: {
    productsList: {
      query: gql`
        query fetchAllProductsForAdmin($page: Int!) {
          productsList(page: $page) {
            totalCount
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
        }
      `,
      variables: {
        page: 0
      }
    }
  },
  methods: {
    fetchMore(page, pageSize) {
      this.$apollo.queries.productsList.fetchMore({
        variables: {
          page,
          pageSize
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.productsList.products
          const totalCount = fetchMoreResult.productsList.totalCount
          const hasMore = fetchMoreResult.productsList.hasMore
          return {
            productsList: {
              __typename: previousResult.productsList.__typename,
              // Merging the tag list
              totalCount,
              products: [
                ...previousResult.productsList.products,
                ...newProducts
              ],
              hasMore
            }
          }
        }
      })
    }
  }
}
</script>
