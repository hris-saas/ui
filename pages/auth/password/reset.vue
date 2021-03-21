<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <nuxt-link
        :to="{ name: 'index' }"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </nuxt-link>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ $t('reset_password') }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ $t('reset_password_description') }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          @submit.prevent="reset"
          @keydown="form.onKeydown($event)"
        >
          <ui-input
            name="email"
            type="email"
            :error="form.errors.get('email')"
            :has-error="form.errors.has('email')"
            :custom-error="form.errors.get('password')"
            :has-custom-error="form.errors.get('password')"
            :disabled="true"
            :value="form.email"
            :status="status"
            @update:modelValue="form.email = $event"
          >
            {{ $t('email_address') }}
          </ui-input>

          <ui-input
            name="password"
            type="password"
            autocomplete="current-password"
            :has-error="form.errors.has('password')"
            :value="form.password"
            @update:modelValue="form.password = $event"
          >
            {{ $t('password') }}
          </ui-input>

          <ui-input
            name="password_confirmation"
            type="password"
            :has-error="form.errors.has('password')"
            :value="form.password_confirmation"
            @update:modelValue="form.password_confirmation = $event"
          >
            {{ $t('password_confirmation') }}
          </ui-input>

          <div>
            <ui-button :loading="form.busy">
              {{ $t('reset_password') }}
            </ui-button>
          </div>
        </form>
      </div>
      <ui-language-dropdown :show-label="true" />
    </div>
  </div>
</template>

<script>
import Form from 'vform'

export default {
  layout: 'auth',
  data: () => ({
    status: '',
    error: '',
    form: new Form({
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
    }),
  }),
  head() {
    return { title: this.$t('reset_password') }
  },

  created() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    async reset() {
      let data

      try {
        const response = await this.form.post('/password/reset')
        data = response.data
      } catch (e) {
        return
      }

      this.status = data.status

      this.form.reset()
    },
  },
}
</script>
