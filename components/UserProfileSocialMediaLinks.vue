<template>
  <div>
    <v-btn
      v-if="!!website"
      :href="website"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-web</v-icon>
    </v-btn>
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
    <v-btn
      v-if="!!medium"
      :href="medium"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-medium</v-icon>
    </v-btn>
    <v-btn
      v-if="!!instagram"
      :href="instagram"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-instagram</v-icon>
    </v-btn>
    <v-btn
      v-if="!!youtube"
      :href="youtube"
      icon
      target="_blank"
      rel="noreferrer noopener"
      small
    >
      <v-icon>mdi-youtube</v-icon>
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
      website: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      instagram: null,
      youtube: null,
      medium: null
    }
  },
  created() {
    this.sortLinks()
  },
  methods: {
    sortLinks() {
      const links = [...this.links]
      const is = (link, network) => link.includes(network)
      links.forEach((link) => {
        if (is(link, 'Facebook')) {
          this.facebook = link
        } else if (is(link, 'Twitter')) {
          this.twitter = link
        } else if (is(link, 'LinkedIn')) {
          this.linkedin = link
        } else if (is(link, 'Instagram')) {
          this.instagram = link
        } else if (is(link, 'YouTube')) {
          this.youtube = link
        } else if (is(link, 'Medium')) {
          this.medium = link
        } else {
          this.website = link
        }
      })
    }
  }
}
</script>
