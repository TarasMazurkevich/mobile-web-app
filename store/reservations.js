import axios from 'axios'

const state = {
  reservations: []
}

const getters = {
  RESERVATIONS: state => state.reservations,
  ACTIVE_RESERVATIONS: (state) => {
    const activeReservations = []

    state.reservations.forEach((reservation) => {
      if (reservation.Status === 'Active') {
        activeReservations.push(reservation)
      }
    })

    return activeReservations
  },
  COMPLETED_RESERVATIONS: (state) => {
    const completedReservations = []

    state.reservations.forEach((reservation) => {
      if (reservation.Status === 'Completed') {
        completedReservations.push(reservation)
      }
    })

    return completedReservations
  },
  CLOSEST_RESERVATION: (state) => {
    const oldReservationList = [...state.reservations]

    return oldReservationList.sort((prevObj, nextObj) => {
      const parsePrevDate = new Date(prevObj.PUDate.split('T')[0])
      const parseNextDate = new Date(nextObj.PUDate.split('T')[0])

      return (parsePrevDate < parseNextDate) - (parseNextDate < parsePrevDate)
    })[0]
  }
}

const mutations = {
  SET_ALL_RESERVATIONS: (state, val) => {
    state.reservations = val
  }
}

const actions = {
  GET_ALL_RESERVATIONS: async ({ state, getters, commit }) => {
    try {
      const { data } = await axios({
        url: 'https://excelpro.eu/api/v1/reservations',
        method: 'get',
        headers: {
          'Access-Control-Allow-Origin': 'https://excelpro.eu',
          'Content-Type': 'application/json'
        },
        params: {
          accesstoken: getters.ACCESS_TOKEN
        }
      })

      console.log('RESERVATION: set reservation and catch closest')
      console.log(data)
      commit('SET_ALL_RESERVATIONS', data)
    } catch (err) {
      console.log(err)
    }
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
