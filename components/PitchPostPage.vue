<template>
  <div>
    <form @submit.prevent="beforeSubmit()">
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-if="!pTitle"
            v-model="pTitle"
            outlined
            label="Title"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="pContent" outlined label="Content"></v-textarea>
        </v-col>
      </v-row>

      <v-row dense>
        <v-spacer></v-spacer>
        <v-btn color="secondary" type="submit" depressed><slot></slot></v-btn>
      </v-row>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PitchPostPage',
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pContent: this.content,
      pTitle: this.title
    }
  },
  methods: {
    beforeSubmit() {
      const updatedPitch = {
        title: this.pTitle,
        content: this.pContent
      }
      this.$emit('update-pitch', updatedPitch)
      this.onSubmit()
    }
  }
}
</script>
