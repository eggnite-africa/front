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
      <v-icon>mdi-facebook-box</v-icon>
    </v-btn>
    <v-btn
      v-if="!!twitter"
      :href="twitter"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-twitter-box</v-icon>
    </v-btn>
    <v-btn
      v-if="!!linkedin"
      :href="linkedin"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-linkedin-box</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'UserProfileSocialMediaLinks',
  props: {
    links: {
      type: Array,
      required: true
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
    this.sortLinks()
  },
  methods: {
    sortLinks() {
      const links = [...this.links]
      const is = (link, network) => link.includes(network)
      for (const link of links) {
        if (is(link, 'facebook')) {
          this.facebook = link
        } else if (is(link, 'twitter')) {
          this.twitter = link
        } else if (is(link, 'linkedIn')) {
          this.linkedin = link
        }
      }
    }
  }
}
</script>
