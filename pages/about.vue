<template>
  <v-container>
    <v-row tag="section" dense>
      <v-col></v-col>
      <v-col cols="12" sm="8" md="7">
        <v-row dense>
          <v-col cols="12">
            <v-img src="/moonlight.svg" contain eager></v-img>
          </v-col>
          <v-col cols="12">
            <p class="title">What is Eggnite?</p>
            <p>
              In this first iteration<sup>*</sup>, it's a platform that enables
              African makers to share their creations with a community of
              like-minded people.
              <!-- It is very much so akin to ProductHunt but the
              resemblance stops at the façade. -->
            </p>
            <p class="caption">
              <sup>*</sup> code for: there is more to come. <br />
              <!--  Note: make sure to read the
             <nuxt-link to="/guidelines" target="_blank">guidelines</nuxt-link>
              for the kinds of products that can be posted. -->
            </p>
          </v-col>
          <v-col cols="12">
            <p class="title">Why was it created?</p>
            <p>
              From a micro-perspective, because I feel like the makers'
              community is not really valued so most creations (unless an
              outlier) go unheard of. And because such a solution<sup>*</sup>
              hadn't existed so far.
            </p>
            <p>
              From a macro-perspective; In my view, most, if not all, of the
              current products/solutions are revenue-driven. This approach, by
              default, corners them into using revenue as their (sole) primary
              metric. Thing is, in Africa's current state that is the wrong
              metric to track because it doesn't foster the spirit of
              experimentation and risk-taking. Rather, it greatly constraints
              makers to choose only the most profitable alternative.
            </p>
            <p class="caption">
              <sup>*</sup>Reddit, ProductHunt, BetaList etc... (you name it)
              aren't really meant for African countries. They're mostly aimed at
              developed countries, so the posted products address a different
              set of challenges.
            </p>
          </v-col>
          <v-col cols="12">
            <p class="title">What is the vision behind it?</p>
            <p>
              Fundamentally Eggnite is about fostering a community of African
              makers and giving them the tools they need to further develop
              their products and maximize their impact on their market.
            </p>
            <p>
              In this first iteration, the focus is going to be on shining a
              light on what's currently being built.
            </p>
          </v-col>
          <v-col cols="12">
            <p class="title">Can you add [feature]?</p>
            <p>
              Probably, but we'd need to talk about it first. Simply let me
              know, either through the feedback bubble (bottom-right of your
              screen) or through my socials (see:
              <nuxt-link to="u/kd" target="_blank">@kd</nuxt-link>).
            </p>
          </v-col>
          <v-col cols="12">
            <p class="title">What tech stack is Eggnite built on?</p>
            <p>
              It's built on NodeJS. For the frontend I'm using Nuxt. The backend
              is powered by Nest, GraphQL and postgres. And it's being hosted on
              Heroku.
            </p>
          </v-col>
          <v-col cols="12">
            <p class="title">Who's behind this?</p>
            <p>
              Eggnite is a one man op. It's built by
              <nuxt-link to="u/kd" target="_blank">@kd</nuxt-link>. Don't
              hesitate to come say hi!
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col></v-col>
    </v-row>
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
