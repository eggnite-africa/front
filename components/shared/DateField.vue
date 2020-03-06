<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        v-on="on"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        outlined
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" :min="min" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn @click="menu = false" text color="primary">Cancel</v-btn>
      <v-btn @click="saveDate(date)" text color="primary">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DateField',
  props: {
    label: {
      type: String,
      required: true
    },
    initDate: {
      type: String,
      default: ''
    },
    min: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      date: this.initDate,
      menu: false
    }
  },
  methods: {
    saveDate(date) {
      this.$refs.menu.save(date)
      this.$emit('update-date', this.date)
    }
  }
}
</script>
