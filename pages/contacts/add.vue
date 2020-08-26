<template>
  <main class="contacts">
    <header class="contacts_header">
      <NuxtLink to="/contacts" class="contacts-link">
        <i class="fas fa-arrow-left" />
      </NuxtLink>
      <h1 class="contacts-title">
        Add {{ relationship }}
      </h1>
    </header>
    <section class="contacts_section">
      <div class="contacts_form">
        <input v-model="email" type="text" class="contacts-search" placeholder="example@email.com">
        <button :data-rship="relationship" class="contacts-add">
          Add
        </button>
      </div>
      <ul class="contacts_users">
        <li class="contacts_user">
          <div class="contacts-avatar">
            <img src="/svg/user.svg" alt="Contact avatar" class="contacts-avatar-img">
          </div>
          <div class="contacts_userInfo">
            <p class="contacts-username">
              Trexoz
            </p>
            <p :data-rship="relationship" class="contacts-email">
              example@email.com
            </p>
          </div>
        </li>
        <li class="contacts_user">
          <div class="contacts-avatar">
            <img src="/svg/user.svg" alt="Contact avatar" class="contacts-avatar-img">
          </div>
          <div class="contacts_userInfo">
            <p class="contacts-username">
              Trexoz
            </p>
            <p :data-rship="relationship" class="contacts-email">
              example@email.com
            </p>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>

export default {
  data () {
    return {
      email: ''
    }
  },
  computed: {
    relationship () {
      return this.$store.state.AddContact.relationship
    }
  },
  methods: {

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

    &_section {
      display: grid;
      grid-template-rows: auto 1fr;
      grid-row-gap: 10px;
      padding: {
        top: 1em;
        left: 1em;
        right: 1em;
      }
    }

    &_form {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-gap: 10px;
    }

    &-search {
      border: {
        width: 1.5px;
        style: solid;
        color: var(--color-line);
      }
      border-radius: 6px;
      padding: {
        top: .3em;
        left: .5em;
        bottom: .3em;
      }
      width: 100%;
      color: var(--color-font-in-colorful);
      font-weight: 400;
      font-size: 18px;
      color: var(--color-font-secondary);
    }

    &-add {
      border-radius: 6px;
      width: 100%;
      height: 40px;
      color: white;
      font-weight: 400;
      font-size: 18px;
    }

    &_user {
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

    &-email {
      display: inline-block;
      border-radius: 10px;
      padding: 2px 10px;
      font-size: 10px;
      color: var(--color-font-in-colorful);
    }
  }

</style>
