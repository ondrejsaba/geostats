const moduleMenu = {
    namespaced: true,
    state: {
        menuOpened: false
    },
    mutations: {
        setMenuOpened(state) {
            state.menuOpened = !state.menuOpened
        }
    }
}

export default moduleMenu