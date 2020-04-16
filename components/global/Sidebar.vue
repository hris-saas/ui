<template>
  <div :class="{ '': open, hidden: !open }" class="md:flex md:flex-shrink-0">
    <SidebarMobile :open="open" @toggleSidebar="toggleSidebar($event)" />
    <SidebarDesktop :open="open" @toggleSidebar="toggleSidebar($event)" />
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  props: {
    open: Boolean
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    }
  }
}
</script>
