const state = {
  vehicle: {}
}

const getters = {
  VEHICLE: state => state.vehicle
}

const mutations = {
  SET_VEHICLE: (state, val) => {
    state.vehicle = val
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
