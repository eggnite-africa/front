<template>
  <v-container>
    <h2 class="headline">Resources for makers</h2>
    <v-row>
      <v-col v-for="(r, i) in resources" :key="i" cols="12" sm="6">
        <v-card>
          <v-card-title v-text="r.title"></v-card-title>
          <v-card-subtitle v-text="r.subtitle"></v-card-subtitle>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, j) in r.content"
                :key="j"
                :href="item.link"
                link
                ripple
                target="_blank"
                three-line
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.subtext">
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { resources } from '@/static/resources'
export default {
  name: 'ResourcesPage',
  data() {
    return {
      selected: null,
      resources: {}
    }
  },
  created() {
    this.resources = resources
  },
  head() {
    return {
      title: '📚 Resources'
    }
  }
}
</script>
