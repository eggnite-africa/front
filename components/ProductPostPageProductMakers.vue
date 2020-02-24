<template>
  <div>
    <v-autocomplete
      v-model="makers"
      v-if="!$apollo.queries.users.loading"
      :items="users"
      :error-messages="makersErrors"
      @blur="$v.makers.$touch()"
      @input="addMaker"
      multiple
      label="Makers"
      outlined
      chips
      append-icon=""
      hide-no-data
      deletable-chips
      persistent-hint
      hint="Type in their username(s)"
      height="25px"
      item-text="username"
      item-value="id"
      cache-items
    >
      <template #selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          @click="data.select"
          @click:close="removeMaker(data.item)"
          close
        >
          <v-avatar left>
            <v-img :src="makerAvatar(data.item.id)"></v-img>
          </v-avatar>
          {{ data.item.profile.fullName }}
        </v-chip>
      </template>

      <template #item="data">
        <v-list-item-avatar>
          <v-img :src="makerAvatar(data.item.id)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            v-text="data.item.profile.fullName"
          ></v-list-item-title>
          <v-list-item-subtitle
            v-text="data.item.username"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>

    <v-snackbar v-model="err">
      <v-icon color="yellow" left>
        mdi-alert
      </v-icon>
      You can't do that! At this point, just delete the product.
      <v-btn @click.stop="err = false" text color="red">close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { required } from 'vuelidate/lib/validators'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ProductPostPageProductMakers',
  props: {
    productId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      err: false,
      users: [
        {
          id: '',
          username: '',
          profile: {
            picture: '',
            fullName: ''
          }
        }
      ]
    }
  },
  validations: {
    makers: {
      required
    }
  },
  computed: {
    ...mapState({
      productMakers: (state) => state.product.makers
    }),
    makers: {
      get() {
        return this.productMakers
      },
      set(value) {
        this.updateField({ fieldName: 'makers', value })
      }
    },
    makersErrors() {
      const errors = []
      if (!this.$v.makers.$dirty) return errors
      !this.$v.makers.required &&
        errors.push(
          "there can't be a product without at least one maker... duh!"
        )
      return errors
    }
  },
  methods: {
    ...mapMutations({
      updateField: 'product/updateField'
    }),
    async removeMaker({ id }) {
      if (this.makers.length === 1) {
        this.err = true
        return
      }
      const index = this.makers.indexOf(id)
      if (index >= 0) this.makers.splice(index, 1)
      if (this.isEdit) {
        await this.$apollo.mutate({
          mutation: gql`
            mutation deleteMaker($makerInput: MakerInput!) {
              deleteMaker(makerInput: $makerInput) {
                id
              }
            }
          `,
          variables: {
            makerInput: {
              productId: this.productId,
              makerId: id
            }
          }
        })
      }
    },
    async addMaker(makers) {
      const addedMaker = makers[makers.length - 1]
      if (addedMaker && this.isEdit) {
        await this.$apollo.mutate({
          mutation: gql`
            mutation addMaker($makerInput: MakerInput!) {
              addMaker(makerInput: $makerInput) {
                id
              }
            }
          `,
          variables: {
            makerInput: {
              productId: this.productId,
              makerId: addedMaker
            }
          }
        })
        this.$v.makers.$touch()
      }
    },
    makerAvatar(id) {
      const maker = this.users.find((maker) => maker.id === id)
      const { picture } = maker.profile
      return picture
    }
  },
  apollo: {
    users: {
      query: gql`
        query fetchAllMakers {
          users {
            id
            username
            profile {
              picture
              fullName
            }
          }
        }
      `
    }
  }
}
</script>
