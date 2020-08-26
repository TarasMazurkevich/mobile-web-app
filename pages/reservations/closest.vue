<template>
  <main class="closest">
    <section class="closest_content">
      <header class="closest_header">
        <NuxtLink to="/" class="closest-link">
          <i class="fas fa-arrow-left" />
        </NuxtLink>
      </header>
      <BottomSheetClosest>
        <template v-slot:closest />
      </BottomSheetClosest>
      <MainMap />
    </section>
  </main>
</template>

<script>

import BottomSheetClosest from '~/components/bottomSheets/Closest.vue'
import MainMap from '~/components/blocks/MainMap.vue'

export default {
  components: {
    BottomSheetClosest,
    MainMap
  },
  data () {
    return {
      menuIsOpen: false
    }
  },
  methods: {
    openMenu () {
      this.menuIsOpen = true
    },
    closeMenu () {
      this.menuIsOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>

  .closest {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    &_content {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      width: 100%;
      height: 100%;
    }

    &_header {
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr;
      justify-items: start;
      align-items: start;
      padding: 1em;
      width: 100vw;
    }

    &-link {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 3em;
      height: 3em;
      background-color: var(--color-font-in-colorful);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    &-map-wrap {
      z-index: 1;
      grid-row: 1 / 3;
      grid-column: 1 / 2;
      justify-self: stretch;
      align-self: stretch;
    }
  }

</style>
