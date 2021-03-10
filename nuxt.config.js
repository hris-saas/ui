import { join } from 'path'
import { copySync, removeSync } from 'fs-extra'
import * as dotenv from 'dotenv'

dotenv.config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'HRis SaaS',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    apiUrl: 'https://tenant1.hris-saas.local/api',
    appName: 'HRis Saas UI',
    appLocale: 'en'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/i18n',
    '~plugins/axios',
    '~plugins/vform'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/router', '@nuxtjs/dotenv'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://tenant1.hris-saas.local',
    credentials: true
  },

  build: {},

  router: {
    middleware: ['locale']
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://tenant1.hris-saas.local',
        endpoints: {
          login: {
            url: '/api/login'
          },
          logout: {
            url: '/api/logout'
          }
        },
        user: {
          property: false
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/dashboard'
    }
  },
  hooks: {
    generate: {
      done (generator) {
        // Copy dist files to public/_nuxt
        if (
          generator.nuxt.options.dev === false &&
          generator.nuxt.options.mode === 'spa'
        ) {
          const publicDir = join(generator.nuxt.options.rootDir, 'build')

          removeSync(publicDir)

          copySync(
            join(generator.nuxt.options.generate.dir, '_nuxt'),
            join(publicDir, '_nuxt')
          )

          copySync(
            join(generator.nuxt.options.generate.dir, '200.html'),
            join(publicDir, 'index.html')
          )

          copySync(join(generator.nuxt.options.rootDir, 'static'), publicDir)

          removeSync(generator.nuxt.options.generate.dir)
        }
      }
    }
  }
}
