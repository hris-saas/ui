// import axios from 'axios'
// import swal from 'sweetalert2'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default ({ app, store, redirect }) => {
  // const APP_DOMAIN = location.hostname
  // const APP_PROTOCOL = location.protocol

  // app.$axios.defaults.baseURL = 'http://' + location.hostname + ':3000'
  app.$axios.defaults.withCredentials = true

  // if (process.server) {
  //   return
  // }

  // Request interceptor
  app.$axios.interceptors.request.use((request) => {
    // request.baseURL = APP_PROTOCOL + '//' + APP_DOMAIN + '/api'

    // if (APP_DOMAIN === 'local') {
    request.baseURL = 'http://tenant1.hris-saas.local/api'
    // }

    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }

    return request
  })

  // Response interceptor
  // app.$axios.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     const { status } = error.response || {}
  //
  //     if (status >= 500) {
  //       swal({
  //         type: 'error',
  //         title: app.i18n.t('error_alert_title'),
  //         text: app.i18n.t('error_alert_text'),
  //         reverseButtons: true,
  //         confirmButtonText: app.i18n.t('ok'),
  //         cancelButtonText: app.i18n.t('cancel')
  //       })
  //     }
  //
  //     if (status === 401 && store.getters['auth/check']) {
  //       swal({
  //         type: 'warning',
  //         title: app.i18n.t('token_expired_alert_title'),
  //         text: app.i18n.t('token_expired_alert_text'),
  //         reverseButtons: true,
  //         confirmButtonText: app.i18n.t('ok'),
  //         cancelButtonText: app.i18n.t('cancel')
  //       }).then(() => {
  //         store.commit('auth/LOGOUT')
  //
  //         redirect({ name: 'login' })
  //       })
  //     }
  //
  //     return Promise.reject(error)
  //   }
  // )
}
