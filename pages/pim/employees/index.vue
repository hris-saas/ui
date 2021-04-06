<template>
  <div class="flex-1 relative z-0 flex overflow-hidden">
    <main
      class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
      tabindex="0"
    >
      <article v-if="selectedEmployee" ref="selectedEmployee">
        <!-- Profile header -->
        <div>
          <div>
            <img
              class="h-32 w-full object-cover lg:h-48"
              src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
              alt=""
            />
          </div>
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div class="flex">
                <img
                  class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  :src="
                    'https://randomuser.me/api/portraits/' +
                    (selectedEmployee.gender === 'm' ? 'men' : 'women') +
                    ('/' + selectedEmployee.id + '.jpg')
                  "
                  alt=""
                />
              </div>
              <div
                class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
              >
                <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                  <h1 class="text-2xl font-bold text-gray-900 truncate">
                    {{ selectedEmployee.first_name }}
                    {{ selectedEmployee.last_name }}
                  </h1>
                </div>
                <div
                  class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="paginate(2)"
                  >
                    <!-- Heroicon name: solid/mail -->
                    <svg
                      class="-ml-1 mr-2 h-5 w-5 text-gray-400"
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
                    <span>Message</span>
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <!-- Heroicon name: solid/phone -->
                    <svg
                      class="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                      />
                    </svg>
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
              <h1 class="text-2xl font-bold text-gray-900 truncate">
                {{ selectedEmployee.first_name }}
                {{ selectedEmployee.last_name }}
              </h1>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="mt-6 sm:mt-2 2xl:mt-5">
          <div class="border-b border-gray-200">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
                <a
                  href="#"
                  class="border-indigo-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  aria-current="page"
                >
                  Profile
                </a>
                <a
                  href="#"
                  class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Calendar
                </a>
                <a
                  href="#"
                  class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Recognition
                </a>
              </nav>
            </div>
          </div>
        </div>

        <!-- Description list -->
        <div class="mt-6 mb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Phone</dt>
              <dd class="mt-1 text-sm text-gray-900">(555) 123-4567</dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-gray-900">
                ricardocooper@example.com
              </dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Title</dt>
              <dd class="mt-1 text-sm text-gray-900">
                Senior Front-End Developer
              </dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Team</dt>
              <dd class="mt-1 text-sm text-gray-900">Product Development</dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Location</dt>
              <dd class="mt-1 text-sm text-gray-900">San Francisco</dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Sits</dt>
              <dd class="mt-1 text-sm text-gray-900">Oasis, 4th floor</dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Salary</dt>
              <dd class="mt-1 text-sm text-gray-900">$145,000</dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Birthday</dt>
              <dd class="mt-1 text-sm text-gray-900">June 8, 1990</dd>
            </div>

            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">About</dt>
              <dd class="mt-1 max-w-prose text-sm text-gray-900">
                <p>
                  Tincidunt quam neque in cursus viverra orci, dapibus nec
                  tristique. Nullam ut sit dolor consectetur urna, dui cras nec
                  sed. Cursus risus congue arcu aenean posuere aliquam.
                </p>
                <p class="mt-5">
                  Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea
                  rhoncus ac mauris amet. Urna, sem pretium sit pretium urna,
                  senectus vitae. Scelerisque fermentum, cursus felis dui
                  suspendisse velit pharetra. Augue et duis cursus maecenas eget
                  quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent
                  dictum risus suspendisse.
                </p>
              </dd>
            </div>
          </dl>
        </div>

        <!-- Reports to -->
        <div
          v-if="selectedEmployee.reports_to"
          class="max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8"
        >
          <h2 class="text-sm font-medium text-gray-500">Reports to</h2>
          <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="
                    'https://randomuser.me/api/portraits/' +
                    (selectedEmployee.reports_to.gender === 'm'
                      ? 'men'
                      : 'women') +
                    ('/' + selectedEmployee.reports_to.id + '.jpg')
                  "
                  alt=""
                />
              </div>
              <div class="flex-1 min-w-0">
                <a
                  ref="reportsTo"
                  href="#"
                  class="focus:outline-none"
                  @click="select(selectedEmployee.reports_to)"
                >
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedEmployee.reports_to.first_name }}
                    {{ selectedEmployee.reports_to.last_name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    {{ selectedEmployee.reports_to.department.name[lang] }}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Team member list -->
        <div
          v-if="selectedEmployee.direct_reports.length"
          class="max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8"
        >
          <h2 class="text-sm font-medium text-gray-500">Direct reports</h2>
          <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              v-for="(directReport, key) in selectedEmployee.direct_reports"
              :key="key"
              class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="
                    'https://randomuser.me/api/portraits/' +
                    (directReport.gender === 'm' ? 'men' : 'women') +
                    ('/' + directReport.id + '.jpg')
                  "
                  alt=""
                />
              </div>
              <div class="flex-1 min-w-0">
                <a
                  ref="directReports"
                  href="#"
                  class="focus:outline-none"
                  @click="select(directReport)"
                >
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">
                    {{ directReport.first_name }} {{ directReport.last_name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    {{ directReport.department.name[lang] }}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
    <aside
      class="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200"
    >
      <div class="px-6 pt-6 pb-4">
        <h2 class="text-lg font-medium text-gray-900">Directory</h2>
        <p class="mt-1 text-sm text-gray-600">
          Search directory of {{ meta != null ? meta.total : 0 }} employees
        </p>
        <form class="mt-6 flex space-x-4" action="#">
          <div class="flex-1 min-w-0">
            <label for="search" class="sr-only">Search</label>
            <div class="relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <!-- Heroicon name: mail -->
                <!-- Heroicon name: solid/search -->
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search"
                type="search"
                name="search"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="submit"
            class="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <!-- Heroicon name: solid/filter -->
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
      </div>
      <!-- Directory list -->
      <nav class="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
        <div
          v-for="(employeesByIntials, initial) in employeesForDirectory"
          :key="initial"
          class="relative"
        >
          <div
            class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500"
          >
            <h3>{{ initial }}</h3>
          </div>
          <ul class="relative z-0 divide-y divide-gray-200">
            <li
              v-for="(employee, key) in employeesByIntials"
              :key="key"
              @click="select(employee)"
            >
              <div
                class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
              >
                <div class="flex-shrink-0">
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
                <div class="flex-1 min-w-0">
                  <a href="#" class="focus:outline-none">
                    <!-- Extend touch target to entire panel -->
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    <p class="text-sm font-medium text-gray-900">
                      {{ employee.first_name }} {{ employee.last_name }}
                    </p>
                    <p class="text-sm text-gray-500 truncate">
                      {{
                        employee.department
                          ? employee.department.name[lang]
                          : ''
                      }}
                    </p>
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <infinite-loading spinner="spiral" @infinite="infiniteScroll">
            <div slot="no-more"></div>
          </infinite-loading>
        </div>
      </nav>
    </aside>
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
      employeesForDirectory: 'employees/employeesForDirectory',
      selectedEmployee: 'employees/employee',
      meta: 'employees/meta',
      lang: 'lang/locale',
    }),
  },
  async created() {
    await this.fetchEmployeesForDirectory(this.page)
  },
  methods: {
    ...mapActions({
      fetchEmployeesForDirectory: 'employees/fetchEmployeesForDirectory',
      fetchEmployee: 'employees/fetchEmployee',
    }),

    async select(employee) {
      await this.fetchEmployee({ id: employee.uuid })

      this.scrollTo(this.$refs.selectedEmployee)

      this.removeFocus()
    },

    async infiniteScroll($state) {
      const page = ++this.page

      await this.fetchEmployeesForDirectory({ page })
      $state.loaded()
      $state.complete()
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
