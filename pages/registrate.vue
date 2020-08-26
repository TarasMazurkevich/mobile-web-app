<template>
  <main class="registrate">
    <header class="registrate_header">
      <NuxtLink to="/login" class="registrate-link">
        Cancel
      </NuxtLink>
      <h1 class="registrate-title">
        {{ steps[currentStep].title }}
      </h1>
    </header>
    <section class="registrate_section">
      <form @keydown.enter="$event.preventDefault()" action="" class="registrate_form">
        <Step v-show="currentStep === 0" :inputs-data="steps[0].data" />
        <Step v-show="currentStep === 1" :inputs-data="steps[1].data" />
        <Step v-show="currentStep === 2" :inputs-data="steps[2].data" />
        <div v-if="currentStep === steps.length - 1" class="registrate_submitWrap">
          <button @click="submit($event)" type="submit" name="register" class="registrate-submit">
            Sign Up
          </button>
          <p class="registrate-label">
            By clicking sign up i am agree with
            <NuxtLink to="/registrate" class="registrate-link">
              Privacy Policy
            </NuxtLink>
            and
            <NuxtLink to="/registrate" class="registrate-link">
              Terms Of Use
            </NuxtLink>
          </p>
        </div>
      </form>
    </section>
    <footer class="registrate_footer">
      <button
        v-show="currentStep"
        @click="backStep"
        class="registrate-stepBtn"
        data-action="back"
      >
        Back
      </button>
      <button
        v-show="currentStep < steps.length - 1"
        @click="nextStep"
        class="registrate-stepBtn"
        data-action="next"
      >
        Next
      </button>
    </footer>
  </main>
</template>

<script>

import Step from '~/components/sections/RegistrateStepComponent.vue'

export default {
  components: {
    Step
  },
  data () {
    return {
      steps: [
        {
          title: 'Select Company',
          data: [
            { value: '', name: 'companyId', type: 'text', label: 'Please write Company ID' }
          ]
        },
        {
          title: 'User Info',
          data: [
            { value: '', name: 'firstName', type: 'text', label: 'Please write Your first name' },
            { value: '', name: 'lastName', type: 'text', label: 'Please write Your last name' },
            { value: '', name: 'userName', type: 'text', label: 'Please write Your user name' },
            { value: '', name: 'phone', type: 'phone', label: 'Please write Your phone' }
          ]
        },
        {
          title: 'Create Password',
          data: [
            { value: '', name: 'password', type: 'password', label: 'Please create password' },
            { value: '', name: 'repeatPassword', type: 'password', label: 'Please repeat u password' }
          ]
        }
      ],
      // ----------------------------------------------------------------------------------------
      currentStep: 0
    }
  },
  methods: {
    nextStep () {
      this.currentStep++
    },
    backStep () {
      this.currentStep--
    },
    submit (e) {
      e.preventDefault()

      this.$router.push('/login')
    }
  }
}

</script>

<style lang="scss" scoped>

  .registrate {
    font-family: 'Roboto', sans-serif;
    display: grid;
    grid-template-rows: 7vh 1fr 7vh;
    padding: 1rem;
    width: 100vw;
    height: 100vh;

    &_header {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      align-items: center;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: .5px;
        background-color: var(--color-line);
      }
    }

    &-link {
      text-decoration: underline;
      color: var(--color-orange-main);
    }

    &-title {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
    }

    &_section {
      margin-top: 20px;
      padding-bottom: 20px;
    }

    &_form {
      display: grid;
      grid-template-rows: 1fr auto;
      grid-gap: 1em;
      align-items: start;
      height: 100%;
    }

    &-label {
      margin-top: .3em;
      color: var(--color-font-secondary);
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
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: "back next";
      grid-gap: 1em;
    }

    &-stepBtn {
      border-radius: 6px;
      padding: .5em;
      width: 100%;
      text-align: center;
      background-color: var(--color-orange-main);
      color: white;
      font-weight: 400;
      font-size: 18px;

      &[data-action="back"] {
        grid-area: back;
      }
      &[data-action="next"] {
        grid-area: next;
      }
    }
  }

</style>
