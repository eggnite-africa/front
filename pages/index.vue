<template>
  <div>
    <v-dialog v-if="$auth.loggedIn" v-model="welcome" persistent>
      <v-card>
        <v-card-title>Welcome! ╰(*°▽°*)╯</v-card-title>
        <v-card-text>
          <p>
            Aaslema {{ $auth.user.profile.firstName }},
            <br />
            First off, although this is an automated message, I want you to know
            that I'm sincerely happy that you joined our community! It might not
            mean much to you, but to me, it means the world.
            <br />
            I strongly believe that together we can build a resilient,
            supportive and diverse community where developers and entrepreneurs
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click.stop="firstTime = false" text>got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!$apollo.queries.products.loading">
      <v-row
        v-for="product in products"
        :key="product.id"
        justify="center"
        align="center"
      >
        <v-col>
          <product-item :product-id="product.id"></product-item>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ProductItem from '@/components/ProductItem.vue'

export default {
  components: {
    ProductItem
  },
  apollo: {
    products: {
      query: gql`
        query fetchAllProducts {
          products {
            id
          }
        }
      `
    }
  },
  head() {
    return {
      titleTemplate: null,
      title: '🚀 Eggnite'
    }
  },
  data() {
    return {
      welcome: this.$route.params.welcome || false
    }
  }
}
</script>
