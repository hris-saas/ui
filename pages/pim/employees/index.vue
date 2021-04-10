<template>
  <div
    class="flex-1 relative z-0 overflow-y-auto py-6 px-6 focus:outline-none bg-gray-100"
  >
    <ul
      v-if="viewType === 'grid'"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <li
        v-for="(employee, key) in employees"
        :key="key"
        class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <nuxt-link
          :to="{ name: 'employees.show', params: { uuid: employee.uuid } }"
        >
          <div class="flex-1 flex flex-col p-8">
            <img
              class="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
              :src="
                'https://randomuser.me/api/portraits/' +
                (employee.gender === 'm' ? 'men' : 'women') +
                ('/' + employee.id + '.jpg')
              "
              alt=""
            />
            <h3 class="mt-6 text-gray-900 text-sm font-medium">
              {{ employee.first_name }} {{ employee.last_name }}
            </h3>
            <dl class="mt-1 flex-grow flex flex-col justify-between">
              <dt class="sr-only">Title</dt>
              <dd v-if="employee.job" class="text-gray-500 text-sm">
                {{ employee.job.job_title }}
              </dd>
              <dt class="sr-only">Role</dt>
              <dd class="mt-3">
                <span
                  class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                  >Admin</span
                >
              </dd>
            </dl>
          </div>
        </nuxt-link>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="w-0 flex-1 flex">
              <a
                href="mailto:janecooper@example.com"
                class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
              >
                <!-- Heroicon name: solid/mail -->
                <svg
                  class="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
                <span class="ml-3">Email</span>
              </a>
            </div>
            <div class="-ml-px w-0 flex-1 flex">
              <a
                href="tel:+1-202-555-0170"
                class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <!-- Heroicon name: solid/phone -->
                <svg
                  class="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  />
                </svg>
                <span class="ml-3">Call</span>
              </a>
            </div>
          </div>
        </div>
      </li>
      <!-- More items... -->
    </ul>
    <div
      v-if="viewType === 'table' && meta && meta.total > 0"
      class="flex flex-col"
    >
      <div class="-my-2 overflow-auto sm:-mx-6 lg:-mx-6">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-6">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div class="flex space-x-1 items-center">
                      <span>Name</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(employee, key) in employees"
                  :key="key"
                  class="hover:bg-gray-50 cursor-pointer"
                  @click.prevent="select(employee)"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          :src="
                            'https://randomuser.me/api/portraits/' +
                            (employee.gender === 'm' ? 'men' : 'women') +
                            ('/' + employee.id + '.jpg')
                          "
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ employee.first_name }} {{ employee.last_name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ employee.work_email }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      Regional Paradigm Technician
                    </div>
                    <div class="text-sm text-gray-500">Optimization</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      Active
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Admin
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 py-3 flex items-center justify-between">
      <div v-if="meta" class="flex-1 flex justify-between sm:hidden">
        <a
          :disabled="meta.current_page - 1 <= 0"
          href="#"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white"
          :class="{
            'hover:text-gray-500': meta.current_page - 1 >= 1,
            'cursor-not-allowed': meta.current_page - 1 <= 0,
          }"
          @click.prevent="navigateTo(meta.current_page - 1)"
        >
          Previous
        </a>
        <a
          :disabled="meta.current_page + 1 > meta.last_page"
          href="#"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white"
          :class="{
            'hover:text-gray-500': meta.current_page + 1 <= meta.last_page,
            'cursor-not-allowed': meta.current_page + 1 > meta.last_page,
          }"
          @click.prevent="navigateTo(meta.current_page + 1)"
        >
          Next
        </a>
      </div>
      <div
        v-if="meta && meta.total > 0"
        class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
      >
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ meta.from }}</span>
            to
            <span class="font-medium">{{ meta.to }}</span>
            of
            <span class="font-medium">{{ meta.total }}</span>
            results
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px bg-gray-100"
            aria-label="Pagination"
          >
            <a
              :disabled="meta.current_page - 1 <= 0"
              href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500"
              :class="{
                'hover:bg-gray-50': meta.current_page - 1 >= 1,
                'cursor-not-allowed': meta.current_page - 1 <= 0,
              }"
              @click.prevent="navigateTo(meta.current_page - 1)"
            >
              <span class="sr-only">Previous</span>
              <!-- Heroicon name: solid/chevron-left -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <p
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            >
              {{ meta.current_page }}
            </p>
            <a
              :disabled="meta.current_page + 1 > meta.last_page"
              href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500"
              :class="{
                'hover:bg-gray-50': meta.current_page + 1 <= meta.last_page,
                'cursor-not-allowed': meta.current_page + 1 > meta.last_page,
              }"
              @click.prevent="navigateTo(meta.current_page + 1)"
            >
              <span class="sr-only">Next</span>
              <!-- Heroicon name: solid/chevron-right -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'default',
  middleware: 'verified',
  data: () => ({
    page: 1,
  }),
  head() {
    return { title: this.$t('employees') }
  },
  computed: {
    ...mapGetters({
      employees: 'employees/employees',
      lang: 'lang/locale',
      meta: 'employees/meta',
      viewType: 'employees/viewType',
    }),
  },
  async created() {
    await this.fetchEmployees({ page: this.page })

    this.$emit('setParamName', '')
  },
  methods: {
    ...mapActions({
      fetchEmployee: 'employees/fetchEmployee',
      fetchEmployees: 'employees/fetchEmployees',
    }),

    select(employee) {
      this.$router.push({
        name: 'employees.show',
        params: { uuid: employee.uuid },
      })
    },

    async navigateTo(page) {
      if (page > this.meta.last_page || page < 1) {
        return
      }

      await this.fetchEmployees({ page })
    },

    scrollTo(element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    },

    removeFocus() {
      if (this.$refs.reportsTo) {
        this.$refs.reportsTo.blur()
      }

      if (this.$refs.directReports) {
        for (let i = 0; i < this.$refs.directReports.length; i++) {
          this.$refs.directReports[i].blur()
        }
      }
    },
  },
}
</script>
