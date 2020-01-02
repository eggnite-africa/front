<template>
  <v-row dense>
    <v-col cols="12" md="10">
      <v-textarea
        :disabled="!this.$auth.loggedIn"
        :placeholder="placeholder"
        dense
        outlined
        auto-grow
        rows="1"
      ></v-textarea>
    </v-col>
    <v-col>
      <v-btn
        :disabled="!this.$auth.loggedIn"
        block
        color="orange"
        large
        class="mt-n5 mt-md-0"
      >
        comment
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProductPageCommentAdd',
  computed: {
    placeholder() {
      const isLoggedIn = this.$auth.loggedIn
      if (!isLoggedIn) return ''
      else return 'Please login or signup to add a comment'
    }
  }
}
</script>
