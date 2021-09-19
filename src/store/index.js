import { createStore } from 'vuex'

export default createStore({
  state: {
    // menu
    menuOpened: false,

    // filters
    pickedFilter: 'world',
    sortBy: 'Population',
    sortDirection: 'descend',

    // search
    searchMode: false,
    searchQuery: '',

    // comparison list
    comparisonList: [],
    chartColors: {},

    // countries data
    countriesData: [],
    filteredCountriesData: [],

    // local storage
    options: {},

    // dialog
    dialog: {
      show: false,
      component: '',
      title: 'Dialog',
      size: {
        width: '400px',
        height: '300px'
      }
    }
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

      // reset shown cards
      state.shownCards = 0
    },

    setSortBy(state, payload) {
      const {sort} = payload
      state.sortBy = sort
    },

    setSortDirection(state) {
      // data for the button
      const switchDirection = {
        'ascend': 'descend',
        'descend': 'ascend'
      }

      state.sortDirection = switchDirection[state.sortDirection]

      // actually reverse the order
      state.filteredCountriesData = state.filteredCountriesData.reverse()
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

    // comparison list
    modifyComparisonList(state, payload) {
      const {countryName} = payload
      
      if (!state.comparisonList.includes(countryName)) {
        state.comparisonList.push(countryName)

        // chart colors
        const allColors = ['#006699', '#6E4673', '#649E0B', '#F6921E', '#D14343', '#00AFAF']

        // ensure there aren't two countries with the same color
        const availableColors = allColors.filter(color => !Object.values(state.chartColors).includes(color))

        // assign a random color out of the possible ones to the country
        state.chartColors[countryName] = availableColors[Math.floor(Math.random() * availableColors.length)]

        console.log(state.chartColors)
      } else {
        state.comparisonList = state.comparisonList.filter(country => country != countryName)
        state.chartColors = Object.fromEntries(Object.entries(state.chartColors).filter(([country]) => country != countryName))
      }
    },

    setComparisonList(state, payload) {
      const {list, callback} = payload

      state.comparisonList = [...list]

      if (callback) {
        callback(state)
      }
    },

    // countries data
    setCountriesData(state, payload) {
      const {data} = payload
      state.countriesData = data
    },

    setFilteredCountriesData(state) {
      // area filter
      if (state.searchMode) {
        state.filteredCountriesData = state.countriesData.filter(country => {
          return country.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        })
      } else {
        state.filteredCountriesData = state.countriesData.filter(country => {
          let filterId = ''

          if (country.region == 'Americas') {
            if (['Caribbean', 'South America'].includes(country.subregion)) {
              filterId = 'south_america'
            } else {
              filterId = 'north_america'
            }
          } else {
            filterId = country.region.charAt(0).toLowerCase() + country.region.slice(1)
          }

          return filterId == state.pickedFilter || state.pickedFilter == 'world'
        })
      }

      // sort
      state.filteredCountriesData = state.filteredCountriesData.sort((a, b) => {
        const sortingComparators = {
          'Name': a.name.localeCompare(b.name),
          'Population': a.population < b.population ? 1 : -1,
          'Area': a.area < b.area ? 1 : -1
        }

        return sortingComparators[state.sortBy]
      })

      // order (keep it)
      if (state.sortDirection == 'ascend') {
        state.filteredCountriesData = state.filteredCountriesData.reverse()
      }
    },

    // local storage
    syncOptions(state) {
      if (!localStorage.localOptions) {
        localStorage.setItem('localOptions', JSON.stringify({
          darkMode: false
        }))
      }

      state.options = JSON.parse(localStorage.localOptions)
    },

    changeOption(state, payload) {
      const {option, value} = payload

      state.options[option] = value
      localStorage.setItem('localOptions', JSON.stringify(state.options))
    },

    // dialog
    setDialog(state, payload) {
      state.dialog = {
        ...state.dialog,
        ...payload
      }
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
          context.commit('setFilteredCountriesData')
        })
    }
  }
})
