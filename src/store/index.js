import { createStore } from 'vuex'

export default createStore({
  state: {
    // menu
    menuOpened: false,

    // filters
    pickedFilter: 'world',

    // countries data
    countriesData: []
  },
  mutations: {
    // menu
    setMenuOpened(state) {
      state.menuOpened = !state.menuOpened
    },

    // filters
    setPickedFilter(state, payload) {
      const {id} = payload
      state.pickedFilter = id
    }
  },
  actions: {
    // countries data
    getCountriesData(context) {
      fetch('https://restcountries.eu/rest/v2/all')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          context.state.countriesData = data
        })
    }
  },
  getters: {
    // menu
    menuOpened(state) {
      return state.menuOpened
    },

    // filters
    pickedFilter(state) {
      return state.pickedFilter
    },

    // countries data
    countriesData(state) {
      return state.countriesData
    }
  }
})
