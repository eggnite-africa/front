<template>
  <div>
    <v-btn :to="productEditLink" color="indigo" depressed nuxt>
      <v-icon small class="hidden-sm-and-up">mdi-wrench</v-icon>
      <span class="hidden-xs-only">Edit</span>
    </v-btn>
    <v-btn @click.prevent="dialog = true" color="red" depressed>
      <v-icon small class="hidden-sm-and-up">mdi-close-circle</v-icon>
      <span class="hidden-xs-only">Delete</span>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete product</v-card-title>

        <v-card-text>
          Are you sure you want to delete this product?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false" text>
            No
          </v-btn>

          <v-btn
            @click.stop="deleteProduct(productId)"
            color="red darken-1"
            text
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'ProductItemActionButtonsSettings',
  props: {
    productEditLink: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    async deleteProduct(id) {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteProduct($id: ID!) {
              deleteProduct(id: $id)
            }
          `,
          variables: {
            id
          }
        })
        .then(() => {
          this.dialog = false
          this.$router.go(0)
        })
    }
  }
}
</script>
