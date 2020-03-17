<template>
  <v-app dark>
    <v-app-bar app>
      <nuxt-link to="/" class="homepage-link">
        <v-img
          class="mr-1 mr-sm-2"
          src="/Logo.png"
          contain
          max-width="42"
        ></v-img>
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <Search />
      <div class="hidden-xs-only">
        <v-badge color="red" dot overlap bordered>
          <nuxt-link
            v-for="item in items"
            :to="item.link"
            :key="item.name"
            class="menu-link overline"
          >
            {{ item.name }}
          </nuxt-link>
        </v-badge>
        <v-badge content="UPCOMING" overlap offset-y="4" offset-x="70">
          <nuxt-link to="competitions" class="menu-link overline">
            Competitions
          </nuxt-link>
        </v-badge>
        <v-badge content="SOON" color="red" overlap offset-y="5" offset-x="15">
          <span class="menu-link overline">
            Pitch
          </span>
        </v-badge>
      </div>
      <v-spacer />
      <Menu />
    </v-app-bar>

    <v-content>
      <AnnoucementBanner :content="alert.content" :link="alert.link" />
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <client-only>
      <Feedback v-if="displayFeedback" />
    </client-only>
    <v-footer absolute app>
      <v-row dense align="center">
        <v-col>
          <span>&copy; {{ $dateFns.getYear(new Date()) }}</span>
        </v-col>
        <v-col class="d-flex justify-center justify-sm-end text-center">
          <span class="overline">
            Made with
            <v-icon x-small color="red">mdi-heart</v-icon> in Tunisia
          </span>
        </v-col>
        <v-col v-if="$device.isMobile" class="d-flex justify-end align-center">
          <v-menu offset-y>
            <template #activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon>mdi-dots-horizontal-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in items"
                :key="item.name"
                :to="item.link"
              >
                <v-list-item-title class="overline">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item>
              <v-badge color="red" dot overlap offset-x="15" offset-y="15">
                <v-list-item>
                  <v-list-item-title class="overline">
                    Pitch
                  </v-list-item-title>
                </v-list-item>
              </v-badge>
              <v-badge color="yellow" dot overlap offset-x="15" offset-y="15">
                <v-list-item to="competitions">
                  <v-list-item-title class="overline">
                    Competitions
                  </v-list-item-title>
                </v-list-item>
              </v-badge>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Search from '@/components/MenuSearch.vue'
import Feedback from '@/components/Feedback.vue'
import AnnoucementBanner from '@/components/AnnouncementBanner.vue'

export default {
  components: {
    Menu,
    Search,
    Feedback,
    AnnoucementBanner
  },
  data() {
    return {
      alert: {
        content:
          'Currently working on a PITCH feature to let share your ideas, get feedback and (maybe) find collaborators; #COVID19',
        link: null
      },
      title: 'Eggnite',
      items: [
        {
          name: 'About',
          link: '/about'
        },
        {
          name: 'For makers',
          link: '/resources'
        }
        // {
        //   name: 'Guidelines',
        //   link: '/guidelines'
        // }
      ],
      socialLinks: [
        // {
        //   name: 'facebook',
        //   icon: 'mdi-facebook-box',
        //   link: 'https://fb.com/eggniteco'
        // },
        {
          name: 'slack',
          icon: 'mdi-slack',
          link:
            'https://join.slack.com/t/eggnite/shared_invite/enQtOTcxNzU5MTkyODg0LTM4YzdmMjYxZjM4N2VhMjgwNTIzOWRlNzVkZWEzNWQ4MWI3NjJiNjZlYWE5NjgyYzExNmNjNmU4NWFlNGVhOTI'
        }
      ]
    }
  },
  computed: {
    displayFeedback() {
      return this.$auth.loggedIn && this.$auth.user.type !== 'ADMIN'
    }
  }
}
</script>

<style lang="scss" scoped>
.homepage-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: unset;
}
.menu-link {
  text-decoration: none;
  color: #e0e0e0;
  &:first-child {
    margin-left: 0.5rem;
  }
  margin-right: 0.5rem;
  &:hover {
    color: #fff;
  }
}
</style>
