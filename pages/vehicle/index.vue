<template>
  <main class="profile">
    <header class="profile_header">
      <a @click="routeBack" class="profile-link">
        <i class="fas fa-arrow-left" />
      </a>
      <h1 class="profile-vehicleName">
        {{ VEHICLE.Make }} {{ VEHICLE.Model }} {{ VEHICLE.Type }}
        <span class="profile-vehicleName-year">{{ VEHICLE.Year }}</span>
      </h1>
      <p class="profile-passengers">
        <span class="profile-passengers-icon"><i class="far fa-user-circle" /></span>28
      </p>
    </header>
    <article class="profile_article">
      <div class="profile_info">
        <div class="profile-avatar">
          <img :src="VEHICLE.ImageUrl" alt="Image for vehicle" class="profile-avatar-img">
        </div>
        <ul class="profile_stats">
          <li class="profile_stat">
            <p class="profile_stat-name">
              Cleanes
            </p>
            <span class="profile_stat-percent">97%</span>
          </li>
          <li class="profile_stat">
            <p class="profile_stat-name">
              Mechanical condition
            </p>
            <span class="profile_stat-percent">100%</span>
          </li>
        </ul>
      </div>
      <ul class="profile_docs">
        <li class="profile_doc">
          <div class="profile_doc-wrap">
            <p class="profile_doc-name">
              DOT inspection
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
              Commercial auto liability insurance
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
              Vhicle registration
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
              Vhicle registration
            </p>
            <p class="profile_doc-date">
              08/03/2022
            </p>
          </div>
          <span class="profile_doc-icon"><i class="fas fa-check" /></span>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['VEHICLE'])
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
    overflow: hidden;

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

    &-vehicleName {
      font-size: 20px;
      font-weight: 900;

      &-year {
        font-size: 14px;
        font-weight: 400;
        color: var(--color-font-secondary);
      }
    }

    &-passengers {
      justify-self: end;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 900;
      color: var(--color-font-primary);

      &-icon {
        margin-right: 3px;
        font-size: 20px;
      }
    }

    &_article {
      display: grid;
      grid-template-rows: auto 1fr;
      padding-top: 1.5em;
    }

    &_info {
      display: grid;
      grid-template-rows: auto 2fr;
      grid-column-gap: 1em;
      border-bottom: {
        width: 1px;
        style: solid;
        color: var(--color-line);
      }
    }

    &-avatar {
      justify-self: center;
      align-self: center;
      border: {
        width: 1px;
        style: solid;
        color: var(--color-line);
      }
      width: 100%;
      height: 30vh;
      object-fit: cover;

      &-img {
        width: 100%;
        height: 100%;
      }
    }

    &_stats {
      display: flex;
      flex-direction: column;
      padding: {
        top: 1em;
        right: 1em;
        left: 1em;
        bottom: 1em;
      }
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
      padding: {
        right: 1em;
        left: 1em;
      }
      height: 100%;
      overflow-y: auto;
    }

    &_doc {
      display: grid;
      grid-template-columns: 4fr 1fr;
      align-items: center;
      padding-top: 1em;
      padding-bottom: 1em;

      &:not(:first-child) {
        border-top: {
          width: 1px;
          style: solid;
          color: var(--color-line);
        }
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
  }

</style>
