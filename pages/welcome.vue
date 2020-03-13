<template>
  <v-container>
    <v-row dense>
      <v-col></v-col>
      <v-col cols="12" sm="8">
        <v-img
          src="/welcome.svg"
          contain
          class="mx-auto"
          aspect-ratio="2.3"
          eager
        ></v-img>
        <p>
          I'm sincerely happy that you joined our community! It might not mean
          much to you, but to me, it means the world! Thank you 🙏🏻
        </p>
        <p>
          I can't wait to see what you've got to offer and, remember, we're all
          here to support and learn from each other!
        </p>
        <p>
          P.S: I'm only one click away, so don't hesitate to come say hi!
        </p>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn color="orange" nuxt to="/post" large>Add your product</v-btn>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn color="blue" nuxt to="/" large>Discover products</v-btn>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn :to="userProfileEdit" color="green" nuxt large>
              Finish setting up your profile
              <v-icon right dense>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              href="https://join.slack.com/t/eggnite/shared_invite/enQtOTcxNzU5MTkyODg0LTM4YzdmMjYxZjM4N2VhMjgwNTIzOWRlNzVkZWEzNWQ4MWI3NjJiNjZlYWE5NjgyYzExNmNjNmU4NWFlNGVhOTI"
              color="purple"
              block
              target="_blank"
              large
            >
              Join the chat on slack
              <v-icon right dense>mdi-forum</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    userProfileEdit() {
      const { username } = this.$auth.user
      return `/u/${username}/edit`
    }
  },
  middleware: 'auth'
}
</script>
