<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-switch v-model="bs" label="Marketing speak" dense></v-switch>
    </div>
    <div v-if="bs" class="text-center">
      <v-row tag="section" dense>
        <v-col cols="12">
          <p class="headline">
            Eggnite enables African developers and entrepreneurs to share their
            products with the community.
          </p>
        </v-col>
      </v-row>

      <v-row tag="section" dense>
        <v-col cols="12">
          <header class="headline">Who's behind this?</header>
        </v-col>
        <v-col cols="12">
          <v-img src="/dev.svg" max-width="500" class="mx-auto"></v-img>
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
    <div v-else class="text-center">
      NO BS MESSAGE HERE.
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      bs: true
    }
  },
  head() {
    return {
      title: '💡 About'
    }
  }
}
</script>
