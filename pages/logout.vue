<template>
  <main class="login">
    Logout
  </main>
</template>

<script>

export default {
  beforeMount () {
    localStorage.clear()
    console.log(localStorage.getItem('AccessToken'))
    this.$router.push('/login')
  }
}

</script>

<style lang="scss" scoped>

</style>
