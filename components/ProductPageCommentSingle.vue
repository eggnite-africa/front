<template>
  <v-card elevation="0">
    <v-row dense align="baseline" class="mb-n5">
      <v-col cols="2" sm="1" class="mr-md-n6">
        <v-avatar left color="blue" size="56" class="mt-4"></v-avatar>
      </v-col>
      <v-col>
        <v-card-title>
          <span class="mr-auto">
            John Doe
          </span>
          <span class="ml-auto overline">13/12/19</span>
        </v-card-title>
        <v-card-subtitle class="text-justify"
          >John Doe bio Lorem, ipsum dolor sit amet consectetur adipisicing
          elit.</v-card-subtitle
        >
      </v-col>
    </v-row>
    <v-card-text class="text-justify"
      >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde nostrum
      quos dicta atque natus perspiciatis, nihil amet provident nisi in culpa
      similique omnis ipsa accusantium fugiat repellendus deleniti aperiam
      impedit!</v-card-text
    >
    <v-card-actions v-show="this.$auth.loggedIn" class="mt-n5">
      <v-btn text>reply</v-btn>
      <v-btn text>delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductPageCommentSingle'
}
</script>
