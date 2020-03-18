<template>
  <aside class="mx-auto d-flex justify-center mx-sm-0 mx-md-12 d-sm-block">
    <v-btn
      @click="handleClapping(pitchId)"
      :outlined="!hasClaps"
      fab
      large
      color="secondary"
      class="my-3 mx-auto mx-sm-0"
    >
      <div class="d-flex flex-column my-2">
        <v-icon tag="span">👏🏻</v-icon>
        <span v-if="pTotalClaps" class="mt-1">
          {{ pTotalClaps }}
        </span>
      </div>
    </v-btn>
    <!-- <v-btn fab large color="primary" class="my-3 mx-auto mx-sm-0">
      <div class="d-flex flex-column my-2">
        <v-icon class="mx-auto" x-large>mdi-facebook</v-icon>
      </div>
    </v-btn>
    <v-btn fab large color="blue" class="my-3 mx-auto mx-sm-0">
      <div class="d-flex flex-column my-2">
        <v-icon class="mx-auto" x-large>mdi-twitter</v-icon>
      </div>
    </v-btn> -->
  </aside>
</template>

<script>
import gql from 'graphql-tag'
import { mapMutations } from 'vuex'
export default {
  name: 'PitchPageActionButtons',
  props: {
    totalClaps: {
      type: Number,
      required: true
    },
    pitchId: {
      type: [Number, String],
      required: true
    },
    hasClapped: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      pTotalClaps: this.totalClaps,
      hasClaps: this.hasClapped
    }
  },
  methods: {
    ...mapMutations({
      openLoginDialog: 'utils/openLoginDialog'
    }),
    async handleClapping(pitchId) {
      if (!this.$auth.loggedIn) {
        this.openLoginDialog()
        return
      }
      if (!this.hasClaps) await this.addClap(pitchId)
      else await this.deleteClap(pitchId)
      this.hasClaps = !this.hasClaps
    },
    async addClap(pitchId) {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation addClap($voteInput: VoteInput!) {
              addClap(voteInput: $voteInput) {
                id
                userId
              }
            }
          `,
          variables: {
            voteInput: {
              pitchId
            }
          }
        })
        this.pTotalClaps++
      } catch (e) {}
    },
    async deleteClap(pitchId) {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation deleteClap($voteInput: VoteInput!) {
              deleteClap(voteInput: $voteInput)
            }
          `,
          variables: {
            voteInput: {
              pitchId
            }
          }
        })
        this.pTotalClaps--
      } catch (e) {}
    }
  }
}
</script>
