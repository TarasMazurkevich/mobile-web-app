<template>
  <main class="create">
    <section class="create_content">
      <header class="create_header">
        <NuxtLink to="/" class="create-link">
          <i class="fas fa-arrow-left" />
        </NuxtLink>
      </header>
      <BottomSheetMakeReservation>
        <template v-slot:newReservation />
      </BottomSheetMakeReservation>
      <MainMap />
    </section>
  </main>
</template>

<script>

import BottomSheetMakeReservation from '~/components/bottomSheets/MakeReservation.vue'
import MainMap from '~/components/blocks/MainMap.vue'

export default {
  components: {
    BottomSheetMakeReservation,
    MainMap
  },
  data () {
    return {
      menuIsOpen: false
    }
  },
  beforeMount () {
    console.dir(this.$route.query)
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

<style lang="scss">

  .create {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    &_content {
      z-index: 2;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      width: 100%;
      height: 100%;
    }

    &_header {
      z-index: 2;
      display: grid;
      justify-self: start;
      align-self: start;
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
