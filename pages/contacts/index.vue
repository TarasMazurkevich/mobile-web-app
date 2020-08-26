<template>
  <main class="contacts">
    <header class="contacts_header">
      <NuxtLink to="/" class="contacts-link">
        <i class="fas fa-arrow-left" />
      </NuxtLink>
      <h1 class="contacts-title">
        Contacts
      </h1>
      <NuxtLink v-show="isTripNow" to="/" class="contacts-inTrip">
        6 in trip now
      </NuxtLink>
    </header>
    <section class="contacts_section">
      <ul class="contacts_list">
        <li v-for="(contact, i) in CONTACTS" :key="i" class="contacts_item">
          <div class="contacts-avatar">
            <img src="/svg/user.svg" alt="Contact avatar" class="contacts-avatar-img">
          </div>
          <div class="contacts_userInfo">
            <p class="contacts-username">
              {{ contact.UserName }}
            </p>
            <p class="contacts-relationship" data-rship="child">
              {{ contact.Role }}
            </p>
          </div>
        </li>
      </ul>
    </section>
    <aside class="contacts_action">
      <ul :class="{open: isRelationshipsOpen}" class="contacts_relationship_list">
        <li v-for="(relationship, i) in relationships" :key="i" @click="router" :data-rship="relationship" class="contacts_relationship_item">
          {{ relationship }}
        </li>
      </ul>
      <button :class="{open: isRelationshipsOpen}" @click="toggleAddAction" class="contacts-add">
        <i class="fas fa-plus" />
      </button>
    </aside>
  </main>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      relationships: ['friend', 'teacher', 'student', 'parent', 'child'],
      isRelationshipsOpen: false,
      isTripNow: false
    }
  },
  computed: {
    ...mapGetters(['CONTACTS'])
  },
  methods: {
    toggleAddAction () {
      this.isRelationshipsOpen = !this.isRelationshipsOpen
    },
    router (e) {
      const target = e.target
      const relationship = target.dataset.rship

      this.$store.commit('changeRelationship', relationship)
      this.$router.push('/contacts/add')
    }
  }
}

</script>

<style lang="scss" scoped>

  .contacts {
    position: relative;
    font-family: 'Roboto', sans-serif;
    display: grid;
    grid-template-rows: auto 1fr 3em;
    width: 100vw;
    height: 100vh;

    &_header {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 10px;
      align-items: center;
      padding: {
        top: 1em;
        right: 1em;
        left: 1em;
      }
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

    &-title {
      font-size: 20px;
      font-weight: 900;
    }

    &-inTrip {
      border-radius: 16px;
      padding: 2px 10px;
      background-color: var(--color-orange-main);
      color: var(--color-font-in-colorful);
    }

    &_section {
      padding: {
        top: 1em;
        left: 1em;
        right: 1em;
      }
    }

    &_item {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 10px;
      align-items: center;
      padding: {
        top: 10px;
        bottom: 10px;
      }
      color: var(--color-font-primary);

      &:not(:first-child) {
        border-top: {
          width: 1px;
          style: solid;
          color: var(--color-line);
        }
      }
    }

    &-avatar {
      border: {
        width: 1px;
        style: solid;
        color: var(--color-line);
        radius: 50%;
      }
      width: 3em;
      height: 3em;
      overflow: hidden;
      object-fit: cover;

      &-img {
        width: 100%;
        height: 100%;
      }
    }

    &-username {
      font-weight: 900;
    }

    &-relationship {
      display: inline-block;
      border-radius: 10px;
      padding: 2px 10px;
      font-size: 10px;
      color: var(--color-font-in-colorful);
    }

    &_action {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 2;
      display: grid;
      grid-template-rows: 1fr auto;
      justify-items: center;
      align-items: end;
      padding: 1em;
      height: 100vh;
    }

    &_relationship {
      &_list {
        display: grid;
        grid-template-rows: auto;
        align-content: start;
        justify-items: center;
        grid-row-gap: 10px;
        padding-bottom: 10px;
        opacity: 0;
        transition: opacity .3s;

        &.open {
          opacity: 1;
        }
      }

      &_item {
        border-radius: 10px;
        padding: 2px 10px;
        font-size: 10px;
        color: var(--color-font-in-colorful);
      }
    }

    &-add {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 3em;
      height: 3em;
      background-color: var(--color-orange-main);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      color: var(--color-font-in-colorful);
      transition: transform .3s;
      outline: none;

      &:active {
        outline: none;
      }

      &.open {
        transform: rotate(-45deg);
      }
    }
  }

</style>
