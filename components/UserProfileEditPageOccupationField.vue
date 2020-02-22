<template>
  <v-row align="center">
    <v-col>
      <v-select
        v-model="occupation"
        :error-messages="occupationErrors"
        :items="occupations"
        @input="updateOccupation()"
        @blur="updateOccupation()"
        label="Occupation"
        item-text="label"
        item-value="value"
        return-object
      ></v-select>
    </v-col>
    <v-col>
      <template v-if="occupation === 'ENTREPRENEUR'">
        <v-text-field
          v-model.trim="company"
          :error-messages="companyErrors"
          @input="updateCompany()"
          @blur="updateCompany()"
          prepend-icon="mdi-briefcase"
          label="Company"
        ></v-text-field>
      </template>
      <template v-else>
        <v-text-field
          v-model.trim="university"
          :error-messages="universityErrors"
          @input="updateUniversity()"
          @blur="updateUniversity()"
          prepend-icon="mdi-school"
          label="University"
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
    userOccupation: {
      type: String,
      required: true
    },
    userUniversity: {
      type: String,
      default: null
    },
    userCompany: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      occupation: this.userOccupation,
      university: this.userUniversity,
      company: this.userCompany,
      occupations: [
        { label: 'Entrepreneur', value: 'ENTREPRENEUR' },
        { label: 'Developer', value: 'DEVELOPER' },
        { label: 'Professor', value: 'PROFESSOR' },
        { label: 'Student', value: 'STUDENT' }
      ]
    }
  },
  computed: {
    occupationErrors() {
      const errors = []
      if (!this.$v.occupation.$dirty) return errors
      !this.$v.occupation.required && errors.push('Batman?... Is that you?')
      return errors
    },
    universityErrors() {
      const errors = []
      if (!this.$v.university.$dirty) return errors
      !this.$v.university.required && errors.push('So... Where do you study?')
      return errors
    },
    companyErrors() {
      const errors = []
      if (!this.$v.company.$dirty) return errors
      !this.$v.company.required && errors.push('So... Where do you work?')
      return errors
    }
  },
  validations: {
    occupation: {
      required
    },
    university: {
      required: requiredIf(function() {
        return this.occupation === 'STUDENT'
      })
    },
    company: {
      required: requiredIf(function() {
        return this.occupation !== 'STUDENT'
      })
    }
  },
  methods: {
    isValid() {
      this.$v.$touch()
      return !this.$v.$invalid
    },
    updateField(fieldName, value) {
      this.$v[`${fieldName}`].$touch()
      if (value) {
        const eventName = `update-${fieldName}`
        this.$emit(eventName, value)
      }
    },
    updateCompany() {
      this.updateField('company', this.company)
    },
    updateUniversity() {
      this.updateField('university', this.university)
    },
    updateOccupation() {
      this.updateField('occupation', this.occupation)
    }
  }
}
</script>
