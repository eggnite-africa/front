<template>
  <validation-provider :name="label" #default="{ errors }" :rules="rules">
    <v-text-field
      @change="submitProductLink()"
      v-model="link"
      :label="label"
      :prepend-icon="icon"
      :color="color"
      :error-messages="errors[0]"
      type="url"
    ></v-text-field>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'ProductPostPageLink',
  components: {
    ValidationProvider
  },
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    fieldName: {
      // This is only for a field that has a long name e.g: App Store -> appStore
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    rules: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      link: null
    }
  },
  methods: {
    submitProductLink() {
      this.$store.commit('product/updateLink', {
        type:
          this.fieldName !== null ? this.fieldName : this.label.toLowerCase(),
        value: this.link
      })
    }
  }
}
</script>
