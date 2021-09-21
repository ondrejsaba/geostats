const moduleSearch = {
    namespaced: true,
    state: {
        searchMode: false,
        searchQuery: ''
    },
    mutations: {
        setSearchMode(state) {
            state.searchMode = !state.searchMode
        },
      
        setSearchQuery(state, { query }) {
            state.searchQuery = query
      
            /* if a search query is set (its length is greater than zero),
            then enable the search mode */
            state.searchMode = query.length > 0
        }
    }
}

export default moduleSearch