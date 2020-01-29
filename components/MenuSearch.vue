<template>
  <v-autocomplete
    :search-input.sync="searchQuery"
    :items="searchProducts"
    dense
    flat
    solo-inverted
    hide-details
    hide-no-data
    append-icon=""
    prepend-inner-icon="mdi-magnify"
    class="mx-4"
    item-text="name"
    item-value="name"
    return-object
    placeholder="Search"
  >
    <template #item="{ item }">
      <v-list-item-avatar>
        <v-img :src="item.media.logo"></v-img>
      </v-list-item-avatar>
      <v-list-item-content @click="navigateToProduct(item.name)">
        <v-list-item-title v-text="item.name"></v-list-item-title>
        <v-list-item-subtitle v-text="item.tagline"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action> </v-list-item-action>
    </template>
  </v-autocomplete>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: null,
      searchProducts: []
    }
  },
  apollo: {
    searchProducts: {
      query: gql`
        query searchProducts($query: String!) {
          searchProducts(query: $query) {
            id
            name
            media {
              logo
            }
            tagline
            votes {
              id
            }
          }
        }
      `,
      variables() {
        return {
          query: this.searchQuery
        }
      },
      skip() {
        return !this.searchQuery
      },
      fetchPolicy: 'network-only'
    }
  },
  methods: {
    navigateToProduct(name) {
      this.$router.push(`/p/${name.replace(/ /gi, '-')}`)
    }
  }
}
</script>
