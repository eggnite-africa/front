<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <v-card>
          <v-card-title>Competition name</v-card-title>
          <v-container>
            products here... Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Placeat, fugiat, repellat animi rerum ullam molestias quam
            culpa delectus molestiae exercitationem veritatis explicabo modi
            fugit! Ut molestiae temporibus qui velit quas!
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title>Description</v-card-title>
          <v-card-subtitle>Start - End</v-card-subtitle>
          <v-card-text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil enim
            distinctio vitae amet ab repellendus nesciunt excepturi ipsam vel
            veniam corrupti deleniti, possimus odit inventore beatae
            voluptatibus fugit voluptates quasi!
          </v-card-text>
        </v-card>

        <v-card class="mt-3">
          <v-card-title>Organized by</v-card-title>
          <v-card-text>
            <v-btn to="/" text nuxt class="ml-n3">
              <v-avatar size="36" left class="mr-2" color="blue">
                <v-img src="" eager></v-img>
              </v-avatar>
              <span>Collège LaSalle</span>
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card class="mt-3">
          <v-card-title>Jury</v-card-title>
          <v-card-text>
            <v-btn v-for="i in 6" :key="i" to="/" text nuxt class="ml-n3 mb-2">
              <v-avatar size="36" left class="mr-2" color="blue">
                <v-img src="" eager></v-img>
              </v-avatar>
              <span>John Doe</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>
