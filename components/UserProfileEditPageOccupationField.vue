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
        <v-radio label="Developer" value="DEVELOPER" color="green"></v-radio>
        <v-radio
          label="Entrepreneur"
          value="ENTREPRENEUR"
          color="yellow"
        ></v-radio>
      </v-radio-group>
    </v-col>
    <v-col>
      <template v-if="userOccupation === 'STUDENT'">
        <header>University</header>
        <v-text-field
          v-model.trim="userUniversity"
          :error-messages="userUniversityErrors"
          @input="$v.userUniversity.$touch()"
          @blur="$v.userUniversity.$touch()"
          prepend-icon="mdi-school"
        ></v-text-field>
      </template>
      <template v-else>
        <header>Company</header>
        <v-text-field
          v-model.trim="userCompany"
          :error-messages="userCompanyErrors"
          @input="$v.userCompany.$touch()"
          @blur="$v.userCompany.$touch()"
          prepend-icon="mdi-briefcase"
        ></v-text-field>
      </template>
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
    },
    company: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      userOccupation: this.occupation,
      userUniversity: this.university,
      userCompany: this.company
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
    },
    userCompanyErrors() {
      const errors = []
      if (!this.$v.userCompany.$dirty) return errors
      !this.$v.userCompany.required && errors.push('So... Where do you work?')
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
    },
    userCompany: {
      required: requiredIf(function() {
        return this.userOccupation !== 'STUDENT'
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
