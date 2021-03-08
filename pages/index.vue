<template>
  <div />
</template>
<script>
export default {
  layout: 'auth',
  middleware: 'auth',
  created () {
    this.$router.push({ name: 'dashboard.index' })
  }
}
</script>
