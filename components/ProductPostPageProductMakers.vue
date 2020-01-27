<template>
  <div>
    <v-autocomplete
      v-model="makers"
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
            <v-img :src="data.item.profile.profilePicture"></v-img>
          </v-avatar>
          {{ data.item.profile.firstName + ' ' + data.item.profile.lastName }}
        </v-chip>
      </template>

      <template #item="data">
        <v-list-item-avatar>
          <v-img :src="data.item.profile.profilePicture"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            v-text="
              `${data.item.profile.firstName} ${data.item.profile.lastName}`
            "
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

export default {
  name: 'ProductPostPageProductMakers',
  props: {
    pId: {
      type: String,
      required: true
    },
    pMakers: {
      type: Array,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      makers: this.pMakers.map(({ id }) => id),
      err: false
    }
  },
  validations: {
    makers: {
      required
    }
  },
  computed: {
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
    async removeMaker({ id }) {
      if (this.makers.length === 1 && this.isEdit) {
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
              productId: this.pId,
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
              productId: this.pId,
              makerId: addedMaker
            }
          }
        })
        this.$v.makers.$touch()
      }
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
              profilePicture
              firstName
              lastName
            }
          }
        }
      `
    }
  }
}
</script>
