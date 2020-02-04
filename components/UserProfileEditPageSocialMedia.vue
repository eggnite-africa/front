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
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="2" align-self="center">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
function getMediaType(link) {
  if (!link) {
    return null
  }

  const networks = [
    'Facebook',
    'Twitter',
    'Instagram',
    'LinkedIn',
    'Medium',
    'YouTube'
  ]

  const [start, end] = [link.indexOf('//') + 2, link.indexOf('.com')]
  const mediaType = link.substring(start, end)

  if (!networks.includes(mediaType)) return 'Website'
  return mediaType
}

function getContactInfo(link) {
  const type = getMediaType(link)
  if (type === 'Website') {
    if (
      !link.includes('https://') ||
      !link.includes('http://') ||
      !link.includes('www.')
    ) {
      return `https://${link}`
    } else {
      return link
    }
  }

  const lastSlashIndex = link.lastIndexOf('/') + 1
  const contact = link.slice(lastSlashIndex)
  if (type === 'Medium' && !contact.includes('@')) {
    return `@${contact}`
  } else {
    return contact
  }
}

export default {
  name: 'UserProfileEditPageSocialMedia',
  props: {
    socialLink: {
      type: String,
      default: null
    },
    socialNetworks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      socialMedia: this.socialNetworks,
      link: {
        media: getMediaType(this.socialLink),
        contact: getContactInfo(this.socialLink)
      }
    }
  },
  methods: {
    getSocialMediaLink() {
      if (!this.link.contact.length) {
        return null
      }

      switch (this.link.media) {
        case 'Facebook':
          return `https://Facebook.com/${this.link.contact}`
        case 'Twitter':
          return `https://Twitter.com/${this.link.contact}`
        case 'Instagram':
          return `https://Instagram.com/${this.link.contact}`
        case 'LinkedIn':
          return `https://LinkedIn.com/in/${this.link.contact}`
        case 'Medium':
          return `https://Medium.com/${this.link.contact}`
        case 'YouTube':
          return `https://YouTube.com/user/${this.link.contact}`
        case 'Website':
          return this.link.contact
        default:
          break
      }
    }
  }
}
</script>
