<template>
  <main class="main">
    <section class="main_content">
      <header class="main_header">
        <button @click="openMenu" class="main-action">
          <i class="fas fa-bars" />
        </button>
        <a href="#" class="main-action"><i class="fas fa-phone-alt" /></a>
      </header>
      <BottomSheetIndex>
        <template v-slot:newReservation />
        <template v-slot:closest />
      </BottomSheetIndex>
      <MainMap />
    </section>
    <Menu :menu-is-open="menuIsOpen" />
    <div @click="closeMenu" v-show="menuIsOpen" :class="{'menu-open': menuIsOpen}" class="main-overlay" />
  </main>
</template>

<script>

import Menu from '~/components/sections/Menu.vue'
import BottomSheetIndex from '~/components/bottomSheets/Index.vue'
import MainMap from '~/components/blocks/MainMap.vue'

export default {
  components: {
    Menu,
    BottomSheetIndex,
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

  .main {
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
      grid-template-columns: repeat(2, 1fr);
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      justify-self: stretch;
      align-self: start;
      padding: 1em;
      width: 100vw;
    }

    &-action {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 3em;
      height: 3em;
      background-color: var(--color-font-in-colorful);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

      &:last-child {
        justify-self: end;
      }
    }

    &-map-wrap {
      z-index: 1;
      grid-row: 1 / 3;
      grid-column: 1 / 2;
      justify-self: stretch;
      align-self: stretch;
    }

    &-overlay {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      display: block;
      width: 100%;
      height: 100%;
      background-color: hsla(0%, 0%, 0%, .5);
      opacity: 0;
      transition: opacity .2s;

      &.menu-open {
        opacity: 1;
      }
    }
  }

</style>
