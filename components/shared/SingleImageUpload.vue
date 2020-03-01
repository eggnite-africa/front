<template>
  <client-only>
    <div id="singleImageUploader">
      <file-pond
        ref="singleImageUploader"
        @init="handleInit()"
        :files="files"
        :server="server"
        :label-idle="label"
        style-panel-layout="compact circle"
        image-crop-aspect-ratio="1:1"
        image-preview-height="170"
        image-resize-target-width="512"
        image-resize-target-height="512"
        style-load-indicator-position="center bottom"
        style-button-remove-item-position="center bottom"
        style="width: 170px"
        accepted-file-types="image/*"
      ></file-pond>
      <p v-show="isProductLogo" class="white--text text-center">
        To capture attention, a logo is recommended
      </p>
      <p class="red--text text-center">
        {{ errorMessage }}
      </p>
    </div>
  </client-only>
</template>

<script>
import { mapActions } from 'vuex'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform,
  FilePondPluginFileEncode
)
export default {
  components: {
    FilePond
  },
  props: {
    initImage: {
      // Either the profile picture or the product logo
      type: String,
      default: null
    },
    errorMessage: {
      type: String,
      default: ''
    },
    imageLabel: {
      type: String,
      default: null
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
            this.files = []
            this._pushFile(link)
            this.$emit('update-image', link)
            load(file)
          } catch (e) {
            throw new Error('there was a problem during upload')
          }
        },
        load: (url, load) => {
          fetch(url, {
            headers: {
              'Access-Control-Allow-Origin': '*'
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
          this.files = []
          this.$emit('update-image', null)
          load()
        }
      }
    }
  },
  computed: {
    isProductLogo() {
      return this.imageLabel.toLowerCase().includes('product')
    }
  },
  methods: {
    ...mapActions({
      uploadImage: 'utils/uploadImage',
      removeImage: 'utils/removeImage'
    }),
    handleInit() {
      if (this.initImage !== '') {
        this._pushFile(this.initImage)
      }
    },
    _pushFile(file) {
      this.files.push({ source: file, options: { type: 'local' } })
    }
  }
}
</script>

<style lang="scss">
#singleImageUploader {
  .filepond--panel-root {
    background-color: transparent;
    border: 0.1em solid #fff;
  }

  .filepond--drop-label {
    color: #fff;
  }
  .uploaded-file >>> .filepond--panel-root {
    background-color: transparent;
    border: none;
  }
  .errors {
    .filepond--panel-root {
      border: 0.1em solid red;
    }
  }
}
</style>
