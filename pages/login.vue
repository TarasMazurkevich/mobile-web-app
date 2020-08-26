<template>
  <main class="login">
    <Logo src="/logo/logo-small.svg" alt="Short main logo" />
    <form class="login_form">
      <input v-model="username" class="login-input" type="text">
      <input v-model="password" class="login-input" type="password">
      <input @click="submit" class="login-submit" type="button" value="Sign in">
    </form>
    <footer class="login_footer">
      <NuxtLink to="/registrate" class="login-link">
        Sign up
      </NuxtLink>
    </footer>
  </main>
</template>

<script>
import Logo from '~/components/elements/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      username: 'tar_taras',
      password: 'taras1'
    }
  },
  methods: {
    async submit () {
      if (this.username.length !== 0 && this.password.length !== 0) {
        const loginData = {
          username: this.username,
          password: this.password
        }

        await this.$store.dispatch('AUTHORIZATION', loginData)
        await this.$store.dispatch('GET_ALL_RESERVATIONS')
        await this.$store.dispatch('GET_ALL_CONTACTS')

        console.log('AUTH: get contacts')
        console.log(this.$store.getters.CONTACTS)

        console.log('AUTH: go to link ":/"')
        this.$router.push('/')
      }
    }
  }
}

</script>

<style lang="scss" scoped>

  .login {
    font-family: 'Roboto', sans-serif;
    display: grid;
    grid-template-rows: 40vh 1fr;
    padding: 1rem;
    width: 100vw;
    height: 100vh;
    overflow: auto;

    &_form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &-input {
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

      &:not(:first-child) {
        margin-top: 10px;
      }
    }

    &-submit {
      margin-top: 20px;
      border-radius: 6px;
      width: 100%;
      height: 40px;
      background-color: var(--color-orange-main);
      color: white;
      font-weight: 400;
      font-size: 18px;
    }

    &_footer {
      text-align: center;
    }

    &-link {
      text-decoration: underline;
      color: var(--color-orange-main);
    }
  }

</style>
