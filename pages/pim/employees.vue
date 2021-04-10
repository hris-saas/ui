<template>
  <ui-main>
    <main class="h-screen flex overflow-hidden focus:outline-none bg-white">
      <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
        <breadcrumb :param-name="paramName" />
        <div
          class="px-6 pt-6 pb-4 border-b border-gray-200 flex items-center justify-between"
        >
          <h2 class="text-xl pb-2.5 leading-6 font-bold text-gray-900">
            {{
              paramName
                ? paramName
                : $t('route_' + $nuxt.$route.name.replace(/\./g, '_'))
            }}
          </h2>
          <div class="sm:mt-0 sm:ml-4 mr-3 z-10">
            <div>
              <div v-if="$nuxt.$route.name === 'employees.index'">
                <ui-control-employees-index />
              </div>
              <div v-if="$nuxt.$route.name === 'employees.show'">
                <ui-control-employees-show />
              </div>
              <div
                v-if="$nuxt.$route.name === 'employees.create'"
                class="flex justify-end"
              >
                <nuxt-link
                  :to="{ name: 'employees.index' }"
                  type="button"
                  class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {{ $t('cancel') }}
                </nuxt-link>
                <button
                  type="button"
                  class="ml-3 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          @setParamName="setParamName"
          @resetSubmitProp="resetSubmitProp"
        />
      </div>
    </main>
  </ui-main>
</template>
<script>
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside,
  },
  layout: 'default',
  middleware: 'verified',
  data: () => ({
    submit: false,
    open: false,
    paramName: '',
  }),
  methods: {
    submitForm() {
      this.submit = true
    },

    resetSubmitProp() {
      this.submit = false
    },

    setParamName(employee) {
      if (employee) {
        this.paramName = employee.first_name + ' ' + employee.last_name
      } else {
        this.paramName = null
      }
    },

    hideMenu() {
      this.open = false
    },
  },
}
</script>
