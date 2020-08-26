<template>
  <div @touchstart="handleTouchStart($event)" @touchend="handleTouchEnd($event)" :class="{open: isOpen, close: !isOpen}" class="pnl" data-panel="closest">
    <section v-if="closest" class="pnl_reservation">
      <header class="pnl_block" data-class="main-info">
        <div class="pnl_location">
          <p class="pnl_location-txt">
            {{ closest.PULocation }}
          </p>
          <p class="pnl_location-txt">
            {{ closest.DOLocation }}
          </p>
        </div>
        <p class="pnl-price">
          <i class="fas fa-dollar-sign" /> {{ Math.ceil(closest.Price * 100) / 100 }}
        </p>
        <p class="pnl-datetime">
          <i class="far fa-clock" /> {{ closest.PUDate.split('T')[0] }} / {{ closest.PUTime }}
        </p>
      </header>

      <article class="pnl_block" data-class="participants">
        <div class="pnl_passengers">
          <span class="pnl_passengers-count">{{ closest.Passengers.length }}</span>
          <p class="pnl_passengers-txt">
            passengers
          </p>
        </div>
        <div class="pnl_responsible">
          <span class="pnl_responsible-icon"><i class="fas fa-award" /></span>
          <p class="pnl_responsible-txt">
            You are responsible for that trip
          </p>
        </div>
      </article>

      <article
        @click="viewChauffeur"
        class="pnl_block"
        data-class="chauffeur"
      >
        <p class="pnl-subtitle">
          Chauffeur
        </p>
        <div class="pnl_wrap">
          <div class="pnl-avatar">
            <img src="/svg/user.svg" alt="Chauffeur avatar" class="pnl-avatar-img">
          </div>
          <p class="pnl-txt">
            {{ closest.Driver ? closest.Driver.FirstName : 'Name' }} {{ closest.Driver ? closest.Driver.LastName : 'surname' }}
          </p>
        </div>
        <span class="pnl-more">
          <i class="fas fa-chevron-right" />
        </span>
      </article>
      <article
        @click="viewVehicle"
        class="pnl_block"
        data-class="vehicle"
      >
        <p class="pnl-subtitle">
          Vehicle
        </p>
        <div class="pnl_wrap">
          <div class="pnl-avatar">
            <img :src="closest.Vehicle.ImageUrl" alt="Vhicle avatar" class="pnl-avatar-img">
          </div>
          <p class="pnl-txt">
            {{ closest.Vehicle.Model }} {{ closest.Vehicle.Type }}
          </p>
        </div>
        <span class="pnl-more">
          <i class="fas fa-chevron-right" />
        </span>
      </article>
    </section>
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
    swipeTop () {
      this.isOpen = true
    },
    swipeBottom () {
      this.isOpen = false
    },
    handleTouchStart (e) {
      this.yDown = e.touches[0].clientY
    },
    handleTouchEnd (e) {
      if (!this.yDown) {
        return
      }

      const yUp = e.changedTouches[0].clientY

      const yDiff = this.yDown - yUp

      if (yDiff > 100) {
        this.swipeTop()
      }
      if (yDiff < -100) {
        this.swipeBottom()
      }

      this.yDown = null
    },
    // --------------------------------------------
    viewChauffeur () {
      const driverInClosestReservation = this.$store.getters.CLOSEST_RESERVATION.Driver
      this.$store.commit('SET_DRIVER', driverInClosestReservation)
      this.$router.push('/chauffeur')
    },
    viewVehicle () {
      const vehicleInClosestReservation = this.$store.getters.CLOSEST_RESERVATION.Vehicle
      this.$store.commit('SET_VEHICLE', vehicleInClosestReservation)
      this.$router.push('/vehicle')
    }
  }
}

</script>

<style lang="scss" scoped>

  // MAIN Style for PANEL -------------------------------
  [data-panel="closest"] {
    font-family: 'Roboto', sans-serif;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;

    padding-bottom: 0;
    width: 100vw;
    height: 70vh;
    overflow: hidden;

    transition: transform .2s;

    &.open {
      transform: translateY(0);
    }
    &.close {
      transform: translateY(45vh);

      [data-class="closest"] {
        overflow: hidden;
      }
    }

    .pnl {
      &_reservation {
        border-radius: 10px;
        padding: 5px .8em;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: var(--color-font-in-colorful);

        &:not(:first-child) {
          margin-top: .5em;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
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
          grid-template-columns: repeat(2, 1fr);
          grid-row-gap: 5px;
          grid-template-areas: 'location location' 'price datetime';
        }

        &[data-class="participants"] {
          display: grid;
          grid-template-columns: 2fr 3fr;
          justify-items: center;
          align-items: center;
          padding: {
            top: .5em;
            bottom: .5em;
          }
          height: 130px;
        }

        &[data-class="chauffeur"], &[data-class="vehicle"] {
          display: grid;
          grid-template-rows: 1em 4em;
          grid-template-columns: 5fr 1fr;
          grid-row-gap: 5px;
          grid-template-areas: 'subtitle subtitle' 'info more';
        }
      }

      &_passengers {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        padding: .5em;
        height: 75%;
        background-color: var(--color-line);
        font-size: 12px;
        color: var(--color-font-primary);

        &-count {
          font-size: 16px;
          font-weight: 900;
        }
      }

      &_responsible {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: {
          width: 1px;
          style: solid;
          color: var(--color-line);
        }
        width: 100%;
        height: 100%;
        color: var(--color-mint-main);
        font-size: 16px;
        font-weight: 900;

        &-icon {
          font-size: 30px;
        }

        &-txt {
          width: 50%;
          text-align: center;
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

      &-subtitle {
        grid-area: subtitle;
        font-size: 16px;
        font-weight: 900;
      }

      &_wrap {
        display: grid;
        grid-template-columns: 4em 1fr;
        grid-column-gap: 10px;
        align-items: center;
        grid-area: info;
      }

      &-avatar {
        border: {
          width: 1px;
          style: solid;
          color: var(--color-line);
          radius: 50%;
        }
        height: 4em;
        width: 4em;
        overflow: hidden;
        object-fit: cover;

        &-img {
          width: 100%;
          height: 100%;
        }
      }

      &-more {
        grid-area: more;
        justify-self: center;
        align-self: center;
      }

      &-txt {
        font-size: 14px;
        font-weight: 400;
        color: var(--color-font-secondary);
      }
    }
  }

</style>
