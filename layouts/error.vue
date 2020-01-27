<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else-if="error.statusCode === 401">Auth Error</h1>
    <h1 v-else>not auth error</h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '¯\\_(ツ)_/¯ ',
      otherError: '💩'
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
