<template>
  <div>
    <header>Birthdate</header>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="bDate"
      persistent
      width="290px"
    >
      <template #activator="{ on }">
        <v-text-field
          v-model="bDate"
          v-on="on"
          prepend-icon="mdi-cake-variant"
          readonly
          placeholder="1999"
          hint="Party like it's 1999 (0 2 1)"
        ></v-text-field>
      </template>
      <v-date-picker v-model="bDate" :max="validDate()" scrollable>
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
      type: null,
      required: true
    }
  },
  data() {
    return {
      userBirthDate: '',
      modal: false
    }
  },
  computed: {
    bDate: {
      get() {
        if (this.birthDate && !this.userBirthDate)
          return this.birthDate.split('T')[0]
        else if (this.userBirthDate) return this.userBirthDate
        return null
      },
      set(date) {
        this.userBirthDate = date
      }
    }
  },
  methods: {
    validDate() {
      const date = new Date()
      const thisYear = date.getFullYear()
      return `${thisYear - 18}`
    }
  }
}
</script>
