<template>
  <div class="flex-1 relative z-0 flex overflow-hidden">
    <div
      class="fixed inset-0 flex items-end justify-center px-4 mt-14 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
    >
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showNotification"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Heroicon name: outline/check-circle -->
                <svg
                  class="h-6 w-6 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  Successfully saved!
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Anyone with a link can now view this file.
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="showNotification = false"
                >
                  <span class="sr-only">Close</span>
                  <!-- Heroicon name: solid/x -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <form
      ref="form"
      class="px-6 pt-6 pb-4 space-y-8 divide-y divide-gray-200 flex-1 min-h-0 overflow-y-auto"
      @submit.prevent="save"
      @keydown="form.onKeydown($event)"
    >
      <div class="space-y-8 divide-y divide-gray-200">
        <!-- Employee Information -->
        <div>
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ $t('employee_information') }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ $t('employee_information_description') }}
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-2">
              <ui-input
                name="first_name"
                autocomplete="given-name"
                :error="form.errors.get('first_name')"
                :has-error="form.errors.has('first_name')"
                :value="form.first_name"
                @update:modelValue="form.first_name = $event"
              >
                {{ $t('first_name') }}
              </ui-input>
            </div>

            <div class="sm:col-span-1">
              <ui-input
                name="middle_name"
                autocomplete="additional-name"
                :error="form.errors.get('middle_name')"
                :has-error="form.errors.has('middle_name')"
                :value="form.middle_name"
                @update:modelValue="form.middle_name = $event"
              >
                {{ $t('middle_name') }}
              </ui-input>
            </div>

            <div class="sm:col-span-2">
              <ui-input
                name="last_name"
                autocomplete="family-name"
                :error="form.errors.get('last_name')"
                :has-error="form.errors.has('last_name')"
                :value="form.last_name"
                @update:modelValue="form.last_name = $event"
              >
                {{ $t('last_name') }}
              </ui-input>
            </div>

            <div class="sm:col-span-1">
              <ui-input
                name="salutation"
                autocomplete="honorific-prefix"
                :error="form.errors.get('salutation')"
                :has-error="form.errors.has('salutation')"
                :value="form.salutation"
                @update:modelValue="form.salutation = $event"
              >
                {{ $t('salutation') }}
              </ui-input>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="gender"
                autocomplete="sex"
                :error="form.errors.get('gender')"
                :has-error="form.errors.has('gender')"
                :value="form.gender"
                :options="[
                  { id: 'm', name: $t('male') },
                  { id: 'f', name: $t('female') },
                ]"
                @update:modelValue="form.gender = $event"
              >
                {{ $t('gender') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="marital_status"
                :error="form.errors.get('marital_status_id')"
                :has-error="form.errors.has('marital_status_id')"
                :value="form.marital_status_id"
                :options="maritalStatuses"
                @update:modelValue="form.marital_status_id = $event"
              >
                {{ $t('marital_status') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="status"
                :error="form.errors.get('is_active')"
                :has-error="form.errors.has('is_active')"
                :value="form.is_active"
                :options="[
                  { id: 1, name: $t('active') },
                  { id: 0, name: $t('inactive') },
                ]"
                @update:modelValue="form.is_active = $event"
              >
                {{ $t('status') }}
              </ui-select>
            </div>

            <!-- start: date of birth -->
            <div class="sm:col-span-1">
              <ui-select
                name="date_of_birth_day"
                :error="form.errors.get('date_of_birth.day')"
                :has-error="form.errors.has('date_of_birth.day')"
                :value="form.date_of_birth.day"
                :options="days"
                @update:modelValue="form.date_of_birth.day = $event"
              >
                {{ $t('date_of_birth') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="date_of_birth_month"
                :error="form.errors.get('date_of_birth.month')"
                :has-error="form.errors.has('date_of_birth.month')"
                :value="form.date_of_birth.month"
                :options="months"
                :translate-options="true"
                @update:modelValue="form.date_of_birth.month = $event"
              >
                &nbsp;
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-input
                name="date_of_birth_year"
                :error="form.errors.get('date_of_birth.year')"
                :has-error="form.errors.has('date_of_birth.year')"
                :value="form.date_of_birth.year"
                :placeholder="'1985'"
                :maxlength="4"
                @update:modelValue="form.date_of_birth.year = $event"
              >
                &nbsp;
              </ui-input>
            </div>
            <!-- end: date of birth -->

            <div class="sm:col-span-2">
              <ui-input
                name="identity_no"
                :error="form.errors.get('identity_no')"
                :has-error="form.errors.has('identity_no')"
                :value="form.identity_no"
                @update:modelValue="form.identity_no = $event"
              >
                {{ $t('identity_no') }}
              </ui-input>
            </div>
          </div>
        </div>

        <!-- Address Information -->
        <div class="pt-8">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ $t('job_information') }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ $t('job_information_description') }}
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <!-- start: date of birth -->
            <div class="sm:col-span-1">
              <ui-select
                name="date_of_start_day"
                :error="form.errors.get('date_of_start.day')"
                :has-error="form.errors.has('date_of_start.day')"
                :value="form.date_of_start.day"
                :options="days"
                @update:modelValue="form.date_of_start.day = $event"
              >
                {{ $t('start_date') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="date_of_start_month"
                :error="form.errors.get('date_of_start.month')"
                :has-error="form.errors.has('date_of_start.month')"
                :value="form.date_of_start.month"
                :options="months"
                :translate-options="true"
                @update:modelValue="form.date_of_start.month = $event"
              >
                &nbsp;
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-input
                name="date_of_start_year"
                :error="form.errors.get('date_of_start.year')"
                :has-error="form.errors.has('date_of_start.year')"
                :value="form.date_of_start.year"
                :placeholder="'1985'"
                :maxlength="4"
                @update:modelValue="form.date_of_start.year = $event"
              >
                &nbsp;
              </ui-input>
            </div>
            <!-- end: date of birth -->

            <div class="sm:col-span-2">&nbsp;</div>

            <div class="sm:col-span-2">
              <ui-input
                name="employee_no"
                :error="form.errors.get('employee_no')"
                :has-error="form.errors.has('employee_no')"
                :value="form.employee_no"
                @update:modelValue="form.employee_no = $event"
              >
                {{ $t('employee_no') }}
              </ui-input>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="department"
                :error="form.errors.get('department_id')"
                :has-error="form.errors.has('department_id')"
                :value="form.department_id"
                :options="departments"
                @update:modelValue="form.department_id = $event"
              >
                {{ $t('department') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="job_title"
                :error="form.errors.get('job_title_id')"
                :has-error="form.errors.has('job_title_id')"
                :value="form.job_title_id"
                :options="jobTitles"
                @update:modelValue="form.job_title_id = $event"
              >
                {{ $t('job_title') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">&nbsp;</div>

            <div class="sm:col-span-2">
              <ui-select
                name="reports_to"
                :error="form.errors.get('reports_to_id')"
                :has-error="form.errors.has('reports_to_id')"
                :value="form.reports_to_id"
                :options="employees"
                @update:modelValue="form.reports_to_id = $event"
              >
                {{ $t('reports_to') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="division"
                :error="form.errors.get('division_id')"
                :has-error="form.errors.has('division_id')"
                :value="form.division_id"
                :options="divisions"
                @update:modelValue="form.division_id = $event"
              >
                {{ $t('division') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="location"
                :error="form.errors.get('location_id')"
                :has-error="form.errors.has('location_id')"
                :value="form.location_id"
                :options="locations"
                @update:modelValue="form.location_id = $event"
              >
                {{ $t('location') }}
              </ui-select>
            </div>
          </div>
        </div>

        <div
          v-for="(address, index) in form.addresses"
          :key="index"
          class="pt-8"
          @mouseenter="focus = index"
          @mouseleave="focus = 0"
        >
          <div class="sm:flex sm:items-center sm:justify-between">
            <h3 class="text-lg leading-6 font-medium text-gray-900 py-1.5">
              {{ $t('address_information') + ' ' + (index + 1) }}
            </h3>
            <p
              v-show="index > 0 && focus === index"
              class="text-sm right-0 text-gray-500"
            >
              <button
                type="button"
                href="#"
                class="relative items-center ml-3 inline-flex bg-white py-1 px-2.5 border border-red-500 rounded-md shadow-sm text-xs font-medium bg-red-400 hover:bg-red-500 text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:bg-red-600"
                @click.prevent="removeAddress(index)"
              >
                <svg
                  class="h-5 w-5 pr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                {{ $t('remove') }}
              </button>
            </p>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-2">
              <ui-input
                :name="`street_address_1_${index}`"
                autocomplete="street-address-1"
                :error="form.errors.get(`addresses.${index}.address_1`)"
                :has-error="form.errors.has(`addresses.${index}.address_1`)"
                :value="address.address_1"
                @update:modelValue="address.address_1 = $event"
              >
                {{ $t('street_address_1') }}
              </ui-input>
            </div>

            <div class="sm:col-span-2">
              <ui-input
                :name="`city_${index}`"
                autocomplete="city"
                :error="form.errors.get(`addresses.${index}.city`)"
                :has-error="form.errors.has(`addresses.${index}.city`)"
                :value="address.city"
                @update:modelValue="address.city = $event"
              >
                {{ $t('city') }}
              </ui-input>
            </div>

            <div class="sm:col-span-2">
              <ui-select
                :name="`country_${index}`"
                :error="form.errors.get(`addresses.${index}.country`)"
                :has-error="form.errors.has(`addresses.${index}.country`)"
                :value="address.country"
                :options="countries"
                @update:modelValue="address.country = $event"
              >
                {{ $t('country_region') }}
              </ui-select>
            </div>

            <div class="sm:col-span-2">
              <ui-input
                :name="`street_address_2_${index}`"
                autocomplete="street-address-2"
                :error="form.errors.get(`addresses.${index}.address_2`)"
                :has-error="form.errors.has(`addresses.${index}.address_2`)"
                :value="address.address_2"
                @update:modelValue="address.address_2 = $event"
              >
                {{ $t('street_address_2') }}
              </ui-input>
            </div>

            <div class="sm:col-span-2">
              <ui-input
                :name="`state_province_${index}`"
                autocomplete="state"
                :error="form.errors.get(`addresses.${index}.state`)"
                :has-error="form.errors.has(`addresses.${index}.state`)"
                :value="address.state"
                @update:modelValue="address.state = $event"
              >
                {{ $t('state_province') }}
              </ui-input>
            </div>

            <div class="sm:col-span-2">
              <ui-input
                :name="`zip_postal_${index}`"
                autocomplete="zip"
                :error="form.errors.get(`addresses.${index}.postal_code`)"
                :has-error="form.errors.has(`addresses.${index}.postal_code`)"
                :value="address.postal_code"
                @update:modelValue="address.postal_code = $event"
              >
                {{ $t('zip_postal') }}
              </ui-input>
            </div>
          </div>
        </div>

        <!-- Add New Address Information -->
        <div class="pt-8">
          <a
            href="#"
            class="relative items-center text-gray-500 hover:text-gray-600"
            @click.prevent="addAddress()"
          >
            <svg
              class="h-5 w-5 block absolute inset-y-0 flex items-center pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span class="pl-6 text-sm font-medium">
              {{ $t('add_new_address_information') }}
            </span>
          </a>
        </div>

        <!-- Contact Information -->
        <div class="pt-8">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ $t('contact_information') }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ $t('contact_information_description') }}
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-2">
              <ui-input
                name="work_phone"
                :error="form.errors.get('work_phone')"
                :has-error="form.errors.has('work_phone')"
                :value="form.work_phone"
                @update:modelValue="form.work_phone = $event"
              >
                {{ $t('work_phone') }}
              </ui-input>
            </div>

            <div class="sm:col-span-1">
              <ui-input
                name="work_phone_ext"
                :error="form.errors.get('work_phone_ext')"
                :has-error="form.errors.has('work_phone_ext')"
                :value="form.work_phone_ext"
                @update:modelValue="form.work_phone_ext = $event"
              >
                {{ $t('work_phone_ext') }}
              </ui-input>
            </div>

            <div class="sm:col-span-2">
              <ui-input
                name="mobile_phone"
                :error="form.errors.get('mobile_phone')"
                :has-error="form.errors.has('mobile_phone')"
                :value="form.mobile_phone"
                @update:modelValue="form.mobile_phone = $event"
              >
                {{ $t('mobile_phone') }}
              </ui-input>
            </div>

            <div class="sm:col-span-3">
              <ui-input
                name="home_phone"
                :error="form.errors.get('home_phone')"
                :has-error="form.errors.has('home_phone')"
                :value="form.home_phone"
                @update:modelValue="form.home_phone = $event"
              >
                {{ $t('home_phone') }}
              </ui-input>
              <p class="mt-2 text-sm text-gray-500">
                {{ $t('phone_help_text') }}
              </p>
            </div>

            <div class="sm:col-span-3">&nbsp;</div>

            <div class="sm:col-span-3">
              <ui-input
                name="work_email"
                :error="form.errors.get('work_email')"
                :has-error="form.errors.has('work_email')"
                :value="form.work_email"
                :help-text="$t('work_email_ess_text')"
                @update:modelValue="form.work_email = $event"
              >
                {{ $t('work_email') }}
              </ui-input>
            </div>

            <div class="sm:col-span-3">
              <ui-input
                name="personal_email"
                :error="form.errors.get('personal_email')"
                :has-error="form.errors.has('personal_email')"
                :value="form.personal_email"
                @update:modelValue="form.personal_email = $event"
              >
                {{ $t('personal_email') }}
              </ui-input>
            </div>
          </div>
        </div>

        <!-- Employment Status -->
        <div class="pt-8">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ $t('employment_status') }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ $t('employment_status_description') }}
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-2">
              <ui-select
                name="employment_status"
                :error="form.errors.get('employment_status_id')"
                :has-error="form.errors.has('employment_status_id')"
                :value="form.employment_status_id"
                :options="employmentStatuses"
                @update:modelValue="form.employment_status_id = $event"
              >
                {{ $t('status') }}
              </ui-select>
            </div>
          </div>
        </div>

        <!-- Compensation -->
        <div class="pt-8">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ $t('compensation') }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ $t('compensation_description') }}
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-2">
              <ui-pay-rate
                :error="
                  form.errors.get('pay_value')
                    ? form.errors.get('pay_value')
                    : form.errors.get('pay_rate')
                "
                :has-error="
                  form.errors.has('pay_value')
                    ? form.errors.has('pay_value')
                    : form.errors.has('pay_rate')
                "
                :input-value="form.pay_value"
                :select-value="form.pay_rate"
                @update:modelInputValue="form.pay_value = $event"
                @update:modelSelectValue="form.pay_rate = $event"
              />
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="currency"
                autocomplete="currency"
                :error="form.errors.get('currency')"
                :has-error="form.errors.has('currency')"
                :value="form.currency"
                :options="[
                  { id: 'usd', name: 'USD' },
                  { id: 'eur', name: 'EUR' },
                  { id: 'php', name: 'PHP' },
                ]"
                @update:modelValue="form.currency = $event"
              >
                {{ $t('currency') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="pay_type"
                :error="form.errors.get('pay_type_id')"
                :has-error="form.errors.has('pay_type_id')"
                :value="form.pay_type_id"
                :options="payTypes"
                @update:modelValue="form.pay_type_id = $event"
              >
                {{ $t('pay_type') }}
              </ui-select>
            </div>

            <div class="sm:col-span-1">
              <ui-select
                name="pay_period"
                :error="form.errors.get('pay_period_id')"
                :has-error="form.errors.has('pay_period_id')"
                :value="form.pay_period_id"
                :options="payPeriods"
                @update:modelValue="form.pay_period_id = $event"
              >
                {{ $t('pay_period') }}
              </ui-select>
            </div>

            <div class="sm:col-span-2">
              <ui-select
                name="change_reason"
                :error="form.errors.get('change_reason_id')"
                :has-error="form.errors.has('change_reason_id')"
                :value="form.change_reason_id"
                :options="changeReasons"
                @update:modelValue="form.change_reason_id = $event"
              >
                {{ $t('change_reason') }}
              </ui-select>
            </div>
          </div>
        </div>

        <!-- Employee Self Service -->
        <div class="pt-8">
          <div class="flex w-2/3 items-center justify-between">
            <div class="mr-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ $t('employee_self_service') }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ $t('employee_self_service_description') }}
              </p>
            </div>
            <button
              type="button"
              class="relative inline-flex flex-shrink-0 ml-4 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :aria-pressed="form.is_ess_on"
              aria-labelledby="ess-label"
              :class="{
                'bg-indigo-600': form.is_ess_on,
                'bg-gray-200': !form.is_ess_on,
              }"
              @click="form.is_ess_on = !form.is_ess_on"
            >
              <span
                aria-hidden="true"
                class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                :class="{
                  'translate-x-5': form.is_ess_on,
                  'translate-x-0': !form.is_ess_on,
                }"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <nuxt-link
            :to="{ name: 'employees.index' }"
            type="button"
            class="bg-white py-1.5 px-2.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ $t('save_and_add_new_employee') }}
          </nuxt-link>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-1.5 px-2.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ $t('add') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Form from 'vform'

export default {
  layout: 'default',
  middleware: 'auth',
  props: {
    submitFormFromProp: Boolean,
  },
  data: () => ({
    form: new Form({
      first_name: null,
      middle_name: null,
      last_name: null,
      salutation: null,
      gender: null,
      marital_status_id: null,
      is_active: null,
      date_of_birth: {
        day: null,
        month: null,
        year: null,
      },
      identity_no: null,
      date_of_start: {
        day: null,
        month: null,
        year: null,
      },
      employee_no: null,
      department_id: null,
      job_title_id: null,
      reports_to_id: null,
      division_id: null,
      location_id: null,
      addresses: [
        {
          address_1: null,
          address_2: null,
          city: null,
          postal_code: null,
          state: null,
          country: null,
        },
      ],
      work_phone: null,
      work_phone_ext: null,
      mobile_phone: null,
      home_phone: null,
      work_email: null,
      personal_email: null,
      employment_status_id: null,
      pay_value: null,
      pay_rate: null,
      currency: null,
      pay_type_id: null,
      pay_period_id: null,
      change_reason_id: null,
      is_ess_on: false,
    }),
    focus: 0,
    showNotification: false,
    enableSubmitButton: true,
  }),
  head() {
    return { title: this.$t('add_new_employee') }
  },
  computed: {
    ...mapGetters({
      statuses: 'employeeFields/statuses',
      maritalStatuses: 'employeeFields/maritalStatuses',
      departments: 'employeeFields/departments',
      jobTitles: 'employeeFields/jobTitles',
      divisions: 'employeeFields/divisions',
      locations: 'employeeFields/locations',
      employmentStatuses: 'employeeFields/employmentStatuses',
      payTypes: 'employeeFields/payTypes',
      payPeriods: 'employeeFields/payPeriods',
      changeReasons: 'employeeFields/changeReasons',
      employees: 'employees/employeesForSelect',
      days: 'utilities/calendarDays',
      months: 'utilities/calendarMonths',
      countries: 'utilities/countries',
    }),
  },
  watch: {
    submitFormFromProp() {
      this.save()

      this.$emit('resetSubmitProp')
    },
  },
  async created() {
    await this.fetchEmployeeField({
      employeeField: 'statuses',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'marital-statuses',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'employment-statuses',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'departments',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'job-titles',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'divisions',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'locations',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'pay-types',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'pay-periods',
      isSelect: true,
    })
    await this.fetchEmployeeField({
      employeeField: 'change-reasons',
      isSelect: true,
    })
    await this.fetchEmployees()
  },
  methods: {
    ...mapActions({
      fetchEmployeeField: 'employeeFields/fetchEmployeeField',
      fetchEmployees: 'employees/fetchEmployeesForSelect',
    }),

    addAddress() {
      this.form.addresses.push({
        address_1: null,
        address_2: null,
        city: null,
        postal_code: null,
        state: null,
        country: null,
      })
    },

    removeAddress(index) {
      this.form.addresses.splice(index, 1)
    },

    async save() {
      if (this.enableSubmitButton) {
        this.enableSubmitButton = false

        try {
          await this.form.post('/employees')

          this.showNotification = true
        } catch (e) {}

        this.enableSubmitButton = true
      }
    },
  },
}
</script>
