<template>
  <file-pond
    :server="server"
    :files="files"
    :class="{ 'uploaded-file': addedFile }"
    :label-idle="label"
    @addfile="addedFile = true"
    @removefile="addedFile = false"
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
    // eslint-disable-next-line vue/require-default-prop
    files: null,
    // eslint-disable-next-line vue/require-default-prop
    imageType: null
  },
  data() {
    return {
      addedFile: false,
      label: `Drag & Drop ${this.imageType} here or <span class="filepond--label-action"> Browse </span>`,
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // Upload image to aws s3

          /* eslint-disable no-console */
          console.log('file: ', file)
        }
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
