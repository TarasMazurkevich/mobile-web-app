import Vue from 'vue'
import Vuex from 'vuex'
import cors from 'cors'

import Auth from '~/store/auth.js'
import Reservations from '~/store/reservations.js'
import Contacts from '~/store/contacts.js'
import Map from '~/store/map.js'

import AddContact from '~/store/addContact.js'

import Driver from '~/store/driver.js'
import Vehicle from '~/store/vehicle.js'

Vue.use(cors)
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
  modules: {
    Auth,
    Reservations,
    Contacts,
    Map,
    AddContact,
    Driver,
    Vehicle
  },
  strict: debug
})

export default store
