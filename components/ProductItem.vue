<template>
  <v-card :to="`/p/${productLink}`" nuxt>
    <v-container>
      <v-row dense align="center">
        <v-col cols="3" sm="1">
          <v-avatar color="primary" size="72"></v-avatar>
        </v-col>
        <v-col justify-self="start">
          <v-card-title v-text="productName"></v-card-title>
          <v-card-subtitle v-text="productTagline"></v-card-subtitle>
          <v-card-text class="ml-n1">
            <span v-for="i in 4" :key="i">
              <product-maker-avatar
                :makerName="'maker name'"
                :makerProfileLink="`maker-link-${i}`"
              ></product-maker-avatar>
            </span>
          </v-card-text>
        </v-col>

        <v-col cols="3" sm="2">
          <v-card-actions>
            <v-row dense>
              <v-col cols="12">
                <v-btn
                  :disabled="!this.$auth.loggedIn"
                  @click.prevent
                  color="orange"
                  outlined
                  block
                  height="50"
                >
                  <div class="flex-md-column">
                    <v-icon>mdi-arrow-up-thick</v-icon>
                    <div v-text="productVotesCount"></div>
                  </div>
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn :to="`/p/${productLink}#comments`" nuxt outlined block>
                  <v-icon left>mdi-comment</v-icon>
                  <span v-text="productCommentsCount"></span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ProductMakerAvatar from '@/components/ProductItemMakerAvatar.vue'
export default {
  name: 'ProductItem',
  components: {
    ProductMakerAvatar
  },
  props: {
    productLink: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productTagline: {
      type: String,
      required: true
    },
    productVotesCount: {
      type: Number,
      required: true
    },
    productCommentsCount: {
      type: Number,
      required: true
    }
  }
}
</script>
