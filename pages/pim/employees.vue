<template>
  <main class="h-screen flex overflow-hidden focus:outline-none bg-white">
    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <breadcrumb />
      <div
        class="px-6 pt-6 pb-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between"
      >
        <h2 class="text-xl pb-1.5 leading-6 font-bold text-gray-900">
          {{ $t('route_' + $nuxt.$route.name.replace(/\./g, '_')) }}
        </h2>
        <div class="mt-3 sm:mt-0 sm:ml-4">
          <div>
            <nuxt-link
              v-if="$nuxt.$route.name !== 'employees.create'"
              :to="{ name: 'employees.create' }"
              type="button"
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ $t('add_new_employee') }}
            </nuxt-link>
            <div
              v-if="$nuxt.$route.name === 'employees.create'"
              class="flex justify-end"
            >
              <nuxt-link
                :to="{ name: 'employees.index' }"
                type="button"
                class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {{ $t('cancel') }}
              </nuxt-link>
              <button
                type="button"
                class="ml-3 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click.prevent="submitForm"
              >
                {{ $t('add') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <nuxt-child
        :submit-form-from-prop="submit"
        @resetSubmitProp="resetSubmitProp"
      />
    </div>
  </main>
</template>
<script>
export default {
  layout: 'default',
  middleware: 'auth',
  data: () => ({
    submit: false,
  }),
  methods: {
    submitForm() {
      this.submit = true
    },
    resetSubmitProp() {
      this.submit = false
    },
  },
}
</script>
