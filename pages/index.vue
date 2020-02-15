<template>
  <div>
    <WelcomeBanner />
    <v-container>
      <v-dialog
        v-if="$auth.loggedIn && welcome"
        v-model="welcome"
        persistent
        max-width="500"
      >
        <v-card v-if="$auth.loggedIn && welcome" color="teal">
          <v-card-title>Welcome!</v-card-title>
          <v-card-text>
            <p class="white--text">
              Hi
              <span class="font-weight-bold">{{ firstName }}</span
              >, <br />
              <br />
              We're sincerely happy that you joined our community! It might not
              mean much to you, but to us, it means the world! <br />
              <br />
              We strongly believe that together we can build a resilient,
              supportive and diverse community where developers and
              entrepreneurs alike can share their products (whether that'd be an
              app, an open-source project or a website) with the larger
              community enabling them to further improve upon received
              feedback.<br />
              <br />
              We can't wait to see what you've got to offer. Remember, we're all
              here to support and learn from each other!<br />
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click.stop="welcome = false" text icon class="ml-auto">
              <v-icon tag="span" dense>👌🏼</v-icon>
            </v-btn>
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
        <v-row class="hidden-xs-only">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              @click.stop="openLoginDialog()"
              color="secondary"
              depressed
              nuxt
              to="/post"
            >
              post your product
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-img src="/ignite.svg" max-width="500" class="mx-auto"></v-img>
          </v-col>
        </v-row>
      </div>
      <div v-else class="d-flex justify-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="yellow"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'
import WelcomeBanner from '@/components/WelcomeBanner.vue'
import ProductItem from '@/components/ProductItem.vue'

export default {
  components: {
    WelcomeBanner,
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
      `,
      fetchPolicy: 'network-only'
    }
  },
  head() {
    return {
      titleTemplate: null,
      title: 'Eggnite: Discover a new product everyday'
    }
  },
  data() {
    return {
      welcome: this.$route.params.welcome || false,
      firstName: this.$route.params.firstName || ''
    }
  },
  methods: {
    ...mapMutations({ openLoginDialog: 'utils/openLoginDialog' })
  }
}
</script>
