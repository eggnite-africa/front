<template>
  <div>
    <v-autocomplete
      v-model="selectedCompetition"
      v-if="!$apollo.loading"
      :items="competitionsList.competitions"
      @input="handleCompetition"
      label="Competition"
      outlined
      chips
      append-icon=""
      hide-no-data
      persistent-hint
      hint="Type in its name"
      height="25px"
      item-text="name"
      item-value="id"
      cache-items
    >
      <template #selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          @click="data.select"
          @click:close="handleCompetition()"
          close
        >
          <v-avatar left>
            <v-img :src="competitionLogo(data.item.id)"></v-img>
          </v-avatar>
          {{ data.item.name }}
        </v-chip>
      </template>

      <template #item="data">
        <v-list-item-avatar>
          <v-img :src="competitionLogo(data.item.id)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="data.item.name"></v-list-item-title>
          <v-list-item-subtitle>
            Organizers name ??
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ProductPostPageCompetitionsList',
  props: {
    initCompetition: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      selectedCompetition: this.initCompetition,
      competitionsList: {
        competitions: []
      }
    }
  },
  methods: {
    handleCompetition(v = null) {
      this.selectedCompetition = v
      this.$emit('update-competition', this.selectedCompetition)
    },
    competitionLogo(id) {
      const { competitions } = this.competitionsList
      const { logo } = competitions.find((c) => c.id === id)
      return logo
    }
  },
  apollo: {
    competitionsList: {
      query: gql`
        query fetchAllCompetitions($page: Int!, $pageSize: Int!) {
          competitionsList(page: $page, pageSize: $pageSize) {
            competitions {
              id
              name
              logo
            }
          }
        }
      `,
      variables: {
        page: 0,
        pageSize: 999
      }
    }
  }
}
</script>
