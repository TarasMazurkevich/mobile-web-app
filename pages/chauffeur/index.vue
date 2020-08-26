<template>
  <main class="profile">
    <header class="profile_header">
      <a @click="routeBack" class="profile-link">
        <i class="fas fa-arrow-left" />
      </a>
      <h1 class="profile-fullName">
        {{ DRIVER ? DRIVER.FirstName : 'Name' }} {{ DRIVER ? DRIVER.LastName : 'Surname' }}
      </h1>
      <p class="profile-star">
        5<span class="profile-star-icon"><i class="fas fa-star" /></span>
      </p>
    </header>
    <article class="profile_article">
      <div class="profile_info">
        <div class="profile-avatar">
          <img src="/svg/user.svg" alt="Chauffeur avatar" class="profile-avatar-img">
        </div>
        <ul class="profile_stats">
          <li class="profile_stat">
            <p class="profile_stat-name">
              On-time arrival
            </p>
            <span class="profile_stat-percent">97%</span>
          </li>
          <li class="profile_stat">
            <p class="profile_stat-name">
              On-time arrival
            </p>
            <span class="profile_stat-percent">97%</span>
          </li>
        </ul>
      </div>
      <ul class="profile_docs">
        <li class="profile_doc">
          <div class="profile_doc-wrap">
            <p class="profile_doc-name">
              Chauffeur License
            </p>
            <p class="profile_doc-date">
              08/03/2022
            </p>
          </div>
          <span class="profile_doc-icon"><i class="fas fa-check" /></span>
        </li>
        <li class="profile_doc">
          <div class="profile_doc-wrap">
            <p class="profile_doc-name">
              Chauffeur License
            </p>
            <p class="profile_doc-date">
              08/03/2022
            </p>
          </div>
          <span class="profile_doc-icon"><i class="fas fa-check" /></span>
        </li>
      </ul>
    </article>
    <footer class="profile_footer">
      <a class="profile-call" href=""><i class="fas fa-phone-alt" /> Call Erick</a>
    </footer>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['DRIVER'])
  },
  methods: {
    routeBack () {
      this.$router.go(-1)
    }
  }
}

</script>

<style lang="scss" scoped>

  .profile {
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

    &-fullName {
      font-size: 20px;
      font-weight: 900;
    }

    &-star {
      justify-self: end;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 900;
      color: var(--color-orange-main);

      &-icon {
        margin-left: 3px;
        font-size: 12px;
      }
    }

    &_article {
      display: grid;
      grid-template-rows: auto 4fr;
      grid-row-gap: 1em;
      padding: {
        top: 1.5em;
        right: 1em;
        left: 1em;
      }
    }

    &_info {
      display: grid;
      grid-template-columns: auto 2fr;
      grid-column-gap: 1em;
      border-bottom: {
        width: 1px;
        style: solid;
        color: var(--color-line);
      }
      padding-bottom: 1em;
    }

    &-avatar {
      justify-self: center;
      align-self: center;
      border: {
        width: 1px;
        style: solid;
        color: var(--color-line);
        radius: 50%;
      }
      width: 6em;
      height: 6em;
      overflow: hidden;
      object-fit: cover;

      &-img {
        width: 100%;
        height: 100%;
      }
    }

    &_stats {
      display: flex;
      flex-direction: column;
    }

    &_stat {
      display: grid;
      grid-template-columns: 2fr 1fr;
      font-size: 14px;
      font-weight: 400;

      &:not(:first-child) {
        padding-top: .5em;
      }

      &-percent {
        justify-self: end;
        font-weight: 900;
      }
    }

    &_docs {
      display: flex;
      flex-direction: column;
    }

    &_doc {
      display: grid;
      grid-template-columns: 4fr 1fr;
      align-items: center;
      padding-bottom: 1em;

      &:not(:first-child) {
        border-top: {
          width: 1px;
          style: solid;
          color: var(--color-line);
        }
        padding-top: 1em;
      }

      &-name {
        font-size: 18px;
        font-weight: 900;
      }

      &-date {
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
        color: var(--color-font-primary);
      }

      &-icon {
        justify-self: end;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        background-color: var(--color-mint-main);
        color: var(--color-font-in-colorful);
      }
    }

    &_footer {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-orange-main);

      a {
        font-size: 18px;
        font-weight: 900;
        color: var(--color-font-in-colorful);
      }
    }
  }

</style>
