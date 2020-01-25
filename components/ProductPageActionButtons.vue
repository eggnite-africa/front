<template>
  <div>
    <v-btn
      v-if="links.website"
      :href="links.website"
      target="_blank"
      block
      color="blue"
      class="my-2"
    >
      <v-icon left>mdi-web</v-icon>visit website
    </v-btn>
    <v-btn
      v-if="links.github"
      :href="links.github"
      target="_blank"
      block
      color="blue"
      class="my-2"
    >
      <v-icon left>mdi-github-circle</v-icon>visit repo
    </v-btn>
    <v-btn
      v-if="links.appStore"
      :href="links.appStore"
      target="_blank"
      block
      color="grey"
      class="my-2"
    >
      <v-icon left>mdi-apple</v-icon>get on appstore
    </v-btn>
    <v-btn
      v-if="links.playStore"
      :href="links.playStore"
      target="_blank"
      block
      color="green"
      class="my-2"
    >
      <v-icon left>mdi-google-play</v-icon>get on google play
    </v-btn>
    <share-buttons></share-buttons>
  </div>
</template>

<script>
import ShareButtons from '@/components/ProductPageActionButtonsShare.vue'
export default {
  name: 'ProductPageActionButtons',
  components: { ShareButtons },
  props: {
    links: {
      type: Object,
      required: true
    }
  }
}
</script>
