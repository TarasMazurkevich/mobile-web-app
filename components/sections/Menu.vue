<template>
  <aside :class="{open: menuIsOpen}" class="menu">
    <header class="menu_header">
      <div class="menu-img">
        <img src="/svg/user.svg" class="menu-img-avatar">
      </div>
      <div class="menu_userInfo">
        <p class="menu-name">
          Nazar Lenyk
        </p>
        <p class="menu-email">
          lenyk.n@gmail.com
        </p>
      </div>
    </header>
    <ul class="menu_list">
      <li v-for="page in pages" class="menu_item">
        <NuxtLink :to="`/${page.path}`" class="menu-link">
          {{ page.label }}
        </NuxtLink>
        <span class="menu-icon"><i class="fas fa-chevron-right" /></span>
      </li>
    </ul>
    <button @click="logout" class="menu-logout">
      Log out
    </button>
  </aside>
</template>

<script>

export default {
  props: {
    menuIsOpen: Boolean
  },
  data () {
    return {
      pages: [
        { label: 'Contacts', path: 'contacts' },
        { label: 'Trips', path: 'reservations' }
      ]
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      console.log(localStorage.getItem('AccessToken'))
      this.$router.push('/Login')
    }
  }
}

</script>

<style lang="scss">

  .menu {
    font-family: 'Roboto', sans-serif;
    position: absolute;
    top: 0;
    z-index: 3;
    display: grid;
    grid-template-rows: 1fr 6fr 2em;
    width: 85vw;
    height: 100vh;
    background-color: var(--color-font-in-colorful);
    transform: translateX(-100%);
    transition: transform .2s;

    &.open {
      transform: translateX(0);
    }

    &_header {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 1em;
      align-items: center;
      padding: 1em;
      background-color: var(--color-orange-main);
    }

    &-img {
      border-radius: 50%;
      width: 4em;
      height: 4em;
      overflow: hidden;
      object-fit: contain;

      &-avatar {
        width: 100%;
        height: 100%;
      }
    }

    &_userInfo {
      font-size: 16px;
      font-weight: 400;
      color: var(--color-font-primary);
    }

    &_list {
      display: flex;
      flex-direction: column;
    }

    &_item {
      display: grid;
      grid-template-columns: 1fr auto;
      justify-content: center;
      align-items: center;
      padding: .7em 1em;

      &:not(:first-child) {
        border-top: {
          width: 1px;
          style: solid;
          color: var(--color-line);
          radius: 50%;
        }
      }
    }

    &-link {
      font-size: 18px;
      font-weight: 400;
      color: var(--color-font-primary);
    }

    &-icon {
      display: inline-block;
      justify-self: end;
      font-size: 12px;
      color: var(--color-line);
    }

    &-logout {
      align-self: start;
      justify-self: start;
      padding: {
        left: 1em;
        right: 1em;
      }
      text-decoration: underline;
      color: red;
    }
  }

</style>
