<template>
  <v-container>
    <div class="text-center">
      <v-row tag="section">
        <v-col cols="12">
          <p class="display-1 font-weight-light">
            Eggnite aims to be the platform, that enables Tunisian student
            developers and entrepreneurs alike to share their creations with the
            rest of the community.
          </p>
        </v-col>
      </v-row>

      <v-row tag="section">
        <v-col cols="12">
          <header class="headline">Who's behind this?</header>
        </v-col>
        <v-col cols="12">
          <v-img src="/hacker.svg" max-width="500" class="mx-auto"></v-img>
        </v-col>
        <v-col cols="12">
          <v-avatar
            color="primary"
            width="128"
            height="128"
            class="my-3"
          ></v-avatar>
        </v-col>
        <v-col cols="12">
          <p class="body-1">
            Me! Obviously, I'm kidding; I'm Karim Daghari, a fullstack web
            developer and currently a student at Collège LaSalle Tunis. I'm
            passioned by entrepreneurship, technology and everything in between.
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: '💡 About'
    }
  }
}
</script>
