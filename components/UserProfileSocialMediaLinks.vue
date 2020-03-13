<template>
  <div>
    <v-btn
      v-if="!!facebook"
      :href="facebook"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-facebook</v-icon>
    </v-btn>
    <v-btn
      v-if="!!twitter"
      :href="twitter"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-twitter</v-icon>
    </v-btn>
    <v-btn
      v-if="!!linkedin"
      :href="linkedin"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-linkedin</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'UserProfileSocialMediaLinks',
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      facebook: null,
      twitter: null,
      linkedin: null
    }
  },
  created() {
    if (!this.links) return
    const is = (link, network) => link.includes(network)
    for (const link of this.links) {
      if (is(link, 'facebook')) {
        this.facebook = link
      } else if (is(link, 'twitter')) {
        this.twitter = link
      } else if (is(link, 'linkedin')) {
        this.linkedin = link
      }
    }
  }
}
</script>
