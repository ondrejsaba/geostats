<template>
  <div class="content" v-if="!dataError">
    <Search />
    <Filters
      v-if="!searchMode"
    />
    <CountriesList />
  </div>

  <div v-else>
    <LoadError />
  </div>
</template>

<script>
import Search from '../components/Search.vue'
import Filters from '../components/Filters.vue'
import CountriesList from '../components/CountriesList.vue'
import LoadError from '../components/LoadError.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Search,
    Filters,
    CountriesList,
    LoadError
  },
  computed: {
    ...mapState('search', [
      'searchMode'
    ]),
    ...mapState('data', [
      'dataError'
    ])
  }
}
</script>