<template>
  <div>
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
            Aaslema
            <span class="font-weight-bold">{{ firstName }}</span
            >, <br />
            <br />
            I want you to know that I'm sincerely happy that you joined our
            community! It might not mean much to you, but to me, it means the
            world. <br />
            <br />
            I strongly believe that together we can build a resilient,
            supportive and diverse community where developers and entrepreneurs
            alike can share their products (whether that'd be an app, an
            open-source project or a website) with the larger community enabling
            them to further improve upon received feedback.<br />
            <br />
            I can't wait to see what you've got to offer. We're all here to
            support and learn from each other!<br />
            <br />
            Again, thanks for joining; and know that I'm always here so if you
            have anything you'd like to say, don't hesitate to let me know!<br />
            <br />
            <span class="font-weight-medium">Sincerely, Karim Daghari.</span>
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
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="secondary" elevation="3" nuxt to="/post">
            post your product
          </v-btn>
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
      welcome: this.$route.params.welcome || false,
      firstName: this.$route.params.firstName || ''
    }
  }
}
</script>
