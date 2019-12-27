<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="3" sm="2">
          <v-avatar color="blue" size="96"></v-avatar>
        </v-col>
        <v-col cols="9" sm="10" class="ml-md-n12 mt-n4">
          <v-card-text class="mt-n2">
            <v-row class="mb-n5" justify="start">
              <v-col cols="9">
                <h2>John Doe</h2>
                <span> <v-icon dense>mdi-school</v-icon> Collège LaSalle </span>
              </v-col>
              <v-col v-if="isOwner()" cols="3">
                <div style="float: right">
                  <v-btn>Edit</v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p class="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Totam ipsum veritatis cumque? Nobis, dolorem? Aut aperiam
                  ipsum dolore beatae laudantium sunt, quo ea veniam repudiandae
                  deserunt architecto, itaque fuga quis.
                </p>
              </v-col>
            </v-row>
            <v-row dense no-gutters class="ml-n1 mt-n1">
              <v-col>
                <v-btn
                  icon
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  small
                >
                  <v-icon>mdi-web</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  small
                >
                  <v-icon>mdi-facebook-box</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  small
                >
                  <v-icon>mdi-twitter-box</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  small
                >
                  <v-icon>mdi-linkedin-box</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://medium.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  small
                >
                  <v-icon>mdi-medium</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  small
                >
                  <v-icon>mdi-instagram</v-icon>
                </v-btn>
                <v-btn
                  icon
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  small
                >
                  <v-icon>mdi-youtube</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row>
        <v-tabs fixed-tabs>
          <v-tab href="#products">
            products
          </v-tab>
          <v-tab href="#upvotes">
            upvotes
          </v-tab>
          <v-tab href="#comments">
            comments
          </v-tab>

          <v-tab-item value="products">
            <v-container>
              <template v-for="i in 3">
                <product-card
                  :key="i"
                  :product-link="`test-${i}`"
                  :product-name="`test ${i}`"
                  :product-tagline="'tagline'"
                  :product-votes-count="42"
                  :product-comments-count="42"
                  class="my-products"
                ></product-card>
              </template>
            </v-container>
          </v-tab-item>

          <v-tab-item value="upvotes">
            <v-container>
              <template v-for="i in 3">
                <product-card
                  :key="i"
                  :product-link="`test-${i}`"
                  :product-name="`test ${i}`"
                  :product-tagline="'tagline'"
                  :product-votes-count="42"
                  :product-comments-count="42"
                  class="my-products"
                ></product-card>
              </template>
            </v-container>
          </v-tab-item>

          <v-tab-item value="comments">
            <v-container>
              <p>Comments</p>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ProductCard from '@/components/ProductItemFeed.vue'

export default {
  components: {
    ProductCard
  },
  methods: {
    isOwner() {
      if (this.$auth.loggedIn) {
        const currentUser = this.$auth.user.username
        const currentUserProfile = this.$route.params.username
        return currentUser === currentUserProfile
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-products {
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
