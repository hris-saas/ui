<template>
  <span class="relative z-0 inline-flex shadow-sm rounded-md">
    <button
      type="button"
      class="group relative inline-flex items-center px-2.5 py-1.5 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-700"
      :class="{
        'z-10 outline-none ring-1 ring-indigo-500 border-indigo-500 bg-gray-50 bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500':
          viewType === 'table',
        'hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500':
          viewType !== 'table',
      }"
      @click.prevent="setViewType('table')"
    >
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
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    </button>
    <button
      type="button"
      class="-ml-px relative inline-flex items-center px-2.5 py-1.5 border border-gray-300 bg-white text-xs font-medium text-gray-700"
      :class="{
        'z-10 outline-none ring-1 ring-indigo-500 border-indigo-500 bg-gray-50 bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500':
          viewType === 'grid',
        'hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500':
          viewType !== 'grid',
      }"
      @click.prevent="setViewType('grid')"
    >
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
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    </button>
    <!-- Menu Status -->
    <div
      v-click-outside="hideMenuStatus"
      class="relative inline-block text-left"
    >
      <div>
        <button
          id="options-menu-status"
          type="button"
          class="-ml-px relative inline-flex items-center px-2.5 py-2 w-25 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          aria-expanded="true"
          aria-haspopup="true"
          @click.prevent="openMenuStatus = !openMenuStatus"
        >
          {{ statusDisplay }}
          <!-- Heroicon name: solid/chevron-down -->
          <svg
            class="-mr-1 ml-2 h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="openMenuStatus"
          class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu-status"
        >
          <div class="py-1" role="none">
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click.prevent="
                setStatus('active')
                hideMenuStatus()
              "
            >
              Active
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click.prevent="
                setStatus('inactive')
                hideMenuStatus()
              "
            >
              Inactive
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click.prevent="
                setStatus('all')
                hideMenuStatus()
              "
            >
              All
            </a>
          </div>
        </div>
      </transition>
    </div>
    <!-- Menu Filter -->
    <div
      v-click-outside="hideMenuFilter"
      class="relative inline-block text-left"
    >
      <div>
        <button
          id="options-menu-filter"
          type="button"
          class="-ml-px relative inline-flex items-center px-2.5 py-2.5 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          aria-expanded="true"
          aria-haspopup="true"
          @click.prevent="openMenuFilter = !openMenuFilter"
        >
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="openMenuFilter"
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu-filter"
        >
          <div class="py-1" role="none">
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click.prevent="hideMenuFilter"
              >Account settings</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click.prevent="hideMenuFilter"
              >Support</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click.prevent="hideMenuFilter"
              >License</a
            >
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                class="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                @click.prevent="hideMenuFilter"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </transition>
    </div>
    <!-- Menu Export -->
    <div
      v-click-outside="hideMenuExport"
      class="relative inline-block text-left"
    >
      <div>
        <button
          id="options-menu-export"
          type="button"
          class="-ml-px relative inline-flex items-center px-2.5 py-2.5 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          aria-expanded="true"
          aria-haspopup="true"
          @click.prevent="openMenuExport = !openMenuExport"
        >
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="openMenuExport"
          class="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu-export"
        >
          <div class="px-4 py-3" role="none">
            <p class="text-xs" role="none">{{ $t('export_to') }}</p>
          </div>
          <div class="py-1" role="none">
            <a
              href="#"
              class="group flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click.prevent="hideMenuExport"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-3 h-3 w-3 text-gray-400 group-hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              CSV
            </a>
            <a
              href="#"
              class="group flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click.prevent="hideMenuExport"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-3 h-3 w-3 text-gray-400 group-hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              XLSX
            </a>
          </div>
        </div>
      </transition>
    </div>
  </span>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { mapActions, mapGetters } from 'vuex'

export default {
  directives: {
    ClickOutside,
  },
  data: () => ({
    openMenuStatus: false,
    openMenuFilter: false,
    openMenuExport: false,
    status: 1,
    statusDisplay: 'Active',
  }),

  computed: {
    ...mapGetters({
      viewType: 'employees/viewType',
    }),
  },
  methods: {
    ...mapActions({
      fetchEmployees: 'employees/fetchEmployees',
    }),
    hideMenuStatus() {
      this.openMenuStatus = false
    },
    hideMenuFilter() {
      this.openMenuFilter = false
    },
    hideMenuExport() {
      this.openMenuExport = false
    },
    setViewType(view) {
      this.$store.dispatch('employees/setViewType', { view })
    },
    setStatus(status) {
      if (status === 'active') {
        this.status = '1'
        this.statusDisplay = 'Active'
      } else if (status === 'inactive') {
        this.status = '0'
        this.statusDisplay = 'Inactive'
      } else if (status === 'all') {
        this.status = 'all'
        this.statusDisplay = 'All'
      }

      this.filterByStatus()
    },
    async filterByStatus() {
      await this.fetchEmployees({ status: this.status })

      if (this.$refs.filterByStatus) {
        this.$refs.filterByStatus.blur()
      }
    },
  },
}
</script>
