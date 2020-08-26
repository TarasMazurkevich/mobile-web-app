<template>
  <div @touchstart="handleTouchStart($event)" @touchend="handleTouchEnd($event)" :class="{open: isOpenReservePanel, close: !isOpenReservePanel}" class="pnl" data-panel="makeReservation">
    <section class="pnl_reservation">
      <div class="pnl_block" data-class="location">
        <place-autocomplete-field
          v-model="reservation.PULocation"
          :api-key="$store.getters.MAP_TOKEN"
          name="PUL"
          placeholder="Pick up location"
        />
        <div v-for="(stop, i) in reservation.Stops" :key="i" class="pnl_inputWrap">
          <place-autocomplete-field
            v-model="stop.location"
            :api-key="$store.getters.MAP_TOKEN"
            :placeholder="`Stop ${i + 1}`"
            name="DOL"
          />

          <span :data-delete="stop.location" @click="deleteStop($event)" class="pnl-input-icon"><i class="fas fa-times" /></span>
        </div>
        <div class="pnl_inputWrap">
          <place-autocomplete-field
            v-model="reservation.DOLocation"
            :api-key="$store.getters.MAP_TOKEN"
            name="DOL"
            placeholder="Drop of location"
          />
          <span @click="addNewStop" class="pnl-input-icon"><i class="fas fa-plus" /></span>
        </div>
      </div>
      <div class="pnl_block" data-class="extra">
        <div class="pnl_extra">
          <datetime
            v-model="datetime"
            type="datetime"
            use12-hour
            input-id="datetime"
            class="pnl_datetime"
          >
            <label slot="before" for="datetime">
              <span><i class="far fa-clock" /></span>
            </label>
            <span slot="after" class="description">{{ datetime ? datetime : 'Now' }}</span>
          </datetime>
        </div>
        <div class="pnl_extra">
          <button @click="opneParticipantPanel" class="pnl_extra-icon">
            <i class="fas fa-user-plus" />
          </button>
          <span class="pnl_extra-desc">{{ reservation.Passengers.length === 0 ? 'Add passenger' : 'Added' }}</span>
        </div>
        <div class="pnl_extra">
          <div class="pnl_extra-icon">
            <span><i class="fas fa-shopping-bag" /></span>
          </div>
          <div class="pnl_extra-count">
            <span @click="minusBag" class="plus"><i class="fas fa-minus" /></span>
            <p class="txt">
              {{ reservation.BagCount }}
            </p>
            <span @click="plusBag" class="minus"><i class="fas fa-plus" /></span>
          </div>
        </div>
      </div>
      <div class="pnl_block" data-class="vehicle">
        <div @click="openVehiclePanel" class="pnl-select">
          <div class="pnl_wrap">
            <div class="pnl-avatar">
              <img src="#" alt="Vhicle avatar" class="pnl-avatar-img">
            </div>
            <p class="pnl-txt">
              Model Type
            </p>
          </div>
          <span class="pnl-more">
            <i class="fas fa-chevron-right" />
          </span>
        </div>
      </div>
      <footer class="pnl_footer">
        <div class="pnl_footer-txt">
          <h2>Estimated arrival time:</h2>
          <p>7 Feb, 20:32</p>
        </div>
        <button class="pnl_footer-reserve">
          Reserve
        </button>
      </footer>
    </section>
    <section :class="{open: isOpenParticipantPanel, close: !isOpenParticipantPanel}" class="participant">
      <header class="participant_header">
        <h2 class="participant-title">
          Add Participants
        </h2>
      </header>
      <article class="participant_block">
        <ul class="participant_passengers">
          <h2 class="participant_passengers-title">
            Selected passengers
          </h2>
          <li v-for="(passenger, i) in reservation.Passengers" :key="i" class="participant_passenger">
            <div class="participant_passenger_info">
              <div class="participant_passenger-avatar">
                <img src="/svg/user.svg" alt="Chauffeur avatar" class="participant_passenger-img">
              </div>
              <p class="participant_passenger-p">
                <span class="participant_passenger-txt">{{ passenger.UserName }}</span>
                <span :data-rship="passenger.Role.toLowerCase()" class="participant_passenger-role">{{ passenger.Role.toLowerCase() }}</span>
              </p>
            </div>
            <div class="participant_passenger_btnGroup">
              <button @click="deletePassenger" :data-username="passenger.UserName" class="participant-deleteP">
                <i class="fas fa-times" />
              </button>
              <button v-if="!reservation.Responsible || (passenger.UserName === reservation.Responsible.UserName)" @click="toggleResponsible" :data-username="passenger.UserName" class="participant-toggleR">
                {{ reservation.Responsible ? 'Responsible' : 'Make a responsible' }}
              </button>
            </div>
          </li>
        </ul>
        <ul class="participant_users">
          <h2 class="participant_users-title">
            All contacts
          </h2>
          <li v-for="(user, i) in allUsers" :key="i" class="participant_user">
            <div class="participant_user_info">
              <div class="participant_user-avatar">
                <img src="/svg/user.svg" alt="Chauffeur avatar" class="participant_user-img">
              </div>
              <p class="participant_user-p">
                <span class="participant_user-txt">{{ user.UserName }}</span>
                <span :data-rship="user.Role.toLowerCase()" class="participant_user-role">{{ user.Role.toLowerCase() }}</span>
              </p>
            </div>
            <button @click="addPassenger" :data-username="user.UserName" class="participant-addP">
              <i class="fas fa-plus" />
            </button>
          </li>
        </ul>
      </article>
      <footer class="participant_footer">
        <button @click="saveParticipant" class="participant_footer-btn">
          Save and close
        </button>
      </footer>
    </section>
    <section :class="{open: isOpenVehiclePanel, close: !isOpenVehiclePanel}" class="vehicle open">
      <ul v-if="!vehicle.currentType" class="vehicle_types">
        <h2>All types</h2>
        <li v-for="(type, i) in vehicle.types" :key="i" @click="selectVehicle" :data-type="type">
          <p>{{ type }}</p>
          <span><i class="fas fa-chevron-right" /></span>
        </li>
      </ul>
      <ul v-else class="vehicle_models">
        <h2>
          <button @click="backToSelectVehicleType" class="vehicle_models-back">
            <i class="fas fa-chevron-left" />
          </button>
          <span>{{ vehicle.currentType }}</span>
        </h2>
        <li v-for="(model, i) in vehicle.models" :key="i">
          <div class="vehicle_model-avatar">
            <img src="" alt="IMG for vehicle model">
          </div>
          <div class="vehicle_model-blockWrap">
            <p /><h3 />
            </p>
            <span><i class="fas fa-chevron-right" /></span>
          </div>
          <button class="vehicle_model-select">
            Select
          </button>
        </li>
      </ul>
      <button @click="closeVehiclePanel" class="vehicle-cansel">
        Cansel
      </button>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isOpenReservePanel: false,
      isOpenParticipantPanel: false,
      isOpenVehiclePanel: false,
      YDown: null,
      datetime: '',
      reservation: {
        PULocation: '201 Railroad St W, Missoula',
        DOLocation: '336 N Charles St, Baltimore',
        Stops: [],
        PUDate: '',
        PUTime: '',
        Passengers: [],
        Responsible: null,
        BagCount: 0,
        VehicleType: '',
        VehicleModel: '',
        Comment: ''
      },
      vehicle: {
        types: ['SUV', 'Sedan', 'Van', 'Bus'],
        currentType: null,
        models: []
      },
      allUsers: []
    }
  },
  computed: {
    ...mapGetters(['ROUTE'])
  },
  created () {
    this.allUsers = [...this.$store.getters.CONTACTS]
    this.reservation.PULocation = this.$route.query.PULocation
    this.reservation.DOLocation = this.$route.query.DOLocation
  },
  mounted () {
    this.$store.commit('SET_PUL', this.$route.query.PULocation)
    this.$store.commit('SET_DOL', this.$route.query.DOLocation)
    window.calculateAndDisplayRoute(window.DIRECTIONS_SERVICE, window.DIRECTIONS_RENDER)
  },
  methods: {
    swipeTop () {
      this.isOpenReservePanel = true
    },
    swipeBottom () {
      this.isOpenReservePanel = false
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
    // ---------------------
    plusBag () {
      this.reservation.BagCount++
    },
    minusBag () {
      if (this.reservation.BagCount <= 0) { return }
      this.reservation.BagCount--
    },
    // ---------------------
    addNewStop () {
      if (this.reservation.Stops[this.reservation.Stops.length - 1]) {
        if (this.reservation.Stops[this.reservation.Stops.length - 1].location.length === 0) { return }
      }

      const newStop = {
        location: '',
        stopover: true
      }
      this.reservation.Stops.push(newStop)
    },
    deleteStop (e) {
      const self = this
      const target = e.target.closest('span')
      const deleteId = target.dataset.delete

      this.reservation.Stops.forEach((stop, i) => {
        if (stop.location === deleteId) {
          self.reservation.Stops.splice(i, 1)
        }
      })
    },
    // ---------------------
    opneParticipantPanel () {
      this.isOpenParticipantPanel = true
    },
    saveParticipant () {
      this.isOpenParticipantPanel = false
    },
    addPassenger (e) {
      const self = this
      const username = e.target.closest('.participant-addP').dataset.username
      const findUser = this.allUsers.find((user, i) => {
        if (user.UserName === username) {
          self.allUsers.splice(i, 1)
          return true
        }
      })

      this.reservation.Passengers.push(findUser)
    },
    deletePassenger (e) {
      const self = this
      const username = e.target.closest('.participant-deleteP').dataset.username
      const findUser = this.reservation.Passengers.find((user, i) => {
        if (user.UserName === username) {
          self.reservation.Passengers.splice(i, 1)
          return true
        }
      })

      // if (this.reservation.Responsible.UserName === findUser.UserName) {
      //   this.reservation.Responsible = null
      // }

      this.allUsers.push(findUser)
    },
    toggleResponsible (e) {
      if (this.reservation.Responsible) {
        this.reservation.Responsible = null
      } else {
        console.log('ok')
        const username = e.target.closest('.participant-toggleR').dataset.username
        const findUser = this.reservation.Passengers.find((user) => {
          if (user.UserName === username) { return true }
        })

        this.reservation.Responsible = findUser
      }
    },
    // ---------------------
    openVehiclePanel () {
      this.isOpenVehiclePanel = true
    },
    closeVehiclePanel () {
      this.isOpenVehiclePanel = false
      this.vehicle.currentType = null
    },
    selectVehicle (e) {
      const currentVehicleType = e.target.closest('li').dataset.type
      this.vehicle.currentType = currentVehicleType
    },
    backToSelectVehicleType () {
      this.vehicle.currentType = null
    }
  }
}

</script>

<style lang="scss">

  [data-panel="makeReservation"] {
    font-family: 'Roboto', sans-serif;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;

    padding-bottom: 0;
    width: 100vw;
    height: 80vh;
    overflow: hidden;

    transition: transform .2s;

    &.open {
      transform: none;
    }
    &.close {
      transform: translateY(80%);
    }

  }

  [data-panel="makeReservation"] .pnl {
    &_reservation {
      border-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      padding: 5px .8em;
      background-color: var(--color-font-in-colorful);

      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
      padding: 1em 1.5em;
      width: 100%;
      height: 100%;
      overflow: auto;
    }

    &_block {
      display: flex;
      width: 100%;

      &[data-class="location"] {
        flex-direction: column;
      }
      &[data-class="extra"] {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 1em;
        margin-top: 20px;
      }

      &[data-class="vehicle"] .pnl {
        &-select {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-column-gap: 1em;
          margin-top: 1em;
          border-top: {
            width: 1px;
            style: solid;
            color: var(--color-line);
            radius: 50%;
          }
          padding-top: 1em;
          padding-bottom: 1em;
          width: 100%
        }
        &_wrap {
          display: grid;
          grid-template-columns: 4em 1fr;
          grid-column-gap: 10px;
          align-items: center;
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

    &_inputWrap {
      display: grid;
      grid-template-columns: 1fr 1em;
      grid-column-gap: 10px;
      align-items: center;
      margin-top: .5em;
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
      height: 40px;
      font-weight: 400;
      font-size: 18px;
      color: var(--color-font-secondary);

      &:not(:first-child) {
        margin-top: 5px;
      }
    }

    &_extra {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        border-radius: 50%;
        width: 3.5em;
        height: 3.5em;
        background-color: var(--color-font-in-colorful);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        span {
          font-size: 2em;
        }
      }

      &-desc {
        text-align: center;
      }

      &-count {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        grid-column-gap: 5px;

        .txt {
          font-size: 1.3em;
        }
      }
    }

    &_footer {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 9;

      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-column-gap: 1em;
      padding: 1em 1.5em;
      width: 100%;

      background-color: hsla(33%, 93%, 54%, .3);

      &-txt {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-row-gap: 10px;
        justify-items: start;
        align-items: center;

        p {
          font-size: 18px;
          font-weight: 900;
        }
      }

      &-reserve {
        justify-self: end;
        align-self: center;

        border-radius: 6px;
        width: 100%;
        height: 40px;
        background-color: var(--color-orange-main);
        color: white;
        font-weight: 400;
        font-size: 18px;
      }
    }

  }

  // DATE TIEME FIELD
  [data-panel="makeReservation"] .pnl_datetime {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1px;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 50%;
      width: 3.5em;
      height: 3.5em;
      background-color: var(--color-font-in-colorful);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

      span {
        font-size: 2em;
      }
    }
    input {
      width: 0;
    }
    .description {
      margin-top: -20px;
      font-size: .8em;
      text-align: center;
    }
  }

  // AUTOCOMPLETE FIELD
  [data-panel="makeReservation"] .autocomplete-field {
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

  // ---------------------- PARTICIPANT PANEL ---------------------------
  [data-panel="makeReservation"] .participant {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-row-gap: 1em;
    align-items: start;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 5px .8em;
    width: 100%;
    height: 100%;
    overflow: hidden;

    background-color: var(--color-font-in-colorful);

    transition: transform .2s;

    &.open {
      transform: none;
    }
    &.close {
      transform: translateY(100%);
    }

    &-title {
      text-align: center;
      font-size: 20px;
      font-weight: 900;
    }

    &_block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
    }

    &_users, &_passengers {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;

      &-title {
        padding-bottom: 10px;
        font-size: 18px;
        font-weight: 900;
      }
    }

    &_passenger {
      &_btnGroup {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        justify-items: end;
        align-items: center;
      }
    }

    &_user, &_passenger {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-gap: 10px;
      margin-bottom: 10px;
      width: 100%;

      &:not(:first-child) {
        padding-top: 10px;
        border-top: {
          width: 1px;
          style: solid;
          color: var(--color-line);
          radius: 50%;
        }
      }

      &_info {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-column-gap: 10px;
        align-items: center;
        padding: 10px 0;
      }

      &-avatar {
        border: {
          width: 1px;
          style: solid;
          color: var(--color-line);
          radius: 50%;
        }
        height: 3em;
        width: 3em;
        overflow: hidden;
        object-fit: cover;
      }
      &-img {
        width: 100%;
        height: 100%;
      }

      &-p {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        align-items: center;
        justify-items: start;
      }

      &-role {
        display: inline-block;
        border-radius: 10px;
        padding: 2px 10px;
        font-size: 10px;
        color: var(--color-font-in-colorful);
      }
    }

    &_footer {
      display: grid;
      align-items: center;
      padding-bottom: .5em;
      height: 100%;

      &-btn {
        border-radius: 6px;
        width: 100%;
        height: 40px;
        background-color: var(--color-orange-main);
        color: white;
        font-weight: 400;
        font-size: 18px;
      }
    }
  }

  // ---------------------- VEHICLE PANEL ---------------------------
  [data-panel="makeReservation"] .vehicle {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;

    display: grid;
    grid-template-rows: 1fr auto;
    grid-row-gap: 1em;
    align-items: start;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 5px .8em;
    width: 100%;
    height: 100%;
    overflow: hidden;

    background-color: var(--color-font-in-colorful);

    transition: transform .2s;

    &.open {
      transform: none;
    }
    &.close {
      transform: translateY(100%);
    }

    &_types, &_models {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    &_models h2 {
      display: grid;
      grid-template-columns: 5fr 6fr;
      justify-items: start;
      align-items: center;
    }

    h2 {
      text-align: center;
      font-size: 20px;
      font-weight: 900;
    }

    li {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-gap: 10px;
      align-items: center;
      margin-top: 1em;
      padding-top: 1em;

      &:not(:first-child) {
        border-top: {
          width: 1px;
          style: solid;
          color: var(--color-line);
          radius: 50%;
        }
      }

      p {
        font-weight: 900;
      }
    }

    &-cansel {
      border-radius: 6px;
      width: 100%;
      height: 40px;
      background-color: var(--color-orange-main);
      color: white;
      font-weight: 400;
      font-size: 18px;
    }
  }

</style>
