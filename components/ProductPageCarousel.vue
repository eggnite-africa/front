<template>
  <v-carousel
    continuous
    hide-delimiter-background
    delimiter-icon="mdi-minus"
    height="100%"
  >
    <v-carousel-item v-for="(picture, i) in pictures" :key="i" eager>
      <v-img :src="picture" eager contain></v-img>
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
