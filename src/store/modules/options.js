const moduleOptions = {
    namespaced: true,
    state: {
        options: {}
    },
    mutations: {
        syncOptions(state) {
            if (!localStorage.localOptions) {
              localStorage.setItem('localOptions', JSON.stringify({
                darkMode: false
              }))
            }
      
            state.options = JSON.parse(localStorage.localOptions)
        },
        changeOption(state, { option, value }) {
            state.options[option] = value
            localStorage.setItem('localOptions', JSON.stringify(state.options))
        }
    }
}

export default moduleOptions