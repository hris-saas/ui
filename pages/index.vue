<template>
  <div></div>
</template>
<script>
export default {
  middleware: 'auth',
  created() {
    this.$router.push({ name: 'login' })
  }
}
</script>
