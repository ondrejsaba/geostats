const moduleFilters = {
    namespaced: true,
    state: {
        pickedFilter: 'world',
        sortBy: 'Population',
        sortDirection: 'descend'
    },
    mutations: {
        setPickedFilter(state, { id }) {
            state.pickedFilter = id
      
            // reset shown cards
            state.shownCards = 0
        },
        setSortBy(state, { sort }) {
            state.sortBy = sort
        },
        setSortDirection(state) {
            // data for the button
            const switchDirection = {
              'ascend': 'descend',
              'descend': 'ascend'
            }
      
            state.sortDirection = switchDirection[state.sortDirection]
        }
    },
    actions: {
        setSortDirection({ commit }) {
            commit('setSortDirection')

            // actually reverse the order
            commit('data/reverseFilteredCountriesData', null, { root: true })
        }
    }
}

export default moduleFilters