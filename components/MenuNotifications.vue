<template>
  <v-menu offset-y bottom>
    <template #activator="{ on }">
      <v-btn v-on="on" icon>
        <v-badge overlap class="ml-1 mr-2">
          <template v-slot:badge>0</template>
          <v-icon color="red">mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list flat>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-thumb-up</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <strong>John Doe</strong> has upvoted your product!
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-comment</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <strong>John Doe</strong> commented on your product!
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-comment-multiple</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <strong>John Doe</strong> replied to you!
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'MenuNotifications'
}
</script>
