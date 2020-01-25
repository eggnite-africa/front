<template>
  <div>
    <header>Birthdate</header>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="userBirthDate"
      persistent
      width="290px"
    >
      <template #activator="{ on }">
        <v-text-field
          v-model="userBirthDate"
          v-on="on"
          prepend-icon="mdi-cake-variant"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker v-model="userBirthDate" :max="validDate()" scrollable>
        <v-spacer></v-spacer>
        <v-btn @click="modal = false" text color="primary">Cancel</v-btn>
        <v-btn @click="$refs.dialog.save(userBirthDate)" text color="primary"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'BirthDateField',
  props: {
    birthDate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userBirthDate: this.birthDate.split('T')[0],
      modal: false
    }
  },
  methods: {
    validDate() {
      const date = new Date()
      const thisYear = date.getFullYear()
      return `${thisYear - 16}`
    }
  }
}
</script>
