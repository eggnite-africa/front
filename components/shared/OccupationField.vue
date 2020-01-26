<template>
  <v-row dense>
    <v-col>
      <header>Occupation</header>

      <v-radio-group
        v-model="userOccupation"
        :error-messages="userOccupationErrors"
        @input="$v.userOccupation.$touch()"
        @blur="$v.userOccupation.$touch()"
        row
      >
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
      <v-text-field
        v-model.trim="userUniversity"
        :error-messages="userUniversityErrors"
        @input="$v.userUniversity.$touch()"
        @blur="$v.userUniversity.$touch()"
        prepend-icon="mdi-school"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
export default {
  name: 'OccupationField',
  props: {
    occupation: {
      type: String,
      required: true
    },
    university: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      userOccupation: this.occupation,
      userUniversity: this.university
    }
  },
  computed: {
    userOccupationErrors() {
      const errors = []
      if (!this.$v.userOccupation.$dirty) return errors
      !this.$v.userOccupation.required && errors.push('Batman?... Is that you?')
      return errors
    },
    userUniversityErrors() {
      const errors = []
      if (!this.$v.userUniversity.$dirty) return errors
      !this.$v.userUniversity.required &&
        errors.push('So... Where do you study?')
      return errors
    }
  },
  validations: {
    userOccupation: {
      required
    },
    userUniversity: {
      required: requiredIf(function() {
        return this.userOccupation === 'STUDENT'
      })
    }
  },
  methods: {
    isValid() {
      this.$v.$touch()
      return !this.$v.$invalid
    }
  }
}
</script>
