import EnglishMessages from '@/json/messages/en.json'
import CzechMessages from '@/json/messages/cz.json'

const moduleMessages = {
    namespaced: true,
    state: {
        allMessages: {
            en: EnglishMessages,
            cz: CzechMessages
        },
        messages: {}
    },
    mutations: {
        setMessages(state, { options }) {
            const languageFiles = {
                'en': EnglishMessages,
                'cz': CzechMessages
            }

            state.messages = languageFiles[options.language]
        }
    },
    actions: {
        setMessages({ commit, rootState }) {
            commit('setMessages', {
                options: rootState.options.options
            })
        }
    }
}

export default moduleMessages