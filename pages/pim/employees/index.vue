<template>
  <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <div>
      <!-- start breadcrumb -->
      <div>
        <nav class="sm:hidden">
          <nuxt-link
            :to="{ name: 'dashboard.index' }"
            class="flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out"
          >
            <svg
              class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            {{ $t('dashboard') }}
          </nuxt-link>
        </nav>
        <nav class="hidden sm:flex items-center text-sm leading-5 font-medium">
          <nuxt-link
            :to="{ name: 'employees.index' }"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out"
            >{{ $t('employees') }}
          </nuxt-link>
        </nav>
      </div>
      <!-- stop breadcrumb -->
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
          >
            {{ $t('employees') }}
          </h2>
        </div>
      </div>
    </div>
    <div class="py-4">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul>
          <li v-for="(employee, key) in employees" :key="key">
            <nuxt-link
              :to="{ name: 'employees.show', params: { id: employee.id } }"
              class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div class="flex items-center px-4 py-4 sm:px-6">
                <div class="min-w-0 flex-1 flex items-center">
                  <div class="flex-shrink-0">
                    <img
                      class="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt
                    />
                  </div>
                  <div
                    class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4"
                  >
                    <div>
                      <div
                        class="text-sm leading-5 font-medium text-indigo-600 truncate"
                      >
                        {{ employee.first_name }} {{ employee.last_name }}
                      </div>
                      <div
                        class="mt-2 flex items-center text-sm leading-5 text-gray-500"
                      >
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="truncate">
                          {{ employee.work_email }}
                        </span>
                      </div>
                    </div>
                    <div class="hidden md:block">
                      <div>
                        <div class="text-sm leading-5 text-gray-900">
                          Hired on
                          <time datetime="2020-01-07">
                            {{ employee.started_at }}
                          </time>
                        </div>
                        <div
                          class="mt-2 flex items-center text-sm leading-5 text-gray-500"
                        >
                          {{ employee.department }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>
        <Pagination :meta="meta" @paginate="paginate" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'default',
  data: () => ({
    overlay: false
  }),
  computed: {
    ...mapGetters({
      employees: 'employees/employees',
      meta: 'employees/meta'
    })
  },
  async created() {
    await this.fetchEmployees({ page: this.$route.query.page })
  },
  methods: {
    ...mapActions({
      fetchEmployees: 'employees/fetchEmployees'
    }),
    paginate(page) {
      this.fetchEmployees({ page })
      this.overlay = true
    }
  },
  head() {
    return { title: this.$t('employees') }
  }
}
</script>
