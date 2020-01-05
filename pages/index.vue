<template>
  <div>
    <v-row
      v-for="(product, index) in products"
      :key="index"
      justify="center"
      align="center"
    >
      <v-col>
        <product-item
          :productLink="product.link"
          :product-name="product.name"
          :product-tagline="product.tagline"
          :productVotesCount="product.votesCount"
          :productCommentsCount="product.commentsCount"
        ></product-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'

export default {
  components: {
    ProductItem
  },
  data() {
    return {
      products: [
        {
          link: 'test',
          name: 'test',
          tagline: 'this is the tagline',
          votesCount: 42,
          commentsCount: 10
        },
        {
          link: 'test',
          name: 'test 2',
          tagline: 'this is the tagline',
          votesCount: 42,
          commentsCount: 10
        },
        {
          link: 'test',
          name: 'test 3',
          tagline: 'this is the tagline',
          votesCount: 42,
          commentsCount: 10
        }
      ]
    }
  }
}
</script>
