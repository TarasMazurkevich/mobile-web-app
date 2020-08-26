import axios from 'axios'

const state = {
  userInfo: {
    username: '',
    password: ''
  },
  accessToken: '',
  refreshToken: '',
  wsToken: '',
  applicationId: '9e3952e5-6e99-4f23-b4dc-a790ac58d538',
  secret: 'test12345'
}

const getters = {
  USER_INFO: state => state.userInfo,
  USER_NAME: state => state.userInfo.username,
  USER_PASSWORD: state => state.userInfo.password,

  ACCESS_TOKEN: state => state.accessToken,
  REFRESH_TOKEN: state => state.refreshToken,
  WS_TOKEN: state => state.wsToken,

  APPLICATION_ID: state => state.applicationId,
  SECRET: state => state.secret
}

const mutations = {
  SET_USER_INFO: (state, val) => {
    state.userInfo = val
  },
  SET_ACCESS_TOKEN: (state, val) => {
    state.accessToken = val
  },
  SET_REFRESH_TOKEN: (state, val) => {
    state.refreshToken = val
  },
  SET_WS_TOKEN: (state, val) => {
    state.wsToken = val
  }
}

const actions = {
  AUTHORIZATION: async ({ state, getters, commit }, loginData) => {
    const { data } = await axios({
      url: 'https://excelpro.eu/api/v1/auth',
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': 'https://excelpro.eu',
        'Content-Type': 'application/json'
      },
      data: {
        username: loginData.username,
        password: loginData.password,
        applicationid: getters.APPLICATION_ID,
        secret: getters.SECRET
      },
      json: true
    })

    try {
      console.log('AUTH: set tokens/localStorage and user login data')
      console.log(data)

      localStorage.setItem('AccessToken', data.AccessToken)
      commit('SET_ACCESS_TOKEN', data.AccessToken)

      localStorage.setItem('RefreshToken', data.RefreshToken)
      commit('SET_REFRESH_TOKEN', data.RefreshToken)

      localStorage.setItem('WsToken', data.WsToken)
      commit('SET_WS_TOKEN', data.WsToken)

      localStorage.setItem('LoginData', loginData)
      commit('SET_USER_INFO', loginData)
    } catch (err) {
      throw new Error(err)
    }
  }
}

const moduleStore = {
  state, getters, mutations, actions
}

export default moduleStore
