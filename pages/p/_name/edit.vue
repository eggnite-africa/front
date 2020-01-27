<template>
  <div>
    <v-snackbar v-model="message.display">
      <v-icon :color="message.err ? 'red' : 'green'" left dense>
        {{ message.icon }}
      </v-icon>
      {{ message.text }}
      <v-btn @click.stop="message.display = false" text color="red"
        >close</v-btn
      >
    </v-snackbar>
    <v-card>
      <v-card-title v-text="productName"></v-card-title>
      <v-card-text>
        <product-edit ref="productEdit" :is-edit="true" :on-submit="onSubmit">
          Update
        </product-edit>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ProductEdit from '@/components/ProductPostPage.vue'

export default {
  components: {
    ProductEdit
  },
  data() {
    return {
      message: {
        display: false,
        err: false,
        text: '',
        icon: ''
      }
    }
  },
  computed: {
    productName() {
      return this.$route.params.name.replace(/-/g, ' ')
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$refs.productEdit.updateProduct()
        this.message.err = false
        this.message.icon = 'mdi-check'
        this.message.text = 'The product was successfully updated!'
      } catch (e) {
        this.message.err = true
        this.message.icon = 'mdi-close'
        this.message.text = 'There was an error updating the product'
      } finally {
        this.message.display = true
      }
    }
  },
  middleware: ['auth', 'isProductOwner']
}
</script>
