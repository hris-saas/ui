<template>
  <main class="h-screen flex overflow-hidden focus:outline-none bg-white">
    <nuxt-child />
  </main>
</template>
<script>
export default {
  layout: 'default',
  middleware: 'auth',
}
</script>
