<template>
  <v-row align="center" dense>
    <v-col cols="12" sm="3" md="2" class="d-flex justify-center">
      <logo-uploader
        :init-image="''"
        @update-image="handleUpdate('logo', $event)"
        image-label="organizer logo"
      ></logo-uploader>
    </v-col>
    <v-col cols="12" sm="5" md="5">
      <v-text-field
        :value="name"
        @input="handleUpdate('name', $event)"
        label="Name"
        outlined
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4" md="5">
      <v-text-field
        :value="website"
        @input="handleUpdate('website', $event)"
        label="Website"
        prepend-inner-icon="mdi-web"
        outlined
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import LogoUploader from '@/components/shared/SingleImageUpload.vue'
export default {
  name: 'CompetitionPagePostOrganizer',
  components: {
    LogoUploader
  },
  props: {
    initOrganizer: {
      type: Object,
      default: () => ({
        logo: '',
        name: '',
        website: ''
      })
    }
  },
  data() {
    return {
      logo: this.initOrganizer.logo,
      name: this.initOrganizer.name,
      website: this.initOrganizer.website
    }
  },
  methods: {
    updateField(fieldName, value) {
      this[fieldName] = value
    },
    handleUpdate(fieldName, value) {
      this.updateField(fieldName, value)
      const organizer = {
        logo: this.logo,
        name: this.name,
        website: this.website
      }
      if (organizer) this.$emit('update-organizer', organizer)
    }
  }
}
</script>
