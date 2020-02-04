<template>
  <div>
    <v-data-table :headers="headers" :items="feedback" class="elevation-1">
      <template #item.type="{ item }">
        <v-chip :color="getColor(item.type)" dark>{{ item.type }}</v-chip>
      </template>
      <template #item.content="{ item }">
        <div>
          {{
            item.content.length > 80 ? item.content.slice(0, 80) : item.content
          }}
        </div>
      </template>
      <template #item.action="{ item }">
        <v-icon @click="view(item)" small dense class="mr-2">
          mdi-eye
        </v-icon>
        <v-icon
          @click="confirmationDialog('DONE', item)"
          small
          dense
          class="mr-2"
        >
          mdi-check
        </v-icon>
        <v-icon @click="confirmationDialog('REJECTED', item)" small dense>
          mdi-close
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="read" max-width="500">
      <v-card :color="getColor(thisFeedback.type)" max-width="500">
        <v-card-title>
          {{ thisFeedback.type }}
          <div class="ml-auto overline">{{ thisFeedback.status }}</div>
        </v-card-title>
        <v-card-subtitle>date here</v-card-subtitle>
        <v-card-text>
          {{ thisFeedback.content }}
          <div v-show="thisFeedback.reason">
            <v-divider class="my-4"></v-divider>
            {{ thisFeedback.reason }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="action.display" max-width="500">
      <v-card max-height="500">
        <v-card-title>Confirmation</v-card-title>
        <v-card-text>Are you sure you want to do this?</v-card-text>
        <v-card-actions>
          <div class="ml-auto">
            <v-btn @click="cancelAction()" text color="green">No</v-btn>
            <v-btn @click.stop="confirmAction()" text color="red">Yes</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="action.refused" max-width="500" persistent>
      <v-card>
        <v-card-title>Refusal reason</v-card-title>
        <v-card-subtitle>Note: this is optional</v-card-subtitle>
        <v-card-text>
          <v-textarea v-model="action.reason" filled></v-textarea>
        </v-card-text>
        <v-card-actions>
          <div class="ml-auto">
            <v-btn @click="cancelAction()" text color="green">Cancel</v-btn>
            <v-btn @click.stop="confirmAction(true)" text color="red">
              Submit
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'AdminUserFeedback',
  data() {
    return {
      headers: [
        { text: 'Type', value: 'type' },
        { text: 'User ID', value: 'userId' },
        { text: 'Content', value: 'content', width: 200 },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      read: false,
      action: {
        refused: false,
        display: false,
        function: null,
        id: null,
        reason: null
      },
      thisFeedback: {
        content: '',
        type: '',
        status: '',
        reason: ''
      }
    }
  },
  asyncData() {
    return {
      feedback: [
        {
          id: '',
          type: '',
          userId: '',
          content: '',
          status: '',
          note: ''
        }
      ]
    }
  },
  apollo: {
    feedback: {
      query: gql`
        query fetchAllUsersFeedback {
          feedback: fetchAllFeedback {
            id
            type
            userId
            content
            status
            note
          }
        }
      `
    }
  },
  methods: {
    view({ type, content, status, note: reason }) {
      this.read = !this.read
      this.thisFeedback = {
        type,
        content,
        status,
        reason
      }
    },
    getColor(type) {
      if (type === 'BUG') {
        return 'red'
      } else if (type === 'FEATURE') {
        return 'blue'
      } else {
        return 'purple'
      }
    },
    confirmationDialog(functionName, { id }) {
      this.action.display = !this.action.display
      this.action.function = functionName
      this.action.id = id
    },
    async confirmAction(refused = false) {
      const { id, reason, function: status } = this.action
      if (status === 'DONE') {
        await this.markAsDone(id)
        this.cancelAction()
        const i = this.feedback.findIndex((f) => f.id === id)
        this.feedback[i].status = status
      } else {
        this.action.display = false
        this.action.refused = !this.action.refused
        if (refused) {
          await this.markAsRejected(id, reason)
          this.cancelAction()
          const i = this.feedback.findIndex((f) => f.id === id)
          this.feedback[i].status = status
        }
      }
    },
    cancelAction() {
      this.action.display = false
      this.action.function = null
      this.action.id = null
      this.action.refused = false
      this.action.reason = null
    },
    async markAsDone(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation markFeedbackAsDone($id: ID!) {
            markFeedbackAsDone(id: $id) {
              id
            }
          }
        `,
        variables: {
          id
        }
      })
    },
    async markAsRejected(id, reason) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation markFeedbackAsRefused($reason: String, $id: ID!) {
            markFeedbackAsRefused(reason: $reason, id: $id) {
              id
            }
          }
        `,
        variables: {
          reason,
          id
        }
      })
    }
  },
  middleware: ['auth', 'isAdmin']
}
</script>
