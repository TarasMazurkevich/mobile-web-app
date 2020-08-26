import axios from 'axios'

const state = {
  contacts: []
}

const getters = {
  CONTACTS: state => state.contacts
}

const mutations = {
  SET_CONTACTS: (state, val) => {
    state.contacts = val
  }
}

const actions = {
  GET_ALL_CONTACTS: async ({ state, getters, commit }) => {
    const { data } = await axios({
      url: 'https://excelpro.eu/api/v1/contacts',
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': 'https://excelpro.eu',
        'Content-Type': 'application/json'
      },
      params: {
        accesstoken: getters.ACCESS_TOKEN
      }
    })

    console.log(data)
    commit('SET_CONTACTS', data)
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
