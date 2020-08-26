<template>
  <div class="pnl" data-panel="index">
    <div class="pnl_slotWrap">
      <slot name="newReservation">
        <section class="pnl_reservation" data-class="create">
          <div class="pnl_inputGroup">
            <place-autocomplete-field
              v-model="PULocation"
              :api-key="$store.getters.MAP_TOKEN"
              name="PUL"
              placeholder="Pick up location"
            />
            <place-autocomplete-field
              v-model="DOLocation"
              :api-key="$store.getters.MAP_TOKEN"
              name="PUL"
              placeholder="Drop of location"
            />
          </div>
          <div class="pnl_btnGroup">
            <button @click="goToMakeReservation" class="pnl-btn">
              Get a quote
            </button>
            <button @click="goToMakeReservation" class="pnl-btn">
              Make a reservation
            </button>
          </div>
        </section>
      </slot>
      <slot name="closest">
        <section @click="goToClosestReservation" class="pnl_reservation" data-class="closest">
          <article v-if="closest" class="pnl_block" data-class="main-info">
            <div class="pnl_location">
              <p class="pnl_location-txt">
                {{ closest.PULocation }}
              </p>
              <p class="pnl_location-txt">
                {{ closest.DOLocation }}
              </p>
            </div>
            <span to="/" class="pnl-more">
              <i class="fas fa-arrow-right" />
            </span>
            <p class="pnl-price">
              <i class="fas fa-dollar-sign" /> {{ Math.ceil(closest.Price * 100) / 100 }}
            </p>
            <p class="pnl-datetime">
              <i class="far fa-clock" /> {{ closest.PUDate.split('T')[0] }} / {{ closest.PUTime }}
            </p>
          </article>
          <p v-else class="pnl-notFound">
            You haven't closest trips
          </p>
        </section>
      </slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isOpen: false,
      PULocation: '',
      DOLocation: ''
    }
  },
  computed: {
    ...mapGetters({ closest: 'CLOSEST_RESERVATION' })
  },
  methods: {
    goToMakeReservation () {
      const self = this
      this.$router.push({
        path: '/reservations/add',
        query: {
          PULocation: self.PULocation,
          DOLocation: self.DOLocation
        }
      })
    },
    goToClosestReservation () {
      this.$router.push('/reservations/closest')
    }
  }
}

</script>

<style lang="scss">

  // MAIN Style for PANEL -------------------------------
  [data-panel="index"] {
    font-family: 'Roboto', sans-serif;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;

    padding-bottom: 0;
    width: 100vw;
    height: 40vh;
    overflow: hidden;

    transition: transform .2s;
  }

  [data-panel="index"] .pnl {
    &_reservation {
      border-radius: 10px;
      padding: 5px .8em;
      background-color: var(--color-font-in-colorful);

      &:not(:first-child) {
        margin-top: .5em;
      }

      &[data-class="create"] {
        display: grid;
        grid-template-rows: 3fr 1fr;
        grid-row-gap: 10px;
        padding: 1em 1.5em;
        width: 100%;
        height: 25vh;
      }

      &[data-class="closest"] {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        height: 55vh;
        overflow: auto;
      }
    }

    &-notFound {
      padding-top: 1em;
      font-size: 32px;
      text-align: center;
    }

    &_block {
      font-family: 'Roboto', sans-serif;
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

      &[data-class="main-info"] {
        display: grid;
        grid-template-rows: 1fr 1em;
        grid-template-columns: repeat(3, 1fr);
        grid-row-gap: 1em;
        grid-template-areas: 'location location more' 'price datetime datetime';
      }
    }

    &_location {
      grid-area: location;
      justify-self: start;

      &-txt {
        font-size: 16px;
        font-weight: 900;
      }
    }

    &-price {
      grid-area: price;
      justify-self: start;
      font-size: 12px;
      font-weight: 900;
    }

    &-datetime {
      grid-area: datetime;
      justify-self: end;
      font-size: 12px;
      font-weight: 900;
    }

    &-more {
      grid-area: more;
      justify-self: end;
      align-self: center;
      font-size: 20px;
    }
  }

  [data-class="create"] .autocomplete-field {
    .form-control {
      border: {
        width: 1.5px;
        style: solid;
        color: var(--color-line);
      }
      border-radius: 6px;
      padding: {
        top: .1em;
        left: .5em;
        bottom: .1em;
      }
      width: 100%;
      height: 40px;
      font-weight: 400;
      font-size: 18px;
      color: var(--color-font-secondary);

      &:not(:first-child) {
        margin-top: 5px;
      }
    }
  }

  // MAIN Style for CREATE RESERVATION block -------------------------------
  [data-class="create"] .pnl {
    &_inputGroup {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      width: 100%;
      height: 100%;
    }
    &_btnGroup {
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-column-gap: 10px;
      width: 100%;
      height: 100%;
    }

    &-input {
      border: {
        width: 1.5px;
        style: solid;
        color: var(--color-line);
      }
      border-radius: 6px;
      padding: {
        top: .1em;
        left: .5em;
        bottom: .1em;
      }
      width: 100%;
      font-weight: 400;
      font-size: 18px;
      color: var(--color-font-secondary);

      &:not(:first-child) {
        margin-top: 5px;
      }
    }

    &-btn {
      border-radius: 6px;
      width: 100%;
      height: 100%;
      background-color: var(--color-orange-main);
      color: white;
      font-weight: 400;
      font-size: 18px;
    }
  }

</style>
