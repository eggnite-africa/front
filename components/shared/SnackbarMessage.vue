<template>
  <v-snackbar v-model="show" :timeout="delay">
    <v-icon :color="err ? 'red' : 'green'" left dense>
      {{ err ? 'mdi-close' : 'mdi-check' }}
    </v-icon>
    {{ message }}
    <v-btn @click.stop="show = !show" text color="red">
      close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackbarMessage',
  props: {
    display: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    isErr: {
      type: Boolean,
      required: true
    },
    delay: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      show: this.display,
      err: this.isErr
    }
  },
  watch: {
    display(n, o) {
      this.show = !this.show
    }
  }
}
</script>
