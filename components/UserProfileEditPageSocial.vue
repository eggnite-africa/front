<template>
  <v-row>
    <v-col v-for="network in networks" :key="network" cols="12" sm="4">
      <v-text-field
        :value="getValue(network)"
        :prepend-icon="`mdi-${network.toLowerCase()}`"
        :label="network"
        @input="updateModel(network, $event)"
        hint="Put the username only"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    userSocialLinks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      networks: ['Facebook', 'Twitter', 'LinkedIn'],
      facebook: '',
      twitter: '',
      linkedin: '',
      links: []
    }
  },
  created() {
    if (!this.userSocialLinks) {
      this.links = []
      return
    }
    this.links = this.userSocialLinks.map((l) => l.toLowerCase())
  },
  methods: {
    updateModel(modelName, value) {
      const networkName = modelName.toLowerCase()
      this[networkName] = value
      const prefix = networkName === 'linkedin' ? 'in/' : ''
      const link = `https://${networkName}.com/${prefix}${value}`
      const i = this.links.findIndex((l) => l.includes(networkName))
      if (i === -1) {
        this.links.push(link)
      } else {
        this.links[i] = link
      }
      this.$emit('update-social', this.links)
    },
    getValue(networkName) {
      const network = networkName.toLowerCase()
      const link = this.links.find((l) => l.includes(network))
      if (link === undefined) return ''
      const username = link.includes('/in/')
        ? link.split('/in/')[1]
        : link.split('.com/')[1]
      return username
    }
  }
}
</script>
