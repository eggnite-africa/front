<template>
  <v-card :to="competitionUrl" nuxt>
    <v-list-item class="pt-1">
      <v-list-item-avatar color="grey">
        <v-img :src="logo"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="name" class="headline"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text v-text="description"> </v-card-text>
  </v-card>
</template>

<script>
import { slugify } from '@/static/utils/slugify'
export default {
  props: {
    logo: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  computed: {
    competitionUrl() {
      return '/c/' + slugify(this.name)
    }
  }
}
</script>
