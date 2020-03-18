<template>
  <div>
    <form @submit.prevent="beforeSubmit()">
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-if="!pTitle"
            v-model="pTitle"
            outlined
            label="Title"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="pProblem" outlined label="Problem"></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="pSolution"
            outlined
            label="Solution"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="pSkills"
            outlined
            label="Qualifications"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="pNeeds" outlined label="Needs"></v-text-field>
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
export default {
  name: 'PitchPostPage',
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    title: {
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
      pTitle: this.title,
      pProblem: this.problem,
      pSolution: this.solution,
      pSkills: this.skills,
      pNeeds: this.needs
    }
  },
  methods: {
    beforeSubmit() {
      const updatedPitch = {
        title: this.pTitle,
        content: this.pContent,
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
