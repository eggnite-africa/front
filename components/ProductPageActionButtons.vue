<template>
  <div>
    <v-btn block color="orange" class="my-1">
      <v-icon left>mdi-arrow-up-thick</v-icon>upvote
    </v-btn>
    <v-btn block color="blue" class="my-2">
      <v-icon left>mdi-web</v-icon>visit website
    </v-btn>
    <v-btn block color="blue" class="my-2">
      <v-icon left>mdi-github-circle</v-icon>visit repo
    </v-btn>
    <v-btn block color="grey" class="my-2">
      <v-icon left>mdi-apple</v-icon>get on appstore
    </v-btn>
    <v-btn block color="green" class="my-2">
      <v-icon left>mdi-google-play</v-icon>get on google play
    </v-btn>
    <share-buttons></share-buttons>
  </div>
</template>

<script>
import ShareButtons from '@/components/ProductPageActionButtonsShare.vue'
export default {
  name: 'ProductPageActionButtons',
  components: { ShareButtons }
}
</script>
