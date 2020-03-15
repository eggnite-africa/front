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
      default: () => []
    }
  },
  data() {
    return {
      networks: ['Facebook', 'Twitter', 'LinkedIn', 'Telegram'],
      facebook: null,
      twitter: null,
      linkedin: null,
      telegram: null
    }
  },
  created() {
    if (!this.userSocialLinks) return
    const links = this.userSocialLinks.map((l) => l.toLowerCase())
    const networks = ['facebook', 'twitter', 'linkedin', 't.me']
    for (const link of links) {
      for (const network of networks) {
        if (link.includes(network)) {
          if (network === 't.me') this.telegram = link
          this[network] = link
        }
      }
    }
  },
  methods: {
    updateModel(modelName, value) {
      const networkName = modelName.toLowerCase()
      const prefix = networkName === 'linkedin' ? 'in/' : ''
      const link =
        networkName === 'telegram'
          ? `https://t.me/${value}`
          : `https://${networkName}.com/${prefix}${value}`
      this[networkName] = value ? link : null
      const links = this.networks
        .map((n) => this[n.toLowerCase()])
        .filter((l) => l)
      this.$emit('update-social', links)
    },
    getValue(networkName) {
      const network = networkName.toLowerCase()
      const link = this[network]
      if (link === null) return null
      const username = (() => {
        if (link.includes('.me/')) {
          return link.split('.me/')[1]
        } else if (link.includes('/in/')) {
          return link.split('/in/')[1]
        }
        return link.split('.com/')[1]
      })()
      return username
    }
  }
}
</script>
