import { createStore } from 'vuex'

export default createStore({
  state: {
    menuOpened: false,
    pickedFilter: 'world'
  },
  mutations: {
    setMenuOpened(state) {
      state.menuOpened = !state.menuOpened
    },
    setPickedFilter(state, payload) {
      const {id} = payload
      state.pickedFilter = id
    }
  },
  actions: {

  },
  getters: {
    menuOpened(state) {
      return state.menuOpened
    },
    pickedFilter(state) {
      return state.pickedFilter
    }
  }
})
