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
      <template #item.actions="{ item }">
        <v-btn @click="getProductInfo(item.id)" icon>
          <v-icon>mdi-information</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="showProductInfo" max-width="500">
      <v-card max-width="500">
        <v-card-title>
          {{ productToShow.name }}
        </v-card-title>
        <v-card-subtitle>{{ productToShow.tagline }}</v-card-subtitle>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <p class="title">Makers</p>
              <maker-avatar
                v-for="(maker, i) in productToShow.makers"
                :key="i"
                :maker-username="maker.username"
                :maker-picture="maker.profile.profilePicture"
                :maker-name="maker.profile.fullName"
              ></maker-avatar>
            </v-col>
            <v-col cols="12">
              <p class="title">Upvoters</p>
              <upvoter-avatar
                v-for="(vote, i) in productToShow.votes"
                :user-id="vote.userId"
                :key="i"
              ></upvoter-avatar>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import UpvoterAvatar from '@/components/AdminUpvoterAvatar.vue'
import MakerAvatar from '@/components/ProductPageMakerAvatar.vue'
export default {
  name: 'ProductsAdmin',
  components: {
    UpvoterAvatar,
    MakerAvatar
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Tagline', value: 'tagline', width: 200 },
        { text: 'Votes', value: 'votes.length' },
        { text: 'Comments', value: 'comments.length' },
        { text: 'Makers', value: 'makers.length' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      page: 0,
      pageSize: 7,
      showProductInfo: false,
      productToShow: {}
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
            votes: [{ id: '', userId: '' }],
            comments: [{ id: '' }],
            makers: [{ id: '', username: '', profile: { fullName: '' } }]
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
                userId
              }
              comments {
                id
              }
              makers {
                id
                username
                profile {
                  profilePicture
                  fullName
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
    },
    getProductInfo(id) {
      this.productToShow = this.productsList.products.filter(
        (p) => +p.id === +id
      )[0]
      this.showProductInfo = true
    }
  }
}
</script>
