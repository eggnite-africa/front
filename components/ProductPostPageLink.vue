<template>
  <v-text-field
    @change="submitProductLink()"
    v-model="link"
    :label="label"
    :prepend-icon="icon"
    :color="color"
  ></v-text-field>
</template>

<script>
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
    fieldName: {
      // This is only for a field that has a long name e.g: App Store -> appStore
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'primary'
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
