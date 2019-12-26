<template>
  <div>
    <v-row>
      <v-col>
        <h2 class="text-uppercase">Post a product</h2>
      </v-col>
    </v-row>

    <form>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Name" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Tagline"
            outlined
            rows="1"
            counter="80"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea label="Description" outlined auto-grow></v-textarea>
        </v-col>
        <v-col cols="12">
          <h4>Media</h4>
          <v-file-input
            label="Logo"
            chips
            prepend-icon="mdi-image"
          ></v-file-input>
          <v-file-input
            label="Images"
            multiple
            chips
            prepend-icon="mdi-image-multiple"
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <h4>Links</h4>
          <v-text-field label="Website" prepend-icon="mdi-web"></v-text-field>
          <v-text-field
            label="Github"
            prepend-icon="mdi-github-circle"
          ></v-text-field>
          <v-text-field
            label="App Store"
            prepend-icon="mdi-apple"
          ></v-text-field>
          <v-text-field
            label="Google Play"
            prepend-icon="mdi-google-play"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            label="Makers"
            outlined
            chips
            append-icon=""
            hide-no-data
            deletable-chips
            hint="Type in the maker's username"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </form>

    <v-row>
      <v-col cols="12">
        <v-btn color="primary">Post</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>
