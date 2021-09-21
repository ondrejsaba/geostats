const moduleDialog = {
    namespaced: true,
    state: {
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
        setDialog(state, payload) {
            state.dialog = {
              ...state.dialog,
              ...payload
            }
        }
    }
}

export default moduleDialog