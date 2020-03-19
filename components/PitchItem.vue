<template>
  <v-card :to="`/i/${id}`" nuxt max-width="350" target="_blank">
    <v-list-item v-if="user">
      <v-tooltip top>
        <template #activator="{ on }">
          <v-list-item-avatar v-on="on" color="blue" size="42">
            <v-img :src="user.profile.picture"></v-img>
          </v-list-item-avatar>
        </template>
        <span>{{ user.username }}</span>
      </v-tooltip>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          #COVID19
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="white--text c-text">
      <span class="font-weight-medium text-uppercase">
        Problem
      </span>
      <p>
        {{ problem }}
      </p>

      <span class="font-weight-medium text-uppercase">
        Needs
      </span>
      <p>
        {{ needs }}
      </p>
    </v-card-text>

    <v-card-actions v-if="votesCount && commentsCount">
      <div class="ml-auto d-flex space-between">
        <div class="mr-3 d-flex align-center">
          <v-btn icon> <v-icon tag="span">👏🏻</v-icon> </v-btn>
          <span>{{ votesCount }}</span>
        </div>
        <div class="mr-2">
          <v-btn icon>
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          <span>{{ commentsCount }}</span>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PitchItem',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    user: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    problem: {
      type: String,
      required: true
    },
    needs: {
      type: String,
      required: true
    },
    votesCount: {
      type: Number,
      default: null
    },
    commentsCount: {
      type: Number,
      default: null
    }
  }
}
</script>
