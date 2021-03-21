export default function ({ store, $axios, redirect }) {
  $axios.onRequest((config) => {
    const token = store.getters['auth/token']

    if (token) {
      $axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    const locale = store.getters['lang/locale']

    if (locale) {
      $axios.defaults.headers.common['Accept-Language'] = locale
    }
  })
}
