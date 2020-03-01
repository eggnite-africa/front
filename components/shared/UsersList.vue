<template>
  <v-autocomplete
    v-model="selectedUsers"
    v-if="!$apollo.loading"
    :items="users"
    :error-messages="selectedUsersErrors"
    @blur="$v.selectedUsers.$touch()"
    @input="addUser"
    :label="label"
    multiple
    outlined
    chips
    append-icon=""
    hide-no-data
    deletable-chips
    persistent-hint
    hint="Type in their username(s)"
    item-text="username"
    item-value="id"
    cache-items
  >
    <template #selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        @click="data.select"
        @click:close="removeUser(data.item)"
        close
      >
        <v-avatar left>
          <v-img :src="userAvatar(data.item.id)"></v-img>
        </v-avatar>
        {{ data.item.profile.fullName }}
      </v-chip>
    </template>

    <template #item="data">
      <v-list-item-avatar>
        <v-img :src="userAvatar(data.item.id)"></v-img>
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
</template>

<script>
import gql from 'graphql-tag'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'UsersLists',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedUsers: [],
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
    selectedUsers: {
      required
    }
  },
  computed: {
    selectedUsersErrors() {
      const errors = []
      if (!this.$v.selectedUsers.$dirty) return errors
      !this.$v.selectedUsers.required &&
        errors.push('There should be at least one entitiy')
      return errors
    }
  },
  methods: {
    removeUser({ id }) {
      this.selectedUsers = this.selectedUsers.filter((i) => i !== id)
      this.$emit('update-users', this.selectedUsers)
    },
    addUser({ id }) {
      if (id) {
        this.selectedUsers.push(id)
      }
      this.$emit('update-users', this.selectedUsers)
    },
    userAvatar(id) {
      const user = this.users.find((user) => user.id === id)
      const { picture } = user.profile
      return picture
    }
  },
  apollo: {
    users: {
      query: gql`
        query fetchAllUserForAutocomplete {
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
