<template>
  <div v-if="employee" class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <div>
      <!-- start breadcrumb -->
      <div>
        <nav class="sm:hidden">
          <nuxt-link
            :to="{ name: 'employees.index' }"
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
            Back
          </nuxt-link>
        </nav>
        <nav class="hidden sm:flex items-center text-sm leading-5 font-medium">
          <nuxt-link
            :to="{ name: 'employees.index' }"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out"
            >Employees
          </nuxt-link>
          <svg
            class="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out"
            >{{ employee.first_name }} {{ employee.last_name }}</a
          >
        </nav>
      </div>
      <!-- stop breadcrumb -->
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
          >
            {{ employee.first_name }} {{ employee.last_name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'default',
  computed: {
    ...mapGetters({
      employee: 'employees/employee'
    })
  },
  async created() {
    await this.fetchEmployee({ id: this.$route.params.id })
  },
  methods: {
    ...mapActions({
      fetchEmployee: 'employees/fetchEmployee'
    })
  }
}
</script>
