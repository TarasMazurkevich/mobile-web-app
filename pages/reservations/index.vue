<template>
  <main class="trips">
    <header class="trips_header">
      <NuxtLink to="/" class="trips-link">
        <i class="fas fa-arrow-left" />
      </NuxtLink>
      <h1 class="trips-title">
        Trips
      </h1>
    </header>
    <section class="trips_section">
      <div class="trips_radioGroup">
        <div class="trips_radioWrap">
          <input
            id="active"
            v-model="tripsFilter"
            value="active"
            type="radio"
            class="trips-radio"
            checked
          >
          <label for="active" class="trips-radio-label">Active</label>
        </div>
        <div class="trips_radioWrap">
          <input
            id="completed"
            v-model="tripsFilter"
            value="completed"
            type="radio"
            class="trips-radio"
          >
          <label for="completed" class="trips-radio-label">Completed</label>
        </div>
      </div>
      <ul v-show="tripsFilter === 'active'" class="trips_list">
        <li v-for="(reservation, i) in ACTIVE_RESERVATIONS" :key="i" class="trips_item">
          <div class="trips_location">
            <p class="trips_location-txt">
              {{ reservation.PULocation }}
            </p>
            <p class="trips_location-txt">
              {{ reservation.DOLocation }}
            </p>
          </div>
          <p class="trips-price">
            <i class="fas fa-dollar-sign" /> {{ reservation.Price }}
          </p>
          <p class="trips-datetime">
            <i class="far fa-clock" /> {{ reservation.PUDate.split('T')[0] }} / {{ reservation.PUTime }}
          </p>
        </li>
      </ul>
      <ul v-show="tripsFilter === 'completed'" class="trips_list">
        <li v-for="(reservation, i) in COMPLETED_RESERVATIONS" :key="i" class="trips_item">
          <div class="trips_location">
            <p class="trips_location-txt">
              {{ reservation.PULocation }}
            </p>
            <p class="trips_location-txt">
              {{ reservation.DOLocation }}
            </p>
          </div>
          <p class="trips-price">
            <i class="fas fa-dollar-sign" /> {{ reservation.Price }}
          </p>
          <p class="trips-datetime">
            <i class="far fa-clock" /> {{ reservation.PUDate.split('T')[0] }} / {{ reservation.PUTime }}
          </p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tripsFilter: 'active'
    }
  },
  computed: {
    ...mapGetters(['ACTIVE_RESERVATIONS', 'COMPLETED_RESERVATIONS'])
  }
}

</script>

<style lang="scss" scoped>

  .trips {
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
      padding: {
        top: 1em;
        left: 1em;
        right: 1em;
      }
    }

    &_radioGroup {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3px;
      border-radius: 10px;
      padding: 2px;
      background-color: var(--color-line);
    }

    &_radioWrap {
      display: grid;
      justify-items: stretch;
      align-items: stretch;
      width: 100%;
      text-align: center;
    }

    &-radio {
      display: none;

      &:checked + .trips-radio-label {
        background-color: var(--color-bg-block);
      }

      &-label {
        border-radius: 8px;
        padding: {
          top: .5em;
          bottom: .5em;
        }
        width: 100%;
        background-color: transparent;
      }
    }

    &_list {
      display: grid;
      grid-template-rows: auto;
      align-items: start;
    }

    &_item {
      display: grid;
      grid-template-rows: 1fr auto;
      grid-template-columns: auto 1fr;
      grid-row-gap: 5px;
      grid-template-areas: 'location location' 'price datetime';
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

    &_location {
      grid-area: location;
      justify-self: start;

      &-txt {
        font-size: 20px;
        font-weight: 900;
      }
    }

    &-price {
      grid-area: price;
      justify-self: start;
      font-size: 14px;
      font-weight: 900;
    }

    &-datetime {
      grid-area: datetime;
      justify-self: end;
      font-size: 14px;
      font-weight: 900;
    }

  }

</style>
