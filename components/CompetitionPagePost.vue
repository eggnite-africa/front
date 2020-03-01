<template>
  <form>
    <v-row justify="center">
      <competition-logo
        @update-image="updateField('logo', $event)"
        :init-image="logo"
        image-label="competition logo"
      />
    </v-row>
    <v-text-field v-model="name" label="Name" outlined></v-text-field>
    <v-textarea v-model="description" label="Description" outlined></v-textarea>
    <users-list
      key="mods"
      @update-users="updateField('moderators', $event)"
      label="Moderators"
    ></users-list>
    <users-list
      key="juries"
      @update-users="updateField('juries', $event)"
      label="Juries"
    ></users-list>
    <div class="d-flex justify-end">
      <v-btn
        @click.prevent="beforeSubmit()"
        type="submit"
        depressed
        color="orange"
      >
        {{ submitLabel }}
      </v-btn>
    </div>
  </form>
</template>

<script>
import CompetitionLogo from '@/components/shared/SingleImageUpload.vue'
import UsersList from '@/components/shared/UsersList.vue'
export default {
  components: {
    CompetitionLogo,
    UsersList
  },
  props: {
    submitLabel: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      logo: '',
      name: '',
      description: '',
      moderators: [],
      juries: []
    }
  },
  methods: {
    updateField(fieldName, value) {
      this[fieldName] = value
    },
    beforeSubmit() {
      const competition = {
        name: this.name,
        description: this.description,
        moderators: this.moderators,
        juries: this.juries
      }
      this.$emit('update-competition', competition)
    }
  }
}
</script>
