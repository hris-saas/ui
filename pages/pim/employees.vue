<template>
  <main
    class="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
    tabindex="0"
  >
    <nuxt-child />
  </main>
</template>
<script>
export default {
  middleware: 'auth',
  layout: 'default'
}
</script>
