<template>
  <v-row dense>
    <v-col>
      <header>Occupation</header>
      <validation-provider
        #default="{ errors }"
        name="The occupation"
        rules="required"
        vid="occupation"
      >
        <v-radio-group v-model="occupation" :error-messages="errors" row>
          <v-radio label="Student" value="STUDENT" color="blue"></v-radio>
          <v-radio label="Developer" value="DEV" color="green"></v-radio>
          <v-radio
            label="Entrepreneur"
            value="ENTREPRENEUR"
            color="yellow"
          ></v-radio>
        </v-radio-group>
      </validation-provider>
    </v-col>
    <v-col>
      <template v-if="occupation === 'STUDENT' || occupation === null">
        <header>University</header>
        <validation-provider
          #default="{ errors }"
          name="The university"
          rules="requiredIf:occupation,STUDENT"
        >
          <v-select
            :items="['ESPRIT', 'LaSalle']"
            v-model="university"
            :error-messages="errors"
            @change="$emit('next-step')"
            prepend-icon="mdi-school"
          ></v-select>
        </validation-provider>
      </template>
      <template v-else>
        <header>City</header>
        <validation-provider
          #default="{ errors }"
          name="The city"
          rules="requiredIf:occupation,DEV,ENTREPRENEUR"
        >
          <v-select
            v-model="city"
            :items="['Tunis', 'Sousse']"
            :error-messages="errors"
            @change="$emit('next-step')"
            prepend-icon="mdi-map-marker"
          ></v-select>
        </validation-provider>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required, required_if as requiredIf } from 'vee-validate/dist/rules'

extend('required', required)
extend('requiredIf', requiredIf)

export default {
  name: 'OccupationField',
  components: { ValidationProvider },
  computed: {
    occupation: {
      get() {
        return this.$store.state.user.occupation
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'occupation',
          value
        })
      }
    },
    university: {
      get() {
        return this.$store.state.user.university
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'university',
          value
        })
      }
    },
    city: {
      get() {
        return this.$store.state.user.city
      },
      set(value) {
        this.$store.commit('user/updateField', {
          field: 'city',
          value
        })
      }
    }
  }
}
</script>
