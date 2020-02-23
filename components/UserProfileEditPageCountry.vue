<template>
  <v-autocomplete
    :items="africanCountries"
    :value="selectedCountry"
    @input="updateCountry($event)"
    @blur="$v.selectedCountry.$touch()"
    :error-messages="CountryErrors"
    prepend-icon="mdi-map"
    item-text="name"
    item-value="code"
    label="Country"
  ></v-autocomplete>
</template>

<script>
import { countries } from 'countries-list'
import { required } from 'vuelidate/lib/validators'
export default {
  props: {
    userCountry: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      selectedCountry: this.userCountry,
      africanCountries: [
        {
          code: '',
          name: ''
        }
      ]
    }
  },
  computed: {
    CountryErrors() {
      const errors = []
      if (!this.$v.selectedCountry.$dirty) return errors
      !this.$v.selectedCountry.required &&
        errors.push('Country field is required')
      return errors
    }
  },
  created() {
    const africanCountries = Object.entries(countries).filter(
      (c) => c[1].continent === 'AF'
    )
    const africanCountriesFinal = []
    africanCountries.forEach((c) => {
      const country = {
        code: c[0],
        name: c[1].name
      }
      africanCountriesFinal.push(country)
    })
    this.africanCountries = africanCountriesFinal
  },
  methods: {
    updateCountry(value) {
      this.selectedCountry = value
      this.$v.selectedCountry.$touch()
      this.$emit('update-country', value)
    }
  },
  validations: {
    selectedCountry: {
      required
    }
  }
}
</script>
