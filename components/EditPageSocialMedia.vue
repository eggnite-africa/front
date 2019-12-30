<template>
  <v-row dense>
    <v-col>
      <v-select
        v-model="smLink"
        :items="socialMedia"
        :prepend-icon="
          smLink !== null
            ? `mdi-${socialMedia.find((sml) => sml.value === smLink).icon}`
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
        :label="smLink !== 'Website' ? 'Username' : 'Link'"
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
      smLink: null
    }
  }
}
</script>
