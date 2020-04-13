<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="/img/logos/workflow-mark-on-white.svg"
        alt="Workflow"
      />
      <h2
        class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="login" @keydown="form.onKeydown($event)">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              {{ $t('email_address') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                required
                class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none  transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                :class="{
                  'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': form.errors.has(
                    'email'
                  ),
                  'border-gray-300 placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300': !form.errors.has(
                    'email'
                  )
                }"
              />
              <div
                v-if="form.errors.has('email')"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p
              v-if="form.errors.has('email')"
              class="mt-2 text-sm text-red-600"
            >
              {{ form.errors.get('email') }}
            </p>
          </div>

          <div class="mt-6">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                required
                class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                :class="{
                  'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': form.errors.has(
                    'email'
                  ),
                  'border-gray-300 placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300': !form.errors.has(
                    'email'
                  )
                }"
              />
              <div
                v-if="form.errors.has('email')"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <label
                for="remember_me"
                class="ml-2 block text-sm leading-5 text-gray-900"
              >
                {{ $t('remember_me') }}
              </label>
            </div>

            <div class="text-sm leading-5">
              <nuxt-link
                :to="{ name: 'password.request' }"
                class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                {{ $t('forgot_password') }}
              </nuxt-link>
            </div>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <v-button
                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                :loading="form.busy"
              >
                {{ $t('sign_in') }}
              </v-button>
            </span>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm leading-5">
              <span class="px-2 bg-white text-gray-500"
                >Don't have an account?</span
              >
            </div>
          </div>

          <div class="mt-6">
            <div>
              <span class="w-full inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                >
                  Register an account
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from 'vform'

export default {
  middleware: 'guest',
  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    remember: false
  }),

  methods: {
    async login() {
      let data

      // Submit the form.
      try {
        const response = await this.form.post('/login')
        data = response.data
      } catch (e) {
        return
      }

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Redirect home.
      this.$router.push({ name: 'dashboard' })
    }
  },

  head() {
    return { title: this.$t('login') }
  }
}
</script>
