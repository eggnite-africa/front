<template>
  <v-card :to="commentUrl" nuxt flat elevation="3" class="my-comments">
    <v-card-text>
      <blockquote class="blockquote">
        <div>
          <p v-text="comment.content"></p>
          <footer>
            {{ product.name }}
          </footer>
        </div>
      </blockquote>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'UserProfileComment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      product: {
        name: ''
      }
    }
  },
  computed: {
    commentUrl() {
      const productUrl = this.product.name.replace(/ /gi, '-')
      return `/p/${productUrl}#comments`
    }
  },
  apollo: {
    product: {
      query: gql`
        query fetchProductNameForUserComments($id: ID!) {
          product(id: $id) {
            name
          }
        }
      `,
      variables() {
        return {
          id: this.comment.productId
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-comments {
  margin-bottom: 1em;

  &:last-child {
    margin-bottom: 0;
  }
}

blockquote {
  div {
    border-left: solid;
    padding-left: 0.5em;
  }
}
</style>
