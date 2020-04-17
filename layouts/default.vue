<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <SidebarMobile :open="open" @toggleSidebar="toggleSidebar" />
    <SidebarDesktop :open="open" @toggleSidebar="toggleSidebar" />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <Header :open="open" @toggleSidebar="toggleSidebar($event)" />
      <nuxt />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    open: false
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
    }
  }
}
</script>
