<template>
  <div id="multipleImageUploader">
    <client-only>
      <file-pond
        ref="multipleImageUploader"
        @init="handleInit()"
        @input="$v.files.$touch()"
        :files="files"
        :server="server"
        :label-idle="label"
        :class="$v.files.$invalid ? 'grid errors' : 'grid'"
        allow-multiple="true"
        accepted-file-types="image/*"
      ></file-pond>
    </client-only>
    <p class="red--text">{{ multipleImageErrors }}</p>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
)
export default {
  components: {
    FilePond
  },
  props: {
    initImages: {
      type: Array,
      default: null
    },
    imageLabel: {
      type: String,
      default: null
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      files: [],
      label: `Drag & Drop ${this.imageLabel} here or <span class="filepond--label-action"> Browse </span>`,
      server: {
        process: async (
          fieldName,
          file,
          metadata,
          load,
          error,
          progress,
          abort,
          transfer,
          options
        ) => {
          try {
            const link = await this.uploadImage(file)
            this._pushFile(link)
            load(file)
          } catch (e) {
            throw new Error('there was a problem during upload')
          }
        },
        load: (url, load) => {
          fetch(url, {
            headers: {
              get: {
                'Access-Control-Allow-Origin': '*'
              }
            }
          })
            .then((response) => response.blob())
            .then((blob) => load(blob))
        },
        restore: null,
        fetch: null,
        revert: null,
        remove: async (source, load, err) => {
          await this.removeImage(source)
          this.files = this.files.filter((file) => file.source !== source)
          load()
        }
      }
    }
  },
  computed: {
    multipleImageErrors() {
      const errors = []
      if (!this.$v.files.$invalid) return
      !this.$v.files.required &&
        errors.push('Pictures of the product are required')
      !this.$v.files.minLength &&
        errors.push('At least 2 pictures are required')
      return errors[0]
    }
  },
  methods: {
    ...mapActions({
      uploadImage: 'utils/uploadImage',
      removeImage: 'utils/removeImage'
    }),
    handleInit() {
      if (this.isEdit) {
        this.initImages.forEach((file) => this._pushFile(file))
      }
    },
    _pushFile(file) {
      this.files.push({ source: file, options: { type: 'local' } })
    },
    getProductPictures() {
      const pictures = this.files.map((file) => file.source)
      return pictures
    }
  },
  validations: {
    files: {
      required,
      minLength: minLength(2)
    }
  }
}
</script>

<style lang="scss">
#multipleImageUploader {
  .filepond--panel-root {
    background-color: transparent;
    border: 0.1em solid #fff;
  }
  .filepond--drop-label {
    color: #fff;
  }
  @media (min-width: 30em) {
    .grid {
      .filepond--item {
        width: calc(50% - 0.5em);
      }
    }
  }
  @media (min-width: 50em) {
    .grid {
      .filepond--item {
        width: calc(33.33% - 0.5em);
      }
    }
  }
  .errors {
    .filepond--panel-root {
      border: 0.1em solid red;
    }
  }
}
</style>
