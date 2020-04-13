import { join } from 'path'
import { copySync, removeSync } from 'fs-extra'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.APP_NAME,
    titleTemplate: '%s - ' + process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  env: {
    apiUrl: 'http://tenant1.hris-saas.local/api',
    appName: 'Laravel Nuxt',
    appLocale: 'en'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#007bff' },

  router: {
    middleware: ['locale', 'check-auth']
  },

  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~components/global',
    '~plugins/axios',
    '~plugins/i18n',
    '~plugins/vform',
    '~plugins/nuxt-client-init'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/router',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  auth: {
    // Options
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  hooks: {
    generate: {
      done(generator) {
        // Copy dist files to public/_nuxt
        if (
          generator.nuxt.options.dev === false &&
          generator.nuxt.options.mode === 'spa'
        ) {
          const publicDir = join(
            generator.nuxt.options.rootDir,
            '../',
            'app',
            'public',
            '_nuxt'
          )
          removeSync(publicDir)

          copySync(
            join(generator.nuxt.options.generate.dir, '_nuxt'),
            publicDir
          )

          copySync(
            join(generator.nuxt.options.generate.dir, '200.html'),
            join(publicDir, 'index.html')
          )

          copySync(
            join(generator.nuxt.options.rootDir, 'static', 'img'),
            join(publicDir, '../', 'img')
          )

          removeSync(generator.nuxt.options.generate.dir)
        }
      }
    }
  }
}
