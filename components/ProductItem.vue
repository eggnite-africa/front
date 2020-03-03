<template>
  <v-card :to="productLink" nuxt link flat>
    <v-list-item dense class="py-1" two-line>
      <v-list-item-avatar size="72" left>
        <v-img :src="logo" eager></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="name" class="title"></v-list-item-title>
        <v-list-item-subtitle v-text="tagline"></v-list-item-subtitle>
        <v-list-item-content>
          <div>
            <product-maker-avatar
              v-for="(maker, i) in makers"
              :key="i"
              :maker-username="maker.username"
              :maker-name="maker.profile.fullName"
              :maker-picture="makerAvatar(i)"
            ></product-maker-avatar>
          </div>
        </v-list-item-content>
        <v-list-item-action class="hidden-sm-and-up justify-center">
          <product-item-action-buttons
            :product-id="id"
            :comments-count="commentsLength"
            :votes-count="votes.length"
            :comments-section="commentsSection"
            :has-voted="hasVoted"
          ></product-item-action-buttons>
        </v-list-item-action>
      </v-list-item-content>
      <v-list-item-action class="hidden-xs-only">
        <product-item-action-buttons
          :product-id="id"
          :comments-count="commentsLength"
          :votes-count="votes.length"
          :comments-section="commentsSection"
          :has-voted="hasVoted"
        ></product-item-action-buttons>
      </v-list-item-action>
    </v-list-item>

    <!-- <v-col cols="5" sm="2" class="hidden-xs-only">
        <v-card-actions>
          <v-row dense>
            <v-col cols="12">
              <template v-if="!isInSettings">
                <v-btn
                  @click.prevent="upvote()"
                  :outlined="!hasVoted"
                  color="orange"
                  block
                  height="50"
                >
                  <div class="flex-md-column">
                    <v-icon>mdi-arrow-up-thick</v-icon>
                    <div v-text="votes.length"></div>
                  </div>
                </v-btn>
              </template>
              <template v-else>
                <v-btn
                  :to="productEditLink"
                  color="indigo"
                  block
                  depressed
                  nuxt
                >
                  Edit
                </v-btn>
              </template>
            </v-col>
            <v-col cols="12">
              <template v-if="!isInSettings">
                <v-btn :to="commentsSection" nuxt outlined block>
                  <v-icon left>mdi-comment</v-icon>
                  <span v-text="commentsLength"></span>
                </v-btn>
              </template>
              <template v-else>
                <v-btn @click.stop="dialog = true" color="red" depressed block>
                  Delete
                </v-btn>
                <v-dialog v-model="dialog" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline"
                      >Delete {{ name }}</v-card-title
                    >

                    <v-card-text>
                      Are you sure you want to do this?
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn @click="dialog = false" text>
                        No
                      </v-btn>

                      <v-btn
                        @click.stop="deleteProduct(id)"
                        color="red darken-1"
                        text
                      >
                        Yes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-col> -->
  </v-card>
</template>

<script>
import ProductMakerAvatar from '@/components/ProductItemMakerAvatar.vue'
import ProductItemActionButtons from '@/components/ProductItemActionButtons.vue'
export default {
  name: 'ProductItem',
  components: {
    ProductMakerAvatar,
    ProductItemActionButtons
  },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    tagline: {
      type: String,
      required: true
    },
    makers: {
      type: Array,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    votes: {
      type: Array,
      required: true
    },
    comments: {
      type: Array,
      required: true
    },
    isInSettings: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    productLink() {
      const productUrl = this.name.replace(/ /gi, '-')
      return `/p/${productUrl}`
    },
    hasVoted() {
      if (!this.$auth.loggedIn) return false
      const votersIds = this.votes.map((v) => +v.userId)
      const userId = this.$auth.user.id
      return votersIds.includes(userId)
    },
    commentsSection() {
      return `${this.productLink}#comments`
    },
    productEditLink() {
      return this.productLink + '/edit'
    },
    commentsLength() {
      let total = 0
      const comments = this.comments
      total += comments.length
      comments.forEach((c) => (total += c.replies.length))
      return total
    }
  },
  methods: {
    // async deleteProduct(id) {
    //   await this.$apollo
    //     .mutate({
    //       mutation: gql`
    //         mutation deleteProduct($id: ID!) {
    //           deleteProduct(id: $id)
    //         }
    //       `,
    //       variables: {
    //         id
    //       }
    //     })
    //     .then(() => {
    //       this.dialog = false
    //       this.$router.go(0)
    //     })
    // },
    makerAvatar(index) {
      const maker = this.makers[index]
      return maker.profile.picture
    }
  }
}
</script>
