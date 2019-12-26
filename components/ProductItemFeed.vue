<template>
  <v-card :to="`/p/${productLink}`" nuxt>
    <v-container>
      <v-row dense align="baseline">
        <v-col cols="3" sm="1">
          <v-avatar color="primary" size="72" class="ml-sm-n1"></v-avatar>
          <v-row class="pl-md-2 d-none d-sm-flex">
            <div v-for="i in 4" :key="i">
              <product-makers-avatars
                :makerName="'maker name'"
                :makerProfileLink="'maker link'"
              ></product-makers-avatars>
            </div>
          </v-row>
        </v-col>
        <v-col>
          <v-card-title v-text="productName"></v-card-title>
          <v-card-subtitle v-text="productTagline"></v-card-subtitle>
          <v-card-text>
            <v-row class="d-sm-none">
              <div v-for="i in 4" :key="i">
                <product-makers-avatars
                  :makerName="'maker name'"
                  :makerProfileLink="'maker link'"
                ></product-makers-avatars>
              </div>
            </v-row>
          </v-card-text>
        </v-col>
        <v-col
          cols="6"
          sm="2"
          offset-sm="0"
          offset="6"
          class="d-none d-sm-flex"
        >
          <v-card-actions>
            <v-btn @click.prevent icon tile outlined height="50" width="50">
              <div class="flex-md-column">
                <v-icon>mdi-arrow-up-bold</v-icon>
                <div v-text="productVotesCount"></div>
              </div>
            </v-btn>
            <v-btn
              :to="`/p/${productLink}#comments`"
              nuxt
              icon
              tile
              outlined
              height="50"
              width="50"
            >
              <div class="flex-md-column">
                <v-icon>mdi-comment-text</v-icon>
                <div v-text="productCommentsCount"></div>
              </div>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ProductMakersAvatars from '@/components/ProductItemMakersAvatars.vue'
export default {
  name: 'ProductItem',
  components: {
    ProductMakersAvatars
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
