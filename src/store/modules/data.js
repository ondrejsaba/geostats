const moduleData = {
    namespaced: true,
    state: {
        countriesData: [],
        filteredCountriesData: []
    },
    mutations: {
        setCountriesData(state, { data }) {
            state.countriesData = data
        },
        setFilteredCountriesData(state, { search, filters }) {
            // area filter
            if (search.searchMode) {
              state.filteredCountriesData = state.countriesData.filter(country => {
                return country.name.toLowerCase().includes(search.searchQuery.toLowerCase())
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
                  if (country.region && country.subregion) {
                    filterId = country.region.charAt(0).toLowerCase() + country.region.slice(1)
                  }
                }
      
                return filterId == filters.pickedFilter || filters.pickedFilter == 'world'
              })
            }

            // check if the country has all required data
            state.filteredCountriesData = state.filteredCountriesData.filter(country => {
              const checkKeys = ['region', 'subregion', 'population', 'area']

              const existingKeys = Object.keys(country).reduce((total, current) => {
                return checkKeys.includes(current) ? total + 1 : total
              }, 0)

              return existingKeys == checkKeys.length
            })
        },
        reverseFilteredCountriesData(state) {
            state.filteredCountriesData = state.filteredCountriesData.reverse()
        },
        sortFilteredCountriesData(state, { comparator }) {
          state.filteredCountriesData = state.filteredCountriesData.sort((a, b) => {
            const sortingComparators = {
              'Name': a.name.localeCompare(b.name),
              'Population': a.population < b.population ? 1 : -1,
              'Population density': (a.population / a.area) < (b.population / b.area) ? 1 : -1,
              'Area': a.area < b.area ? 1 : -1
            }
    
            return sortingComparators[comparator]
          })
        },
        keepOrder(state, { filters }) {
          if (filters.sortDirection == 'ascend') {
            state.filteredCountriesData = state.filteredCountriesData.reverse()
          }
        }
    },
    actions: {
        setFilteredCountriesData({ commit, rootState }) {
            commit('setFilteredCountriesData', {
                search: rootState.search,
                filters: rootState.filters
            })

            commit('sortFilteredCountriesData', {
              comparator: rootState.filters.sortBy
            })

            commit('keepOrder', {
              filters: rootState.filters
            })
        },
        getCountriesData({ commit, dispatch }) {
            fetch('https://restcountries.com/v2/all')
              .then((response) => {
                  return response.json()
              })
              .then((data) => {
                  commit('setCountriesData', {data: data})
                  dispatch('setFilteredCountriesData')
              })
        }
    }
}

export default moduleData