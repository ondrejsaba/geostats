const moduleComparison = {
    namespaced: true,
    state: {
        comparisonList: [],
        chartColors: {}
    },
    mutations: {
        modifyComparisonList(state, { countryName }) {       
            if (!state.comparisonList.includes(countryName)) {
              state.comparisonList.push(countryName)
      
              // chart colors
              const allColors = ['#006699', '#6E4673', '#649E0B', '#F6921E', '#D14343', '#00AFAF']
      
              // ensure there aren't two countries with the same color
              const availableColors = allColors.filter(color => !Object.values(state.chartColors).includes(color))
      
              // assign a random color out of the possible ones to the country
              state.chartColors[countryName] = availableColors[Math.floor(Math.random() * availableColors.length)]
            } else {
              state.comparisonList = state.comparisonList.filter(country => country != countryName)
              state.chartColors = Object.fromEntries(Object.entries(state.chartColors).filter(([country]) => country != countryName))
            }
          },
          setComparisonList(state, { list, callback }) {
            state.comparisonList = [...list]
      
            if (callback) {
              callback(state)
            }
          }
    }
}

export default moduleComparison