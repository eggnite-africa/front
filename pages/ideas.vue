<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex justify-center">
          <v-btn color="secondary" large nuxt to="/pitch">
            Pitch your idea
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="i in 9" :key="i" cols="12" sm="4">
        <v-card max-width="350">
          <v-list-item>
            <v-tooltip top>
              <template #activator="{ on }">
                <v-list-item-avatar v-on="on" color="blue" size="42">
                  <v-img src=""></v-img>
                </v-list-item-avatar>
              </template>
              <span>username</span>
            </v-tooltip>
            <v-list-item-content>
              <v-list-item-title class="headline">
                Our Changing Planet
              </v-list-item-title>
              <v-list-item-subtitle>
                By #COVID19
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="white--text c-text">
            <span class="font-weight-medium text-uppercase">
              Problem
            </span>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit modi
              iste adipisci. Enim, voluptas, ipsam reprehenderit, quaerat
              blanditiis adipisci assumenda iure hic eligendi quo dolores natus
              debitis sequi eaque quos!
            </p>

            <span class="font-weight-medium text-uppercase">
              Needs
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos modi
              itaque aliquid sit a temporibus! Repellat a cumque nostrum
              recusandae ipsa distinctio illo explicabo, doloremque repudiandae
              minima vitae suscipit nisi.
            </p>
          </v-card-text>

          <v-card-actions>
            <div class="ml-auto d-flex space-between">
              <div class="mr-3 d-flex align-center">
                <v-btn icon> <v-icon tag="span">👏🏻</v-icon> </v-btn>
                <span>42</span>
              </div>
              <div class="mr-2">
                <v-btn icon>
                  <v-icon>mdi-comment</v-icon>
                </v-btn>
                <span>42</span>
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IdeasIndex'
}
</script>

<style lang="scss" scoped>
.c-text p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-justify: auto;
}
</style>
