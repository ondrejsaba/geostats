import { createStore } from 'vuex'
import moduleMenu from './modules/menu.js'
import moduleFilters from './modules/filters.js'
import moduleSearch from './modules/search.js'
import moduleComparison from './modules/comparison.js'
import moduleData from './modules/data.js'
import moduleOptions from './modules/options.js'
import moduleDialog from './modules/dialog.js'
import moduleMessages from './modules/messages.js'

export default createStore({
  modules: {
    menu: moduleMenu,
    filters: moduleFilters,
    search: moduleSearch,
    comparison: moduleComparison,
    data: moduleData,
    options: moduleOptions,
    dialog: moduleDialog,
    messages: moduleMessages
  }
})
