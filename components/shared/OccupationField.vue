<template>
  <v-row dense>
    <v-col>
      <header>Occupation</header>

      <v-radio-group v-model="userOccupation" row>
        <v-radio label="Student" value="STUDENT" color="blue"></v-radio>
        <v-radio label="Developer" value="DEV" color="green"></v-radio>
        <v-radio
          label="Entrepreneur"
          value="ENTREPRENEUR"
          color="yellow"
        ></v-radio>
      </v-radio-group>
    </v-col>
    <v-col>
      <header>University</header>

      <v-select
        :items="['ESPRIT', 'LaSalle']"
        v-model="userUniversity"
        prepend-icon="mdi-school"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'OccupationField',
  props: {
    occupation: {
      type: String,
      required: true
    },
    university: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      userOccupation: this.occupation,
      userUniversity: this.university
    }
  }
}
</script>
