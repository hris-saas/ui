<template>
  <main
    class="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
    tabindex="0"
  >
    <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ $t('dashboard') }}
      </h1>
    </div>
    <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="py-4">
        <div
          class="border-4 border-dashed border-gray-200 rounded-lg h-96"
        />
      </div>
    </div>
  </main>
</template>
<script>
export default {
  layout: 'default',
  middleware: 'auth',
  head () {
    return { title: this.$t('dashboard') }
  }
}
</script>
