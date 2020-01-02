<template>
  <v-row dense>
    <v-col>
      <v-select
        v-model="link.media"
        :items="socialMedia"
        :prepend-icon="
          link.media !== null
            ? `mdi-${socialMedia.find((sml) => sml.value === link.media).icon}`
            : ''
        "
        item-text="value"
      >
        <template #item="{item}">
          <span>
            <v-icon v-text="`mdi-${item.icon}`" left></v-icon>
            <span v-text="item.value"></span>
          </span>
        </template>
      </v-select>
    </v-col>
    <v-col>
      <v-text-field
        :label="link.media !== 'Website' ? 'Username' : 'Link'"
        v-model="link.contact"
        @change="sumbitSocialMediaLink()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="2" align-self="center">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      socialMedia: [
        { value: 'Facebook', icon: 'facebook-box' },
        { value: 'Twitter', icon: 'twitter-box' },
        { value: 'Instagram', icon: 'instagram' },
        { value: 'LinkedIn', icon: 'linkedin-box' },
        { value: 'Medium', icon: 'medium' },
        { value: 'YouTube', icon: 'youtube' },
        { value: 'Website', icon: 'web' }
      ],
      link: {
        media: null,
        contact: null
      }
    }
  },
  methods: {
    sumbitSocialMediaLink() {
      const link = this.link
      this.$store.commit('user/submitSocialMediaLink', { ...link })
    }
  }
}
</script>
