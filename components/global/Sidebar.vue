<template>
  <div :class="{ '': performCleanup, hidden: !performCleanup }" class="md:flex md:flex-shrink-0">
    <SidebarMobile :open="open" @toggleSidebar="toggleSidebar" @beforeToggleSidebar="beforeToggleSidebar" @afterToggleSidebar="afterToggleSidebar" />
    <SidebarDesktop :open="open" @toggleSidebar="toggleSidebar" />
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  props: {
    open: Boolean,
    performCleanup: Boolean,
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },
    beforeToggleSidebar() {
      this.$emit('beforeToggleSidebar')
    },
    afterToggleSidebar() {
      this.$emit('afterToggleSidebar')
    }
  }
}
</script>
