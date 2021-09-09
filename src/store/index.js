import { createStore } from 'vuex'

export default createStore({
  state: {
    // menu
    menuOpened: false,

    // filters
    pickedFilter: 'world',

    // search
    searchMode: false,
    searchQuery: '',

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
    },

    // search
    setSearchMode(state) {
      state.searchMode = !state.searchMode
    },

    setSearchQuery(state, payload) {
      const {query} = payload
      state.searchQuery = query

      /* if a search query is set (its length is greater than zero),
      then enable the search mode */
      state.searchMode = query.length > 0
    },

    // countries data
    setCountriesData(state, payload) {
      const {data} = payload
      state.countriesData = data
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
          context.commit('setCountriesData', {data: data})
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

    // search
    searchMode(state) {
      return state.searchMode
    },

    searchQuery(state) {
      return state.searchQuery
    },

    // countries data
    countriesData(state) {
      return state.countriesData
    }
  }
})
