<template>
  <client-only>
    <file-pond
      :server="server"
      :label-idle="label"
      accepted-file-types="image/jpeg, image/gif"
      allow-multiple="true"
      class="grid"
    ></file-pond>
  </client-only>
</template>

<script>
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
  name: 'ProductPostImagesUpload',
  components: {
    FilePond
  },
  data() {
    return {
      label: `Drag & Drop product images here or <span class="filepond--label-action"> Browse </span>`,
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
@media (min-width: 30em) {
  .grid >>> .filepond--item {
    width: calc(50% - 0.5em);
  }
}

@media (min-width: 50em) {
  .grid >>> .filepond--item {
    width: calc(33.33% - 0.5em);
  }
}
</style>
