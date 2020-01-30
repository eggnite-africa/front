<template>
  <client-only>
    <file-pond
      ref="singleImageUploader"
      :class="{ 'uploaded-file': addedFile }"
      :label-idle="label"
      :server="server"
      @addfile="addedFile = true"
      @removefile="addedFile = false"
      @init="handleInit()"
      style-panel-layout="compact circle"
      image-crop-aspect-ratio="1:1"
      image-preview-height="170"
      image-resize-target-width="200"
      image-resize-target-height="200"
      style-load-indicator-position="center bottom"
      style-button-remove-item-position="center bottom"
      style="width: 170px"
      allowed-file-type="image/jpeg, image/png, image/gif"
    ></file-pond>
  </client-only>
</template>

<script>
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
    imageLabel: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      addedFile: false,
      label: `Drag & Drop ${this.imageLabel} here or <span class="filepond--label-action"> Browse </span>`,
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // Upload image to aws s3

          /* eslint-disable no-console */
          console.log('file: ', file)
        }
      }
    }
  },
  methods: {
    handleInit() {
      if (this.initImage !== null) {
        this.$refs.singleImageUploader.addFile(this.initImage)
      }
    }
  }
}
</script>

<style>
.filepond--panel-root {
  background-color: transparent;
  border: 0.05em solid whitesmoke;
}

.filepond--drop-label {
  color: whitesmoke;
}
</style>

<style scoped>
.uploaded-file >>> .filepond--panel-root {
  background-color: transparent;
  border: none;
}
</style>
