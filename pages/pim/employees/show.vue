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
            {{ $t('back') }}
          </nuxt-link>
        </nav>
        <nav class="hidden sm:flex items-center text-sm leading-5 font-medium">
          <nuxt-link
            :to="{ name: 'employees.index' }"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:underline transition duration-150 ease-in-out"
            >{{ $t('employees') }}
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
      <div class="py-4">
        <div class="bg-white shadow overflow-hidden  sm:rounded-lg">
          <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ $t('personal_information') }}
            </h3>
          </div>
          <div class="px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('salutation') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.salutation }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('full_name') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.first_name }} {{ employee.last_name }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('gender') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.gender == 'm' ? 'Male' : 'Female' }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('marital_status') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.marital_status }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('identity_no') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.identity_no }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('employee_no') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.employee_no }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('nickname') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.nickname }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('status') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.is_active ? 'Active' : 'Inactive' }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('date_of_birth') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.date_of_birth }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div class="py-4">
        <div class="bg-white shadow overflow-hidden  sm:rounded-lg">
          <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ $t('contact_information') }}
            </h3>
          </div>
          <div class="px-4 py-5 sm:px-6">
            <dl class="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('work_phone') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.work_phone }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('work_phone_ext') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.work_phone_ext }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('mobile_phone') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.mobile_phone }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('home_phone') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.home_phone }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('work_email') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.work_email }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  {{ $t('personal_email') }}
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  {{ employee.personal_email }}
                </dd>
              </div>
            </dl>
          </div>
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
      employee: 'employees/employee',
      title: 'employees/employeeName'
    })
  },
  async created() {
    await this.fetchEmployee({ id: this.$route.params.id })
  },
  methods: {
    ...mapActions({
      fetchEmployee: 'employees/fetchEmployee'
    })
  },
  head() {
    return { title: this.title ? this.title : 'HRis SaaS' }
  }
}
</script>
