<template>
  <form>
    <v-row justify="center">
      <competition-logo
        @update-image="updateField('logo', $event)"
        :init-image="logo"
        :error-message="logoError"
        image-label="competition logo"
      />
    </v-row>
    <v-text-field
      v-if="initName === ''"
      v-model="name"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      :error-messages="nameErrors"
      label="Name"
      outlined
    ></v-text-field>
    <v-textarea
      v-model="description"
      @input="$v.description.$touch()"
      @blur="$v.description.$touch()"
      :error-messages="descriptionErrors"
      label="Description"
      outlined
    ></v-textarea>
    <v-row>
      <v-col align-self="start">
        <date-field
          :init-date="startDate"
          @update-date="updateField('startDate', $event)"
          label="Start"
        ></date-field>
      </v-col>
      <v-col>
        <date-field
          :initDate="endDate"
          @update-date="updateField('endDate', $event)"
          :min="startDate"
          label="End"
        ></date-field>
      </v-col>
    </v-row>
    <users-list
      ref="modsComponent"
      key="mods"
      @update-users="updateField('moderators', $event)"
      @is-invalid="updateField('isInvalidMods', $event)"
      :init-users="initMods"
      label="Moderators"
    ></users-list>
    <users-list
      ref="juriesComponent"
      key="juries"
      @update-users="updateField('jury', $event)"
      @is-invalid="updateField('isInvalidJury', $event)"
      :init-users="initJury"
      label="Juries"
    ></users-list>
    <div class="d-flex justify-end">
      <v-btn
        @click.prevent="beforeSubmit()"
        type="submit"
        depressed
        color="orange"
      >
        {{ submitLabel }}
      </v-btn>
    </div>
  </form>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import CompetitionLogo from '@/components/shared/SingleImageUpload.vue'
import UsersList from '@/components/shared/UsersList.vue'
import DateField from '@/components/shared/DateField.vue'
export default {
  components: {
    CompetitionLogo,
    UsersList,
    DateField
  },
  props: {
    submitLabel: {
      type: String,
      required: true
    },
    initName: {
      type: String,
      default: ''
    },
    initDescription: {
      type: String,
      default: ''
    },
    initLogo: {
      type: String,
      default: ''
    },
    initMods: {
      type: Array,
      default: () => []
    },
    initJury: {
      type: Array,
      default: () => []
    },
    initStartDate: {
      type: String,
      default: ''
    },
    initEndDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      logo: this.initLogo,
      name: this.initName,
      description: this.initDescription,
      moderators: this.initMods,
      jury: this.initJury,
      startDate: this.initStartDate.split('T')[0],
      endDate: this.initEndDate.split('T')[0],
      isInvalidJury: null,
      isInvalidMods: null,
      logoError: ''
    }
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('The competition name is required')
      !this.$v.name.minLength &&
        errors.push('The name should have at least 3 chars')
      // !this.$v.name.isUnique &&
      //   errors.push('Name already exists, it should be unique')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required &&
        errors.push('The competition description is required')
      !this.$v.description.maxLength &&
        errors.push('The description should not exceed 280 chars')
      return errors
    }
  },
  methods: {
    updateField(fieldName, value) {
      this[fieldName] = value
    },
    beforeSubmit() {
      this.$v.$touch()
      this.$refs.modsComponent.validate()
      this.$refs.juriesComponent.validate()
      if (
        this.$v.$invalid ||
        !this.logo ||
        this.isInvalidMods ||
        this.isInvalidJuries
      ) {
        this.logoError = 'a logo is required'
        return
      }
      const getUsersIds = (arr) => arr.map((u) => u.id)
      const competition = {
        logo: this.logo,
        name: this.name,
        description: this.description,
        moderators: getUsersIds(this.moderators),
        jury: getUsersIds(this.jury)
      }
      this.$emit('update-competition', competition)
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    description: {
      required,
      maxLength: maxLength(280)
    }
  }
}
</script>
