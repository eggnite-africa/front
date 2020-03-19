<template>
  <div>
    <form @submit.prevent="beforeSubmit()">
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model="pName"
            :error-messages="nameErrors"
            @input="$v.pName.$touch()"
            @blur="$v.pName.$touch()"
            outlined
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="pProblem"
            :error-messages="problemErrors"
            @input="$v.pProblem.$touch()"
            @blur="$v.pProblem.$touch()"
            outlined
            label="Problem"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="pSolution"
            :error-messages="solutionErrors"
            @input="$v.pSolution.$touch()"
            @blur="$v.pSolution.$touch()"
            outlined
            label="Solution"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="pSkills"
            :error-messages="skillsErrors"
            @input="$v.pSkills.$touch()"
            @blur="$v.pSkills.$touch()"
            outlined
            label="Qualifications"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="pNeeds"
            :error-messages="needsErrors"
            @input="$v.pNeeds.$touch()"
            @blur="$v.pNeeds.$touch()"
            outlined
            label="Needs"
            hint="What are you looking for? Collaborators? Financiers? Etc..."
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row dense>
        <v-spacer></v-spacer>
        <v-btn color="secondary" type="submit" depressed><slot></slot></v-btn>
      </v-row>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'PitchPostPage',
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    problem: {
      type: String,
      default: ''
    },
    solution: {
      type: String,
      default: ''
    },
    skills: {
      type: String,
      default: ''
    },
    needs: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pName: this.name,
      pProblem: this.problem,
      pSolution: this.solution,
      pSkills: this.skills,
      pNeeds: this.needs
    }
  },
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.pName.$dirty) return errors
      !this.$v.pName.required && errors.push('the idea should have a name')
      return errors
    },
    problemErrors() {
      const errors = []
      if (!this.$v.pProblem.$dirty) return errors
      !this.$v.pProblem.required &&
        errors.push('the idea should address a problem... duh!')
      return errors
    },
    solutionErrors() {
      const errors = []
      if (!this.$v.pSolution.$dirty) return errors
      !this.$v.pSolution.required &&
        errors.push('a problem without a solution is called a complaint.')
      return errors
    },
    skillsErrors() {
      const errors = []
      if (!this.$v.pSkills.$dirty) return errors
      !this.$v.pSkills.required &&
        errors.push('ok, but like... What do you know?')
      return errors
    },
    needsErrors() {
      const errors = []
      if (!this.$v.pNeeds.$dirty) return errors
      !this.$v.pNeeds.required && errors.push('you should specify your needs')
      return errors
    }
  },
  validations: {
    pName: {
      required
    },
    pProblem: {
      required
    },
    pSolution: {
      required
    },
    pSkills: {
      required
    },
    pNeeds: {
      required
    }
  },
  methods: {
    beforeSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      const updatedPitch = {
        name: this.pName,
        problem: this.pProblem,
        solution: this.pSolution,
        skills: this.pSkills,
        needs: this.pNeeds
      }
      this.$emit('update-pitch', updatedPitch)
      this.onSubmit()
    }
  }
}
</script>
