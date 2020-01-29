<template>
  <v-app dark>
    <v-row dense>
      <v-col cols="12">
        <v-img
          v-if="error.statusCode === 404"
          src="/404.svg"
          max-width="600"
          class="mx-auto"
        ></v-img>
        <v-img v-else src="/wrong.svg" max-width="500" class="mx-auto"></v-img>
        <div class="mt-12">
          <p v-if="error.statusCode !== 404" class="text-center headline">
            Something must've gone terribly wrong 🤔 <br />
            If this error persists do let me know!
          </p>
          <div class="d-flex justify-center">
            <v-btn @click.stop="$router.back()" outlined x-large>
              Go back
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
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
