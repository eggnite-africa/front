<template>
  <v-text-field
    v-model="link"
    :label="label"
    :prepend-icon="icon"
    :color="color"
    type="url"
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
    color: {
      type: String,
      default: 'primary'
    },
    rules: {
      type: String,
      default: null
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
  }
}
</script>
