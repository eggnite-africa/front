<template>
  <client-only>
    <file-pond
      id="multipleImageUploader"
      ref="multipleImageUploader"
      @init="handleInit()"
      :files="files"
      :server="server"
      :label-idle="label"
      allow-multiple="true"
      allowed-file-type="image/jpeg, image/png, image/gif"
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
          fetch(url)
            .then((response) => response.blob())
            .then((blob) => load(blob))
        },
        restore: null,
        fetch: null,
        revert: null
      }
    }
  },
  methods: {
    handleInit() {
      if (this.isEdit) {
        this.initImages.forEach((file) => this._pushFile(file))
      }
    },
    _pushFile(file) {
      this.files.push({ source: file, options: { type: 'local' } })
    },
    async uploadImage(file) {
      const headers = new Headers()
      headers.append('Authorization', 'Client-ID 634e6e78a031851')

      const body = new FormData()
      body.append('image', file)

      const requestOptions = {
        method: 'POST',
        headers,
        body,
        redirect: 'follow'
      }

      const { data: picture } = await fetch(
        'https://api.imgur.com/3/image',
        requestOptions
      ).then((response) => response.json())
      return picture.link
    },
    _getImage() {
      const file = this.files[0]
      const image = file.source
      return image
    },
    getProfilePicture() {
      return this._getImage()
    },
    getProductLogo() {
      return this._getImage()
    },
    getProductPictures() {
      const pictures = this.files.map((file) => file.source)
      return pictures
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
