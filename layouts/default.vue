<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <Sidebar :open="open" :performCleanup="performCleanup" @beforeToggleSidebar="beforeToggleSidebar" @afterToggleSidebar="afterToggleSidebar" @toggleSidebar="toggleSidebar($event)"  />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <Header :open="open" @toggleSidebar="toggleSidebar($event)" />
      <nuxt />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    open: true,
    performCleanup: true,
  }),
  watch: {
    $route() {
      this.toggleSidebar(true)
    }
  },
  methods: {
    toggleSidebar(force) {
      if (force) {
        this.open = false
      } else {
        this.open = !this.open
      }
    },
    beforeToggleSidebar() {
      this.performCleanup = true
    },
    afterToggleSidebar() {
      this.performCleanup = false
    }
  }
}
</script>
