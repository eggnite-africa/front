<template>
  <v-row dense>
    <v-col>
      <header>Occupation</header>
      <v-radio-group v-model="occupation" row>
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
      <template v-if="occupation === 'STUDENT' || occupation === null">
        <header>University</header>
        <v-select
          :items="['ESPRIT', 'LaSalle']"
          v-model="university"
          prepend-icon="mdi-school"
        ></v-select>
      </template>
      <template v-else>
        <header>City</header>
        <v-select
          v-model="city"
          :items="['Tunis', 'Sousse']"
          prepend-icon="mdi-map-marker"
        ></v-select>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'OccupationField',
  data() {
    return {
      occupation: null,
      university: null,
      city: null
    }
  }
}
</script>
