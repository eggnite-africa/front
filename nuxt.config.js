import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | Eggnite',
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Eggnite enables African developers and entrepreneurs alike to share their products with the the community'
      },
      {
        hid: 'title',
        property: 'og:title',
        content: 'Eggnite'
      },
      {
        hid: 'url',
        property: 'og:url',
        content: 'https://eggnite.xyz'
      },
      {
        hid: 'image',
        property: 'og:image',
        content: 'https://eggnite.xyz/sm_card.png'
      },
      {
        hid: 'twitterImage',
        property: 'twitter:image',
        content: 'https://eggnite.xyz/sm_card.png'
      },
      {
        hid: 'type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'ogDescription',
        property: 'og:description',
        content:
          'Eggnite enables African developers and entrepreneurs alike to share their products with the the community'
      },
      {
        hid: 'twitterCard',
        property: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
    link: [{ rel: 'icon', href: '/Logo.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuelidate'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'nuxt-helmet',
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    '@nuxtjs/apollo',
    '@nuxtjs/date-fns',
    '@nuxtjs/sitemap'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HTTP_ENDPOINT
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [],
    extend(config, ctx) {}
  },
  auth: {
    redirect: {
      login: '/',
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: false
          },
          logout: { url: '/auth/logout', method: 'delete' },
          user: { url: '/auth/me', method: 'get', propertyName: false }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },
  env: {
    S3_BUCKET: process.env.S3_BUCKET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    API_URL: process.env.API_URL,
    HTTP_ENDPOINT: process.env.HTTP_ENDPOINT
  }
}
