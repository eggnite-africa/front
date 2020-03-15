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
    <v-btn
      v-if="!!telegram"
      :href="telegram"
      class="mt-2 mt-sm-0"
      target="_blank"
      rel="noreferrer noopener"
      small
      depressed
      color="blue"
    >
      <v-icon left>mdi-telegram</v-icon>
      chat with me
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
      linkedin: null,
      telegram: null
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
      } else if (is(link, 't.me')) {
        this.telegram = link
      }
    }
  }
}
</script>
