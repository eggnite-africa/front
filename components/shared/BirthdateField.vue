<template>
  <div>
    <header>Birthdate</header>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="birthdate"
      persistent
      width="290px"
    >
      <template #activator="{ on }">
        <v-text-field
          v-model="birthdate"
          v-on="on"
          prepend-icon="mdi-cake-variant"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker v-model="birthdate" scrollable>
        <v-spacer></v-spacer>
        <v-btn @click="modal = false" text color="primary">Cancel</v-btn>
        <v-btn @click="$refs.dialog.save(birthdate)" text color="primary"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'BirthdateField',
  data() {
    return {
      modal: false,
      birthdate: null
    }
  }
}
</script>
