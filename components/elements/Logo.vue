<template>
  <div class="logo">
    <img :src="src" :alt="alt" class="logo-img">
  </div>
</template>

<script>

export default {
  props: {
    src: String,
    alt: String
  }
}

</script>

<style lang="scss">

  .logo {
    padding: .5em;
    width: 100%;
    height: 100%;
    object-fit: contain;

    &-img {
      width: 100%;
      height: 100%;
    }
  }

</style>
