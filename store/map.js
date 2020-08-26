const state = {
  route: {
    PULocation: '',
    Stops: [],
    DOLocation: ''
  },
  mapToken: 'AIzaSyANuS06_tELcFo0RQ_mmgyUBt_sGJcUHUs'
}

const getters = {
  ROUTE: state => state.route,
  ROUTE_PUL: state => state.route.PULocation,
  ROUTE_STOPS: state => state.route.Stops,
  ROUTE_DOL: state => state.route.DOLocation,
  MAP_TOKEN: state => state.mapToken
}

const mutations = {
  REFRESH_ROUTE: (state, val) => {
    state.route = val
  },
  SET_PUL: (state, val) => {
    state.route.PULocation = val
  },
  SET_DOL: (state, val) => {
    state.route.DOLocation = val
  },
  SET_STOPS: (state, val) => {
    state.route.Stops = val
  }
}

const moduleStore = {
  state, getters, mutations
}

export default moduleStore
