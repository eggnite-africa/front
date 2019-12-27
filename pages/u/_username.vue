<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col offset="3" cols="9" sm="2" offset-sm="0">
          <v-avatar color="blue" size="128"></v-avatar>
          <div class="mt-2 ml-5 ml-sm-2 ml-md-5">
            <v-btn icon href="https://facebook.com" small>
              <v-icon>mdi-facebook-box</v-icon>
            </v-btn>
            <v-btn icon href="https://twitter.com" small>
              <v-icon>mdi-twitter-box</v-icon>
            </v-btn>
            <v-btn icon href="https://linkedin.com" small>
              <v-icon>mdi-linkedin-box</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="10">
          <v-card-text class="mt-n2">
            <v-row class="mb-n5" justify="start">
              <v-col cols="9">
                <h2>John Doe</h2>
                <p><v-icon small>mdi-school</v-icon> ESPRIT</p>
              </v-col>
              <v-col v-if="isOwner()" cols="3">
                <div style="float: right">
                  <v-btn>Edit</v-btn>
                </div>
              </v-col>
            </v-row>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
              ipsum veritatis cumque? Nobis, dolorem? Aut aperiam ipsum dolore
              beatae laudantium sunt, quo ea veniam repudiandae deserunt
              architecto, itaque fuga quis.
            </p>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row>
        <v-tabs fixed-tabs>
          <v-tab href="#products">
            products
          </v-tab>
          <v-tab href="#upvotes">
            upvotes
          </v-tab>
          <v-tab href="#comments">
            comments
          </v-tab>

          <v-tab-item value="products">
            <v-container>
              <p>Products</p>
            </v-container>
          </v-tab-item>

          <v-tab-item value="upvotes">
            <v-container>
              <p>Upvotes</p>
            </v-container>
          </v-tab-item>

          <v-tab-item value="comments">
            <v-container>
              <p>Comments</p>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  methods: {
    isOwner() {
      const currentUser = this.$auth.user.username
      const currentUserProfile = this.$route.params.username
      return currentUser === currentUserProfile
    }
  }
}
</script>
