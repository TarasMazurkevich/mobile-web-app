const state = {
  driver: {}
}

const getters = {
  DRIVER: state => state.driver
}

const mutations = {
  SET_DRIVER: (state, val) => {
    state.driver = val
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
