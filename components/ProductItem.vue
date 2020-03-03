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
          <product-item-action-buttons-settings
            v-if="isInSettings"
            :product-edit-link="productEditLink"
            :product-id="id"
          >
          </product-item-action-buttons-settings>
          <product-item-action-buttons
            v-else
            :product-id="id"
            :comments-count="commentsLength"
            :votes-count="votes.length"
            :comments-section="commentsSection"
            :has-voted="hasVoted"
          ></product-item-action-buttons>
        </v-list-item-action>
      </v-list-item-content>
      <v-list-item-action class="hidden-xs-only">
        <product-item-action-buttons-settings
          v-if="isInSettings"
          :product-edit-link="productEditLink"
          :product-id="id"
        >
        </product-item-action-buttons-settings>
        <product-item-action-buttons
          v-else
          :product-id="id"
          :comments-count="commentsLength"
          :votes-count="votes.length"
          :comments-section="commentsSection"
          :has-voted="hasVoted"
        ></product-item-action-buttons>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import { slugify } from '@/static/utils/slugify'
import ProductMakerAvatar from '@/components/ProductItemMakerAvatar.vue'
import ProductItemActionButtons from '@/components/ProductItemActionButtons.vue'
import ProductItemActionButtonsSettings from '@/components/ProductItemActionButtonsSettings.vue'
export default {
  name: 'ProductItem',
  components: {
    ProductMakerAvatar,
    ProductItemActionButtons,
    ProductItemActionButtonsSettings
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
      default: null
    },
    makers: {
      type: Array,
      default: () => []
    },
    logo: {
      type: String,
      required: true
    },
    votes: {
      type: Array,
      default: () => []
    },
    comments: {
      type: Array,
      default: () => []
    },
    isInSettings: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    productLink() {
      const productUrl = slugify(this.name)
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
    makerAvatar(index) {
      const maker = this.makers[index]
      return maker.profile.picture
    }
  }
}
</script>
