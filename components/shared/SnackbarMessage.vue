<template>
  <v-snackbar v-model="show" :timeout="delay">
    <v-icon :color="isErr ? 'red' : 'green'" left dense>
      {{ isErr ? 'mdi-close' : 'mdi-check' }}
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
      show: this.display
    }
  },
  watch: {
    display(n, o) {
      this.show = !this.show
    }
  }
}
</script>
