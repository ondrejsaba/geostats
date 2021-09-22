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
                  if (filterId) {
                    filterId = country.region.charAt(0).toLowerCase() + country.region.slice(1)
                  }
                }
      
                return filterId == filters.pickedFilter || filters.pickedFilter == 'world'
              })
            }
      
            // sort
            state.filteredCountriesData = state.filteredCountriesData.sort((a, b) => {
              const sortingComparators = {
                'Name': a.name.localeCompare(b.name),
                'Population': a.population < b.population ? 1 : -1,
                'Area': a.area < b.area ? 1 : -1
              }
      
              return sortingComparators[filters.sortBy]
            })
      
            // order (keep it)
            if (filters.sortDirection == 'ascend') {
              state.filteredCountriesData = state.filteredCountriesData.reverse()
            }
        },
        reverseFilteredCountriesData(state) {
            state.filteredCountriesData = state.filteredCountriesData.reverse()
        }
    },
    actions: {
        setFilteredCountriesData({ commit, rootState }) {
            commit('setFilteredCountriesData', {
                search: rootState.search,
                filters: rootState.filters
            })
        },
        getCountriesData({ commit, dispatch }) {
            fetch('/v2/all')
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