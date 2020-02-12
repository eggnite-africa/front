<template>
  <client-only>
    <div id="singleImageUploader">
      <file-pond
        ref="singleImageUploader"
        @init="handleInit()"
        @input="$v.files.$touch()"
        :files="files"
        :server="server"
        :label-idle="label"
        :class="singleImageClass"
        style-panel-layout="compact circle"
        image-crop-aspect-ratio="1:1"
        image-preview-height="170"
        image-resize-target-width="200"
        image-resize-target-height="200"
        style-load-indicator-position="center bottom"
        style-button-remove-item-position="center bottom"
        style="width: 170px"
        accepted-file-types="image/jpeg, image/png, image/gif"
      ></file-pond>
      <p v-show="isProductLogo" class="red--text">{{ singleImageErrors }}</p>
    </div>
  </client-only>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'

import S3 from 'aws-s3'
const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const S3Client = new S3(config)
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
          load()
        }
      }
    }
  },
  computed: {
    isProductLogo() {
      return this.imageLabel.toLowerCase().includes('product')
    },
    singleImageErrors() {
      const errors = []
      if (!this.$v.files.$invalid) return
      !this.$v.files.required && errors.push('Product logo is required')
      return errors[0]
    },
    singleImageClass() {
      if (this.isProductLogo && this.$v.files.$invalid) return 'errors'
      return ''
    }
  },
  methods: {
    handleInit() {
      if (this.initImage !== '') {
        this._pushFile(this.initImage)
      }
    },
    _pushFile(file) {
      this.files.push({ source: file, options: { type: 'local' } })
    },
    async removeImage(link) {
      try {
        const fileName = link.split('.com/')[1]
        await S3Client.deleteFile(fileName)
        this.files = this.files.filter((file) => file.source !== link)
      } catch (e) {
        throw new Error('There was a problem deleting the picture')
      }
    },
    async uploadImage(file) {
      const { location } = await S3Client.uploadFile(file)
      return location
    },
    _getImage() {
      const file = this.files[0]
      if (!file) return ''
      return file.source
    },
    getProfilePicture() {
      return this._getImage()
    },
    getProductLogo() {
      return this._getImage()
    }
  },
  validations: {
    files: {
      required
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
