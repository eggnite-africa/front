<template>
  <div>
    <header>Birthdate</header>
    <validation-provider
      #default="{ errors }"
      name="The birthdate"
      rules="required"
    >
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
            :error-messages="errors"
            prepend-icon="mdi-cake-variant"
            readonly
          ></v-text-field>
        </template>
        <v-date-picker v-model="birthdate" :max="validDate()" scrollable>
          <v-spacer></v-spacer>
          <v-btn @click="modal = false" text color="primary">Cancel</v-btn>
          <v-btn @click="$refs.dialog.save(birthdate)" text color="primary"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </validation-provider>
  </div>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', required)

export default {
  name: 'BirthdateField',
  components: { ValidationProvider },
  data() {
    return {
      modal: false
    }
  },
  computed: {
    birthdate: {
      get() {
        return this.$store.state.user.birthdate
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'birthdate',
          value
        })
      }
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
