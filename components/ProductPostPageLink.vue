<template>
  <v-text-field
    v-model="link"
    :label="label"
    :prepend-icon="icon"
    :color="color"
    :error-messages="linkErrors"
    @input="$v.link.$touch()"
    @blur="$v.link.$touch()"
    type="url"
  ></v-text-field>
</template>

<script>
import { requiredIf } from 'vuelidate/lib/validators'

export default {
  name: 'ProductPostPageLink',
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    pLink: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      link: this.pLink
    }
  },
  computed: {
    linkErrors() {
      const errors = []
      if (!this.$v.link.$dirty) return errors
      !this.$v.link.required &&
        errors.push('at least the website link has to be provided')
      return errors
    }
  },
  validations: {
    link: {
      required: requiredIf(function() {
        return this.isRequired
      })
    }
  }
}
</script>
