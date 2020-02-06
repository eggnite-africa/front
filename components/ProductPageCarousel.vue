<template>
  <v-carousel continuous hide-delimiter-background height="100%">
    <v-carousel-item
      v-for="(picture, i) in pictures"
      :key="i"
      :src="picture"
      eager
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'ProductPageCarousel',
  props: {
    pictures: {
      type: Array,
      required: true
    }
  }
}
</script>
