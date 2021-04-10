<template>
  <span class="relative z-0 inline-flex shadow-sm rounded-md">
    <div
      v-click-outside="hideMenuManage"
      class="relative inline-block text-left"
    >
      <div>
        <button
          id="options-menu-manage"
          type="button"
          class="-ml-px relative inline-flex items-center px-2.5 py-1.5 rounded-md bg-indigo-700 text-xs font-medium text-white hover:bg-indigo-800 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-700"
          aria-expanded="true"
          aria-haspopup="true"
          @click.prevent="openMenuManage = !openMenuManage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Manage
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
          v-show="openMenuManage"
          class="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu-manage"
        >
          <div class="py-1" role="none">
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >Reset Password</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >Disable Access</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >Terminate</a
            >
          </div>
        </div>
      </transition>
    </div>
  </span>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { mapGetters } from 'vuex'
export default {
  directives: {
    ClickOutside,
  },
  data: () => ({
    openMenuManage: false,
  }),

  computed: {
    ...mapGetters({
      employee: 'employees/employee',
    }),
  },

  watch: {
    employee() {
      //
    },
  },

  methods: {
    hideMenuManage() {
      this.openMenuManage = false
    },
  },
}
</script>
